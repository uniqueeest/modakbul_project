const { PostOrder } = require('../db/models/postorder-model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const presentCart = require('./cart-service');

//주문 진행 페이지 구현
const postOrder = async(orderData) => {
}

module.exports = { postOrder }