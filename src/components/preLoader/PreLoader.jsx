import React,{useEffect} from 'react'
import {PreLoad,UpperSection,LoadingImageHolder,LoadingImage,LowwerSection,Root} from './PreLoader_styles'

import Logo from '../../assets/images/leaf.png'

const PreLoader = ({ Page,data }) => {



  return (
    <>
      <PreLoad>
        <UpperSection
          initial={{ y: 0 }}
          animate={{
            y: !data?.loading ? "-100%" : "",
            opacity: !data?.loading ? 0 : "",
            position: !data?.loading ? "" : "absolute",
          }}
          transition={{ duration: 1,delay:1 }}
        >
          <LoadingImageHolder
            animate={{
              opacity: !data?.loading ? 0 : "",
            }}
            transition={{ duration: 1,delay:1 }}
          >
            <LoadingImage src={Logo} width="100%"
              animate={{
                opacity: !data?.loading ? 0 : "",
              }}
              transition={{ duration: 1,delay:1 }}
            />

          </LoadingImageHolder>
        </UpperSection>
        <LowwerSection
          initial={{ y: 0 }}
          animate={{
            y: !data?.loading ? "100%" : "",
            opacity: !data?.loading ? 0 : "",
            position: !data?.loading ? "" : "absolute",
          }}
          transition={{ duration: 1,delay:1 }}
        />
      </PreLoad>
 {
  !data?.loading && 
  <Root
  initial={{ display: "none",opacity:0 }}
  animate={{
    display: !data?.loading ? "block" : "none",
    opacity:1
  }}

  >
        <Page />
      </Root>
 }
      


    </>
  )
}

export default PreLoader