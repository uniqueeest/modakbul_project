import React, {useState} from 'react';
import { useNavigate, NavLink  } from 'react-router-dom';
import styled, {createGlobalStyle} from 'styled-components';
import axios from "axios";

const MyInfo = () => {
  return (
    <MyInfoSection>
      <GlobalStyle />
      <MyInfoTitle>회원 정보 수정</MyInfoTitle>
      <MyInfoContainer>
        <MyInfoLabel>이름</MyInfoLabel>
        <MyInfoInput />
        <MyInfoLabel>이메일</MyInfoLabel>
        <MyInfoInput />
        <MyInfoLabel>현재 비밀번호</MyInfoLabel>
        <MyInfoInput type='password' />
        <MyInfoLabel>새 비밀번호</MyInfoLabel>
        <MyInfoInput type='password' />
        <MyInfoLabel>전화번호</MyInfoLabel>
        <MyInfoInput />
        <MyInfoLabel>주소</MyInfoLabel>
        <MyInfoInput />
      </MyInfoContainer> 
      <ButtonContainer>
        <PutButton>회원 정보 수정</PutButton>
        <DeleteButton>회원 탈퇴</DeleteButton>
      </ButtonContainer>
    </MyInfoSection>
  )
}

export default MyInfo;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
`;

const MyInfoSection = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const MyInfoTitle = styled.h2`
  align-self: center;
  margin: 3rem auto;

  font-family: "DM Sans", sans-serif;
  font-weight: 700;
  font-size: 2rem;
`

const MyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 3rem;

  width: 25rem;
`
const MyInfoLabel = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  color: black;
`

const MyInfoInput = styled.input`
  height: 2rem;
  font-size: 16px;
  color: black;
  border-radius: 7px;
  border: 1px solid #B7B7B7;;
`

const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: 10rem;
`

const PutButton = styled.button`
  margin: 1rem;
  padding: 0.3rem;

  background-color: black;
  font-size: 1rem;
  color: white;
  border-radius: 7px;
  border: 1px solid black;

  width: 9rem;
  height: 2.3rem;

  text-align: center;
  cursor: pointer;

  &:hover{  
    background-color : #20262E;
    transition: ease-in 0.2s;
  }
`

const DeleteButton = styled.button`
  margin: 1rem;
  padding: 0.3rem;

  background-color: white;
  font-size: 1rem;
  color: black;
  border-radius: 7px;
  border: 1px solid black;

  width: 9rem;
  height: 2.3rem;

  text-align: center;
  cursor: pointer;

  &:hover{  
    background-color : #20262E;
    color: white;
    transition: ease-in 0.2s;
  }
`