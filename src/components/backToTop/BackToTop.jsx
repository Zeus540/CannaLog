import { useEffect,useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion as m } from 'framer-motion'
import {HiOutlineChevronDoubleUp} from 'react-icons/hi'

const Holder = styled(m.div)`
background: ${(props)=> props.theme.accent};
position: fixed;
bottom: 20px;
right: -100px;
z-index: 55;
padding: 15px;
display: flex;
svg{
    font-size: 25px;
}

`

export const BackToTop = () => {

const [show, setShow] = useState(false)

    useEffect(() => {

        window.addEventListener('scroll',handleShowBackToTop)


    }, [])

    const handleShowBackToTop = ()=>{
        console.log("handleBackToTop",window.scrollY)
        if(window.scrollY > 300){
            setShow(true)
        }else{
            setShow(false)
        }
    
    }

    const handleBackToTop = ()=>{
        window.scrollTo(0, 0);
    }
    
  return (
    <AnimatePresence mode='wait'>
    {show && 
    <Holder
    initial={{ opacity:0, right: "-100px" }}
    animate={{ opacity:1,right: "20px" }}
    transition={{ duration: 0.25}}
    exit={{ right: "-100px", opacity:0, }}
     onClick={()=>handleBackToTop()}>
        <HiOutlineChevronDoubleUp/>
     </Holder>
    }
    </AnimatePresence>
    
  )
}
