import React, { useState, useEffect } from 'react'
import {
  Root,
  PlantCardImageHolder,
  EnviromentCardImage,
  EnviromentCardImageHolder,
  PlantCardTextHolder,
  PlantCardText,
  PlantCardTextLogo,
  PlantCardTextTop,
  PlantCardTextLogoTop,
  PlantCardTextInner,
  PlantCardTextTopInner,
  DltButton
} from './PlantCard_styles'
import { PiDnaLight } from 'react-icons/pi';
import { IoWaterOutline } from 'react-icons/io5';
import { BsPersonCircle } from "react-icons/bs";
import { GiGreenhouse } from 'react-icons/gi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useNavigate,useLocation } from 'react-router-dom';
import { getLocalizeTime } from '../../helpers/getLocalizeTime';
import { getElapsedDays } from '../../helpers/getElapsedDays';

const PlantCard = ({ data, openModal,homePage }) => {
  const [path, setPath] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  const handleRedirect = () => {
    navigate(`/${path}/${cleanName(data.strain_name)}/${cleanName(data.user_name)}/${data.environment_id}/${data.plant_id}`)
  }

  function cleanName(name) {
    return name.toLowerCase().replaceAll(" ", "-").replaceAll("#", "")
  }

  useEffect(() => {
    if (location.pathname === "/my-plants") {
      setPath("my-plants")
    } else if (location.pathname === "/" || location.pathname === "/public-plants") {
      setPath("public-plants")
    }
  }, [location])


  return (

    <Root
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      homePage={homePage}
    >
      <PlantCardImageHolder >

     

        <EnviromentCardImageHolder>
          <PlantCardTextLogoTop>
            <div> Day</div>
            {getElapsedDays(data?.creation_date)}
          </PlantCardTextLogoTop>
          {path == 'my-plants' && <DltButton position="absolute" type='icon' background="red" onClick={() => { openModal("deletePlant", data) }}><RiDeleteBin5Line /></DltButton>}

          <picture onClick={() => handleRedirect()}>
            <source srcSet={data.cover_thumbnail_next_gen} type="image/webp" alt="webp" loading='lazy'/>
            <EnviromentCardImage src={data.cover_thumbnail} width="100%" loading='lazy'/>
          </picture>

        </EnviromentCardImageHolder>

        <PlantCardTextHolder onClick={() => handleRedirect()}>
          <PlantCardText>
            {data.plant_name}
          </PlantCardText>

          <PlantCardText >
         
        </PlantCardText>

        <PlantCardText>
            <PlantCardTextLogo>
               <GiGreenhouse /> 
            </PlantCardTextLogo>
            <PlantCardTextInner>
            {data.environment_name}
            </PlantCardTextInner>
          </PlantCardText>

          <PlantCardText>
            <PlantCardTextLogo>
              <PiDnaLight />
            </PlantCardTextLogo>
            <PlantCardTextInner>
              {data.strain_name}
            </PlantCardTextInner>
          </PlantCardText>

          {path == 'my-plants' ?
            <PlantCardText>
              <PlantCardTextLogo>
                <IoWaterOutline />
              </PlantCardTextLogo>
              <PlantCardTextInner>
                {data.irrigation_type}
              </PlantCardTextInner>
            </PlantCardText>
            :
            <PlantCardText>
              <PlantCardTextLogo>
                <BsPersonCircle />
              </PlantCardTextLogo>
              <PlantCardTextInner>
                {data.user_name}
              </PlantCardTextInner>
            </PlantCardText>
          }



        </PlantCardTextHolder>

        <PlantCardTextTopInner onClick={() => handleRedirect()}>

        </PlantCardTextTopInner>


      </PlantCardImageHolder>

    </Root>

  )
}

export default PlantCard