const express = require('express');
const router = express.Router();
const Cart = require('../models/cart'); // 장바구니 모델
const Product = require('../models/product'); //상품 모델

// 장바구니 페이지에 대한 라우트 핸들러
router.get('/', async (req, res)=> {
    try {
    //장바구니 정보 조회
    const cart = await Cart.findOne({ user: req.user._id })
    .populate('products.product');
    
    //상품 정보 조회
    const products = await Product.find({});
    
    // 장바구니에 넣은 상품 목록과 갯수를 프론트엔드에 전달
    res.render('cart', { cart, products });
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

//상품 갯수 수정에 대한 라우트 핸들러
router.patch('/:productId', async (req, res)=> {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

    //장바구니 정보 조회
    const cart = await Cart.findOne({ user: req.user._id });

    //장바구니에 있는 상품 정보 업데이트
    const updateProduct = cart.products.find(cartProduct => cartProduct.product.toString() === productId);
    updateProduct.quantity = quantity;
    await cart.save();

    res.status(200).send('Success');
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
})

router.delete('/:productId', async (req, res)=> {
    try {
        const { productId } = req.params;

    //장바구니 정보 조회
    const cart = await Cart.findOne({ user: req.user._id });

    //카트에서 상품 삭제
    await cart.removeProduct(productId);

    res.status(200).send('Success');
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
})
module.exports = router;