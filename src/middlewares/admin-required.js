const {User} = require("../db/models/user-model");

//admin 검증 
const adminMiddleware = async(req, res, next) => {
  try {
    const {_id} = req.body;
    const admin = await User.findById({_id});

    //관리자인지 확인
    if (admin.role !== "admin") {
      throw new Error("접근 권한이 없습니다.");
    }
    next();
  } catch(err) {
    next(err);
  }
}

module.exports = adminMiddleware;