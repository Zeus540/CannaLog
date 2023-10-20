import React from 'react'
import {
  Root,
  Blank,
  BlankImage,
  Flex
} from './EnviromentCardSkelton_styles'


const EnviromentCardSkelton = () => {

  return (

    <Root
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.25 }}
    exit={{ opacity: 0 }}
    >
 
    
    <BlankImage
    initial={{ opacity: 0.7,  }}
    animate={{ opacity: 0.5,  }}
    transition={{
      repeat: Infinity ,
      repeatType: "reverse",
      duration: 0.5
    }}
    width="100"
    radius="5px"
    height='150px'
    aspect="16 / 9"
    />
       <Blank
    initial={{ opacity: 0.7,  }}
    animate={{ opacity: 0.5,  }}
    transition={{
      repeat: Infinity ,
      repeatType: "reverse",
      duration: 0.5
    }}
    
    width="50%"
    height='20px'
    margin="10px 0px"
    />
      <Blank
    initial={{ opacity: 0.7,  }}
    animate={{ opacity: 0.5,  }}
    transition={{
      repeat: Infinity ,
      repeatType: "reverse",
      duration: 0.5
    }}
    
    width="60%"
    height='20px'
    margin="10px 0px"
    />

 
   

    </Root>

  )
}

export default EnviromentCardSkelton