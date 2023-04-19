const {Router} = require("express");
const UserService = require("../service/user-service");
const userRouter = Router();
const authMiddleware = require("../middlewares/login-required");

//회원가입 라우터
userRouter.post("/sign-up", async (req, res) => {
  const userInfo = req.body;
  
  try {
    await UserService.userSignUp(userInfo);
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
    const token = await UserService.userLogin(loginInfo);
    // 토큰이 쿠키에 담김. 이 쿠키를 사용해서 인증이 필요한 요청을 서버에 전송할 수 있음. 쿠키의 만료시간은 하루 (24시간)
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });
    res.status(200).json({
      loginSuccess: true,
      Token: token, //undefined 해결을 어떻게 해야하지?
    });
  } catch(err) {
    console.log(err);
    res.status(400).send(`${err}`);
  }
});

// 토큰이 정상으로 작동되는지 확인
userRouter.get("/auth", authMiddleware);

// 유저 정보 확인
userRouter.get("/user", async (req, res, next) => {
  try {
    const {email} = req.body;
    const userInfo = await UserService.checkUserData(email);

    //현재는 유저 정보에서 패스워드를 제외한 전체 정보가 보임

    res.status(200).json(userInfo);
  } catch(err) {
    next(err);
  }

});

//유저 정보 수정
userRouter.patch("/:id", async(req, res, next) => {
  try {
    const {id} = req.params;
    const updateData = req.body;
    await UserService.setUser(id, updateData);

    res.status(200).json("유저 정보가 수정되었습니다.");
  } catch(err) {
    next(err);
  }
})

//유저 데이터 삭제
userRouter.delete("/:id", async(req, res, next) => {
  try{
    const {id} = req.params;
    await UserService.deleteUser(id);

    res.status(200).send("회원탈퇴가 완료되었습니다!");
  } catch(err) {
    next(err);
  }

})

module.exports = userRouter;
