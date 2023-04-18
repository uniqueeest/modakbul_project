const { Schema } = require('mongoose');

const ProductSchema = new Schema ({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  }
});

module.exports = ProductSchema;