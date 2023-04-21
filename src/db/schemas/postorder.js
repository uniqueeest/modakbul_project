const { Schema } = require('mongoose');
const CartSchema = require('../models/cart-model');

//장바구니에서 주문 진행으로 넘어갔을 때 중간 단계에 있는 스키마 구현입니다.
const PostOrder = new Schema ({
    cart: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Cart',
    }],
});