const ProductService = require('../service/product-service');

const createProduct = async(req, res, next) => {
  try {
    const productInfo = req.body;
    const imagePath = req.file.path;

    await ProductService.addProduct(productInfo, imagePath);

    res.status(200).send("상품이 등록되었습니다.");

  } catch(err) {
    next(err);
  }
};

const findAllProduct = async (req, res) => {
    try {
        const products = await ProductService.findAll();
        res.status(200).json({
            message: `모든 상품 조회 성공!`,
            products: products
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `서버 에러`});
    }
};

const findOneProduct = async(req, res) => {
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
};

const updateProduct = async (req, res) => {
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
};


const deleteProduct = async (req, res) => {
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
  };

const productController = {
    findAllProduct,
    findOneProduct,
    updateProduct,
    deleteProduct
};

module.exports = productController;