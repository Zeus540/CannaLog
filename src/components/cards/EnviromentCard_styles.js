import styled from 'styled-components'
import { motion as m } from 'framer-motion'

export const Root = styled(m.div)`
width: calc(100% / 6 - 20px);
border-radius: 5px;
margin: 20px 10px;
position: relative;
cursor:pointer;

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

export const EnviromentHolderText = styled(m.p)`
color:  ${props => props.theme.text};
font-size: 12px;
text-align:${props => props.talign};
display: flex;
justify-content: end;
align-items: center;
svg{
    font-size: 22px;
    margin-right: 5px;
    color:  ${props => props.theme.accent};
}
`

export const EnviromentHolderHeading = styled(m.p)`
color:  ${props => props.theme.text};
margin-top:5px
`

export const EnviromentInfoFlex = styled(m.div)`

display: flex;
margin: 5px -10px;
`
export const EnviromentInfoFlexHolder = styled(m.p)`
color:  ${props => props.theme.text};
margin: 5px 10px;
width: calc(100% / 3 - 20px);
text-align: center;
}
`

export const EnviromentCardImageHolder = styled(m.div)`
background:  ${props => props.theme.primary};

line-height: 0px;
overflow: hidden;
border-radius: 5px 5px 0px 0px;
position: relative;
z-index: 2;
`
export const EnviromentCardImage = styled(m.img)`
object-fit: cover;
aspect-ratio: 12/8;
border-radius: 5px 5px 0px 0px;
`

export const EnviromentCardTextHolder = styled(m.div)`
overflow: hidden;
`

export const DropDown = styled(m.div)`
background:  ${props => props.theme.primary};
display: flex;
align-items: center;
font-size: 22px;


`

export const DropDownSvgHolder = styled(m.div)`
background:  ${props => props.theme.accent};
display: flex;
align-items: center;
font-size: 22px;
padding: 10px 10px;
svg{
    color:  ${props => props.theme.primary};
}
`
export const EnviromentCardTextMainHolder = styled(m.div)`
background:  ${props => props.theme.primary};
padding:5px 10px;

bottom: 0px;
display: flex;
width: 100%;
justify-content: space-between;
 ;
`

export const EnviromentCardTextHiddenHolder = styled(m.div)`
background:  ${props => props.theme.primary};
padding:15px 10px;
width: 100%;
// max-height: ${props => props.readMore ? "600px":"0px"};
// transition: all 0.5s cubic-bezier(0, 0, .58, .58);
overflow:hidden;
// visibility:${props => props.readMore ? "visible":"hidden"};
border-radius: 0px 0px 5px 5px;
`


export const PlantHolderOutter = styled(m.div)`
display: flex;
flex-wrap: wrap;
margin: 15px 0px;
`

export const PlantHolder = styled(m.div)`
width: 50px;
color:  ${props => props.theme.text};
font-size: 12px;
display: flex;
flex-direction: column;
align-items: center;
text-align:center;
margin-right: 10px;
`

export const PlantImageHolder = styled(m.img)`
width: 40px;
aspect-ratio: 16/16;
object-fit: cover;
border-radius: 50%;
margin-bottom: 5px;
`

export const Divider = styled(m.div)`
background:${(props)=> props.theme.divider.primary}};
height: 1.5px;
`

export const ActionHolder = styled(m.div)`
display: flex;
justify-content: space-between;
padding-top: 10px;
align-items: center;
`
export const ActionHolderInner = styled(m.div)`
display: flex;
justify-content: space-between;

align-items: center;
`
