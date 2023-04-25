const CategoryService = require('../service/category-service');

const createCategory = async (req, res) => {
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
};

const getAllCategory = async (req, res) => {
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
};

const findMajorCategory = async (req, res) => {
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
};

const deleteMajorCategory = async (req, res) => {
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
};

const deleteMinorCategory = async (req, res) => {
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
  };

const updateMajorCategory = async (req, res) => {
    try {
      const {major} = req.params;
      const newMajor = req.body;
      const updatedCategory = await CategoryService.updateMajorName(major, newMajor);
      res.status(200).json({
        message: `major 카테고리 수정 성공!`,
        categories: updatedCategory
    });
    } catch (err) {
      console.log(err);
      res.status(500).send(`${err}`);
    }
  };

const categoryController = {
    createCategory,
    getAllCategory,
    findMajorCategory,
    updateMajorCategory,
    deleteMajorCategory,
    deleteMinorCategory
}


module.exports = categoryController;