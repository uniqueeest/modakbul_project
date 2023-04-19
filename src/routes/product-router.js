const { Router } = require('express');
const ProductService = require('../service/product-service');
const productRouter = Router();


productRouter.post('/add', async (req, res) => {
    const productInfo = req.body;

    try {
        const product = await ProductService.addProduct(productInfo);
        res.status(200).json({
            message: '상품 추가 성공!',
            products: product
          });
        
    } catch (err) {
        console.log(err);
        res.status(400).send(`${err}`);
    }
});

productRouter.get('/', async (req, res) => {
    try {
        const products = await ProductService.findAll();
        res.status(200).json({
            message: `상품 조회 성공!`,
            products: products
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `서버 에러`});
    }
});

module.exports = productRouter;

