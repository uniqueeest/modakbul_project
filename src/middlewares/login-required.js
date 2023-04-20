const jwt = require("jsonwebtoken");

//jwt 검증 미들웨어
const authMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.query.token;

  //토큰이 존재하지 않을 때
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "권한이 없습니다."
    })
  }

  //토큰의 유효성 확인
  const validToken = new Promise (
    (resolve, reject) => {
      jwt.verify(token, req.app.get("jwt-secret"), (err, decode) => {
        if (err){
          reject(err);
        }
        resolve(decode);
      })
    }
  )

  // 토큰이 유효할 경우
  const respond = (token) => {
    res.json({
      success: true,
      info: token
    });
  };

  // 토큰이 유효하지 않을 경우
  const onError = (err) => {
    res.status(403).json({
      success: false,
      message: err.message
    });
  };

  validToken.then(respond).catch(onError);
}


module.exports = authMiddleware;