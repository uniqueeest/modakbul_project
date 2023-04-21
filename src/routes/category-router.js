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

module.exports = categoryRouter;