const cartService = require('../service/cart-service');


//장바구니 추가 컨트롤러
const cartPost = async (req, res) => {
    try{
        const userIdKey = req.user.id;
        const cartAdd = req.body;

        await cartService.postCart(userIdKey, cartAdd);
        res.status(200).json({ messeage: `장바구니에 등록되었습니다.` });
    } catch (err) {
        res.status(400).json({ message: `${err}` });
    };
}

//장바구니 조회 컨트롤러
const cartGet = async (req, res) => {
    try{
        const userIdKey = req.user.id;
        const cartItems = await cartService.presentCart(userIdKey);
        res.status(200).send(cartItems);
    } catch (err) {
        res.status(400).json({ message: `${err}` });
    };
}

//장바구니 개별 삭제 컨트롤러
const cartDeleteOne = async (req, res) => {
    try {
        const userIdKey = req.user.id;
        const cartId = req.params;

        await cartService.removeCart(userIdKey, cartId);
        res.status(200).json({ message: '장바구니 삭제에 성공했습니다.' });
    } catch (err) {
        res.status(400).json({ message: `${err}` });
    };
}

//장바구니 전체 삭제 컨트롤러
const cartDeleteAll = async (req, res) => {
    try {
        const userIdKey = req.user.id;

        await cartService.removeAllCart(userIdKey);
        res.status(200).json({ message: '장바구니 전체 삭제에 성공했습니다.' });
    } catch (err) {
        res.status(400).json({ message: `${err}` });
    };
}

const cartController = {
    cartPost,
    cartGet,
    cartDeleteOne,
    cartDeleteAll
};

module.exports = cartController;