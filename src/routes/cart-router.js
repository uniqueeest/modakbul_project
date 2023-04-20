const { Router } = require('express');
const CartService = require('../service/cart-service');
const cartRouter = Router();

//장바구니 추가 라우터
cartRouter.post('/new', async (req, res)=> {
    const userId = req.user.id;
    const cartAdd =req.body;

    try{
        await CartService.postCart(userId, cartAdd);
        res.status(200).send('장바구니에 등록되었습니다.');
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
});


//장바구니 조회 라우터
cartRouter.get('/view', async (req, res)=> {
    const userId = req.user.id;

    try {
        const cartItems = await CartService.presentCart(userId);
        res.status(200).send(cartItems);
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
});


//장바구니 삭제 라우터
cartRouter.delete('/delete/:_id', async (req, res)=> {
    const userId = req.user.id;
    const cartDelete = req.params;

    try {
        await CartService.removeCart(userId, cartDelete);
        res.status(200).send('장바구니 삭제에 성공했습니다');
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
});


//장바구니 전체 삭제 라우터
cartRouter.delete('/delete', async (req, res)=> {
    const userId = req.user.id;

    try {
        await CartService.removeAllCart(userId);
        res.status(200).send('장바구니 전체 삭제에 성공했습니다');
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
});

module.exports = cartRouter;