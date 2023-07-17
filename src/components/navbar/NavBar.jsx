import React, { useContext, useState } from "react";
import styled from "styled-components";
import Logo from "../../assets/images/logo.png";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn,selectUser } from "../../features";



const Root = styled.div`

position: sticky;
    top: 0;
    z-index:50;
    box-shadow:  0px 0px 20px #00000012;
    background:  ${props => props.theme.primary};
  @media (max-width: 425px) {
    margin: 0px 0px;
    margin-top: 0px;
    padding-bottom: 0px;
  }
`;

const Inner = styled.div`
height: 60px;
margin: 0px auto;
max-width: 1920px;

  display: flex;
  align-items: center;
  justify-content: space-between;
 
  @media (max-width: 768px) {
   
  }
`;



const Empty = styled.div`
width: calc(30px + 5px);
@media (min-width: 768px) {
  display: none;
}
`;



const LogoHolder = styled.div`
  width: 140px;
  text-transform: uppercase;
h1{
  color:${props => props.theme.text};
  text-align:center;
  font-size: 25px;
  span{
    color:${props => props.theme.accent};
    text-align:center;
    font-family: baloonB!important;
  }
}


  @media (max-width: 767px) {
    margin-left:0px;
   
    font-size: 20px;
  }
`;
const Img = styled.img`

`;


const Div = styled.div`
width: calc(100% / 3);

`;
const DivMenu = styled.div`
width: calc(100% / 3 );
padding-left: 20px;
@media (min-width: 1920px) {
  padding-left: 0px;
}
`;

const LogoHolderText = styled.span`

font-size: 12px;
margin-top: -14px;
display: block;
text-align: end;
padding-bottom: 3px;
color: ${props => props.theme.text};
`;

const LinkHolder = styled.div`
  display: flex;

  align-items: center;
  justify-content: end;
  @media (min-width: 0px) and (max-width: 767px) {
    display: none;
  }
`;
const LinkHolderMobile = styled.div`
  display: flex;
  position: fixed;

  background: linear-gradient(90deg, ${props => props.theme.drawer.primary}, ${props => props.theme.drawer.secondary});
  left: 0;
  min-width: 200px;

  bottom:0px;
  flex-direction: column;
  transition: 0.5s all ease;
  transform: ${(props) => !props.mobileMenu ? "translateX(-101%)" : "translateX(0%)"};
  justify-content: space-between;
  min-height:calc(100vh - 56px) ;
  z-index: 50;
  box-shadow:  0px 0px 20px #00000012;
  @media (min-width: 0px) and (max-width: 767px) {
    min-width: 50%;
  }
`;
const MenuLink = styled(NavLink)`
  margin: 0px 0px;
  padding: 16px 10px;
  color: ${props => props.theme.text};

  align-items: center;
  text-decoration: none;
  display: flex;
 

`;

const MenuLinkTop = styled(NavLink)`
  margin: 0px 0px;
  padding: 0px 10px;


  align-items: center;
  text-decoration: none;
  display: flex;
 

`;

const Svg = styled.svg`
width:20px;
margin-right:10px;
fill: ${props => props.theme.primary};
`;
const MenuLinkActive = styled(NavLink)`
  margin: 0px 0px;
  padding: 16px 30px;
  border-top: 4px solid transparent;
  border-bottom: 4px solid #8bab50;
  color: ${props => props.theme.text};
  text-decoration: none;


`;
const MenuLinkMobile = styled(NavLink)`
  margin: 0px 0px;
  padding: 15px 15px;
  text-align: center;

  text-decoration: none;
  background:transparent


  &:hover {
    border-bottom: 4px solid #8bab50;
  }

`;
const MenuLinklogo = styled(NavLink)`
  margin: 0px 0px;
  text-decoration: none!important;
  display: flex;
  justify-content: center;
`;

const LogOut = styled.p`
  margin: 0px 0px;
  padding: 30px 30px;
  border-bottom: 2px solid transparent;
  color: ${props => props.theme.text};
  &:hover {
    border-bottom: 2px solid #354f41;
  }
`;
const Button = styled.button`
padding: 20px 20px;
display: flex;
width: fit-content;
border: none;
background: #8bab50;
color: ${props => props.theme.text};

cursor: pointer;


@media (min-width: 0px) and (max-width: 767px) {
  margin: 10px;
  display:none
}
`;
const ButtonM = styled.button`

width: fit-content;
border: none;
background: #F44336;
color: ${props => props.theme.text};
padding: 15px;
cursor: pointer;

display: flex;
@media (min-width: 768px){
  
  display:block
}
`;
const BurgerMenuHolder = styled.div`
cursor: pointer;

`;

const BurgerMenu = styled.div`
display: flex;
`;

const FlexLink = styled.div`
  display: flex;
  align-items: center;

`;
const FlexLinkText = styled.p`
 
color: ${props => props.theme.text};
`;
const Pattie = styled.div`
  width: 20px;
  min-height: 2px;
  background: #fefefe;
  margin: 5px  0px;
`;

const LinkHolderM = styled.div`
display: flex;
flex-direction: column;
`;
const LinkHolderMLogin = styled.div`
display: flex;
flex-direction: column;
@media (min-width: 768px){
  
  display:none
}
`;

const UserInfoHolder = styled.div`
display: flex;
justify-content: space-between;


`;

const UserInfo = styled.div`
display: flex;
color: ${props => props.theme.text};
padding: 0px 10px;
align-items: center;
`;

const UserInfoTop = styled.div`
display: flex;

padding: 0px 10px;
align-items: center;
`;

const UserAvatar = styled.p`
width: 15px;
height: 15px;
color: ${props => props.theme.text};
    padding: 15px;
    background:  ${props => props.theme.accent};
   
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

`;

const SvgWMenu = styled.svg`
fill: ${props => props.theme.text};

width: 18px;

`;



const NavBar = (props) => {

const isLoggedIn = useSelector(selectIsLoggedIn)
const user = useSelector(selectUser)

  return (

    <Root onClick={() => {
      props.OffClick();
    }}>
      <Inner>
        <DivMenu>
          <BurgerMenuHolder onClick={() => {
            props.setMobileMenu(!props.mobileMenu);
          }}>
            <BurgerMenu

            >
              {/* <SvgWMenu xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M624.6 325.2c-12.3-12.4-29.7-19.2-48.4-17.2-43.3-1-49.7-34.9-37.5-98.8 22.8-57.5-14.9-131.5-87.4-130.8-77.4.7-81.7 82-130.9 82-48.1 0-54-81.3-130.9-82-72.9-.8-110.1 73.3-87.4 130.8 12.2 63.9 5.8 97.8-37.5 98.8-21.2-2.3-37 6.5-53 22.5-19.9 19.7-19.3 94.8 42.6 102.6 47.1 5.9 81.6-42.9 61.2-87.8-47.3-103.7 185.9-106.1 146.5-8.2-.1.1-.2.2-.3.4-26.8 42.8 6.8 97.4 58.8 95.2 52.1 2.1 85.4-52.6 58.8-95.2-.1-.2-.2-.3-.3-.4-39.4-97.9 193.8-95.5 146.5 8.2-4.6 10-6.7 21.3-5.7 33 4.9 53.4 68.7 74.1 104.9 35.2 17.8-14.8 23.1-65.6 0-88.3zm-303.9-19.1h-.6c-43.4 0-62.8-37.5-62.8-62.8 0-34.7 28.2-62.8 62.8-62.8h.6c34.7 0 62.8 28.1 62.8 62.8 0 25-19.2 62.8-62.8 62.8z"/></SvgWMenu> */}
              <SvgWMenu xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></SvgWMenu>
            </BurgerMenu>


          </BurgerMenuHolder>
        </DivMenu>

        <Div>
          <MenuLinklogo to="/">
            <LogoHolder>
              {/* <Img src={Logo} width="100%" /> */}
              <h1><span>Canna</span>Log</h1>
              {/* <LogoHolderText>Master Your Grow</LogoHolderText> */}
            </LogoHolder>
          </MenuLinklogo>
        </Div>

        <Div>
          <LinkHolder>
            {!isLoggedIn && (
              <>
                <MenuLink to="/sign-in"> <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" /></Svg>Sign In</MenuLink>
                <MenuLink to="/sign-up">
                  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></Svg>Sign Up</MenuLink>
              </>
            )}
            {isLoggedIn && (
              <>
                <MenuLinkTop to={`/profile/${user?.user_name}/${user?.user_id}`}>

                  <UserInfoTop>
                    <UserAvatar>
                      {user?.user_name?.charAt(0)}
                    </UserAvatar>
                  
                  </UserInfoTop>
                </MenuLinkTop>

                {/* <Button onClick={() => { logOut() }}>
                  <SvgW xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" /></SvgW>
                </Button> */}

              </>
            )}
          </LinkHolder>
        </Div>

      </Inner>

      {/* //mobile */}


      <LinkHolderMobile mobileMenu={ props.mobileMenu} >




        <section>
          <LinkHolderM>
        

            <MenuLinkMobile to="/public-plants" onClick={() => {  props.setMobileMenu(false); }}>
              <FlexLink>

                <FlexLinkText>Public Plants</FlexLinkText>
              </FlexLink>
            </MenuLinkMobile>

            {isLoggedIn &&
              <>
                <MenuLinkMobile to="/my-environments" onClick={() => {  props.setMobileMenu(false); }}>
                  <FlexLink>

                    <FlexLinkText>My Environments</FlexLinkText>
                  </FlexLink>
                </MenuLinkMobile>
                <MenuLinkMobile to="/my-plants" onClick={() => {  props.setMobileMenu(false); }}>
                  <FlexLink>

                    <FlexLinkText>My Plants</FlexLinkText>
                  </FlexLink>
                </MenuLinkMobile>
                {user?.user_id == 6 && 
                <MenuLinkMobile to="/my-devices" onClick={() => {  props.setMobileMenu(false); }}>
                  <FlexLink>

                    <FlexLinkText>My Devices</FlexLinkText>
                  </FlexLink>
                </MenuLinkMobile>
   }
    
                <MenuLinkMobile to="/growers" onClick={() => {  props.setMobileMenu(false); }}>
                <FlexLink>

                  <FlexLinkText>Growers</FlexLinkText>
                </FlexLink>
              </MenuLinkMobile>

       
              </>
            }
          </LinkHolderM>

        </section>

        {!isLoggedIn &&



          <LinkHolderMLogin>
            <MenuLinkMobile to="/sign-in" onClick={() => {  props.setMobileMenu(false); }}>
              <FlexLink>
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" /></Svg>
                <FlexLinkText>Sign In</FlexLinkText>
              </FlexLink>
            </MenuLinkMobile>

            <MenuLinkMobile to="/sign-up" onClick={() => {  props.setMobileMenu(false); }}>
              <FlexLink>
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></Svg>
                <FlexLinkText>Sign Up</FlexLinkText>
              </FlexLink>
            </MenuLinkMobile>
          </LinkHolderMLogin>
        }

        {isLoggedIn &&



          <UserInfoHolder>
            <UserInfo>
              <UserAvatar>
              {user?.user_name?.charAt(0)}
              </UserAvatar>
              
            </UserInfo>
            <div >
              <ButtonM >
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" /></Svg>
              </ButtonM>
            </div> 
          </UserInfoHolder>
        }




      </LinkHolderMobile>


    </Root>

  );
};

export default NavBar;
