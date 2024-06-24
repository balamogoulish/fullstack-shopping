const { default: mongoose } = require("mongoose");

const paymentSchema = mongoose.Schema({
    user: {
        type: Object
    },
    data: {
        type: Array,
        default: []
    },
    product: {
        type: Array,
        default: []
    },
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema); // 유저 모델

module.exports = Payment; //유저 모델을 통해 데이터를 삽입, 삭제, 수정