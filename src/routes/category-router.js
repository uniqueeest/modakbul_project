const { Router } = require('express');
const CategoryController = require('../controller/category-controller');
const categoryRouter = Router();

// 카테고리 생성
categoryRouter.post('/add', CategoryController.createCategory);

// 전체 카테고리 조회
categoryRouter.get('/', CategoryController.getAllCategory);

// major 카테고리 조회
categoryRouter.get('/:major', CategoryController.findMajorCategory);

// major 카테고리 이름 수정
categoryRouter.patch('/:major', CategoryController.updateMajorCategory);

// minor 카테고리 이름 수정
categoryRouter.put('/:major/:minor', CategoryController.updateMinorCategory);

// 메이저 카테고리 삭제 기능
categoryRouter.delete('/:major', CategoryController.deleteMajorCategory);

// minor 카테고리만 삭제하는 기능
categoryRouter.delete('/:major/:minor', CategoryController.deleteMinorCategory);

module.exports = categoryRouter;