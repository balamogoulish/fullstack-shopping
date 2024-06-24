//유저에 관란 요청 처리
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Product = require('../models/Product');
const Payment = require('../models/Payment');
const crypto = require('crypto');

router.post('/register', async (req, res, next)=>{ 
    try{
        const user = new User(req.body);
        await user.save();
        return res.sendStatus(200);
    } catch(err){
        next(err);
    }

});
router.post('/logout', auth, async(req, res, next)=>{ 
    try {
        return res.sendStatus(200);
    } catch(err){
        next(err);
    }
})

router.post('/login', async(req, res, next)=>{
    try{
        const user = await User.findOne({
            email: req.body.email
        });
        if(!user){ //email 존재 확인
            return res.status(400).send("Auth failed, email not found");
        }
        
        //비밀번호 확인
        const isMatch = await user.comparePassword(req.body.password)
        if(!isMatch){
            return res.status(400).send("Wrong password");
        }

        const payload = {
            userId: user._id.toHexString()
        }

        //토큰 생성 후에 유저와 토큰 데이터 응답으로 보내기
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})
        return res.json({user, accessToken})

    }catch(err){
        next(err);
    }
})

router.get('/auth', auth, (req, res)=>{ //여기까지 왔다는 것은 유저가 존재한다는 의미임
    return res.status(200).json({
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    });
});

router.post('/cart', auth, async(req,res,next)=>{
    try {
        //1. User Collection에 해당 유저 정보 가져옴
        const userInfo = await User.findOne({ _id: req.user._id })

        //2. 가져온 정보에서 카트에 추가하는 상품이 이미 존재하는 지 확인
        let duplicate = false;
        userInfo.cart.forEach((item)=>{
            if(item.id == req.body.productId){
                duplicate= true;
            }
        })

        if(duplicate){ //상품 개수 1 증가
            const user = await User.findOneAndUpdate(
                {_id: req.user._id, "cart.id": req.body.productId},
                {$inc: {"cart.$.quantity": 1}},
                {new: true}
            )
            return res.status(200).send(user.cart);
        } else { //상품 추가
            const user = await User.findOneAndUpdate(
                {_id: req.user._id},
                {
                    $push: {
                        cart: {
                            id:req.body.productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                {new: true}
            )
            return res.status(200).send(user.cart);
        }
        
    } catch (error) {
        next(error);
    }
})

router.delete('/cart', auth, async(req, res)=>{
    try {
        const userInfo = await User.findOneAndUpdate(
            {_id: req.user._id},
            {
                "$pull": {"cart": {"id": req.query.productId}}
            },
            {new: true}
        )
        const cart = userInfo.cart;
        const array = cart.map(item=>{
            return item.id
        })

        const productInfo = await Product
        .find({_id: {$in: array}})
        .populate("writer")

        return res.status(200).json({
            productInfo,
            cart
        })
    } catch (error) {
        next(error);
    }
})

router.post('/payment', auth, async (req, res) => {
    try {
        let history = [];
        let transactionData = {};

        // 1. Add simple payment info to User Collection's history
        req.body.cartDetail.forEach((item) => {
            history.push({
                dateOfPurchase: new Date().toISOString(),
                name: item.title,
                id: item._id,
                price: item.price,
                quantity: item.quantity,
                paymentId: crypto.randomUUID()
            });
        });

        // 2. Add detailed payment info to Payment Collection
        transactionData.user = {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email
        };
        transactionData.product = history;

        // Save history info
        await User.findOneAndUpdate(
            { _id: req.user._id },
            { $push: { history: { $each: history } }, $set: { cart: [] } }
        );

        // Save transaction data to payment
        const payment = new Payment(transactionData);
        const paymentDocs = await payment.save();

        // 3. Update sold field info in Product Collection
        let products = [];
        paymentDocs.product.forEach(item => {
            products.push({ id: item.id, quantity: item.quantity });
        });

        // Use native async/await for updating products
        await Promise.all(products.map(async (item) => {
            await Product.updateOne(
                { _id: item.id },
                { $inc: { "sold": item.quantity } }
            );
        }));

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});



module.exports = router