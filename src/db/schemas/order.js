const { Schema } = require('mongoose');

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
