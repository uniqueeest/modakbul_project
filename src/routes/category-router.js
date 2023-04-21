const { Router } = require('express');
const CategoryService = require('../service/category-service');
const categoryRouter = Router();

// 카테고리 생성
categoryRouter.post('/add', async (req, res) => {
    const categoryInfo = req.body;
    try {
        const category = await CategoryService.addCategory(categoryInfo);

        res.status(200).json({
            message: '카테고리 추가 성공!',
            categories: category
          });
    } catch (err) {
        console.log(err);
        res.status(400).send(`${err}`);
    }  
});

// 전체 카테고리 조회
categoryRouter.get('/', async (req, res) => {
    try {
        const categories = await CategoryService.findAll();
        res.status(200).json({
            message: `모든 카테고리 조회 성공!`,
            categories: categories
        });
    } catch (err) {
        console.log(err);
        res.status(400).send(`${err}`);
    }
});

// major 카테고리 조회
categoryRouter.get('/:major', async (req, res) => {
    const {major} = req.params;
    try {
        const category = await CategoryService.findMajorCategory(major);
        res.status(200).json({
            message: `major 카테고리 조회 성공!`,
            categories: category
        });
    } catch (err) {
        console.log(err);
        res.status(400).send(`${err}`);
    }
});

// minor 카테고리 조회 (major 카테고리만 안보임)
categoryRouter.get('/:major/:minor', async (req, res) => {
    const {major, minor} = req.params;
    try {
        const category = await CategoryService.findMinorCategory(major, minor);
        res.status(200).json({
            message: `minor 카테고리 조회 성공!`,
            categories: category
        });
    } catch (err) {
        console.log(err);
        res.status(400).send(`${err}`);
    }
});

// major 카테고리 이름 수정
categoryRouter.put('/:major', async (req, res) => {
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
categoryRouter.delete('/:major', async (req, res) => {
    const {major} = req.params;
    try {
        const deleteCategory = await CategoryService.deleteMajorCategory(major);
        res.status(200).json({
            message: `카테고리 삭제 성공!`,
            categories: deleteCategory
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(`${err}`);
    }
});

// minor 카테고리만 삭제하는 기능
categoryRouter.delete('/:major/:minor', async (req, res) => {
    const { major, minor } = req.params;
    try {
      const deletedCategory = await CategoryService.deleteMinorCategory(major, minor);
      res.status(200).json({
        message: `카테고리 삭제 성공!`,
        category: deletedCategory
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(`${err}`);
    }
  });

module.exports = categoryRouter;