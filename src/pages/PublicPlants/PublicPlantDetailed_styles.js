import styled from "styled-components";
import { motion as m } from "framer-motion";



export const Tag = styled(m.div)`
background:${(props) => `${props.bg}`};
width: fit-content;
    padding: 0px 10px;
    border-radius: 50px;
    margin: 10px 0px;
    color: ${props => props.theme.textW}!important;
`

export const Root = styled(m.div)`


`

export const QuickActionHolderInner = styled.div`
display: flex;
flex-wrap: wrap;
margin-top: 5px;

`
export const QuickActionHolder = styled.div`

margin: 0px auto;
max-width: 1920px;
padding: 20px;
`

export const EditPlant = styled(m.div)`
font-size: 23px;
//background: linear-gradient(180deg, ${(props) => `${props.theme.primary}`}, transparent);
svg{
  stroke:${(props) => `${props.theme.accent}`};
}

`

export const EditPlantInner = styled(m.div)`
max-width: 1920px;
margin: 0px auto;
padding: 20px 20px;
justify-content: end;
display: flex;

`

export const ExposureItemHolderOutter = styled(m.div)`

margin-top: 10px;
`
export const ExposureItemHolder = styled(m.div)`
display: flex;

`
export const ExposureItemGroup = styled(m.div)`
text-align: center;
margin-top: 10px;
width: ${(props) => `${props.width}%`};
p{
  padding-top:5px;
  font-size:14px
}
`

export const ExposureItem = styled(m.div)`
background: linear-gradient(180deg, ${(props) => `${props.bg1}`}, ${(props) => `${props.bg2}`});
border-radius: ${(props) => `${props.radius}`};

padding: 5px 20px;

transition: 2s width ease;
`

export const ImgHolderTop = styled.div`

overflow: hidden;
background-image:${(props) => `url(${props.img})`};
background-size: cover;
background-repeat: no-repeat;
background-position: center center;
`

export const ImgHolderTopInfo = styled.div`
background:${(props) => `linear-gradient(0deg, ${props.theme.secondary}, transparent)`};
height: 100%;
display: flex;
flex-direction: column;
min-height: 50vh;

color:${(props) => `${props.theme.text}`};
    justify-content: flex-end;
    align-items: center;
`
export const ImgHolderTopInfoInner = styled.div`
max-width: 1920px;
width: 100%;
padding: 20px;

display: flex;
justify-content: space-between;
align-items: end;
color:${(props) => `${props.theme.text}`};
@media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
    align-items: unset;
  }
h1{
    font-size: 30px;
    text-wrap: balance;
}
p{
    font-size: 18px;
}
`
export const ImgHolderTopInfoInnerRight = styled.div`
display: flex;
margin: 0px -10px;
position: relative;
@media (max-width: 768px) {
 margin-top:0px;
 justify-content: right;
  }
p{
    margin: 0px 10px;
    display: flex;
    svg{
        font-size: 25px;
        margin-right:10px;
    }
}
`
export const Section = styled.div`
background:${(props) => `${props.theme.secondary}`};
color:${(props) => `${props.theme.text}`};
max-width: 1920px;
margin: 0px auto;
padding: 20px;
@media (max-width: 768px) {
    width: unset;
   
  }
`


export const DayHolderOutterInner = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
color:${(props) => `${props.theme.accent}`};
max-width: 1920px;
margin: 0px auto;
padding: 15px 20px;
padding-top: 0px;
@media (max-width: 768px) {
    width: unset;
   
  }
  svg{
font-size:25px;
margin-right: 5px;
color:${(props) => `${props.theme.accent}`};
  }
`

export const DayHolderOutter = styled.div`


width: 100%;

`
export const DayHolder = styled.div`
display: flex;
flex-wrap: wrap;

`

export const QuickAction = styled.div`
background:${(props) => `${props.theme.primary}`};
color:${(props) => `${props.theme.text}`};
width: calc(100% / 9 );
text-align: center;
border-radius: 5px;
padding: 15px;
border:${(props) => `2px ${props.theme.secondary} solid`};
cursor:pointer;
transition: all 0.5s ease;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
@media (max-width: 768px) {
    width: calc(100% / 3 );
  }
  @media (min-width: 769px) and (max-width: 1024px){
    width: calc(100% / 3 );
  }
 
&:hover{
    border:${(props) => `2px ${props.theme.accent} solid`};
}
svg{
    color:${(props) => `${props.theme.accent}`};
    font-size: 30px;
}
`