import React, { useEffect, useState, useRef } from 'react'
import {
  Holder,
  Heading,
  FlexRowEnd,
  TextButton,
  ButtonOutlined,
  ButtonText,
  ButtonSvg
} from '../../utils/global_styles'
import {
  Root,
  PlantCardImageHolder,
  EnviromentCardImage,
  PlantCardTextHolder,
  PlantCardText,
  PlantCardTextLogo,
  PlantCardTextHolderTop,
  PlantCardTextTop,
  PlantCardTextLogoTop,
  PlantCardTextInner,
  PlantCardTextTopInner
} from './PlantCard_styles'
import { PiDnaLight } from 'react-icons/pi';
import { IoWaterOutline } from 'react-icons/io5';
import { BsCalendar2Date } from 'react-icons/bs';
import { GiGreenhouse } from 'react-icons/gi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { getLocalizeTime } from '../../helpers/getLocalizeTime';

const PlantCard = ({ cover_thumbnail, name, light_exposure, creation_date, last_updated, environment_type_name, openModal, data, index, length }) => {

  console.log("cover_thumbnail",cover_thumbnail)
  const elementRef = useRef(null);

const navigate = useNavigate()



function cleanName(name) {
  return name.toLowerCase().replaceAll(" ","-").replaceAll("#","")
}
  
  const handleRedirect = ()=>{
   

    navigate(`/my-plants/${cleanName(data.plant_name)}/${data.environment_id}/${data.plant_id}`)
   
  }
  
  return (

    <Root
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      ref={elementRef}
     
    >
      <PlantCardImageHolder >
        <PlantCardTextHolderTop>
          <PlantCardTextTop>
           <PlantCardTextTopInner onClick={() => handleRedirect()}>
            <PlantCardTextLogoTop>
              <BsCalendar2Date />
            </PlantCardTextLogoTop>
            <div>
              <div>
                {data.plant_name}
              </div>
              <div>
                {getLocalizeTime(data.creation_date)}
            
              </div>
            </div>
           </PlantCardTextTopInner>

            <ButtonSvg onClick={()=>{openModal("deletePlant",data)}}><RiDeleteBin5Line/></ButtonSvg>
          </PlantCardTextTop>

    

        </PlantCardTextHolderTop>

        <EnviromentCardImage src={cover_thumbnail} width="100%"  onClick={() => handleRedirect()}/>
        <PlantCardTextHolder onClick={() => handleRedirect()}>
          <PlantCardText>
            <PlantCardTextLogo>
              <PiDnaLight />
            </PlantCardTextLogo>
            <PlantCardTextInner>
              {data.strain_name}
            </PlantCardTextInner>
          </PlantCardText>
          <PlantCardText>
            <PlantCardTextLogo>
              <IoWaterOutline />
            </PlantCardTextLogo>
            <PlantCardTextInner>
              {data.irrigation_type}
            </PlantCardTextInner>
          </PlantCardText>
          <PlantCardText>
            <PlantCardTextLogo>
              <GiGreenhouse />
            </PlantCardTextLogo>
            <PlantCardTextInner>
              {data.environment_name}
            </PlantCardTextInner>
          </PlantCardText>
        </PlantCardTextHolder>
      </PlantCardImageHolder>

    </Root>

  )
}

export default PlantCard