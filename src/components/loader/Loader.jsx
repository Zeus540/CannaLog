import React from 'react'
import styled from 'styled-components'
import { Triangle } from 'react-loader-spinner'
import {motion as m} from 'framer-motion'

const LoaderHolder = styled(m.div)`
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 280px);
    display: flex;
`

const Loader = () => {
    return (
        <LoaderHolder
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{opacity: 0}}
        >
        <Triangle
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
/>
        </LoaderHolder>
    )
}

export default Loader