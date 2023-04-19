const { Router } = require('express');
const CartService = require('../service/cart-service');
const cartRouter = Router();

//장바구니 추가 라우터
cartRouter.post('/new', async (req, res)=> {
    const cartAdd =req.body;

    try{
        await CartService.postCart(cartAdd);
        res.status(200).send('장바구니에 등록되었습니다.');
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
});


//장바구니 조회 라우터
cartRouter.get('/view', async (req, res)=> {

    try {
        const cartItems = await CartService.presentCart();
        res.status(200).send(cartItems);
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
});


//장바구니 삭제 라우터
cartRouter.delete('/delete', async (req, res)=> {
    const cartDelete = req.body;

    try {
        await CartService.cancelCart(cartDelete);
        res.status(200).send('장바구니 삭제에 성공했습니다');
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
});


//장바구니 전체 삭제 라우터
cartRouter.delete('/delAll', async (req, res)=> {

    try {
        await CartService.cancelCartAll();
        res.status(200).send('장바구니 전체 삭제에 성공했습니다');
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
});

module.exports = cartRouter;