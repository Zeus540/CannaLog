import React from 'react'
import { Root } from './EnviromentCard_styles'
import Blank from '../skeleton/Blank'
import BlankImage from '../skeleton/BlankImage'
import { Flex } from '../skeleton/Blank_styles'
const EnviromentCardSkelton = () => {

  return (

    <Root
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      exit={{ opacity: 0 }}
    >
      <Flex justify="end">
      <Blank w="50%" h='20px' margin="10px 0px" />
      </Flex>
      <BlankImage w="100%" radius="5px" h='150px' aspect="12 / 8" />
      
      <Flex justify="space-between">
      <Blank w="40%" h='20px' margin="10px 0px" />
      <Blank w="40%" h='20px' margin="10px 0px" />
      </Flex>
  
    </Root>

  )
}

export default EnviromentCardSkelton