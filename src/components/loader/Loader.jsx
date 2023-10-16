import React from 'react'
import styled from 'styled-components'
import { TailSpin } from 'react-loader-spinner'
import {motion as m} from 'framer-motion'

const LoaderHolder = styled(m.div)`
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 210px);
    display: flex;
    background: ${props => props.theme.secondary};
    @media(min-width:0px) and (max-width:768px){
        min-height: calc(100vh - 230px);
      }
`

const Loader = () => {
    return (
        <LoaderHolder
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{opacity: 0}}
        >

<TailSpin
  height="80"
  width="80"
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

export default Loader