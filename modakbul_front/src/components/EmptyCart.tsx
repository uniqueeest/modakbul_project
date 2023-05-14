import React from "react";
import styled, {createGlobalStyle} from 'styled-components';
import {useNavigate} from 'react-router-dom';

const EmptyCart = () => {
  const nav = useNavigate();

  return (
    <CartSection>
      <GlobalStyle />
      <CartTitle>장바구니</CartTitle>
      <CartContainer>
        <CartDesc>장바구니에 담긴 상품이 없습니다.</CartDesc>
        <CartP>원하는 상품을 장바구니에 담아보세요.</CartP>
        <CartButton onClick={() => nav("/")}>주문하기</CartButton>
      </CartContainer>
    </CartSection>
  )
};

export default EmptyCart;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
`;


const CartSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
`

const CartTitle = styled.h2`
  font-family: "DM Sans", sans-serif;
  font-weight: 500;
  font-size: 2.6rem;
`

const CartContainer = styled.div`
  margin-bottom: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CartDesc = styled.h3`
  margin-bottom: 0;
  font-family: "DM Sans", sans-serif;
  font-weight: 600;
  font-size: 1.3rem;
`

const CartP = styled.p`
  margin-bottom: 2rem;
  font-family: "DM Sans", sans-serif;
  font-size: 1rem;
  color: #9BA4B5;
`

const CartButton = styled.button`
  padding: 0.3rem;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  background-color: white;
  font-size: 1rem;
  color: #146C94;
  border-radius: 7px;
  border: 1px solid #146C94;

  width: 7rem;
  height: 2.3rem;

  text-align: center;
  cursor: pointer;

  &:hover{  
    background-color : #146C94;
    color: white;
    transition: ease-in 0.2s;
  }
`