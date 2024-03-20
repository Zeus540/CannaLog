import React, { useEffect, useState, useRef } from 'react'
import { 
  Div,
  Heading,
  FlexRowEnd,
  TextButton,
  TextButtonSvg,
  TextButtonSvgDelete,
  StyledButton,
  ButtonText
 } from '../../utils/global_styles'
import { 
  Root,
  EnviromentCardImageHolder,
  EnviromentCardImage,
  EnviromentCardTextHolder,
  DropDown,
  DropDownSvgHolder,
  EnviromentCardTextMainHolder,
  EnviromentHolderText,
  EnviromentHolderHeading,
  EnviromentInfoFlexHolder,
  EnviromentInfoFlex,
  Divider,
  EnviromentCardTextHiddenHolder,
  PlantHolderOutter,
  PlantHolder,
  ActionHolder,
  ActionHolderInner,
  PlantImageHolder 
 } from './EnviromentCard_styles'
 import { useNavigate } from 'react-router-dom';
 import { IoMdAdd } from "react-icons/io";
 import { FiEdit } from "react-icons/fi";
 import { RiDeleteBin5Line } from 'react-icons/ri';
import { AnimatePresence } from 'framer-motion';
import { GiGreenhouse } from 'react-icons/gi';
import { FiArrowDown,FiArrowUp } from 'react-icons/fi';

const EnviromentCard = ({ openModal,data,index,length,refValue }) => {
  const [readMore, setReadMore] = useState(false);

  const navigate = useNavigate()
  
  function cleanName(name) {
    return name.toLowerCase().replaceAll(" ","-").replaceAll("#","")
  }
  
  const handleRedirect = (p)=>{
    navigate(`/my-plants/${cleanName(p.strain_name)}/${cleanName(p.user_name)}/${p.environment_id}/${p.plant_id}`)
  }
  
  
  return (
  
    <Root 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.1 }}
    exit={{ opacity: 0, transition: { duration: 0.1 } }}
    ref={index == length - 1 ? refValue : null}
    >
      <Div margin="0px 0px 10px 0px">
      <EnviromentHolderText talign="right"><GiGreenhouse /> {data.environment_name}</EnviromentHolderText>
      </Div>
      <EnviromentCardImageHolder onClick={() => { setReadMore(!readMore) }}>
        <EnviromentCardImage src={data.environment_cover_img} width="100%" />
      </EnviromentCardImageHolder>
      
      <DropDown onClick={() => { setReadMore(!readMore) }}>

      <EnviromentCardTextMainHolder  >
          <EnviromentHolderText>{data.environment_type_name} </EnviromentHolderText>
          
          <EnviromentHolderText>{data.environment_light_exposure !== null && `${data.environment_light_exposure} hrs of light`}   </EnviromentHolderText>
        </EnviromentCardTextMainHolder>

        <DropDownSvgHolder>
        {!readMore ? <FiArrowDown />  : <FiArrowUp/> }
        </DropDownSvgHolder>

      </DropDown>



  <EnviromentCardTextHolder  readMore={readMore} >

    <AnimatePresence mode='wait'>
      {readMore &&
      
        <EnviromentCardTextHiddenHolder
        initial={{ transform: "translateY(-100%)", visibility: "none", opacity:0 }}
        animate={{ transform: "translateY(0%)",visibility: "visible", opacity:1 }}
        transition={{ duration: 0.10 }}
        exit={{visibility: "none" , transform: "translateY(-100%)", opacity:0 , transition: { duration: 0.10 } }}
         readMore={readMore}
         >
         
        <Divider></Divider>
          <EnviromentHolderHeading>{JSON?.parse(data.plants)?.length > 1 ? `${JSON?.parse(data.plants)?.length} Plants` : `${JSON?.parse(data.plants)?.length} Plant`} </EnviromentHolderHeading>
          <PlantHolderOutter>
            {JSON?.parse(data.plants)?.map((p,index) => {
              return (
                <PlantHolder key={index} onClick={()=>{handleRedirect(p)}}>
                  <PlantImageHolder src={p.cover_thumbnail} width="100%" />
                 <div>{p.plant_name}</div>
                </PlantHolder>

              )
            })}
          </PlantHolderOutter>
          <Divider></Divider>
         {(data.environment_length !== null || data.environment_width !== null || data.environment_height !== null) && 

        <>
      
        <EnviromentHolderHeading>Dimension</EnviromentHolderHeading>
        <EnviromentInfoFlex>
          <EnviromentInfoFlexHolder>{data.environment_length == null ? "" : `${data.environment_length} cm` }</EnviromentInfoFlexHolder>
          <EnviromentInfoFlexHolder>{data.environment_width == null ? "" : `${data.environment_width} cm` }</EnviromentInfoFlexHolder>
          <EnviromentInfoFlexHolder>{data.environment_height == null ? "" : `${data.environment_height} cm` }</EnviromentInfoFlexHolder>
        </EnviromentInfoFlex>
        <Divider></Divider>
        </>
         }
     
          <ActionHolder>
            <ActionHolderInner>
          <TextButtonSvg onClick={()=> openModal('addEnvironmentLog',data)}><IoMdAdd/>Log</TextButtonSvg>
          <TextButtonSvg onClick={()=> openModal('editEnvironment',data)}><FiEdit/>Edit</TextButtonSvg>
            </ActionHolderInner>

          <TextButtonSvgDelete onClick={()=> openModal('deleteEnvironment',data)}><RiDeleteBin5Line/></TextButtonSvgDelete>
          </ActionHolder>
         
        </EnviromentCardTextHiddenHolder>
         }
        </AnimatePresence>
 
      </EnviromentCardTextHolder>
    </Root>

  )
}

export default EnviromentCard