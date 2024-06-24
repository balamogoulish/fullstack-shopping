//유저에 관란 요청 처리
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/') //이미지가 저장될 파일 경로
    },
    filename: function(req, file, cb){
        //파일 이름 지정 - Date.now()는 현재 timestamp로 모든 파일이 각기 다른 값을 가지게 함
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage: storage}).single("file"); //FileUploads의 formData 이름과 동일해야 함(file)
router.post('/image', auth, (req, res)=>{ 
    //가져온 이미지를 저장함
    upload(req, res, err=>{
        if(err) return req.status(500).send(err);
        return res.json({fileName: res.req.file.filename})
    })
});

router.post('/', auth, async (req, res, next)=>{ 
    try{
        const product = new Product(req.body);
        await product.save();
        return res.sendStatus(201);
    } catch(err){
        next(err);
    }
});

router.get('/', async (req, res, next)=>{ 
    const order = req.query.order ? req.query.order : "desc"; //asc: 오름차순, desc: 내림차순
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const term = req.query.searchTerm;

    let findArgs = {}; //filter 반영
    for(let key in req.query.filters){
        if(req.query.filters[key].length >0){
            if(key === 'price'){
                findArgs[key] = {
                    //greater than equal
                    $gte: req.query.filters[key][0],
                    //less than equal
                    $lte: req.query.filters[key][1]
                }
            }else{
                findArgs[key] = req.query.filters[key];
            } 
        }
    }

    if(term){
        findArgs["$text"] = { $search: term};
    }
    try{
        const products = await Product.find(findArgs)
        .populate("writer")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
    
        const productsTotal = await Product.countDocuments(findArgs);
        const hasMore = skip+limit < productsTotal ? true: false;
        return res.status(200).json({
            products,
            hasMore
        });
    } catch(err){
        next(err);
    }
});

router.get('/:id', auth, async(req, res, next)=>{
    const type = req.query.type; //single or
    let productIds = req.params.id;
    
    if(type === 'array'){
        let ids = productIds.split(",");
        productIds = ids.map(item=>{
            return item
        })
    }
    //productId를 이용해 productId와 같은 상품의 정보 가져옴
    try {
        const product = await Product
            .find({ _id: {$in: productIds}})
            .populate('writer');
        
            return res.status(200).send(product);
    } catch (error) {
        next(error);
    }
})



module.exports = router