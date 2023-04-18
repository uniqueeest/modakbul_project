const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../db/models/user-model");

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
    const hassedPassword = await bcrypt.hash(password, 10);

    //사용자 생성
    const newUser = new User ({
      email,
      fullName,
      password: hassedPassword, //해시된 패스워드 사용
      phoneNumber,
      address,
    })

    //사용자 정보 저장
    const savedUser = newUser.save();

    return savedUser;
    
  } catch(err) {
    throw new Error(`회원가입에 실패했습니다. ${err}`);
  }
}

module.exports = {userSignUp};
