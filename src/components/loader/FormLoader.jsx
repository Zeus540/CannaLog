import React from 'react'
import styled from 'styled-components'
import { TailSpin } from 'react-loader-spinner'
import {motion as m} from 'framer-motion'

const LoaderHolder = styled(m.div)`

display: flex;
justify-content: center;
background:${props => props.theme.primary};
flex-direction: column;
align-items: center;
border-radius: 5px;
border-radius: 5px;
padding:15px;
width:211px;
height:118px;
`

const FormLoader = ({msg}) => {
    return (
      
        <LoaderHolder
        initial={{ opacity: 1 }}
        animate={{ scale:1, }}
        transition={{ duration: 0.25 }}
        exit={{scale:0}}
        >
      <TailSpin
        height="50"
        width="50"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
        </LoaderHolder>
      
    )
}

export default FormLoader