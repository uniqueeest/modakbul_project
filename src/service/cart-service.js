const { Cart } = require('../db/models/cart-model');
const { User } = require('../db/models/user-model');
const mongoose = require('mongoose');

//장바구니 추가 
const postCart = async (userId, cartAdd)=> {
    try{
        //맨 먼저 유저가 제대로 접속해 있는 상황인지 확인합니다.
        if(!userId){
            throw new Error('먼저 로그인 상태를 확인해 주세요');
        }
        // Jwt 키 값을 API에 구현하기 위해 파라미터 키 값을 문자열로 변환합니다.
        const modifyId = JSON.stringify(userId)
            .substring(11)
            .slice(0,-2);
        //추가하려는 물품의 이름, 가격, 회사, 구매수량을 추가합니다.
        const { name, price, company, quantity } = cartAdd;

        //장바구니에 추가
        const newCart = new Cart ({
            name,
            price,
            company,
            quantity,
            poster: modifyId
        });
        //중복 추가 방지를 위해 확인합니다.
        const duplicateCart = await Cart.findOne({ name, price, company, poster: modifyId });
            if(duplicateCart){
                throw new Error ('이미 장바구니에 추가된 상품입니다.');
            }
        //장바구니에 저장합니다.
        const saveCart = await newCart.save();
        //장바구니에 제대로 저장이 되었는지 확인합니다.
        const checkCart = await Cart.find({ name, price, company, poster: modifyId });
            if(checkCart.length === 0){
                throw new Error ('현재 장바구니에 상품이 추가되지 않습니다.');
            }        
        //장바구니 document의 ObjectId를 User Schema의 cart 필드에 추가합니다.
            const insertCart = await User.findByIdAndUpdate(
                modifyId,
                { $push: { cart: saveCart._id } },
                { new: true }
            );
            //해당 유저의 장바구니 칸에도 상품 id 값이 제대로 저장 되었는지 확인합니다.
            const userCartCheck = await User.findById(modifyId, { cart: saveCart._id });
                if(!userCartCheck.cart.some(cartItem => cartItem.equals(saveCart._id))){
                    throw new Error ('장바구니 추가 중 문제가 발생하였습니다.');
                }
            return insertCart.cart;
        } catch (err) {
            throw new Error (`${err.message}`);
        };
};

//장바구니 목록 띄우기(장바구니에 넣은 전체 상품을 표시합니다.)
const presentCart = async (userId)=> {
    try{
    //맨 먼저 유저가 제대로 접속해 있는 상황인지 확인합니다.
    if(!userId){
        throw new Error('먼저 로그인 상태를 확인해 주세요');
    }
    const modifyId = JSON.stringify(userId)
    .substring(11)
    .slice(0,-2);
        //해당 유저의 모든 장바구니 물품들의 내역을 표시합니다.
        const cartItems = await User.findById(modifyId).populate('cart');
        //장바구니에 상품이 없다면 오류를 출력합니다.
        if (cartItems.cart.length === 0){
            throw new Error ('현재 장바구니에 상품이 없습니다.');
        }

        //장바구니에 담긴 상품들을 나열합니다.
        const arrangeCart = cartItems.cart;
        const cartItemData = arrangeCart.map((item)=> ({
            name: item.name,
            price: item.price,
            company: item.company,
            quantity: item.quantity,
        }));
        return cartItemData;
    } catch (err) {
        throw new Error (`${err.message}`)
    };
};


//장바구니 목록 삭제
const removeCart = async (userId, requestedThisInTheCart)=> {
    try{
        //맨 먼저 유저가 제대로 접속해 있는 상황인지 확인합니다.
        if(!userId){
            throw new Error('먼저 로그인 상태를 확인해 주세요');
    }
    const modifyId = JSON.stringify(userId)
    .substring(11)
    .slice(0,-2);
        //해당 유저의 물품들의 내역을 표시합니다.
        const usersCart = await User.findById(modifyId).populate('cart');
        //장바구니에 상품이 없다면 오류를 뱉어냅니다.
        if (usersCart.cart.length === 0){
            throw new Error ('장바구니에 담긴 물품이 없습니다.');
        }
        //유저의 장바구니 품목을 삭제합니다.
        await User.findByIdAndUpdate(
            modifyId,
            { $pull: { cart: requestedThisInTheCart } },
            { new: true }
        );
        //참조되고 있던 cart document도 같이 삭제합니다.
        await Cart.findByIdAndDelete(requestedThisInTheCart);
    } catch (err){
        throw new Error(`${err.message}`);
    }
};


//장바구니 목록 전체 삭제
const removeAllCart = async (userId)=> {
    try{
        //맨 먼저 유저가 제대로 접속해 있는 상황인지 확인합니다.
        if(!userId){
            throw new Error('먼저 로그인 상태를 확인해 주세요');
    }
    const modifyId = JSON.stringify(userId)
    .substring(11)
    .slice(0,-2);
        //해당 유저의 물품들의 내역을 표시합니다.
        const usersCart = await User.findById(modifyId).populate('cart');
        //장바구니에 상품이 없다면 오류를 뱉어냅니다.
        if (usersCart.cart.length === 0){
            throw new Error ('현재 장바구니에 상품이 없습니다.');
        }
        //장바구니에서 모든 상품을 삭제합니다.
        await User.findByIdAndUpdate(modifyId, { $set: { cart: [] } });
        //참조되고 있던 cart document도 전부 삭제합니다.
        const cartIds = usersCart.cart.map((item)=> item._id);
        await Cart.deleteMany({ _id: { $in: cartIds } });
        return;
    } catch (err) {
        throw new Error (`${err.message}`);
    }
};

module.exports = { postCart, presentCart, removeCart, removeAllCart };