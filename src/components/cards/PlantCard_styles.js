import styled from 'styled-components'
import { motion as m } from 'framer-motion'

export const Root = styled(m.div)`
width: calc(100% / 7 - 20px);

margin: 20px 10px;
position: relative;

@media (min-width: 0px) and (max-width: 375px) {
    width: calc(100%  - 20px);
    margin: 10px;
}

@media (min-width: 376px) and (max-width: 600px) {
    min-width: ${props => props.homePage ? "100%" : "calc(100% / 2 - 20px)" };
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
export const PlantCardTextInner = styled(m.div)`
// white-space: nowrap;
overflow: hidden;
text-align: left;
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
aspect-ratio: 16/20;
border-radius: 5px ;
cursor: pointer;
@media (max-width: 768px) {
    aspect-ratio: 16 / 14;
}
`
export const PlantCardTextHolder = styled(m.div)`

z-index: 2;
width: 100%;

border-radius: 5px;
bottom: 0;
display: flex;
// flex-direction: column;
flex-wrap: wrap;
// align-items: end;
//display:none;
`
export const PlantCardTextHolderTop = styled(m.div)`

z-index: 2;
width: 100%;

border-radius: 5px;
top: 0;
display: flex;
align-items: start;

`

export const PlantCardText = styled(m.div)`
color:${(props) => `${props.theme.text}`};
width: calc(100% / 2);
margin: 5px 0px;
font-size: 10px;

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
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
svg{
    width: 25px;
    height: 25px;
    margin-right: 10px;
    color: #03A9F4;
    fill:${(props) => `${props.theme.accent}`};
   
}
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

export const PlantCardTextHeading = styled(m.div)`
padding: 10px 0px;
// background: ${(props) => `${props.theme.primary}`};
padding-bottom: 0px;
overflow: hidden;



position: relative;
z-index: 3;
p{
    padding: 5px 0px;
    font-size: 12px;
    line-height: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    svg{
        font-size: 20px;
        margin-right: 10px;
    }
}
`
