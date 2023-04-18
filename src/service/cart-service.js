const bcrypt = require('bcrypt');
const { Cart } = require('./db/models/cart-model');

//장바구니 목록 삭제
const cancerCart = async (cartInfo)=> {
    //지울 목록의 이름을 CartSchema에서 가져옵니다.
    const { name } = cartInfo;
    //선택한 Cart 목록을 삭제합니다.
    const deleteCart = await Cart.deleteOne({ name });

    if(!deleteCart) {
        throw new Error ('지울 항목이 없거나 상품이 없습니다.');
    }
};
//장바구니 목록 전체 삭제
const cancerCartAll = async (cartInfo)=> {

    //모든 Cart 목록을 삭제합니다.
    const deleteCartAll = await Cart.deleteMany({});

    if(!deleteCartAll) {
        throw new Error ('지울 항목이 없거나 상품이 없습니다.');
    }
};


//장바구니 수량 변경
const changeQuantity = async (quntInfo)=> {
    //수정할 상품을 CartSchema에서 가져옵니다.
    const { name, quantity } = quntInfo;
    //수정할 갯수를 갯수를 지정합니다.
    const newQuantity = await Cart.updateOne({name: name}, {
        $set: { quantity: quantity }
    });
    if (newQuantity.nModified === 0) {
        throw new Error('수량 변경에 실패하였습니다.');
    }
    return newQuantity;
};
module.exports = { cancerCart, cancerCartAll, changeQuantity };