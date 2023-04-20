const jwt = require("jsonwebtoken");

//jwt 검증 미들웨어
const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token;

  //토큰이 존재하지 않을 때
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "권한이 없습니다."
    })
  }

  try {

    const decodedToken = jwt.verify(token, "jwt-secret");

    req.params = {
      email: decodedToken.email
    };
    next();
  } catch(err) {
    return next(err);
  }

}


module.exports = authMiddleware;