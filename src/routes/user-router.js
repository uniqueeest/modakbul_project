const {Router} = require("express");
const userRouter = Router();
const userController = require("../controller/user-controller");
const authMiddleware = require("../middlewares/login-required");

//회원가입 라우터
userRouter.post("/sign-up", userController.signUp);

//로그인 라우터
userRouter.post("/login", userController.userLogin);

// 유저 정보 확인
userRouter.get("/:userId", authMiddleware, userController.getUser);

//유저 정보 수정 (이거는 덮어씌우는 것이기 때문에 put 사용)
userRouter.put("/:userId", authMiddleware, userController.createUser);

//유저 데이터 삭제
userRouter.delete("/:userId", authMiddleware, userController.deleteUser);

module.exports = userRouter;
