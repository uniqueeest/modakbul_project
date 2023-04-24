const { Router } = require('express');
const CategoryService = require('../service/category-service');
const CategoryController = require('../controller/category-controller');
const categoryRouter = Router();

// 카테고리 생성
categoryRouter.post('/add', CategoryController.createCategory);

// 전체 카테고리 조회
categoryRouter.get('/', CategoryController.getAllCategory);

// major 카테고리 조회
categoryRouter.get('/:major', CategoryController.findMajorCategory);

// major 카테고리 이름 수정
categoryRouter.patch('/:major', async (req, res) => {
    try {
      const {major} = req.params;
      const {newMajor} = req.body;
      const updatedCategory = await CategoryService.updateMajorName(major, newMajor);
      res.status(200).json({
        message: `major 카테고리 수정 성공!`,
        categories: updatedCategory
    });
    } catch (err) {
      console.log(err);
      res.status(500).send(`${err}`);
    }
  });

// 메이저 카테고리 삭제 기능
categoryRouter.delete('/:major', CategoryController.deleteMajorCategory);

// minor 카테고리만 삭제하는 기능
categoryRouter.delete('/:major/:minor', CategoryController.deleteMinorCategory);

module.exports = categoryRouter;