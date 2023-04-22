const {Router} = require("express");
const userService = require("../service/user-service");
const userRouter = Router();
const authMiddleware = require("../middlewares/login-required");

//회원가입 라우터
userRouter.post("/sign-up", async (req, res) => {
  const userInfo = req.body;
  
  try {
    await userService.userSignUp(userInfo);
    res.status(201).send("회원가입이 완료되었습니다.");
  } catch(err) {
    console.log(err);
    res.status(500).send(`${err}`);
  }
});

//로그인 라우터
userRouter.post("/login", async (req, res) => {
  const loginInfo = req.body;

  try {
    const token = await userService.userLogin(loginInfo);
    // 토큰이 쿠키에 담김. 이 쿠키를 사용해서 인증이 필요한 요청을 서버에 전송할 수 있음. 쿠키의 만료시간은 1시간
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
      secure: true,
    });
    res.status(200).json({
      loginSuccess: true,
      Token: token, // 개발 test 용 임시 토큰
    });
  } catch(err) {
    console.log(err);
    res.status(400).send(`${err}`);
  }
});

// 유저 정보 확인
userRouter.get("/:userId", authMiddleware, async (req, res, next) => {
  try {
    const {userId} = req.params;

    const userInfo = await userService.checkUserData(userId);

    res.status(200).json(userInfo);
  } catch(err) {
    next(err);
  }

});

//유저 정보 수정 (이거는 덮어씌우는 것이기 때문에 put 사용)
userRouter.put("/:userId", authMiddleware, async (req, res, next) => {
  try {
    const {userId} = req.params;
    const { password, phoneNumber, address } = req.body;

    // password, phoneNumber, address 중 값이 하나라도 들어왔는지 확인
    if (!password && !phoneNumber && !address) {
      return res.status(400).json({
        message: "변경할 정보가 입력되지 않았습니다.",
      });
    }

    // 새 정보와 함께 updateUser 함수 호출
    await userService.updateUser(userId, req.body.currentPassword, {
      password,
      phoneNumber,
      address,
    });

    return res.status(200).json({
      message: "사용자 정보가 수정되었습니다.",
    });
  } catch (error) {
    next(error);
  }
});

//유저 데이터 삭제
userRouter.delete("/:userId", authMiddleware, async(req, res, next) => {
  try{
    const {userId} = req.params;
    await userService.deleteUser(userId);

    res.status(200).send("회원탈퇴가 완료되었습니다!");
  } catch(err) {
    next(err);
  }

})

module.exports = userRouter;
