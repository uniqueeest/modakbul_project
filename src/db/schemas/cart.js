const mongoose = require('mongoose');
const { Schema } = mongoose;

//장바구니 페이지에 보여질 상품에 대한 스키마 정리입니다.
const CartSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    //quantity는 주문할 갯수를 설정합니다.
    quantity: {
        type: Number,
        required: true,
    },
    //장바구니에 담은 유저의 ObjectId를 가집니다.
    poster: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
});

module.exports = CartSchema;