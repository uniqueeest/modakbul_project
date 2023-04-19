const { Router } = require('express');
const CartService = require('../service/cart-service');
const CartRouter = Router();

//장바구니 조회 라우터
CartRouter.get('/api/carts', async (req, res)=> {
    const cartView = req.body;

    try {
        await CartService.presentCart(cartView);
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
});


//장바구니 삭제 라우터
CartRouter.delete('/api/carts', async (req, res)=> {
    const cartInfo = req.body;

    try {
        await CartService.cancerCart(cartInfo);
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
});

//갯수 수정 라우터
CartRouter.put('/api/carts', async (req, res)=> {
    const quntInfo = req.body;

    try {
        await CartService.changeQuantity(quntInfo);
        res.status(200).send();
    } catch (err) {
        res.status(500).send(`${err}`);
    }
});