const { Cart } = require('../db/models/cart-model');

//장바구니 목록 띄우기(장바구니에 넣은 전체 상품을 표시합니다.)
const defaultCart = async (cartView)=> {
    const { name, price, company, quantity} = cartView;
    //모든 상품의 이름, 가격, 회사, 구매 수량을 표시합니다.
    const presentCart = await Cart.find({});

    if(!presentCart) {
        throw new Error ('현재 장바구니에 상품이 없습니다.');
    }
};


//장바구니 목록 삭제
const cancerCart = async (cartInfo)=> {
    //지울 목록의 이름을 CartSchema에서 가져옵니다.
    const { ObjectId } = cartInfo;
    //선택한 Cart 목록을 삭제합니다.
    const deleteCart = await Cart.deleteOne({ ObjectId });

    if(!deleteCart) {
        throw new Error ('지울 항목이 없거나 상품이 없습니다.');
    }
};
//장바구니 목록 전체 삭제
const cancelCartAll = async (cartInfo)=> {

    //모든 Cart 목록을 삭제합니다.
    const deleteCartAll = await Cart.deleteMany({});

    if(!deleteCartAll) {
        throw new Error ('지울 항목이 없거나 상품이 없습니다.');
    }
};

module.exports = { defaultCart, cancerCart, cancelCartAll };