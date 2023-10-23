import React from 'react'
import styled from 'styled-components';
import { useScroll } from 'framer-motion';
import { motion as m } from 'framer-motion'

const Root =  styled.div`
height: 5px;
position: fixed;
width: 100%;
`
const RootInner =  styled(m.div)`
height:5px;
// transform-origin: left;
background:${(props)=> props.theme.accent}
`

const ProgressBar = () => {

    const {scrollYProgress} = useScroll()

    return (
        <Root>
            <RootInner style={{scaleX :scrollYProgress}}>
            </RootInner>
        </Root>
    );
};


export default ProgressBar