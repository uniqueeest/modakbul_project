const jwt = require("jsonwebtoken");

// 토큰 발급
const token = (payload) => {
  jwt.sign(payload, "secretKey", {expiresIn: "1d"}) // 하루 동안만 토큰이 유효하도록 설정
}

module.exports = token;
