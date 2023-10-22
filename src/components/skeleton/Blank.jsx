import React from 'react'
import {
    BlankDiv,
  } from './Blank_styles'

export default function Blank(props) {
  return (
    <BlankDiv
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
