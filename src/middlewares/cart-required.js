const jwt = require('jsonwebtoken');

const cartJwt = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; //"Bearer 토큰 값"에서 토큰 값만 추출
        console.log(req.headers);
        if(!token) throw new Error('인증 토큰이 존재하지 않습니다.');

        //토큰을 검증하고 검증된 정보를 req.user에 담아서 다음 미들웨어에 전달
        const decoded = jwt.verify(token, "jwt-secret");
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: err.message});
    }
}

module.exports = cartJwt;