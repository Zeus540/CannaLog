import React from 'react'
import {
  BlankImageHolder,
  } from './Blank_styles'

export default function BlankImage(props) {

  return (
    <BlankImageHolder
    initial={{ opacity: 0.7,  }}
    animate={{ opacity: 0.5,  }}
    transition={{
      repeat: Infinity ,
      repeatType: "reverse",
      duration: 0.5
    }}
    props={props}
    />
  )
}
