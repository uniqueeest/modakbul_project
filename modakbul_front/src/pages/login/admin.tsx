import React, {useState} from 'react';
import { useNavigate, NavLink  } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios";


const Login = () => {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPwd, setCheckPwd] = useState(true);
  

  //입력 여부 확인
  const emailValue = (e:any) => {
    setEmail(e.target.value);
  };

  const passwordValue = (e:any) => {
    setPassword(e.target.value);
  }

  const clickHandler = () => {
    const regex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
    if (email === "") {
      return setCheckEmail(false);
    } else if (!regex.test(email)) {
      return setCheckEmail(false);
    }

    if (password === "") {
      setCheckEmail(true);
      return setCheckPwd(false);
    }

    const data = {
      email,
      password,
    }

    //data 보내기
    // const apiUrl = `http://localhost:5000/api/users/login`;

    // axios({
    //   method: "post",
    //   url: apiUrl,
    //   data: data
    // })
    
    nav("/");
  };

	return (
		<LoginSection>
				<LoginHeader>Admin-WELCOME</LoginHeader>
        <LoginContainer>
				<form>
          <LoginLabel>Email address</LoginLabel>
          <LoginInput type="email" placeholder="modak@gmail.com" value={email} onChange={emailValue}/>
          <LoginLabel>password</LoginLabel>
          <LoginInput type="password" placeholder="******" value={password} onChange={passwordValue}/>
          <CheckValue>{!checkEmail ? "이메일을 다시 입력해주세요." : !checkPwd ? "비밀번호를 다시 입력해주세요.": ""}</CheckValue>
        </form>
			</LoginContainer>
      <LoginButton onClick={clickHandler}>Login</LoginButton>
		</LoginSection>
	);
}

export default Login;

const LoginSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const LoginContainer = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginHeader = styled.h2`
  text-align: center;
  font-family: "DM Sans", sans-serif;
  font-weight: 400;
  font-size: 3rem;
`;

const LoginLabel = styled.p`
  margin-left: 0.5rem;
  font-size: 1.2rem;
`

const LoginInput = styled.input`
  width: 30rem;
  font-size: 1rem;
  padding: 0.7rem;
  border-radius: 10px;
  border: 1px solid #B7B7B7;
`

const CheckValue = styled.p`
  margin-left: 0.7rem;
  color: red;
`

const LoginButton = styled.button`
  margin-top: 4rem;
  padding: 0.3rem;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  background-color: black;
  font-size: 1rem;
  color: white;
  border-radius: 7px;
  border: 1px solid black;

  width: 18rem;
  height: 2.3rem;

  text-align: center;
  cursor: pointer;

  &:hover{  
    background-color : #20262E;
  }
`;
