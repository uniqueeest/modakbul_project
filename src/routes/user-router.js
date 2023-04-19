const {Router} = require("express");
const UserService = require("../service/user-service");
const userRouter = Router();

//회원가입 라우터
userRouter.post("/sign-up", async (req, res) => {
  const userInfo = req.body;
  
  try {
    await UserService.userSignUp(userInfo);
    res.status(200).send("회원가입이 완료되었습니다.");
  } catch(err) {
    console.log(err);
    res.status(500).send(`${err}`);
  }
});

//로그인 라우터
userRouter.post("/login", async (req, res) => {
  const loginInfo = req.body;

  try {
    const token = await UserService.userLogin(loginInfo);
    // 토큰이 쿠키에 담김. 이 쿠키를 사용해서 인증이 필요한 요청을 서버에 전송할 수 있음. 쿠키의 만료시간은 하루 (24시간)
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });
    res.status(200).json({loginSuccess: true});
  } catch(err) {
    console.log(err);
    res.status(400).send(`${err}`);
  }
});

module.exports = userRouter;
