const { Cart } = require('../db/models/cart-model');
const { User } = require('../db/models/user-model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//장바구니 추가 
const postCart = async (userId, cartAdd)=> {
    try {
        //추가하려는 물품의 이름, 가격, 회사, 구매수량을 추가합니다.
        const { name, price, company, quantity } = cartAdd;

        //장바구니에 추가
        const newCart = new Cart ({
            name,
            price,
            company,
            quantity,
            poster: userId
        });
        //중복 추가 방지
        const checkCart = await Cart.findOne({name, price, company, poster: userId });
        if(checkCart){
            throw new Error ('이미 장바구니에 추가된 상품입니다.');
        }
        //장바구니에 저장
        const saveCart = await newCart.save();
        
        //장바구니 document의 ObjectId를 User Schema의 cart 필드에 추가
        const InsertCart = await User.findByIdAndUpdate(
            userId,
            { $push: { cart: saveCart._id } },
            { new: true }
        );

        return InsertCart.cart;
    } catch (err) {
        throw new Error('장바구니를 확인해 주세요.');
    }
};

//장바구니 목록 띄우기(장바구니에 넣은 전체 상품을 표시합니다.)
const presentCart = async (userId)=> {
    try {
        //해당 유저의 모든 장바구니 물품들의 내역을 표시합니다.
        const cartItems = await User.findById(userId).populate('cart');
        //장바구니에 상품이 없다면 오류를 뱉어냅니다.
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
        throw new Error ('장바구니를 확인해 주세요.')
    };
};


//장바구니 목록 삭제
const removeCart = async (userId, cartDelete)=> {
        
        try{
        //해당 유저의 물품들의 내역을 표시합니다.
        const usersCart = await User.findById(userId).populate('cart');
        //장바구니에 상품이 없다면 오류를 뱉어냅니다.
        if (usersCart.cart.length === 0){
            throw new Error ('장바구니에 담긴 물품이 없습니다.');
        }
        //유저의 장바구니 품목을 삭제합니다.
        await User.findByIdAndUpdate(
            userId,
            { $pull: { cart: cartDelete } },
            { new: true }
        );
        //참조되고 있던 cart document도 같이 삭제합니다.
        await Cart.findByIdAndDelete(cartDelete);
    } catch (err){
        throw new Error('장바구니를 확인하세요');
    }
};


//장바구니 목록 전체 삭제
const removeAllCart = async (userId)=> {
    try {    
        //해당 유저의 물품들의 내역을 표시합니다.
        const usersCart = await User.findById(userId).populate('cart');
        //장바구니에 상품이 없다면 오류를 뱉어냅니다.
        if (usersCart.cart.length === 0){
            throw new Error ('현재 장바구니에 상품이 없습니다.');
        }
        //장바구니에서 모든 상품을 삭제합니다.
        await User.findByIdAndUpdate(userId, { $set: { cart: [] } });
        //참조되고 있던 cart document도 전부 삭제합니다.
        const cartIds = usersCart.cart.map((item)=> item._id);
        await Cart.deleteMany({ _id: { $in: cartIds } });
        return;
    } catch (err) {
        console.error(`장바구니 삭제 중 오류가 발생했습니다: ${err}`);
        throw new Error ('장바구니를 확인해 주세요.');
    }
};

module.exports = { postCart, presentCart, removeCart, removeAllCart };