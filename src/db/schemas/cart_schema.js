import mongoose from 'mongoose';

//회의에서 진행된 cart_schema 입니다.

const cartSchema = new mongoose.Schema({
    //product는 Product_Schema에서 Name, Price, Company, Stock을 받아옵니다.
    product: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Product',
    }],
    //quantity는 주문할 갯수를 설정합니다.
    quantity: {
        type: Number,
        required: true,
    },
});

export { cartSchema };