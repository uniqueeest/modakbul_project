import React, {useState} from 'react';
import { useNavigate, NavLink  } from 'react-router-dom';
import styled, {createGlobalStyle} from 'styled-components';
import axios from "axios";

const MyPage = () => {
  return (
    <MyPageSection>
    <GlobalStyle />
    <MyPageHeader>MY PAGE</MyPageHeader>
    <MyPageContainer>
      <MainItem to="/">
        <MainItemTitle>주문내역조회</MainItemTitle>
        <MainItemDesc>주문내역을 확인하실 수 있습니다.</MainItemDesc>
      </MainItem>
      <MainItem to="/my-info">
        <MainItemTitle>회원 정보</MainItemTitle>
        <MainItemDesc>고객님의 개인정보를 수정할 수 있습니다.</MainItemDesc>
      </MainItem>
      <MainItem to="/">
        <MainItemTitle>장바구니</MainItemTitle>
        <MainItemDesc>장바구니에 담은 내역을 확인하실 수 있습니다.</MainItemDesc>
      </MainItem>
    </MyPageContainer>
  </MyPageSection>
  )

}

export default MyPage;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
`;

const MyPageSection = styled.section`
  display: flex;
  flex-direction: column;
`

const MyPageHeader = styled.h2`
  margin: 4rem auto 7rem;

  align-self: center;
  font-family: "DM Sans", sans-serif;
  font-weight: 400;
  font-size: 3rem;
`

const MyPageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 18rem;
`

const MainItem = styled(NavLink)`
  box-sizing: border-box;
  margin: 3rem 1rem;
  padding: 30px 50px 50px;
  width: 20rem;

  border-radius: 7px;
  border: 2px solid #9BA4B5;

  text-decoration: none;
  font-family: 'Noto Sans KR', sans-serif;
  color: black;

  &:hover {
    background-color : #20262E;
    color: white;
    transition: ease-in 0.2s;
    border: 2px solid #20262E;
  }
`

const MainItemTitle = styled.h3`
  margin-top: 2rem;
  font-size: 1.7rem;
  
`

const MainItemDesc = styled.p`
`