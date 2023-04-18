const { Schema } = require('mongoose');
const shortId = require('./types/short-id');

// 순서대로 id(shortId), 상품명, 가격, 카테고리, 설명, 요약, 회사, 재고

const ProductSchema = new Schema ({
  shortId,
  //이름
  name: {
    type: String,
    required: true,
    unique: true
  },
  //가격
  price: {
    type: Number,
    required: true,
  },
  //카테고리
  category: {
    type: String,
    required: true,
  },
  //설명
  description: { 
    type: String,
    required: true,
  },
  //요약
  summary: {
    type: String,
    required: true,
  },
  //회사
  company: {
    type: String,
    required: true,
  },
  //재고
  stock: {
    type: Number,
    required: true,
  }
});

module.exports = ProductSchema;