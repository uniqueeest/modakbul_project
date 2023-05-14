import React from "react";
import { NavLink  } from 'react-router-dom';
import styled, {createGlobalStyle} from 'styled-components';

const Header = () => {
  return (
    <HeaderSection>
      <GlobalStyle />
      <CompanyName to="/">🏕️모닥불</CompanyName>
      <LinkTab>
        <HeaderLink to="/sign-up">회원가입</HeaderLink>
        <HeaderLink to="/login">로그인</HeaderLink>
        <HeaderLink to="/my-page">마이페이지</HeaderLink>
        <HeaderLink to="/cart">장바구니</HeaderLink>
      </LinkTab>
    </HeaderSection>
  );
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'KOTRA_BOLD-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.1/KOTRA_BOLD-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`

const HeaderSection = styled.section`
  display: flex;
  margin: 1rem 2rem;
  padding-bottom: 0.7rem;
  justify-content: space-between;

  border-bottom: 1.5px solid #DDDDDD;
`

const CompanyName = styled(NavLink)`
  margin-right: 1rem;
  text-decoration: none;
  color: black;
  font-size: 2rem;
  font-family: 'KOTRA_BOLD-Bold', sans-serif;
`
const LinkTab = styled.div`
  margin-top: 1rem;
`

const HeaderLink = styled(NavLink)`
  margin: 1rem;

  text-decoration: none;
  color: black;
  font-size: 1.3rem;
  font-family: 'KOTRA_BOLD-Bold', sans-serif;
  font-weight: 300;
`

export default Header;