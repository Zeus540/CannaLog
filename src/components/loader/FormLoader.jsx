import React from 'react'
import styled from 'styled-components'
import { TailSpin } from 'react-loader-spinner'
import {motion as m} from 'framer-motion'

const LoaderHolder = styled.div`
position: absolute;
top: 0px;
left: 0px;
bottom: 0px;
right: 0px;
display: flex;
justify-content: center;
background:${props => props.theme.primary};
flex-direction: column;
align-items: center;
border-radius: 5px;
`

const FormLoader = ({msg}) => {
    return (
        <LoaderHolder
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{opacity: 0}}
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