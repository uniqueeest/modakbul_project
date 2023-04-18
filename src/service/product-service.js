const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Product } = require("../db/models/user-model");

// 상품 추가
const addProduct = async(productInfo) => {
    try {
        // productInfo로 가져온 정보들을 구조 분해 할당
        const {
            name,
            price,
            category,
            description,
            summary,
            company,
            stock
        } = productInfo;

        // 상품 이름 중복 체크
        const nameDuplicate = await Product.findOne({name});

        if(nameDuplicate) {
            throw new Error("이미 등록된 상품입니다.");
        }

        // 제품 생성
        const newProduct = new Product ({
            name,
            price,
            category,
            description,
            summary,
            company,
            stock
        });

        // 상품 정보 저장
        const savedProduct = newProduct.save();

        return savedProduct;

    } catch(err) {
        throw new Error(`상품 등록에 실패했습니다. ${err}`);
    }
}



module.exports = {addProduct};