const { Router } = require('express');
const {productController} = require('../controller/index');
const productRouter = Router();
const multerMiddleware = require('../middlewares/multer');
const authMiddleware = require("../middlewares/login-required");


// 상품 등록
productRouter.post("/add", authMiddleware, multerMiddleware.upload.single("imgPath"), productController.createProduct);

//모든 상품 정보 조회
productRouter.get('/', productController.findAllProduct);

// 특정 상품 정보 조회
productRouter.get('/:name', productController.findOneProduct);

//특정 상품 정보 수정
productRouter.patch('/:productId', authMiddleware, multerMiddleware.upload.single("imgPath"), productController.updateProduct);

//특정 상품 삭제
productRouter.delete('/:name', authMiddleware, productController.deleteProduct);

module.exports = productRouter;