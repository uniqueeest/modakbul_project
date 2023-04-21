const mongoose = require('mongoose');
const CartSchema = require('../schemas/cart');

//Cart 모델 생성
exports.Cart = mongoose.model('Cart', CartSchema);