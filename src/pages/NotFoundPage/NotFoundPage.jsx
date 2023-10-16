import React, { useState,useEffect } from "react";
import styled from "styled-components";
import Back2 from '../../assets/images/unsplash.jpg'
import { NavLink } from "react-router-dom";
import {motion as m} from 'framer-motion'
import {Button } from '../../utils/global_styles'


const Root = styled.div`
display: flex;
background:  ${props => props.theme.secondary};
justify-content: center;
position: relative;
min-height: calc(100vh - 180px);

@media(min-width:0px) and (max-width:768px){
  min-height: calc(100vh - 230px);
}


`;

const Inner = styled.div`

background-image: ${(props)=>`url(${props.theme.banner.image})`};

background-size: cover;
min-height: calc(100vh - 280px);
width: 100%;
background-position: center;
margin: 0 auto;
display: flex;
    justify-content: center;
    align-items: center;
    background-color: #5f5f5f;
    background-blend-mode: overlay;

`;

const TextHolder = styled.div`


`;

const Heading = styled.h1`
font-size: 10em;
text-align: center;
color:  ${props => props.theme.accent};
margin: 20px 0px;
line-height: 0.8em;
font-family: Archivo !important;
@media (max-width: 425px) {
  font-size: 8em;
}
`;
const HeadingSmall = styled.p`
font-size: 1.5em;
text-align: center;
color: white!important;
margin: 0px;
@media (max-width: 425px) {
  font-size: 1.2em;
}
`;



const MenuLink = styled(NavLink)`
text-decoration: none;
display: flex;
justify-content: center;
margin-top: 20px;
`;


const NotFoundPage = () => {

 
  return (
    <Root
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration:1}}
    exit={{opacity: 0}}
    > 
      <Inner>
        <TextHolder>
        <Heading>404</Heading>
        <HeadingSmall>Oops! You seem lost</HeadingSmall>

        <MenuLink to="/"><Button>GO HOME</Button></MenuLink>
        
        </TextHolder>
        </Inner>
    </Root>
  )
}

export default NotFoundPage