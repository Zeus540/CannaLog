import styled,{keyframes} from "styled-components";
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../features";



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

export const Root = styled(m.div)`
display: flex;
background:  ${props => props.theme.secondary};
justify-content: center;
position: relative;
min-height: calc(100vh - 180px);
padding-top: 60px;
@media(min-width:0px) and (max-width:768px){
  min-height: calc(100vh - 230px);
}

`

export const Holder = styled(m.div)`
max-width: 1920px;
margin: 40px 15px;
width:100%;
overflow:hidden;
transition: all 1s ease;

`

export const Heading = styled(m.h1)`
color:  ${props => props.theme.text};
font-size: 20px;
font-family: baloonB !important;
`
export const FlexRowEnd = styled(m.div)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: end;
margin-bottom: 15px;
line-height: 20px;
`

export const Button = styled(m.button)`
color:  ${props => props.theme.text};
background:  ${props => props.theme.accent};
font-size: 16px;
padding: 8px 20px;
border-radius: 0px;
font-weight: bold;
cursor:pointer;
`

export const TextButton = styled(Link)`
color:  ${props => props.theme.text};
font-size: 16px;
padding:5px 10px;
font-weight: bold;
cursor:pointer;
display: flex;
align-items: center;
`

export const TextButtonSvg = styled(Link)`
color:  ${props => props.theme.text};
font-size: 16px;
padding:5px 10px;
font-weight: bold;
cursor:pointer;
display: flex;
align-items: center;

svg{
  color:  ${props => props.theme.accent};
  font-size: 20px;
  margin-right: 10px;
  path{
    stroke:  ${props => props.theme.accent};
  }
}
`
export const TextButtonSvgDelete = styled(Link)`
color:  ${props => props.theme.warn};;
font-size: 20px;
padding:5px 10px;
font-weight: bold;
cursor:pointer;
display: flex;

svg{
  path{
    stroke:  ${props => props.theme.warn};
  }
}
`

export const ButtonText = styled(m.p)`
position: relative;
display: flex;
align-items: center;
svg{
  margin-right: 5px;
  font-size: 20px;
}
`

export const ButtonModal = styled(m.button)`
color:  ${props => props.theme.modal.text};
background:  ${props => props.theme.accent};
font-size: 16px;
padding:5px 10px;
border-radius: 5px;
font-weight: bold;
cursor:pointer;
`
export const ButtonModalOutlined = styled(m.button)`
color:  ${props => props.theme.text};
border:  1px solid ${props => props.theme.accent};
font-size: 16px;
padding:5px 15px;
border-radius: 5px;
font-weight: bold;
cursor:pointer;
margin:0px 10px;
position: relative;
&:hover{
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    animation: ${({ theme }) => btnAnimation(theme)} 1s ease-in infinite;
   
  }

}


`

export const ButtonSvg = styled(m.button)`
color:  ${props => props.theme.warn};
font-size: 20px;
border-radius: 5px;
font-weight: bold;
cursor:pointer;
display: flex;
opacity:0.8
`

export const Div = styled(m.div)`
margin: ${props => props.margin};
display: ${props => props.display};
justify-content: ${props => props.justify};
align-items: ${props => props.align};
width:${props => props.width ? props.width : "100%"};
overflow:hidden;

`