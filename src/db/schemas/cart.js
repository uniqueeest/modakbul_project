const { Schema } = require('mongoose');

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
});

module.exports = CartSchema;