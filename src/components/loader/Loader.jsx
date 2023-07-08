import React from 'react'
import styled from 'styled-components'
import { BallTriangle } from 'react-loader-spinner'
import {motion as m} from 'framer-motion'

const LoaderHolder = styled(m.div)`
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 260px);
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
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#8bab50"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </LoaderHolder>
    )
}

export default Loader