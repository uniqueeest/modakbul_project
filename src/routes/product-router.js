const { Router } = require('express');
const ProductService = require('../service/product-service');
const productRouter = Router();

productRouter.post('/add', async (req, res) => {
    const productInfo = req.body;

    try {
        const product = await ProductService.addProduct(productInfo);
        res.json(product);
        res.status(200).send(`상품 추가 성공!`);
    } catch (err) {
        console.log(err);
        res.status(400).send(`${err}`);
    }
});
module.exports = productRouter;