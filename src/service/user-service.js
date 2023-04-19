const bcrypt = require("bcrypt");
const {User} = require("../db/models/user-model");
const jwt = require("jsonwebtoken");



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
  const token = jwt.sign({
    email: user.email,
    password: user.password,
  }, 
  "jwt-secret",
  {expiresIn: "1h"} );

  return token;
};

//로그아웃
const userLogout = async () => {
  return; // 아직 미 구현
}

//유저 정보 확인
const checkUserData = async (userEmail) => {
  const user = await User.findOne({Email: userEmail});

  //유저가 존재하지 않을 경우
  if (!user) {
    throw new Error("가입 내역이 없습니다.");
  }

  return user;
}

//유저 정보 수정
const setUser = async (userId, updateData) => {
  try {
    const newData = {};
    if (updateData.phoneNumber) {
      newData.phoneNumber = updateData.phoneNumber;
    }
    if (updateData.address) {
      newData.address = updateData.address;
    }
    if (updateData.password) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10)
      newData.password = hashedPassword;
    }

    await User.findByIdAndUpdate({_id: userId}, newData);
    
  } catch(err) {
    throw err;
  } 
}

//유저 데이터 삭제
const deleteUser = async (userId) => {
  try {
    await User.deleteOne({_id: userId});
  } catch(err) {
    throw err;
  }
}

module.exports = {userSignUp, userLogin, checkUserData, setUser, deleteUser};
