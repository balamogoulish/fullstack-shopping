const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, '../uploads'))); // uploads 폴더의 이미지 접근
app.use(cors()); // 다른 origin 사이 통신 허용
app.use(express.json()); //post할 때 프로토콜 지정
app.use((error, req, res, next)=>{
    res.status(err.status || 500)
    res.send(err.message || '서버에서 에러가 났습니다.');
})

app.use('/users', require('./src/routes/users'))
app.use('/products', require('./src/routes/products'))

mongoose.connect(process.env.MONGO_URI,)
.then(()=>{
    console.log('연결 완료');
}).catch(err=>{
    console.log(err);
})

app.get('/', (req, res, next)=>{
    res.send('안녕하세요!');
})

app.listen(port, ()=>{
    console.log(`${port}번에서 실행이 되었습니다.`)
});