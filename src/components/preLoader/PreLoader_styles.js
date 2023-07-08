import styled, { keyframes } from 'styled-components'
import { motion as m } from 'framer-motion'

const RotationAnimation = keyframes`
0% {
  transform: scale(0.8) ;
}
50% {
  transform: scale(1.1) ;
}
100% {
  transform: scale(0.8) ;
}
`;

export const PreLoad = styled(m.div)`
pointer-events: none;
overflow:hidden;
position: fixed;
top:0;
    z-index: 55;
    width: 100%;
    height: 100vh;
    background:transparent
`

export const Root = styled(m.div)`
display: none,
opacity:0
overflow:hidden;
position: relative;

`

export const ContentHolder = styled.div`


`

export const UpperSection = styled(m.div)`
height: 50vh;
background:  ${props => props.theme.primary_light};

position: absolute;
z-index:3;
width: 100%;
`
export const LowwerSection = styled(m.div)`
height: 50vh;
background:  ${props => props.theme.primary_light};
position: absolute;
z-index:2;
width: 100%;
bottom: 0;
`
export const LoadingImageHolder = styled(m.div)`
position: absolute;
bottom: 0%;
left: 50%;
transform: translate(-50%, 50%);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

`
export const LoadingImage = styled(m.img)`
width: 90px;
animation: ${RotationAnimation} 2s linear infinite;
transform-origin: center; 
`

export const LoadingImageText = styled(m.h2)`
padding:20px;
color:  ${props => props.theme.text};
`