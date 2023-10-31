import React from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'

const ItemInnerUpper = styled(m.div)`
display: flex;
justify-content: space-between;
padding: 15px 0px;
padding-top: 0px;
align-items: center;
color: ${props => props.theme.text}!important;
`

const ItemInnerUpperDiv = styled(m.div)`
width: 100%;
height: 2px;
background: ${props => props.theme.accent}!important;
`
const ItemInnerUpperHeading = styled(m.h1)`
white-space: nowrap;
margin: 0px 20px;
text-transform: uppercase;
`

const TimeLineHeading = ({heading}) => {
  return (
    <ItemInnerUpper>
        <ItemInnerUpperDiv></ItemInnerUpperDiv>
        <ItemInnerUpperHeading>{heading}</ItemInnerUpperHeading>
        <ItemInnerUpperDiv></ItemInnerUpperDiv>
    </ItemInnerUpper>
  )
}

export default TimeLineHeading