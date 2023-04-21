const { Product } = require("../db/models/product-model");

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// const upload = require('../routes/product-router');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = uuidv4() + ext;
    cb(null, filename);
  },
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 20 * 1024 * 1024,},
    fileFilter: function (req, file, cb) {
      if (
        file.mimetype !== 'image/png' &&
        file.mimetype !== 'image/jpg' &&
        file.mimetype !== 'image/jpeg'
      ) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
  }); 

// 상품 추가
const addProduct = async (productInfo) => {
  try {
    // productInfo로 가져온 정보들을 구조 분해 할당
    const {
      name,
      price,
      category,
      description,
      summary,
      company,
      stock,
    } = productInfo;

    // 상품 이름 중복 체크
    const nameDuplicate = await Product.findOne({ name });

    if (nameDuplicate) {
      throw new Error('이미 등록된 상품입니다.');
    }

    // 이미지 파일을 업로드합니다.
    await upload.single('img')(productInfo.req, productInfo.res);
    
    // 이미지 파일의 경로를 생성합니다.
    const imagePath = path.join(
      'public/images',
      productInfo.req.file.filename
    );

    // 제품 생성
    const newProduct = new Product({
      name,
      price,
      category,
      description,
      summary,
      company,
      stock,
      img: imagePath,
    });

    // 상품 정보 저장
    const savedProduct = await newProduct.save();

    return savedProduct;
  } catch (err) {
    throw new Error(`상품 등록에 실패했습니다. ${err}`);
  }
};

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

        if(!product) {
            throw new Error(`존재하지 않는 상품입니다.`);
        }

        return product;
    } catch (err) {
        throw new Error(`상품 조회 실패: ${err.message}`);
    }
};

// 특정 상품정보 수정
// productId = db에서 제공하는 ObjectId 
// 몽고db에서 제공하는 findByIdAndUpdate 메서드를 사용, 첫번째 인자 = ObjectId, 
const updateProduct = async (productId, productInfo) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, productInfo, {new: true});

        return updatedProduct;
    } catch (err) {
        throw new Error(`상품 수정 실패: ${err.message}`);
    }
}

//특정 상품정보 삭제
const deleteProduct = async (name) => {
    try {
        // Buffer.from 메서드를 사용하여 name매개변수를 UTF-8 인코딩 버퍼로 인코딩 즉, 한글을 삭제하려면 인코딩해줘야함
        const encodedName = Buffer.from(name,'utf-8');
        const product = await Product.deleteOne({name: encodedName});

        if(!product) {
            throw new Error(`삭제할 상품이 없습니다.`);
        }

        return product;
    } catch (err) {
        throw new Error(`상품 삭제 실패: ${err.message}`);
    }
}

module.exports = {addProduct, findAll, updateProduct, findProductByName, deleteProduct, upload};