import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled, {createGlobalStyle} from 'styled-components';
import Post from '../../components/Post';
import axios from "axios";

const SignUp = () => {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const nameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const emailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const passwordValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const rePasswordValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePassword(e.target.value);
  }

  const phoneNumberValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  }


  const clickHandler = () => {
    const nameRegex = /^[가-힣]{2,4}$/;
    const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
    const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
   
    if (!nameRegex.test(name)) {
      return alert("이름을 다시 확인해주세요. 한글로 2 ~ 4자 까지 입력 가능합니다.");
    }
    if (!emailRegex.test(email)) {
      return alert("이메일 형식이 올바르지 않습니다.");
    }
    if(password === "") {
      return alert("비밀번호를 입력해주세요.")
    }
    if(rePassword === "") {
      return alert("비밀번호 확인을 입력해주세요.")
    }
    if(password !== rePassword) {
      return alert("비밀번호가 일치하지 않습니다.")
    }
    if (!phoneRegex.test(phoneNumber)) {
      return alert(
        "휴대전화 번호를 다시 확인해주세요. 000-0000-0000 형식으로 입력해주세요."
      );
    }

    alert("회원가입이 완료되었습니다!")
    nav("/");
  };

 

  return (
    <SignUpSection>
      <SignUpContainer>
        <GlobalStyle />
        <SignUpLabel >이름</SignUpLabel>
        <SignUpInput value={name} onChange={nameValue}/>
        <SignUpLabel>E-mail</SignUpLabel>
        <SignUpInput value={email} onChange={emailValue}/>
        <SignUpLabel>비밀번호</SignUpLabel>
        <SignUpInput type='password' value={password} onChange={passwordValue}/>
        <SignUpLabel>비밀번호 확인</SignUpLabel>
        <SignUpInput type='password' value={rePassword} onChange={rePasswordValue}/>
        <SignUpLabel>휴대폰 번호</SignUpLabel>
        <SignUpInput value={phoneNumber} onChange={phoneNumberValue}/>
        <AddressLabel>주소</AddressLabel>
        <Post />
        <SignUpButton onClick={clickHandler}>회원가입</SignUpButton>
      </SignUpContainer>
    </SignUpSection>
  )
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
`;

const SignUpSection = styled.section`
  margin-top: 3rem;
  margin-bottom: 10rem;
  display: flex;
  justify-content: center;
`

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25rem;
`
const SignUpLabel = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  color: #B7B7B7;
`

const AddressLabel = styled.p`
  margin-bottom: 0;
  font-family: 'Noto Sans KR', sans-serif;
  color: #B7B7B7;
`

const SignUpInput = styled.input`
  height: 2rem;
  font-size: 16px;
  color: black;
  border-radius: 7px;
  border: 1px solid #B7B7B7;;
`
const SignUpButton = styled.button`
  margin-top: 3rem;
  padding: 0.3rem;
  align-self: center;

  text-decoration: none;
  background-color: black;
  font-size: 1rem;
  color: white;
  border-radius: 7px;
  border: 1px solid black;

  width: 12rem;
  height: 2.3rem;

  text-align: center;
  cursor: pointer;

  &:hover{  
    background-color : #20262E;
    transition: ease-in 0.2s;
  }
`

export default SignUp;