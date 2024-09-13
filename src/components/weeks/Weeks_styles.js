import styled from 'styled-components'
import { motion as m } from 'framer-motion'

export const Root = styled(m.div)`
max-width: 1920px;
margin: 0px auto;
padding: 15px;
text-align: center;
`

export const WeekHolder = styled(m.div)`

margin: 0px auto;
overflow: auto;
width: 80%;
max-width:766px;
background:${(props) => `${props.theme.secondary}`};
@media (max-width: 768px) {
  width: unset;

}
@media (min-width: 769px) and (max-width: 1024px) {
  width: 80%;
}

`

export const Week = styled(m.div)`
border:2px solid ${props => props.theme.primary};
background:${props => props.theme.primary};
font-family: baloonB !important;
color: ${props => props.theme.text}!important;
padding: 20px;
border-radius: 5px;
text-align: center;
margin: 10px 0px;

    cursor: pointer;

`

export const WeekActive = styled(m.div)`
border:2px solid ${props => props.theme.accent};
background:${props => props.theme.primary};
color: ${props => props.theme.text}!important;
font-family: baloonB !important;
padding: 20px;
border-radius: 5px;
text-align: center;
margin: 10px 0px;
    cursor: pointer;
`

export const WeekTextTop = styled(m.div)`
border-radius: 5px 5px 0px 0px;



`
export const WeekTextBottom = styled(m.div)`

font-family: baloonB !important;


border-radius: 0px 0px 5px 5px;
`

