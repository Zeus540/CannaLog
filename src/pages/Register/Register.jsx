import {useState} from 'react'
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom'
import Logo from "../../assets/images/logo.svg";
import { Formik, Field, Form } from 'formik';
import * as Yup from "yup";
import axios from "axios"
import {BASE_URL_PROD} from '../../lib/Constants'
import { useSnackbar} from 'notistack';
import {StyledButton} from '../../utils/global_styles'
import Seo from '../../components/seo/Seo';

const Root = styled.div`
background:  ${props => props.theme.secondary};

padding-top: 60px;
color:  ${props => props.theme.text};
min-height: calc(100vh - 180px);
display: flex;
flex-direction: column;
justify-content: center;
@media(min-width:0px) and (max-width:768px){
  min-height: calc(100vh - 230px);
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

width: 90%;
}
@media(min-width:426px) and (max-width:768px){
  margin: 16px;

  width:unset;
}
`;

const InputHolder = styled.div`



padding-top: 0px;
color:  ${props => props.theme.text};
display: flex;
flex-direction: column;

`;
const InputHolderCheck = styled.div`



padding-top: 0px;
color:  ${props => props.theme.text};
display: flex;
flex-direction: column;
margin-bottom: 15px;
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

width: 100px;
object-fit: contain;
`;


const ErrM = styled.h1`
margin: 0px;
padding-bottom: 10px;
color:  ${props => props.theme.warn};
text-align:center;
font-size: 14px;
`;

const HaveAccount = styled.p`
margin: 0px;
padding-bottom: 10px;
color:  ${props => props.theme.text};
text-align:center;

`;
const HaveAccountLink = styled(Link)`
margin: 0px;
padding-bottom: 10px;
color:  ${props => props.theme.accent};
text-align:center;

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
<Seo title="Sign Up" content="Unlock a world of cannabis cultivation possibilities. Sign up now to create your account and become a part of our thriving community of growers. Access personalized tools, connect with fellow enthusiasts, and embark on a journey to elevate your cultivation experience. Join us today and cultivate your passion for cannabis."/>
     <RootInner>
     <Heading>  <HeadingImg src={Logo} width="100%" />  </Heading>

     <HaveAccount>Already have an account? <HaveAccountLink to='/sign-in'>Sign in</HaveAccountLink></HaveAccount>
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
      {({ errors, touched }) => (
      <Form  >

      <InputHolder>
        {/* <Label htmlFor="userName">UserName</Label> */}
        <Input id="userName" name="userName"  placeholder="UserName" />
        {errors.userName && touched.userName ? (<ErrorText>{errors.userName}</ErrorText>) : null}

        </InputHolder>

       <InputGrpFlex>
       <InputGrp>
        {/* <Label htmlFor="name">Name</Label> */}
        <Input id="name" name="name"  placeholder="Name" />
        {errors.name && touched.name ? (<ErrorText>{errors.name}</ErrorText>) : null}

        </InputGrp>

        <InputGrp>
        {/* <Label htmlFor="surname">Surname</Label> */}
        <Input id="surname" name="surname"  placeholder="Surname" />
        {errors.surname && touched.surname ? (<ErrorText>{errors.surname}</ErrorText>) : null}

        </InputGrp>
       </InputGrpFlex>

       <InputGrpFlex>
        <InputGrp>
        {/* <Label htmlFor="email">Email</Label> */}
        <Input id="email" name="email" placeholder="Email" type="email"/>
        {errors.email && touched.email ? (<ErrorText>{errors.email}</ErrorText>) : null}
      </InputGrp>

        <InputGrp>
        {/* <Label htmlFor="password">Password</Label> */}
        <Input id="password" name="password" placeholder="Password" type="password"/>
        {errors.password && touched.password ? (<ErrorText>{errors.password}</ErrorText>) : null}
      </InputGrp>
      </InputGrpFlex>

      <InputHolderCheck>
      <label >
                  <Field
                    name="age"
                    id="age"
                    type="checkbox"
                  />
                  <LabelT>I am 18 years old</LabelT>
                </label>
      {errors.age && touched.age ? (<ErrorText>{errors.age}</ErrorText>) : null}
      </InputHolderCheck>
  

      <StyledButton type="submit">Sign Up</StyledButton>
      </Form>
        )}
    </Formik>

    
        
     </RootInner>
    </Root>
  )
}

export default Register