const {Router} = require("express");
const UserService = require("../service/user-service");
const userRouter = Router();

//회원가입 라우터
userRouter.post("/api/sign-up", async (req, res) => {
  const userInfo = req.body;
  
  try {
    await UserService.userSignUp(userInfo);
    res.status(200).send("회원가입이 완료되었습니다.");
  } catch(err) {
    console.log(err);
    res.status(500).send(`${err}`);
  }
})

module.exports = userRouter;