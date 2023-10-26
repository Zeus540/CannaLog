import { useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../../assets/images/leaf.png";
import axios from "axios"
import {BASE_URL_PROD} from '../../lib/Constants'
import { useSnackbar } from 'notistack';

const Root = styled.div`
color:  ${props => props.theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  min-height: calc(100vh - 180px);
  @media(min-width:0px) and (max-width:768px){
    min-height: calc(100vh - 230px);
  }
`;
const Heading = styled.h1`
margin: 0px;
font-size: 30px;
padding:10px 0px;
color:  ${props => props.theme.text};
text-align:center;

`;
const HeadingImg = styled.img`
position: absolute;
left: -30px;
top: 0px;
height: 30px;
width: 30px;
object-fit: contain;
`;
const HeadingAccent = styled.span`
font-size: 30px;
color:  ${props => props.theme.accent};
font-weight: bold;
position: relative;
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

const Text = styled.p`
    padding-bottom: 15px;
    font-weight: bold;
    margin: 0;
    color:  ${props => props.theme.warn};
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


const handleVerify =() =>{
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
}

    useEffect(() => {

      handleVerify()

    }, [])
    
    const params = useParams()

    return (
        <Root>
            <Inner>
            <Heading>  <HeadingAccent><HeadingImg src={Logo} width="40px" />CANNA</HeadingAccent>LOG   </Heading>
               
               
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