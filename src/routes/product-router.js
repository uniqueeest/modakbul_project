const { Router } = require('express');
const ProductService = require('../service/product-service');
const productRouter = Router();
const { Product } = require("../db/models/product-model");

// 상품 등록
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

//모든 상품 정보 조회
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

// 특정 상품 정보 조회
productRouter.get('/:name', async(req, res) => {
    const name = req.params.name;

    try {
        const product = await ProductService.findProductByName(name);

        res.status(200).json({
            message: `특정 상품 조회 성공!`,
            product: product
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `서버 에러`});
    }
});


//특정 상품 정보 수정
productRouter.patch('/:productId', async (req, res) => {
    const { productId } = req.params;
    const productInfo = req.body;
  
    try {
      const updatedProduct = await ProductService.updateProduct(productId, productInfo);
  
      if (!updatedProduct) {
        return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
      }
  
      res.status(200).json({
        message: '상품 수정 성공!',
        product: updatedProduct
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: '서버 에러' });
    }
  });

  //특정 제품 삭제
module.exports = productRouter;

