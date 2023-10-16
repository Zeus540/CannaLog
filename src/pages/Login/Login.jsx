import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'
import Logo from "../../assets/images/leaf.png";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from "axios"
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BASE_URL_PROD } from '../../lib/Constants'
import { useSnackbar } from 'notistack';
import { auth } from '../../features';
import { useDispatch } from 'react-redux';
import { getCookieValue } from '../../helpers/getCookieValue';
import {Button} from '../../utils/global_styles'

const Root = styled.div`
padding-top: 0px;
color:  ${props => props.theme.text};
min-height: calc(100vh - 180px);
display: flex;
flex-direction: column;
justify-content: center;
background:  ${props => props.theme.secondary};
@media(min-width:0px) and (max-width:768px){
  min-height: calc(100vh - 230px);
}
`;
const RootInner = styled.div`
width:480px;
align-self: center;

background: #ffffff;
background:  ${props => props.theme.primary};
padding: 20px;
border-radius: 5px;
@media(max-width:425px){
  margin: 16px;
padding: 20px;
width:90%;
}
@media(min-width:426px) and (max-width:768px){
  margin: 16px;
  padding: 20px;
  width:90%;
}
`;

const InputGrp = styled.div`

margin: 15px 0px;
padding-top: 0px;
color:  ${props => props.theme.text};
display: flex;
flex-direction: column;
`;
const Label = styled.label`
color:  ${props => props.theme.text};
font-weight:bold;
`;
const Input = styled(Field)`
margin: 10px 0px;
padding: 15px 15px;
border-radius:5px;
border:none;
background: #4e5f612e;
color:  ${props => props.theme.text};
&:focus {
  outline: none;

}
`;

const ErrorText = styled.p`
color: #f44336;
    margin: 0px;
    font-size: 12px;
`;



const Heading = styled.h1`
margin: 0px;
font-size: 30px;
padding:10px 0px;
color:  ${props => props.theme.text};
text-align:center;
font-family: baloonB !important;
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

const ErrMsg = styled.p`
color: #f44336!important;
    margin: 0px;
    font-size: 16px;
    text-align: center;
`;

const Help = styled.p`
color:  ${props => props.theme.text};
margin: 0px;
font-size: 16px;
text-align: center;
padding-top: 20px;
`;

const MenuLink = styled(NavLink)`
  margin: 0px 0px;
  padding: 15px 5px;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  color:  ${props => props.theme.accent};
  text-decoration: none;
  &:hover {
    border-bottom: 4px solid #66b394;
  
  }

`;

function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errMsg, setErrMsg] = useState("")
  const { enqueueSnackbar } = useSnackbar()




  const handleLogin = (values) => {
    console.log("values", values);
    setErrMsg("");
    axios.post(`${BASE_URL_PROD}/login`, values, { withCredentials: true })
      .then(function (response) {
        console.log('response');
        if (response.status == 200) {
          let obj = {
            user: getCookieValue('user'),
            isLoggedIn: true
          }

          dispatch(auth(obj))
          navigate('/my-environments')
        }

      })
      .catch(function (error) {

        enqueueSnackbar(`${error.response.status} ${error.response.statusText}`, { variant: 'error' })
        setErrMsg(error.response.data);
      })

  }

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(5, 'Too Short!')
      .required('Required'),
  });


  return (
    <Root>

      <Helmet>
        <meta charSet="utf-8" />
        <title>{`CannaLog - Sign In`}</title>
        <link rel="canonical" href={`https://sweetleaf.co.za/sign-in`} />
      </Helmet>

      <RootInner>
       
           
            <Heading>  <HeadingAccent><HeadingImg src={Logo} width="40px" />CANNA</HeadingAccent>LOG   </Heading>
     

        <Formik
          initialValues={{
            email: '',
            password: '',

          }}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            handleLogin(values)
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <ErrMsg >{errMsg}</ErrMsg>
              <InputGrp>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" placeholder="Email" />
                {errors.email && touched.email ? (<ErrorText>{errors.email}</ErrorText>) : null}

              </InputGrp>

              <InputGrp>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" placeholder="Password" type="password" />
                {errors.password && touched.password ? (<ErrorText>{errors.password}</ErrorText>) : null}
              </InputGrp>

              <Button>Login</Button>

              <Help>Need a account?     <MenuLink to="/sign-up">Sign Up Here</MenuLink> </Help>
            </Form>
          )}
        </Formik>
      </RootInner>
    </Root>
  )
}

export default Login