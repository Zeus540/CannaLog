import React, { useEffect, useState, useRef } from 'react'
import { 
  Holder,
  Heading,
  FlexRowEnd,
  TextButton,
  TextButtonSvg,
  TextButtonSvgDelete,
  ButtonOutlined,
  ButtonText
 } from '../../utils/global_styles'
import { 
  Root,
  EnviromentCardImageHolder,
  EnviromentCardImage,
  EnviromentCardTextHolder,
  EnviromentCardTextMainHolder,
  EnviromentHolderText,
  EnviromentHolderHeading,
  EnviromentInfoFlexHolder,
  EnviromentInfoFlex,
  Divider,
  EnviromentCardTextHiddenHolder,
  EnviromentCardTextHiddenHolderInner,
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

const EnviromentCard = ({ cover_img, name, light_exposure, creation_date, last_updated, myPlants,environment_type_name,openModal,data,index,length,refValue }) => {
  const [height, setHeight] = useState(0);
  const [readMore, setReadMore] = useState(false);

  const navigate = useNavigate()
  
  useEffect(() => {
    setReadMore(false)


  }, [length]);

  function cleanName(name) {
    return name.toLowerCase().replaceAll(" ","-").replaceAll("#","")
  }
  
  

  const handleRedirect = (p)=>{
   

    navigate(`/my-plants/${cleanName(p.plant_name)}/${p.environment_id}/${p.plant_id}`)
   
  }
  
  
  return (
  
    <Root 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.1 }}
    exit={{ opacity: 0, transition: { duration: 0.1 } }}
    ref={index == length - 1 ? refValue : null}
    >
      <EnviromentCardImageHolder onClick={() => { setReadMore(!readMore) }}>
        <EnviromentCardImage src={cover_img} width="100%" />
      </EnviromentCardImageHolder>
      <EnviromentCardTextHolder height={height} readMore={readMore} >
        <EnviromentCardTextMainHolder  onClick={() => { setReadMore(!readMore) }}>
          <EnviromentHolderText>{name}</EnviromentHolderText>
          <EnviromentHolderText>{environment_type_name} {light_exposure !== null && `- ${light_exposure} hrs of light`} </EnviromentHolderText>
        </EnviromentCardTextMainHolder>
    
        <EnviromentCardTextHiddenHolder readMore={readMore}>
     
     <EnviromentCardTextHiddenHolderInner readMore={readMore}>
        <Divider></Divider>
          <EnviromentHolderHeading>{myPlants?.length > 1 ? `${myPlants?.length} Plants` : `${myPlants?.length} Plant`} </EnviromentHolderHeading>
          <PlantHolderOutter>
            {JSON?.parse(data.plants)?.map((p,index) => {
              return (
                <PlantHolder key={index} onClick={()=>{handleRedirect(p)}}>
                  <PlantImageHolder src={p.cover_img} width="100%" />
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
          </EnviromentCardTextHiddenHolderInner>
        </EnviromentCardTextHiddenHolder>
  
      </EnviromentCardTextHolder>
    </Root>

  )
}

export default EnviromentCard