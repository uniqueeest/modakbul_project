const { Router } = require('express');
const ProductController = require('../controller/product-controller');
const multerMiddleware  = require("../middlewares/multer")
const productRouter = Router();

//상품 등록
productRouter.post("/add", multerMiddleware.upload.single("imgPath"), ProductController.createProduct);

//모든 상품 정보 조회
productRouter.get('/', ProductController.findAllProduct);

// 특정 상품 정보 조회
productRouter.get('/:name', ProductController.findOneProduct);


//특정 상품 정보 수정
productRouter.patch('/:productId', ProductController.updateProduct);

//특정 상품 삭제
productRouter.delete('/:name', ProductController.deleteProduct);

module.exports = productRouter;

