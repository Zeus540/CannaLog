import React,{useState,useContext, useEffect} from 'react'
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
import Logo from "../../assets/images/leaf.png";
import { Formik, Field, Form } from 'formik';
import * as Yup from "yup";
import axios from "axios"
import { Helmet } from "react-helmet";
import {BASE_URL_PROD} from '../../lib/Constants'
import { useSnackbar} from 'notistack';
const Root = styled.div`
background:  ${props => props.theme.secondary};

padding-top: 0px;
color:  ${props => props.theme.text};
min-height: calc(100vh - 260px);
display: flex;
flex-direction: column;
justify-content: center;
@media(min-width:0px) and (max-width:768px){
  min-height: calc(100vh - 308px);
}
`;
const RootInner = styled.div`
width:480px;
align-self: center;
background:  ${props => props.theme.primary};
padding: 20px;
border-radius: 5px;
@media(max-width:425px){
  margin: 16px;
padding: 15px 5px;
width: 90%;
}
@media(min-width:426px) and (max-width:768px){
  margin: 16px;
  padding: 15px 5px;
  width:unset;
}
`;

const InputHolder = styled.div`



padding-top: 0px;
color:  ${props => props.theme.text};
display: flex;
flex-direction: column;
`;
const InputGrp = styled.div`
min-width: calc(100% /2 - 20px);
margin: 0px 10px;

padding-top: 0px;
color:  ${props => props.theme.text};
display: flex;
flex-direction: column;
`;
const InputGrpFlex = styled.div`
display: flex;
margin: 0px -10px;
`;

const Label = styled.label`
color:  ${props => props.theme.text};
font-weight:bold;
`;
const LabelT = styled.label`
color:  ${props => props.theme.text};

margin-left: 10px;
`;

const Input = styled(Field)`
margin: 10px 0px;
padding: 15px 15px;
border-radius:5px;
border:none;
background:#4e5f612e;
color:  ${props => props.theme.text};
`;




const ErrorText = styled.p`
color:  ${props => props.theme.warn};
    margin: 0px;
    font-size: 12px;
`;


const Button = styled.button`
padding: 8px 25px;
width: fit-content;
border:none;
background:  ${props => props.theme.primary};
color:  ${props => props.theme.text};

border-radius:5px;
cursor:pointer;
border: 1px ${props => props.theme.accent} solid;
margin-top: 15px;
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


const ErrM = styled.h1`
margin: 0px;
padding-bottom: 10px;
color:  ${props => props.theme.warn};
text-align:center;
font-size: 14px;
`;


function Register() {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate ()

 const [errorM, setError] = useState("")


 

  const handleLogin =(values) =>{
    
    
    axios.post(`${BASE_URL_PROD}/register`,values)
    .then(function (response) {
      console.log("response.data",response.data)
      if(response.data.userRegisterSucces == false){
        setError(response.data.userRegisterMsg)
      }else{
        navigate(`${response.data.userRegisterMsg}`)
      }
      
      
    })
    .catch(function (error) {
      enqueueSnackbar(`${error.response.status} ${error.response.statusText}`,{variant:'error'})
      console.log(error);
    })
   

  }

  const SignupSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
      surname: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
      name: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
      email: Yup.string()
      .required('Required'),
      password: Yup.string()
      .min(6, 'Too Short!')
      .required('Required'),
      age: Yup.bool()
      .isTrue('Required')
      .required('Required'),
  });

  
 
  
  return (
    <Root>

<Helmet>
        <meta charSet="utf-8" />
        <title>{`CannaLog - Sign Up`}</title>
        <link rel="canonical" href={`https://sweetleaf.co.za/sign-up`} />
      </Helmet>

     <RootInner>
     <Heading>  <HeadingAccent><HeadingImg src={Logo} width="40px" />CANNA</HeadingAccent>LOG   </Heading>
{errorM !== "" && <ErrM>{errorM}</ErrM>}
    <Formik
      initialValues={{
        userName: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        age: false,
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        handleLogin(values)
      }}
    >
      {({ errors, touched,handleSubmit,values }) => (
      <Form  >

      <InputHolder>
        <Label htmlFor="userName">UserName</Label>
        <Input id="userName" name="userName"  placeholder="UserName" />
        {errors.userName && touched.userName ? (<ErrorText>{errors.userName}</ErrorText>) : null}

        </InputHolder>

       <InputGrpFlex>
       <InputGrp>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name"  placeholder="Name" />
        {errors.name && touched.name ? (<ErrorText>{errors.name}</ErrorText>) : null}

        </InputGrp>

        <InputGrp>
        <Label htmlFor="surname">Surname</Label>
        <Input id="surname" name="surname"  placeholder="Surname" />
        {errors.surname && touched.surname ? (<ErrorText>{errors.surname}</ErrorText>) : null}

        </InputGrp>
       </InputGrpFlex>

       <InputGrpFlex>
        <InputGrp>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" placeholder="Email" type="email"/>
        {errors.email && touched.email ? (<ErrorText>{errors.email}</ErrorText>) : null}
      </InputGrp>

        <InputGrp>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" placeholder="Password" type="password"/>
        {errors.password && touched.password ? (<ErrorText>{errors.password}</ErrorText>) : null}
      </InputGrp>
      </InputGrpFlex>

      <InputHolder>
      <label >
                  <Field
                    name="age"
                    id="age"
                    type="checkbox"
                  />
                  <LabelT>I am 18 years old</LabelT>
                </label>
      {errors.age && touched.age ? (<ErrorText>{errors.age}</ErrorText>) : null}
      </InputHolder>
  

      <Button type="submit">Sign Up</Button>
      </Form>
        )}
    </Formik>

    
        
     </RootInner>
    </Root>
  )
}

export default Register