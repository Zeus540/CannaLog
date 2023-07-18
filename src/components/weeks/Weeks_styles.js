import styled from 'styled-components'
import { motion as m } from 'framer-motion'

export const Root = styled(m.div)`
max-width: 1920px;
margin: 15px auto;
padding: 20px;
text-align: center;
`

export const WeekHolder = styled(m.div)`
display: flex;
margin: 10px -10px;
overflow: auto;
@media (min-width: 768px) {

  flex-wrap: wrap;
  justify-content: center;
 
}
`

export const Week = styled(m.div)`
border:2px solid ${props => props.theme.primary};
background:${props => props.theme.primary};
width: 90px;
color: ${props => props.theme.text}!important;
padding: 20px;
border-radius: 5px;
text-align: center;
margin: 10px 10px;
transition: all 0.5s ease;
    cursor: pointer;
    &:hover{
      border:${(props) => `2px ${props.theme.accent} solid`};
  }
`

export const WeekActive = styled(m.div)`
border:2px solid ${props => props.theme.accent};
background:${props => props.theme.primary};
color: ${props => props.theme.text}!important;
width: 90px;

padding: 20px;
border-radius: 5px;
text-align: center;
margin: 10px 10px;
    cursor: pointer;
`

export const WeekTextTop = styled(m.div)`
border-radius: 5px 5px 0px 0px;



`
export const WeekTextBottom = styled(m.div)`




border-radius: 0px 0px 5px 5px;
`

