import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { StyledButton } from '../../utils/global_styles'

export const Root = styled.div`
width: ${props => props.homePage ? "calc(100% / 5 - 20px)" : "calc(100% / 8 - 20px)" };

margin: 20px 10px;
position: relative;


@media (min-width: 0px) and (max-width: 600px) {
    min-width: calc(100% / 2 - 20px);
    margin: 10px;
}
@media (min-width: 601px) and (max-width: 768px) {
    min-width: calc(50% - 20px);
    margin: 10px;
}
@media (min-width: 769px) and (max-width: 1024px) {
    min-width: calc(100% / 4 - 20px);
    margin: 10px;
}
@media (min-width: 1025px) and (max-width: 1440px) {
    min-width: calc(100% / 5 - 20px);
    margin: 10px;
}
`
export const PlantCardTextInner = styled(m.p)`
overflow: hidden;
text-align: left;
font-size: 12px;
    line-height: 16px;
`

export const PlantCardImageHolder = styled(m.div)`


overflow: hidden;

position: relative;
z-index: ;
&::before {
 
    position: absolute;
    top: 80%;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(360deg, ${props => props.theme.secondary}, transparent);

    z-index: 1;
    @media (max-width: 425px) {
        top: 70%;
    }
  }
&::after {
  
    position: absolute;
    top: 0;
    bottom: 80%;
    left: 0;
    width: 100%;
    background: linear-gradient(180deg, ${props => props.theme.secondary}, transparent);
 
    z-index: 1;
    @media (max-width: 425px) {
        bottom: 70%;
    }
}
`

export const EnviromentCardImageHolder = styled(m.div)`
position: relative;
line-height: 0;
`

export const EnviromentCardImage = styled(m.img)`
object-fit: cover;
aspect-ratio: 16/16;
border-radius: 5px ;
cursor: pointer;
@media (max-width: 768px) {
    aspect-ratio: 16 / 14;
}
`
export const PlantCardTextHolder = styled(m.div)`
padding-top: 5px;
z-index: 2;
width: 100%;
border-radius: 5px;
bottom: 0;
display: flex;
flex-direction: column;
flex-wrap: wrap;
`

export const PlantCardText = styled(m.div)`
color:${(props) => `${props.theme.text}`};
margin: 5px 0px;
font-size: 12px;
display: flex;
align-items: center;
flex-direction: row;
overflow: hidden;
`

export const PlantCardTextTop = styled(m.div)`
color:${(props) => `${props.theme.text}`};
font-size: 12px;
justify-content: end;
display: flex;
margin-bottom: 10px;
align-items: end;
width: 100%;
svg{
    font-size: 22px;
    margin-right: 5px;
    color: #03A9F4;
    fill:${(props) => `${props.theme.accent}`};
   
}
`
export const PlantCardTextTopInner = styled(m.div)`
color:${(props) => `${props.theme.text}`};
cursor: pointer;
font-size: 12px;
display: flex;
align-items: center;
width: 100%;

padding: 0px 5px;
`
export const PlantCardTextLogo = styled(m.div)`
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
font-size: 20px;
margin-right: 10px;
`
export const PlantCardTextLogoTop = styled(m.div)`
color:${(props) => `${props.theme.text}`};
background: ${(props) => `${props.theme.accent}`};;
display: flex;
justify-content: center;
align-items: center;
border-radius: 5px 0px;
padding:5px 14px;
position: relative;
z-index: 4;
display: flex;
font-size: 14px;
position: absolute;
bottom: 0;
right: 0;

line-height: 16px;
div{
    margin-right: 5px;
}
`

export const DltButton = styled(StyledButton)`
color:  ${props => props.theme.text};
background:  red;
font-size: 16px;
padding: 5px;
border-radius: 50px;
font-weight: bold;
cursor:pointer;
position:  absolute;
margin: 8px;
`