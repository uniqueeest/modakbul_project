const { Router } = require('express');
const CartService = require('../service/cart-service');
const CartRouter = Router();

//장바구니 삭제 라우터
CartRouter.delete('/api/:user/cart', async (req, res)=> {
    const cartInfo = req.body;

    try {
        await CartService.cancerCart(cartInfo);
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
})

//갯수 수정 라우터
CartRouter.update('/api/:user/cart', async (req, res)=> {
    const quntInfo = req.body;

    try {
        await CartService.changeQuantity(quntInfo);
        res.status(200).send();
    } catch (err) {
        res.status(500).send(`${err}`);
    }
})