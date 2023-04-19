const { Router } = require('express');
const CartService = require('../service/cart-service');
const cartRouter = Router();

//장바구니 조회 라우터
cartRouter.get('/get', async (req, res)=> {
    const cartView = req.body;

    try {
        await CartService.presentCart(cartView);
        res.status(200).send('장바구니 연결에 성공하였습니다');
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
});


//장바구니 삭제 라우터
cartRouter.delete('/del', async (req, res)=> {
    const cartInfo = req.body;

    try {
        await CartService.cancerCart(cartInfo);
        res.status(200).send('장바구니 삭제에 성공했습니다');
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
});

module.exports = cartRouter;