const { Schema } = require("mongoose");
const { Cart } = '../models/cart-model'

//회의에서 진행된 order_schema 입니다.
const OrderSchema = new Schema({
    email: {
        type: String,
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    //cartSchema를 가져와 배열을 나열합니다.
    cart: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Cart',
    }],
    status: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
})

module.exports = OrderSchema;
