import styled from "styled-components";
import { motion as m } from 'framer-motion'


export const BlankDiv = styled(m.div)`
width:${props => props.props.w};
min-height:${props => props.props.h};
background: ${props => props.theme.skelton};
margin:${props => props.props.margin};
border-radius: ${props => props.props.radius};
`

export const BlankImageHolder = styled(m.div)`
width:${props => props.props.w};
aspect-ratio: ${props => props.props.aspect};
background: ${props => props.theme.skelton};
margin:${props => props.props.margin};
border-radius: ${props => props.props.radius};
@media (min-width: 0px) and (max-width: 768px) {
    aspect-ratio: ${props => props.props.aspectMobile};
}
`
export const Flex = styled(m.div)`
display:flex;
justify-content:${props => props.justify};
`