const bcrypt = require("bcrypt");
const {User} = require("../db/models/user-model");
const getToken = require("../utils/jwt");

//회원가입 
const userSignUp = async (userInfo) => {
  try {
    // userInfo로 가져온 정보들을 구조분해할당
    const {email, fullName, password, phoneNumber, address} = userInfo;

    // 이메일 중복 검사
    const emailDuplicate = await User.findOne({email});

    if (emailDuplicate) {
      throw new Error("이미 등록된 이메일입니다.");
    }

    //비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    //사용자 생성
    const newUser = new User ({
      email,
      fullName,
      password: hashedPassword, //해시된 패스워드 사용
      phoneNumber,
      address,
    })

    //사용자 정보 저장
    const savedUser = newUser.save();

    return savedUser;
    
  } catch(err) {
    throw new Error(`회원가입에 실패했습니다. ${err}`);
  }
};

//로그인
const userLogin = async (loginInfo) => {
  const {email, password} = loginInfo;
  
  const user = await User.findOne({email});
  
  //이메일 일치 여부
  if (!user) {
    throw new Error ("이메일 또는 패스워드가 일치하지 않습니다.");
  }

  const userPassword = await bcrypt.compare(password, user.password);

  //비밀번호 일치 여부
  if (!userPassword) {
    throw new Error ("이메일 또는 패스워드가 일치하지 않습니다.");
  }

  //로그인 성공 후 토큰 생성
  const token = getToken({userId: user._id});

  return token;
};

module.exports = {userSignUp, userLogin};
