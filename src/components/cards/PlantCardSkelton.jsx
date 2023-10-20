import React, { } from 'react'
import {
  Root,
  Blank,
  Flex
} from './PlantCardSkelton_styles'


const PlantCardSkelton = ({  }) => {

  return (

    <Root
     
    >
      <Flex
      justify='end'>
    <Blank
    initial={{ opacity: 0.7,  }}
    animate={{ opacity: 0.5,  }}
    transition={{
      repeat: Infinity ,
      repeatType: "reverse",
      duration: 0.5
    }}
    width="50%"
    height='25px'
    margin="10px 0px"
    />
    </Flex>
    <Blank
    initial={{ opacity: 0.7,  }}
    animate={{ opacity: 0.5,  }}
    transition={{
      repeat: Infinity ,
      repeatType: "reverse",
      duration: 0.5
    }}
    width="100"
    height='320px'
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
      {/* <Blank
    width="40%"
    height='20px'
    margin="10px 0px"
    /> */}

   

    </Root>

  )
}

export default PlantCardSkelton