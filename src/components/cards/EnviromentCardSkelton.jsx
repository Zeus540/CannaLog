import React from 'react'
import { Root } from './EnviromentCard_styles'
import Blank from '../skeleton/Blank'
import BlankImage from '../skeleton/BlankImage'

const EnviromentCardSkelton = () => {

  return (

    <Root
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      exit={{ opacity: 0 }}
    >
      <BlankImage w="100%" radius="5px" h='150px' aspect="16 / 9" />
      <Blank w="50%" h='20px' margin="10px 0px" />
      <Blank w="60%" h='20px' margin="10px 0px" />
    </Root>

  )
}

export default EnviromentCardSkelton