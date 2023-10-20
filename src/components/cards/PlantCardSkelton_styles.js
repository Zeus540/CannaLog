import styled from "styled-components";
import { motion as m } from 'framer-motion'



export const Root = styled(m.div)`
width: ${props => props.homePage ? "calc(100% / 5 - 20px)" : "calc(100% / 7 - 20px)" };

margin: 20px 10px;
position: relative;

@media (min-width: 0px) and (max-width: 375px) {
    min-width: calc(100%  - 20px);
    margin: 10px;
}

@media (min-width: 376px) and (max-width: 600px) {
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

export const Blank = styled(m.div)`
width:${props => props.width};
min-height:${props => props.height};
background: ${props => props.theme.skelton};
margin:${props => props.margin};
border-radius: ${props => props.radius};
`

export const BlankImage = styled(m.div)`
width:${props => props.width};
min-height:${props => props.height};
aspect-ratio: 16 / 20;
background: ${props => props.theme.skelton};
margin:${props => props.margin};
border-radius: ${props => props.radius};
@media (min-width: 0px) and (max-width: 768px) {
    aspect-ratio: ${props => props.aspect};
}
`
export const Flex = styled(m.div)`
display:flex;
justify-content:${props => props.justify};
`