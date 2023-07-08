import React from 'react'
import styled from "styled-components";
import {motion as m} from 'framer-motion'

const Root = styled(m.div)`

`;

function PublicJournals() {
  return (
    <Root
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    > 
    PublicJournals
    </Root>
  )
}

export default PublicJournals