const { Router } = require('express');
const {categoryController} = require('../controller/index');
const categoryRouter = Router();
const authMiddleware = require("../middlewares/login-required");

// 카테고리 생성
categoryRouter.post('/add', authMiddleware, categoryController.createCategory);

// 전체 카테고리 조회
categoryRouter.get('/', categoryController.getAllCategory);

// 특정 카테고리 조회
categoryRouter.get('/:name', categoryController.findCategoryName);

// 특정 카테고리 이름 수정
categoryRouter.put('/:name', authMiddleware, categoryController.updateCategory);

// 특정 카테고리 삭제 기능
categoryRouter.delete('/:name', authMiddleware, categoryController.deleteCategory);


module.exports = categoryRouter;