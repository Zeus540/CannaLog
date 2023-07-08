import React,{ useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../../assets/images/logoLogin.png";
import axios from "axios"
import {BASE_URL_PROD} from '../../lib/Constants'
import { useSnackbar } from 'notistack';

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
  background-color: #ffffff;
  text-align: center;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  padding-bottom: 40px;
`;

const LogoImg = styled.img`
    width: 200px;
    margin:0 auto
`;

const Text = styled.p`
    font-size: 30px;
    padding-bottom: 15px;
    font-weight: bold;
    margin: 0;

`;

const TextSmall = styled.p`
padding: 0px;
font-size: 15px;
font-weight: unset;

`;


const Verify = () => {
const navigate = useNavigate()
const {enqueueSnackbar} = useSnackbar()
const [msg, setMsg] = useState()

    useEffect(() => {
        {console.log("params", params.token) }

        
        axios.post(`${BASE_URL_PROD}/verify`,params)
        .then((response) => {
        if(response.data.url){
            setMsg(" Verification Successful")
            setTimeout(() => {
                navigate(response.data.url)
              }, 4500);
        }
        if(response.data.err){
            setMsg(response.data.err)
            setTimeout(() => {
                navigate('/')
              }, 4500);
        }
        console.log(response.data.err);
        })
        .catch((error)=> {
            enqueueSnackbar(`${error.response.status} ${error.response.statusText}`,{variant:'error'})
          console.log(error);
        })

    }, [])
    
    const params = useParams()

    return (
        <Root>
            <Inner>
                <LogoImg src={Logo} width="100%" />
               
               
                <Text>
                   {msg}
                </Text>
                <TextSmall>
                    You will be redirected shortly
                </TextSmall>
            </Inner>
        </Root>
    )
}

export default Verify