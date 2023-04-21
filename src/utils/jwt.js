const jwt = require("jsonwebtoken");

// 토큰 발급
const token = (payload) => {
  jwt.sign(payload, "secretKey") // 제한된 시간 동안만 토큰을 유효하게 할 것인지 생각해야 할 듯
}

module.exports = token;
