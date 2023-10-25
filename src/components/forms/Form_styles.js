import styled,{keyframes} from "styled-components";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Select, MenuItem,InputLabel, TextField } from '@mui/material';
import {motion as m} from 'framer-motion'
import { MobileDateTimePicker   } from '@mui/x-date-pickers';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const btnAnimation = (theme) => keyframes`
0%{
  background:${theme.btn.hover};
  width: 0%;
}

100%{
  background:${theme.btn.hover};
  width: 100%;
}
`
export const StyledTextareaAutosize = styled(TextareaAutosize)`
white-space: unset;
overflow-wrap: break-word;
background:${props => props.theme.secondary}!important;
padding: 16.5px 14px;
border-radius: 5px;
`



export const StyledDateTimePicker = styled(MobileDateTimePicker )`
color:${props => props.theme.text}!important;
background:${props => props.theme.secondary}!important;
width: 100%;
margin-bottom: 15px!important;
border-radius: 5px;
input{
  color:${props => props.theme.text}!important;
}
svg{
  color:${props => props.theme.accent}!important;
}
`



export const ItemHodler = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
overflow: hidden;
margin: 10px 0px;
user-select: none;
`



export const ItemTimeActive = styled.div`
color: ${props => props.theme.text}!important;
cursor: pointer;
  background: ${props => props.bg}!important;
  padding: 0px 10px;
  border-radius: 50px;
  position: relative;
  display: inline-block;
  margin: 0px 20px;
  border:2px solid ${props => props.border};
  transition: all 0.5s ease;
  
  &:not(:first-child)::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 5px;
    transition: all 0.5s ease;
    background: ${props => props.border}!important;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
    left: -100%;
  }
  &:first-child{
    margin-left: 0px;
    
  }
  &:last-child{
    margin-right: 0px;
  }
`

export const ItemTime = styled.div`
color: grey;
cursor: pointer;

background: ${props => props.theme.primary};
  border:2px solid grey;
  padding: 0px 10px;
  border-radius: 50px;
  position: relative;
  display: inline-block;
  margin: 0px 20px;
  &:not(:first-child)::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 5px;
    background: grey;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
    left: -100%;
  }
  :hover{
    color: ${props => props.theme.text};
    border:2px solid ${props => props.bg};
    background: ${props => props.bg};
    &:not(:first-child)::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 5px;
      background: ${props => props.bg};
      top: 50%;
      transform: translateY(-50%);
      z-index: -1;
      left: -100%;
    }
  }
    
  &:first-child{
    margin-left: 0px;
  }
  &:last-child{
    margin-right: 0px;
  }
`

export const Item = styled(MenuItem)`
color:${props => props.theme.text}!important;
background:${props => props.theme.secondary}!important;
display: flex;
align-items: unset!important;
flex-direction: column;
`
export const ItemGerm = styled(MenuItem)`
color:${props => props.theme.text}!important;
background:green!important;
display: flex;
align-items: unset!important;
flex-direction: column;
`
export const ItemHarv = styled(MenuItem)`
color:${props => props.theme.text}!important;
background:red!important;
display: flex;
align-items: unset!important;
flex-direction: column;
`

export const Label = styled(InputLabel)`
color:${props => props.theme.text}!important;

`

export const ItemTextAccent = styled.p`
color:${props => props.theme.accent}!important;
font-size: 12px;
`
export const InputFieldSelect= styled(Select)`
padding:10px;
border:none;
width: 100%;
border-radius: 5px;
box-shadow:  inset 0px 0px 2px 1px ${props => props.theme.secondary};
border: 1px solid ${props => props.theme.secondary};
background:${props => props.theme.secondary};
color:${props => props.theme.text};
&:focused{
  border:red
}
`

export const InputFull= styled(TextField)`


border:none;
width: 100%;
border-radius: 5px!important;
box-shadow:  inset 0px 0px 2px 1px ${props => props.theme.secondary};
border: 1px solid ${props => props.theme.secondary};
background-color:${props => props.theme.secondary}!important;
color:${props => props.theme.text}!important;
margin-bottom: 15px!important;
&&{
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: all 5000s ease;

}
}
div {
  color:${props => props.theme.text}!important;
}
label {
  color:${props => props.theme.text}!important;
}
svg {
  color:${props => props.theme.text}!important;
}
`


export const Input= styled(TextField)`


border:none;
width:${props => props.width ? `${props.width}%`: "100%"};
border-radius: 5px!important;
box-shadow:  inset 0px 0px 2px 1px ${props => props.theme.secondary};
border: 1px solid ${props => props.theme.secondary};
background-color:${props => props.theme.secondary}!important;
color:${props => props.theme.text}!important;
margin:${props => props.margin ? `${props.margin}!important`: "0px"};

&&{
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: all 5000s ease;

}
}
div {
  color:${props => props.theme.text}!important;
}
label {
  color:${props => props.theme.text}!important;
}
svg {
  color:${props => props.theme.text}!important;
}
`

export const InputField = styled(Field)`
padding:10px;
border:none;
width: 100%;
border-radius: 5px;
box-shadow:  inset 0px 0px 2px 1px ${props => props.theme.secondary};
border: 1px solid ${props => props.theme.secondary};
background:${props => props.theme.secondary};
color:${props => props.theme.text};
&:focused{
  border:red
}
`

export const Option = styled.option`
padding: 20px;

`

export const InputFieldG = styled(Field)`
padding: 10px;
border: none;
width: 100%;
border-radius: 5px;
box-shadow:  inset 0px 0px 2px 1px ${props => props.theme.secondary};
border: 1px solid ${props => props.theme.secondary};
background:${props => props.theme.secondary};
color:${props => props.theme.text};
`


export const InputFieldGFlex = styled.div`
display: flex;
width: calc(100% / 3 - 10px);
margin: 5px 0px;
flex-direction: column;
text-align: left;
`
export const InputFieldGroup = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
`


export const Error = styled(ErrorMessage)`
padding-top:5px;
color:  ${props => props.theme.warn};
`
export const InputRangeField = styled(Field)`
margin-bottom: 10px;
width: 100%;
`

export const FormHolder = styled(Form)`
display: flex;
flex-direction: column;
align-items: flex-start;
text-align: unset;

span{
  svg{
    color: ${props => props.theme.accent};
  }

}
`
export const TypeHolder = styled.div`
text-align: left;
margin: 15px 0px;
margin-bottom: 0;
`
export const TypeHolderInner = styled.div`
display: flex;
margin:10px -5px;

`


export const TypeButton = styled(m.div)`
color:  ${props => props.theme.text};
border:  1px solid ${props => props.theme.accent};
font-size: 16px;
padding:4px 15px;
border-radius: 50px;
font-weight: bold;
cursor:pointer;
margin:0px 5px;
position: relative;

`
export const TypeButtonActive = styled(m.div)`
color:  ${props => props.theme.text};
background:  ${props => props.theme.accent};
font-size: 16px;
padding:4px 15px;
border-radius: 50px;
font-weight: bold;
cursor:pointer;
margin:0px 5px;
position: relative;

`

export const ButtonHolder = styled(m.div)`

margin-top: 15px;


`

export const NutrientHolcer = styled(m.div)`
width: 100%;
margin-top: 15px;

p{
  padding-bottom: 10px;
}
`
export const InputHolder = styled(m.div)`
margin:${props => props.margin ? `${props.margin}!important`: "0px"};
display: flex;
width:${props => props.width ? `${props.width}%!important`: "unset"};
`
