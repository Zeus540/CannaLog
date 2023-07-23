import styled,{keyframes} from "styled-components";
import {motion as m} from 'framer-motion'


const fadeIn = keyframes`
0% {
  opacity: 0 ;
}

100% {
    opacity: 1 ;
}
`;


export const Root = styled(m.div)`
background:  ${props => props.theme.modal.secondary};
position: fixed;
backdrop-filter: blur(3px);
top: 0;
bottom: 0;
right: 0;
left: 0;
z-index: 3;
display: flex;
justify-content: center;
padding: 80px;
align-items: center;
animation: ${fadeIn} 0.5s ease;
@media (min-width: 0px) and (max-width: 425px)  {
    padding: 20px;
}
@media (min-width: 426px) and (max-width: 768px) {
    padding: 40px;
}
`

export const Modal = styled(m.div)`
animation: ${fadeIn} 0.75s ease;
background:  ${props => props.theme.modal.primary};
backdrop-filter: blur(5px);
max-width: 40%;
border-radius: 5px;
padding:15px;
width:100%;
@media (min-width: 0px) and (max-width: 600px)  {
    max-width: unset;
    width:100%;
 
}
@media (min-width: 601px) and (max-width: 768px) {
    max-width: 80%;
    width:100%;
 
}
@media (min-width: 769px) and (max-width: 1440px) {
    max-width: 40%;
    width:100%
}
@media (min-width: 2560px)  {
    max-width: 20%;
    width:100%
}


`

export const ModalClose = styled(m.p)`
display: flex;
justify-content: end;
margin-bottom: 20px;
svg{
    color:  ${props => props.theme.accent};
    width: 20px;
    height: 20px;
}
`

export const ModalCloseHolder = styled(m.div)`
display: flex;
margin: 0px -10px;
justify-content: center;
`
export const ModalContent = styled(m.div)`

color:  ${props => props.theme.text};
`
export const Warn = styled(m.p)`
text-align: center;
color: red;
padding: 15px 0px;
`
export const ModalContentText = styled(m.p)`
font-size: 18px;
text-align: center;
color:  ${props => props.theme.text};
`
