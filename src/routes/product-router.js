const { Router } = require('express');
const ProductService = require('../service/product-service');
const productRouter = Router();

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// // 폴더가 없는지 확인 후 없으면 생성하는 코드
// try {
//   fs.readdirSync("upload");
// } catch (err) {
//   console.error("upload 폴더가 없습니다. 폴더를 생성합니다.");
//   fs.mkdirSync("upload");
// }

// 이미지 업로드를 위한 multer 미들웨어 생성
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


// 상품 등록
productRouter.post('/add', upload.single("img"), async (req, res) => {
    try {
        console.log(req);
        const product = await ProductService.addProduct({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            summary: req.body.summary,
            company: req.body.company,
            stock: req.body.stock,
            req: req,
            res: res,
        });
        res.status(200).json({
            message: '상품 추가 성공!',
            products: product
          });
        
    } catch (err) {
        console.log(err);
        res.status(400).send(`${err}`);
    }
});

//모든 상품 정보 조회
productRouter.get('/', async (req, res) => {
    try {
        const products = await ProductService.findAll();
        res.status(200).json({
            message: `상품 조회 성공!`,
            products: products
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `서버 에러`});
    }
});

// 특정 상품 정보 조회
productRouter.get('/:name', async(req, res) => {
    const name = req.params.name;

    try {
        const product = await ProductService.findProductByName(name);

        res.status(200).json({
            message: `특정 상품 조회 성공!`,
            product: product
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `서버 에러`});
    }
});


//특정 상품 정보 수정
productRouter.patch('/:productId', async (req, res) => {
    const { productId } = req.params;
    const productInfo = req.body;
  
    try {
      const updatedProduct = await ProductService.updateProduct(productId, productInfo);
  
      if (!updatedProduct) {
        return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
      }
  
      res.status(200).json({
        message: '상품 수정 성공!',
        product: updatedProduct
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: '서버 에러' });
    }
  });

  //특정 상품 삭제
  productRouter.delete('/:name', async (req, res) => {
    const name = req.params.name;

    try {
        const product = await ProductService.deleteProduct(name);

        res.status(200).json({
            message: `특정 상품 ${name} 삭제 성공!`,
            product: product
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `서버 에러`});
    } 
  });

module.exports = productRouter;

