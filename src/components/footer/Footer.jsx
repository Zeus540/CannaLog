import React, { useContext, useState,useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn,selectUser } from "../../features";


const Root = styled.div`
box-shadow:  0px 0px 20px #00000012;
position: relative;
margin: 0px;
background:  ${props => props.theme.nav.primary};
color: ${props => props.theme.text};
    padding: 0px 0px;
    box-shadow:  0px 0px 20px #00000012;

  @media (max-width: 425px) {
    margin: 0px 0px;
    margin-top: 0px;
    padding-bottom: 0px;
  }
`;


const Inner = styled.div`

border-radius: 5px;

padding: 20px;
max-width: 1920px;
margin: 0 auto;

`;
const LegalText = styled.p`
margin: 5px 0px;
text-align: end;
margin-bottom: 0px;
`;

const MenuLinkMobileHeading = styled.h3`
margin: 5px 0px;

width: fit-content;
`;
const MenuLinkMobile = styled(NavLink)`

  padding: 5px 0px;

  text-align: center;
  color: ${props => props.theme.text};
  text-decoration: none;
  background:transparent
  display: block;
  width: fit-content;


`;

const FlexLink = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const SectionHolder = styled.div`
display: flex;
@media (max-width: 768px) {
  flex-wrap: wrap;
}
`;

const Section = styled.div`
width: calc(100% /3);
padding: 10px 0px;
@media (max-width: 768px) {
  width: calc(100% /1);
  padding: 10px 0px;
}
`;



const Footer = () => {


  const isLoggedIn = useSelector(selectIsLoggedIn)
const user = useSelector(selectUser)
  return (
    <Root>
        <Inner>
        <SectionHolder>      
    <Section>
    {/* <MenuLinkMobileHeading>Links</MenuLinkMobileHeading> */}
  

                   {isLoggedIn && 
                   
                   <>
                      <MenuLinkMobile to="/my-environments" >
                     <FlexLink>
                     
                      My Environments
                     </FlexLink>
                   </MenuLinkMobile>
                   <MenuLinkMobile to="/my-plants" >
                     <FlexLink>
                     
                      My Plants
                     </FlexLink>
                   </MenuLinkMobile>
                   {/* <MenuLinkMobile to="/my-devices" >
                     <FlexLink>
                     
                      My Devices
                     </FlexLink>
                   </MenuLinkMobile> */}
                   <MenuLinkMobile to="/growers" >
                     <FlexLink>
                     
                      Growers
                     </FlexLink>
                   </MenuLinkMobile>
                   </>
                   }
                         <MenuLinkMobile to="/" >
                     <FlexLink>
                     
                       Public Plants
                     </FlexLink>
                   </MenuLinkMobile>
      </Section>

      <Section>
    {/* <MenuLinkMobileHeading>Legal</MenuLinkMobileHeading> */}
    
        <MenuLinkMobile to="/terms" >
                     <FlexLink>
                     
                       Terms & Conditions
                     </FlexLink>
                   </MenuLinkMobile>

                   <MenuLinkMobile to="/privacy-policy" >
                     <FlexLink>
                     
                       Privacy Policy
                     </FlexLink>
                   </MenuLinkMobile>

                   <MenuLinkMobile to="/cookie-policy" >
                     <FlexLink>
                     
                       Cookie Policy
                     </FlexLink>
                   </MenuLinkMobile>

                   {/* <MenuLinkMobile to="/cookie-policy" >
                     <FlexLink>
                     
                       Popi
                     </FlexLink>
                   </MenuLinkMobile> */}
      </Section>
      
  
      </SectionHolder>     
        <LegalText>&copy; {new Date().getFullYear()} Copyright - CANNALOG 	&#174;</LegalText>
    </Inner>
    </Root>
  )
}

export default Footer