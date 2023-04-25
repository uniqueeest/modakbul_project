const { Category } = require('../db/models/category-model');

const addCategory = async (categoryInfo) => {
    try {
        // categoryInfo로 가져온 정보들을 구조분해할당
        const {major, minor} = categoryInfo;

        // 카테고리이름 중복 체크
        const majorDuplicate = await Category.findOne({ major });

        if (majorDuplicate) {
            throw new Error('이미 등록된 major 카테고리입니다.');
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

// 특정 카테고리 조회 (major만 입력하면 minor 카테고리까지 조회됨)
const findMajorCategory = async (major) => {
    try {
        const category = await Category.findOne({major});

        if(!category) {
            throw new Error(`존재하지 않는 카테고리입니다.`);
        }

        return category;
    } catch (err) {
        throw new Error(`카테고리 조회에 실패했습니다. ${err.message}`);
    }
}


const findMinorCategory = async (major) => {
    try {
        const category = await Category.findOne({ major: major });

        if(!category) {
            throw new Error(`존재하지 않는 카테고리입니다.`);
        }

        return category.minor;
    } catch (err) {
        throw new Error(`카테고리 조회에 실패했습니다. ${err.message}`);
    }
}

// major 카테고리 이름 수정 
const updateMajorName = async (major, newMajor) => {

    const modifyMajor = JSON.stringify(newMajor)
        .substring(10)
        .slice(0,-2);
    try {
        const category = await Category.findOneAndUpdate(
            {major},
            {$set: {major: modifyMajor}},
            {new: true}
        );
        return category;
    } catch (err) {
        throw new Error(`카테고리 이름 수정에 실패했습니다. ${err.message}`);
    }
};

const deleteMajorCategory = async (major) => {
    try {
        const deleteCategory = await Category.deleteOne({major});
        return deleteCategory;
    } catch (err) {
        throw new Error(`카테고리 삭제에 실패했습니다. ${err.message}`);
    }
};

const deleteMinorCategory = async (major, minor) => {
    try {
        const category = await Category.findOneAndUpdate(
            { major: major },
            { $pull: { minor: minor } },
            { new: true }
          );

        return category;
    } catch (err) {
        throw new Error(`카테고리 삭제에 실패했습니다. ${err.message}`);
    }
};

module.exports = { addCategory, findAll, findMajorCategory, findMinorCategory, updateMajorName, deleteMajorCategory, deleteMinorCategory};