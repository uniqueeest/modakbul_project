const mongoose = require('mongoose');
const CategorySchema = require('../schemas/category');

exports.Category = mongoose.model('Category', CategorySchema);