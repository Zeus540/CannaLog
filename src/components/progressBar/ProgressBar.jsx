import React,{useState,useEffect} from 'react'
import styled from 'styled-components';

const Root =  styled.div`
height: 5px;
position: fixed;
width: 100%;
`
const RootInner =  styled.div`
height:5px;
width:${(props)=> props.scrollDistance ? `${props.scrollDistance}%` : "0%"};
background:${(props)=> props.theme.accent}
`

const ProgressBar = () => {
    const [scrollDistance, setScrollDistance] = useState(0);

    useEffect(() => {
      
        const getScrollProgress = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPosition = window.scrollY;
            const progress = (scrollPosition / totalHeight) * 100;
            setScrollDistance(prev => prev = progress);
        };

        window.addEventListener('scroll', getScrollProgress);

        return () => {
            setScrollDistance(0);
            window.removeEventListener('scroll', getScrollProgress);
        };
    }, []);

    return (
        <Root>
            <RootInner scrollDistance={scrollDistance}>
            </RootInner>
        </Root>
    );
};


export default ProgressBar