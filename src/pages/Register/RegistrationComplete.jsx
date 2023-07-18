import React from 'react'
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../../assets/images/leaf.png";

const Root = styled.div`
color:  ${props => props.theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  min-height: calc(100vh - 232px);
  @media(min-width:0px) and (max-width:768px){
    min-height: calc(100vh - 280px);
  }
`;

const Inner = styled.div`
  max-width: 480px;
  width: 100%;
  background:  ${props => props.theme.primary};
  text-align: center;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  padding-bottom: 40px;
`;
const Heading = styled.h1`
margin: 0px;
font-size: 30px;
padding:10px 0px;
color:  ${props => props.theme.text};
text-align:center;

`;

const HeadingAccent = styled.span`
font-size: 30px;
color:  ${props => props.theme.accent};
font-weight: bold;
position: relative;
`;
const HeadingImg = styled.img`
position: absolute;
left: -30px;
top: 0px;
height: 30px;
width: 30px;
object-fit: contain;
`;



const RegistrationComplete = () => {
    const params = useParams()
    { console.log("params", params) }
    return (
        <Root>
            <Inner>
            <Heading>  <HeadingAccent><HeadingImg src={Logo} width="40px" />CANNA</HeadingAccent>LOG   </Heading>
             
                <div>
                    A verification email has been sent to your email address
                </div>
             
            </Inner>
        </Root>
    )
}

export default RegistrationComplete