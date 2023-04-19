const { Cart } = require('../db/models/cart-model');
const { ObjectId } = require('mongoose');

//장바구니 추가 
const postCart = async (cartAdd)=> {
    try {
        //추가하려는 물품의 이름, 가격, 회사, 구매수량을 추가합니다.
        const { name, price, company, quantity } = cartAdd;
        //이미 등록된 상품인지 확인합니다.
        const productDuplicate = await Cart.findOne({ name });

        if(productDuplicate !== null) {
            throw new Error('이미 등록된 상품입니다.');
        }

        //장바구니에 추가
        const newCart = new Cart ({
            name,
            price,
            company,
            quantity,
        });

        //장바구니에 저장
        const saveCart = newCart.save();

        return saveCart;
    } catch (err) {
        throw new Error('장바구니를 확인해 주세요.');
    }
};

//장바구니 목록 띄우기(장바구니에 넣은 전체 상품을 표시합니다.)
const presentCart = async ()=> {

    //모든 상품의 이름, 가격, 회사, 구매 수량을 표시합니다.
    const cartItem = await Cart.find({});

    if(!cartItem) {
        throw new Error ('현재 장바구니에 상품이 없습니다.');
    }

    const cartItemData = cartItem.map(item => ({
        name: item.name,
        price: item.price,
        company: item.company,
        quantity: item.quantity
    }));

    return cartItemData;
};


//장바구니 목록 삭제
const cancelCart = async (cartDelete)=> {
    //지울 목록의 이름을 CartSchema에서 가져옵니다.
    const { _id } = cartDelete;
    //선택한 Cart 목록을 삭제합니다.
    const deleteCart = await Cart.deleteOne({ _id: Object(_id) });

    if(!deleteCart) {
        throw new Error ('지울 항목이 없거나 상품이 없습니다.');
    }
};


//장바구니 목록 전체 삭제
const cancelCartAll = async (cartDelAll)=> {

    //모든 Cart 목록을 삭제합니다.
    const deleteCartAll = await Cart.deleteMany({});

    if(!deleteCartAll) {
        throw new Error ('지울 항목이 없거나 상품이 없습니다.');
    }
};

module.exports = { postCart, presentCart, cancelCart, cancelCartAll };