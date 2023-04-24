const { Router } = require('express');
const cartcontroller = require('./controller/cart-controller');
const authMiddleware = require('../middlewares/login-required');
const cartRouter = Router();

//장바구니 추가 라우터
cartRouter.post('/new', authMiddleware, cartcontroller.cartPost);


//장바구니 조회 라우터
cartRouter.get('/view', authMiddleware, cartcontroller.cartGet);


//장바구니 삭제 라우터
cartRouter.delete('/deleteOne/:cartId', authMiddleware, cartcontroller.cartDeleteOne);


//장바구니 전체 삭제 라우터
cartRouter.delete('/deleteAll', authMiddleware, cartcontroller.cartDeleteAll);

module.exports = cartRouter;