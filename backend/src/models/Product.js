const { default: mongoose, Schema } = require("mongoose");

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId, //유저의 아이디 참조
        ref: 'User'
    },
    title: {
        type: String,
        maxLength: 30
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0,
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        maxLength: 100,
        default: 0
    },
    continents: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

productSchema.index({
    title:'text',
    description: 'text'
}, {
    weights: {
        title: 5,
        description: 1
    }
})

const Product = mongoose.model("Product", productSchema); // 유저 모델

module.exports = Product; //유저 모델을 통해 데이터를 삽입, 삭제, 수정