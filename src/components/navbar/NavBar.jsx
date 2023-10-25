import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Logo from "../../assets/images/leaf.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser, logout } from "../../features";
import { FaSun } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";
import { useDispatch } from 'react-redux';
import { BiBell } from "react-icons/bi";
import { useNotification } from "../../context/NotificationContext";
import { useSocket } from "../../context/SocketContext";
import { motion as m, AnimatePresence } from 'framer-motion'
import { PiPlantLight, PiPlantFill } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";
import { GiGreenhouse } from 'react-icons/gi';
import { RiMenu2Fill } from 'react-icons/ri'

const Root = styled.div`
background:${(props) => props.scrollDistance >= 1 ? `${props.theme.glass.background}` : "" || props.sideBarOpen ? `${props.theme.glass.background}` : ""};



position: fixed;
transition: background 0.5s ease;
    top: 0;
    z-index:50;
    width: 100%;

 
  
  @media (max-width: 425px) {
    margin: 0px 0px;
    margin-top: 0px;
    padding-bottom: 0px;
  }
`;

const Inner = styled.div`
backdrop-filter: ${(props) => props.scrollDistance >= 1 ? `blur( 2px )` : ""};
padding:15px 0px;

margin: 0px auto;
max-width: 1920px;

  display: flex;
  align-items: center;
  justify-content: space-between;
 
  @media (max-width: 1920px) {
   
padding:15px;
  }
`;

const Img = styled.img`
padding-left: 0px;
    aspect-ratio: 6/ 4;
    object-fit: contain;
`;




const LogoHolder = styled.div`
align-items: center;
  text-transform: uppercase;
  display: flex;
 
h1{
  color:${props => props.theme.text};
  text-align:center;
  font-size: 25px;

  span{
    color:${props => props.theme.accent};
 
    text-align:center;

  }
}


  @media (max-width: 767px) {
    margin-left:0px;
   
    font-size: 20px;
  }
`;


const Div = styled.div`
display: flex;
align-items: center;
transition: all 0.5s ease;
:nth-child(1){


}
`;
const DivMenu = styled.div`
transition: all 0.5s ease;
padding-right: 10px;

`;

const LinkHolderMenuInnerItem = styled.div`
    padding: 15px ;
`;
const LinkHolderMobile = styled(m.div)`
  display: flex;
  position: fixed;
 
  background: ${props => props.theme.glass.background};
  right: 0;
 
  min-width: 400px;
  backdrop-filter: blur( 2px );
  min-height: -webkit-fill-available ;
  flex-direction: column;
  justify-content: space-between;
  z-index: 50;
  @media (min-width: 0px) and (max-width: 820px) {
    min-width: 50%;

    min-height: -webkit-fill-available ;
  }

`;
const StyledLink = styled(NavLink)`
  margin: 0px 0px;
  padding: 16px 10px;
  color: ${props => props.theme.text};

  align-items: center;
  text-decoration: none;
  display: flex;
 

`;
const MenuLinkLeft = styled.div`
display: flex;
@media (max-width: 768px){
  
  display:none
}

`;


const MenuDropItem = styled.div`
  margin: 0px 0px;

  color: ${props => props.theme.text};

  align-items: center;
  text-decoration: none;
  display: flex;
 svg{
  color: ${props => props.theme.accent};
  margin-right:10px;
  font-size: 20px !important;
 }

`;


const Svg = styled.svg`
width:20px;
margin-right:10px;
fill: ${props => props.theme.accent};
`;


const MenuLinklogo = styled(NavLink)`
  margin: 0px 0px;
  text-decoration: none!important;
  display: flex;
  justify-content: center;
`;


const BurgerMenuHolder = styled.div`
cursor: pointer;

`;

const BurgerMenu = styled.div`
display: flex;
svg{
  font-size: 25px;

  color: ${props => props.theme.text};
}
`;


const FlexLinkText = styled.p`
display: flex;
align-items: center;
color: ${props => props.theme.text};
svg{
  font-size: 25px;
  margin-right: 10px;
  color: ${props => props.theme.accent};
}
`;


const LinkHolderMLogin = styled.div`
display: flex;
flex-direction: column;
@media (min-width: 768px){
  
  display:none
}
`;


const UserInfoTop = styled.div`
display: flex;


align-items: center;
`;

const UserAvatar = styled.p`
width: 15px;
height: 15px;
color: white;
    padding: 15px;
    background:  ${props => props.theme.accent};
   
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

`;


const ThemeToggleHolderBottom = styled.div`
padding: 15px;
cursor: pointer;
@media (max-width: 768px){

}
`;



const ThemeSvg = styled.div`
display: flex;

color:  ${props => props.theme.text};
svg{
  fill:  ${props => props.fill};
  width: 20px!important;
  height: unset;
  margin-right: 10px;
}

`;

const NotificationHolder = styled.div`
display: flex;
position: relative;
color:  ${props => props.theme.text};
svg{
  fill:  ${props => props.fill};
  width: 25px!important;
  height: unset;
  margin-right: 15px;
}

`;
const NotificationCount = styled.div`
background: red;
height: 10px;
position: absolute;
border-radius: 50%;
top: 0px;
right: 14px;
width: 10px;
opacity:${(props) => props.newNotification ? '100%' : "0%"};
transition: opacity 0.2s ease;
`;

const NavBar = ({ toggleTheme, themeType, }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const theme = themeType
  const navigate = useNavigate()
  const socket = useSocket()
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const { newNotification } = useNotification()

  const [scrollDistance, setScrollDistance] = useState(0);

  const sideBar = useRef(null)

  useEffect(() => {

    const handleScroll = () => {
      setScrollDistance(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  const logOut = () => {
    axios.post(`${BASE_URL_PROD}/logout`).then((results) => {
      if (results.status == 200) {
        socket.on("disconnect", (reason) => {
          // console.log(reason); prints "io client disconnect"
        });

        dispatch(logout())
        navigate('/')
      }
    })
  }


  useEffect(() => {


    const handleCheck = (e) => {

      if (sideBar.current && !sideBar.current.contains(e.target)) {
        setSideBarOpen(false)
      }
    }


    document.addEventListener("mousedown", handleCheck)


    return () => {
      document.removeEventListener("mousedown", handleCheck)
    }
  }, [sideBarOpen])


  return (

    <Root
      scrollDistance={scrollDistance}
      sideBarOpen={sideBarOpen}
    >

      <Inner scrollDistance={scrollDistance}  >

        <Div scrollDistance={scrollDistance}>
          <DivMenu scrollDistance={scrollDistance}>
            <BurgerMenuHolder onClick={() => {
              setSideBarOpen(!sideBarOpen);
            }}>
              <BurgerMenu>
                <RiMenu2Fill />
              </BurgerMenu>


            </BurgerMenuHolder>
          </DivMenu>
          <MenuLinklogo to="/">
            <LogoHolder>
              <Img src={Logo} width="100%" />
              <h1><span>Canna</span>Log</h1>
              {/* <LogoHolderText>Master Your Grow</LogoHolderText> */}
            </LogoHolder>
          </MenuLinklogo>
        </Div>

        {isLoggedIn && (

          <Div>
            <NotificationHolder>
              <NotificationCount newNotification={newNotification} />
              <StyledLink to="/notifications">
                <BiBell />
              </StyledLink>
            </NotificationHolder>


            <UserInfoTop onClick={() => { handleMenuOpen() }}>
              <UserAvatar>
                {user?.user_name?.charAt(0)}
              </UserAvatar>
            </UserInfoTop>
          </Div>
        )}


        {!isLoggedIn && (
          <MenuLinkLeft>
            <StyledLink to="/sign-in"> <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" /></Svg>Sign In</StyledLink>
            <StyledLink to="/sign-up">
              <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></Svg>Sign Up</StyledLink>
          </MenuLinkLeft>
        )}
      </Inner>

      {/* //mobile */}
      <AnimatePresence >
        {sideBarOpen &&


          <LinkHolderMobile
            ref={sideBar}
            initial={{ transform: "translateX(100%)" }}
            animate={{ transform: "translateX(0%)" }}
            transition={{ duration: 0.25 }}
            exit={{ transform: "translateX(100%)" }}>




            {!isLoggedIn && <>
              <StyledLink to="/public-plants" onClick={() => { setSideBarOpen(false); }}>


                <FlexLinkText> <PiPlantLight />  Public Plants</FlexLinkText>

              </StyledLink>
            </>}
            {isLoggedIn &&
              <>
                <div>

                  <StyledLink to="/" onClick={() => { setSideBarOpen(false); }}>


                    <FlexLinkText>  <PiPlantLight /> Public Plants</FlexLinkText>

                  </StyledLink>

                  <StyledLink to="/my-environments" onClick={() => { setSideBarOpen(false); }}>


                    <FlexLinkText> <GiGreenhouse /> My Environments</FlexLinkText>

                  </StyledLink>
                  <StyledLink to="/my-plants" onClick={() => { setSideBarOpen(false); }}>


                    <FlexLinkText><PiPlantFill /> My Plants</FlexLinkText>

                  </StyledLink>

                  <StyledLink to="/growers" onClick={() => { setSideBarOpen(false); }}>


                    <FlexLinkText><BsPeople /> Growers</FlexLinkText>

                  </StyledLink>

                  <StyledLink to="/notifications" onClick={() => { setSideBarOpen(false); }}>


                    <FlexLinkText><BiBell /> Notifications</FlexLinkText>

                  </StyledLink>
                </div>

                <div>

                  <ThemeToggleHolderBottom>
                    {theme == "light" && <ThemeSvg fill="#005bad" onClick={() => { toggleTheme() }}><IoMoon />Dark Mode</ThemeSvg>}
                    {theme == "dark" && <ThemeSvg fill="#ffeb3b" onClick={() => { toggleTheme() }}><FaSun /> Light Mode</ThemeSvg>}
                  </ThemeToggleHolderBottom>

                  <LinkHolderMenuInnerItem>
                    <MenuDropItem onClick={() => { logOut() }} >
                      <RiLogoutCircleRLine fill="#f44336" /> Log Out
                    </MenuDropItem>
                  </LinkHolderMenuInnerItem>
                </div>


              </>
            }

            {!isLoggedIn &&

              <LinkHolderMLogin>


                <ThemeToggleHolderBottom>
                  {theme == "light" && <ThemeSvg fill="#005bad" onClick={() => { toggleTheme() }}><IoMoon />Dark Mode</ThemeSvg>}
                  {theme == "dark" && <ThemeSvg fill="#ffeb3b" onClick={() => { toggleTheme() }}><FaSun /> Light Mode</ThemeSvg>}
                </ThemeToggleHolderBottom>

                <StyledLink to="/sign-in" onClick={() => { setSideBarOpen(false); }}>

                  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" /></Svg>
                  <FlexLinkText>Sign In</FlexLinkText>

                </StyledLink>

                <StyledLink to="/sign-up" onClick={() => { setSideBarOpen(false); }}>

                  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></Svg>
                  <FlexLinkText>Sign Up</FlexLinkText>

                </StyledLink>
              </LinkHolderMLogin>

            }

          </LinkHolderMobile>
        }
      </AnimatePresence>
    </Root>

  );
};

export default NavBar;
