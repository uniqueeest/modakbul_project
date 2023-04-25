const { Router } = require('express');
const ProductController = require('../controller/product-controller');
const productRouter = Router();
const multerMiddleware = require('../middlewares/multer');


// 상품 등록
productRouter.post("/add", multerMiddleware.upload.single("imgPath"), ProductController.createProduct);

//모든 상품 정보 조회
productRouter.get('/', ProductController.findAllProduct);

// 특정 상품 정보 조회
productRouter.get('/:name', ProductController.findOneProduct);


//특정 상품 정보 수정
productRouter.patch('/:productId', multerMiddleware.upload.single("imgPath"), ProductController.updateProduct);

//특정 상품 삭제
productRouter.delete('/:name', ProductController.deleteProduct);

module.exports = productRouter;

// 테스트 