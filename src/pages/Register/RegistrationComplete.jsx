import React from 'react'
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../../assets/images/logoLogin.png";

const Root = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  height: calc(100vh - 73px);
`;

const Inner = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: white;
  text-align: center;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  padding-bottom: 40px;
`;

const LogoImg = styled.img`
    width: 300px;
    margin:0 auto
`;

const Text = styled.p`
    font-size: 30px;
    padding: 10px 0px;
    font-weight: bold;
    margin: 0;

`;


const RegistrationComplete = () => {
    const params = useParams()
    { console.log("params", params) }
    return (
        <Root>
            <Inner>
                <LogoImg src={Logo} width="100%" />
                <Text>
                    Welcome to Sweetleaf
                </Text>
               
                <div>
                    A verification email has been sent to your email address
                </div>
             
            </Inner>
        </Root>
    )
}

export default RegistrationComplete