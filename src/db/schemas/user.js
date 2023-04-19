const {Schema} = require("mongoose");

//유저정보
const UserSchema = new Schema ({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // 유저 정보를 반환할 때 비밀번호는 가져오지 않기 위함
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
  cart: {
    type: [String],
    default: [],
    required: false,
  }
}, {timestamps: true})

module.exports = UserSchema;