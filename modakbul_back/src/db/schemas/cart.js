const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    //상품 스키마 연동
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },
    //주문할 갯수를 설정
    quantity: {
        type: Number,
        required: true,
    },
    //장바구니에 담은 유저의 ObjectId
    poster: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
},{
  collection: "carts",
  timestamps: true,
});

module.exports = CartSchema;