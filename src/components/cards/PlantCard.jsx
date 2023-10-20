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
  EnviromentCardImageHolder,
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
import { BsPersonCircle } from "react-icons/bs";
import { GiGreenhouse } from 'react-icons/gi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { getLocalizeTime } from '../../helpers/getLocalizeTime';
import { getElapsedDays } from '../../helpers/getElapsedDays';

const PlantCard = ({  data, }) => {



const navigate = useNavigate()



function cleanName(name) {
  return name.toLowerCase().replaceAll(" ","-").replaceAll("#","")
}
  
  const handleRedirect = ()=>{
   

    navigate(`/my-plants/${cleanName(data.plant_name)}/${data.environment_id}/${data.plant_id}`)
   
  }
  
  return (

 
    <Root
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ duration: 0.1 }}
      // exit={{ opacity: 0, transition: { duration: 0.1 } }}

    >
      <PlantCardImageHolder >
        <PlantCardTextHolderTop>
          <PlantCardTextTop >

          
        
  <PlantCardTextLogo>
              <GiGreenhouse />
            </PlantCardTextLogo> {data.environment_name}
            
            {/* <ButtonSvg onClick={()=>{openModal("deletePlant",data)}}><RiDeleteBin5Line/></ButtonSvg>  */}
          </PlantCardTextTop>

    

        </PlantCardTextHolderTop> 


<EnviromentCardImageHolder>
        <PlantCardTextLogoTop>
             <div> Day</div>
            {getElapsedDays(data?.creation_date)}
            </PlantCardTextLogoTop>
        <EnviromentCardImage src={data.cover_thumbnail} width="100%"  onClick={() => handleRedirect()}/>
        </EnviromentCardImageHolder>


        <PlantCardTextHolder onClick={() => handleRedirect()}>
          <PlantCardText>
            <PlantCardTextLogo>
              <PiDnaLight />
            </PlantCardTextLogo>
            <PlantCardTextInner>
              {data.strain_name}
            </PlantCardTextInner>
          </PlantCardText>
          {/* <PlantCardText>
            <PlantCardTextLogo>
              <IoWaterOutline />
            </PlantCardTextLogo>
            <PlantCardTextInner>
              {data.irrigation_type}
            </PlantCardTextInner>
          </PlantCardText> */}
       
        </PlantCardTextHolder> 
        
        <PlantCardTextTopInner onClick={() => handleRedirect()}>



<PlantCardTextHeading>
  <p>
    {data.plant_name}
  </p>
{/* 
  <p>
    <BsPersonCircle />{data.user_name}
  </p> */}

</PlantCardTextHeading>
</PlantCardTextTopInner>


      </PlantCardImageHolder>

    </Root>

  )
}

export default PlantCard