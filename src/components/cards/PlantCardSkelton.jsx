import React from 'react'
import Blank from '../skeleton/Blank'
import BlankImage from '../skeleton/BlankImage'
import {Root} from './PlantCard_styles'
import { Flex } from '../skeleton/Blank_styles'
const PlantCardSkelton = () => {

  return (

    <Root
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.25 }}
    exit={{ opacity: 0 }}
    >
    <Flex
      justify='end'>
    <Blank
    w="50%"
    h='30px'
    margin="10px 0px"
    />
    </Flex>
    
    <BlankImage
    w="100%"
    radius="5px"
    h='150px'
    aspect="16/16"
    aspectMobile="16 / 14"
    />
      <Blank
    w="60%"
    h='20px'
    margin="10px 0px"
    />
        <Blank
    w="60%"
    h='20px'
    margin="10px 0px"
    />
      <Blank
    w="50%"
    h='20px'
    margin="10px 0px"
    />
 
   

    </Root>

  )
}

export default PlantCardSkelton