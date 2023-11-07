import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { Heading } from "../../utils/global_styles";
import {AiOutlineInstagram,AiOutlineFacebook} from 'react-icons/ai'

const Root = styled.div`
position: relative;
margin: 0px;
background:  ${props => props.theme.footer.primary};
color: ${props => props.theme.text};
    padding: 0px 0px;

  @media (max-width: 425px) {
    margin: 0px 0px;
    margin-top: 0px;
    padding-bottom: 0px;
  }
`;


const Inner = styled.div`

border-radius: 5px;

padding: 20px 15px;
max-width: 1920px;
margin: 0 auto;

`;
const LegalText = styled.p`
margin: 5px 0px;
// text-align: center;
margin-bottom: 0px;
span{
  color:  ${props => props.theme.text};
  font-family: baloonB!important;
  sub{
    color:  ${props => props.theme.footer.accent};
  }
}
`;

const MenuLinkMobile = styled(Link)`

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
  padding: 5px 0px;
`;

const SectionHolder = styled.div`
display: flex;
@media (max-width: 768px) {
  flex-wrap: wrap;
}
`;

const Section = styled.div`
width: calc(100% /3);
margin: 20px 0px;
svg{
  font-size:35px;

  margin: 5px 0px;
  margin-right:5px;
}
@media (max-width: 768px) {
  width: calc(100% /1);

}
`;

const ImgSection = styled.div`
width: 150px;
padding: 20px 0px;
// margin: 0 auto;
padding-bottom: 0px;
`;



const Footer = ({isLoggedIn}) => {




  return (
    <Root>
        <Inner>
        <SectionHolder> 
      
        <Section>
      
      <ImgSection>
            <img src={Logo} width="100%" />
          </ImgSection>
          <LegalText><span><sub>CANNA</sub>LOG</span> &#174; - &copy; Copyright 2023  	</LegalText>
      </Section> 
  

    <Section>
    <Heading>Useful Links</Heading>

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
                   <MenuLinkMobile to="/growers" >
                     <FlexLink>
                     
                      Growers
                     </FlexLink>
                   </MenuLinkMobile>

                   <MenuLinkMobile to="/" >
                     <FlexLink>
                     
                       Public Plants
                     </FlexLink>
                     </MenuLinkMobile>
                   </>

                   
                   }
                   {!isLoggedIn && 
                   
                   <>
                       <MenuLinkMobile to="/public-plants" >
                     <FlexLink>
                     
                       Public Plants
                     </FlexLink>
                     </MenuLinkMobile>
                   </>}
                    
                  
      </Section>

      <Section>

<Heading>Legal</Heading>

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

      </Section>

      <Section>
      <Heading>Socials</Heading>

<AiOutlineInstagram/>

<AiOutlineFacebook/>

        </Section>
     
 
      </SectionHolder>     
     
    </Inner>
    </Root>
  )
}

export default Footer