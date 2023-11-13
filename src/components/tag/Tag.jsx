import React from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'

const TagHolder = styled(m.div)`
background: ${props => props.theme.accent};
padding: 5px 15px;
width: fit-content;
font-size:14px;
line-height: 14px;
border-radius: 50px;
color: ${props => props.theme.textW}!important;
`

function Tag({children}) {
  return (
    <TagHolder>{children}</TagHolder>
  )
}

export default Tag