const { Category } = require('../db/models/category-model');

const addCategory = async (categoryInfo) => {
    try {
        // categoryInfo로 가져온 정보들을 구조분해할당
        const {major, minor} = categoryInfo;

        // 카테고리이름 중복 체크
        const majorDuplicate = await Category.findOne({ major });

        if (majorDuplicate) {
            throw new Error('이미 등록된 상품입니다.');
          }

        // 카테고리 생성
        const newCategory = new Category({
            major,
            minor
        });

        const savedCategory = await newCategory.save();

        return savedCategory;
    } catch (err) {
        throw new Error(`카테고리 등록에 실패했습니다. ${err.message}`);
    }
};

// 모든 카테고리 조회
const findAll = async () => {
    try {
        const categories = await Category.find({});

        return categories;
    } catch (err) {
        throw new Error(`카테고리 조회에 실패했습니다. ${err.message}`);
    }
}
 
module.exports = { addCategory, findAll };