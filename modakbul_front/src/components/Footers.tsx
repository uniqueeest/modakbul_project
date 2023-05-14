import React from "react";
import styled, {createGlobalStyle} from 'styled-components';

const Footer = () => {
  return (
    <FooterSection>
      <Copyright>
        Copyright © 2023. Team Modakbul. All rights reserved.
      </Copyright>
    </FooterSection>
  )
}

const FooterSection = styled.section`
  display: block;
  background-color: #198754;
  box-sizing: border-box;
`

const Copyright = styled.p`
  padding: 2rem;
  text-align: center;
  color: white;
`

export default Footer;