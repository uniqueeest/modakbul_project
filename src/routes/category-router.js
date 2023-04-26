const { Router } = require('express');
const CategoryController = require('../controller/category-controller');
const categoryRouter = Router();

// 카테고리 생성
categoryRouter.post('/add', CategoryController.createCategory);

// 전체 카테고리 조회
categoryRouter.get('/', CategoryController.getAllCategory);

// 특정 카테고리 조회
categoryRouter.get('/:name', CategoryController.findCategoryName);

// 특정 카테고리 이름 수정
categoryRouter.put('/:name', CategoryController.updateCategory);

// 특정 카테고리 삭제 기능
categoryRouter.delete('/:name', CategoryController.deleteCategory);


module.exports = categoryRouter;