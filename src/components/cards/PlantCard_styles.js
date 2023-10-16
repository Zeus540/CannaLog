import styled from 'styled-components'
import { motion as m } from 'framer-motion'

export const Root = styled(m.div)`
width: calc(100% / 6 - 20px);

margin: 20px 10px;
position: relative;

@media (max-width: 600px) {
    width: calc(100% - 20px);
    margin: 10px;
}
@media (min-width: 601px) and (max-width: 768px) {
    width: calc(50% - 20px);
    margin: 10px;
}
@media (min-width: 769px) and (max-width: 1024px) {
    width: calc(100% / 3 - 20px);
    margin: 10px;
}
`
export const PlantCardTextInner = styled(m.div)`
white-space: nowrap;
overflow: hidden;
`

export const PlantCardImageHolder = styled(m.div)`


overflow: hidden;

position: relative;
z-index: ;
&::before {
    content: '';
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
    content: '';
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


export const EnviromentCardImage = styled(m.img)`
object-fit: cover;
aspect-ratio: 16/20;
border-radius: 5px ;
cursor: pointer;
@media (max-width: 768px) {
    aspect-ratio: 16 / 14;
}
`
export const PlantCardTextHolder = styled(m.div)`
position: absolute;
z-index: 2;
width: 100%;

border-radius: 5px;
bottom: 0;
display: flex;
align-items: end;

`
export const PlantCardTextHolderTop = styled(m.div)`
position: absolute;
z-index: 2;
width: 100%;

border-radius: 5px;
top: 0;
display: flex;
align-items: start;

`

export const PlantCardText = styled(m.div)`
color:${(props) => `${props.theme.text}`};
width: calc(33.3333%);
margin: 10px 5px;
font-size: 10px;
text-align: center;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
overflow: hidden;

`
export const PlantCardTextTop = styled(m.div)`
color:${(props) => `${props.theme.text}`};
margin: 10px;
font-size: 12px;
justify-content: space-between;
display: flex;

align-items: center;
width: 100%;
`
export const PlantCardTextTopInner = styled(m.div)`
color:${(props) => `${props.theme.text}`};
cursor: pointer;

font-size: 12px;

display: flex;

align-items: center;
width: 100%;
`
export const PlantCardTextLogo = styled(m.div)`
border: 1px solid;
border-radius: 50%;
width: 40px;
height: 40px;
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 10px;
&>svg{
    width: 25px;
    height: 25px;
}
`
export const PlantCardTextLogoTop = styled(m.div)`
background: ${(props) => `${props.theme.accent}`};;
display: flex;
justify-content: center;
align-items: center;
border-radius: 50px 50px 50px 50px;
padding:10px 14px;
position: relative;
z-index: 4;
display: flex;
flex-direction: column;

`

export const PlantCardTextHeading = styled(m.div)`
padding: 10px;
background: ${(props) => `${props.theme.secondary}`};;
padding-right: 20px;
padding-left: 50px;
border-radius: 50px;
margin-left: -40px;
position: relative;
z-index: 3;
`
