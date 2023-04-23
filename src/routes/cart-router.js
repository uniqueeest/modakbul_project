const { Router } = require('express');
const CartService = require('../service/cart-service');
const cartRouter = Router();
const authMiddleware = require('../middlewares/login-required');

//장바구니 추가 라우터
cartRouter.post('/new', authMiddleware, async (req, res)=> {
    const userIdKey = req.user.id;
    const cartAdd =req.body;

    try{
        await CartService.postCart(userIdKey, cartAdd);
        res.status(200).send('장바구니에 등록되었습니다.');
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
});


//장바구니 조회 라우터
cartRouter.get('/view', authMiddleware, async (req, res)=> {
    const userIdKey = req.user.id;

    try {
        const cartItems = await CartService.presentCart(userIdKey);
        res.status(200).send(cartItems);
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
});


//장바구니 삭제 라우터
cartRouter.delete('/deleteOne/:cartId', authMiddleware, async (req, res)=> {
    const userIdKey = req.user.id;
    const cartId = req.params;

    try {
        await CartService.removeCart(userIdKey, cartId);
        res.status(200).send('장바구니 삭제에 성공했습니다');
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
});


//장바구니 전체 삭제 라우터
cartRouter.delete('/deleteAll', authMiddleware, async (req, res)=> {
    const userIdKey = req.user.id;

    try {
        await CartService.removeAllCart(userIdKey);
        res.status(200).send('장바구니 전체 삭제에 성공했습니다');
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
});

module.exports = cartRouter;