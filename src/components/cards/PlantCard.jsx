import React, { useEffect, useState, useRef } from 'react'
import {
  Holder,
  Heading,
  FlexRowEnd,
  TextButton,
  Button,
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
  PlantCardTextTopInner,
  PlantCardTextHeading
} from './PlantCard_styles'
import { PiDnaLight } from 'react-icons/pi';
import { IoWaterOutline } from 'react-icons/io5';
import { BsCalendar2Date } from 'react-icons/bs';
import { GiGreenhouse } from 'react-icons/gi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { getLocalizeTime } from '../../helpers/getLocalizeTime';
import { getElapsedDays } from '../../helpers/getElapsedDays';

const PlantCard = ({ cover_thumbnail,openModal, data, }) => {


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
          <PlantCardTextTop onClick={() => handleRedirect()}>

           <PlantCardTextTopInner >

            <PlantCardTextLogoTop>
             <div> Day</div>
            {getElapsedDays(data?.creation_date)}
            </PlantCardTextLogoTop>

            <PlantCardTextHeading>
              <div>
                {data.plant_name}
              </div>
           
            </PlantCardTextHeading>
           </PlantCardTextTopInner>

            <ButtonSvg onClick={()=>{openModal("deletePlant",data)}}><RiDeleteBin5Line/></ButtonSvg>
          </PlantCardTextTop>

    

        </PlantCardTextHolderTop>

        <EnviromentCardImage src={cover_thumbnail} width="100%"  onClick={() => handleRedirect()}/>

      </PlantCardImageHolder>

    </Root>

  )
}

export default PlantCard