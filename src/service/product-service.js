const { Product } = require("../db/models/product-model");
const axios = require('axios')

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

// 모든 상품 정보 조회
const findAll = async () => {
    try {
        
        const products = await Product.find({});

        return products;
    }
    catch (err) {
        throw new Error(`상품 조회에 실패했습니다. ${err.message}`);
    }
};

// 특정 상품 조회
const findProductByName = async (name) => {
    try {
        
        const product = await Product.findOne({name: name});

        return product;
    } catch (err) {
        throw new Error(`상품 조회 실패: ${err.message}`);
    }
};

// 특정 상품정보 수정
const updateProduct = async (productId, productInfo) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, productInfo, {new: true});

        return updatedProduct;
    } catch (err) {
        throw new Error(`상품 수정 실패: ${err.message}`);
    }
}

module.exports = {addProduct, findAll, updateProduct, findProductByName};