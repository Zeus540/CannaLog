import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { Heading } from '../../utils/global_styles'
import axios from '../../lib/axios'
import { BASE_URL_PROD } from '../../lib/Constants'
import { getLocalizedDate, getWeekandDay } from '../../helpers/getLocalizeDate'
import { format, startOfWeek, addWeeks, differenceInWeeks } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from 'react-icons/ri';
import { ItemHodler } from '../forms/Form_styles'
import PopupModal from '../popupModal/PopupModal'
import { socket } from '../../lib/socket'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import PieChart from '../charts/PieChart'
import { current } from '@reduxjs/toolkit'


export const Root = styled(m.div)`
max-width: 1920px;
margin: 0px auto;
padding: 15px 20px;
margin-bottom: 20px;
width: 80%;
@media (max-width: 600px) {
  width: unset;
}
@media (min-width: 601px) and (max-width: 768px) {
  width: unset;
}
@media (min-width: 769px) and (max-width: 1440px) {
  width: unset;
}
@media (min-width: 1921px) and (max-width: 2560px) {
  width: 60%;
}
`
export const TimeLineHolder = styled(m.div)`
display: flex;
margin-top: 10px;
overflow: hidden;
user-select: none;
`


export const Item = styled(m.div)`
position: relative;


margin: 10px auto;
&:not(:first-child)::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 5px;
  transition: all 0.5s ease;
 
  top: 50%;
  transform: translateY(-50%);
  z-index: unset;
  left: -100%;
}



@media (min-width: 0px) and (max-width: 425px)  {

}
@media (min-width: 426px) and (max-width: 768px) {

}
`
export const ItemInner = styled.div`
color: ${props => props.theme.text}!important;
cursor: pointer;
border-radius: 5px;

padding: 15px;
position: relative;
display: flex;
flex-direction: row;

transition: all 0.5s ease;
z-index: 2;
justify-content: space-between;
@media (max-width: 600px) {
  flex-direction: column-reverse;
  padding: 0px;
}
@media (min-width: 601px) and (max-width: 768px) {
  flex-direction: column-reverse;
}

`
export const ImageItemInner = styled.div`
color: ${props => props.theme.text}!important;
cursor: pointer;
border-radius: 5px;
background: ${props => props.theme.primary}!important;
position: relative;


transition: all 0.5s ease;
z-index: 2;
justify-content: space-between;
`
export const Tag = styled(m.div)`
background: #8bab50;
padding: 0px 15px;
width: fit-content;
border-radius: 50px;
color: ${props => props.theme.textW}!important;
`

export const ItemInnerUpper = styled(m.div)`
display: flex;
justify-content: space-between;
`
export const ImageItemInnerUpper = styled(m.div)`
display: flex;
justify-content: space-between;
padding:15px
`
export const ItemInnerContent = styled(m.div)`
padding: 10px;
background: white;
color:black;
margin: 15px 0px;
border-radius: 5px;
`
export const ItemInnerContentImage = styled(m.div)`


color:black;

border-radius: 5px;
`

export const ItemInnerActionHolder = styled(m.div)`
display: flex;
justify-content: end;
`
export const ImageItemInnerActionHolder = styled(m.div)`
padding: 15px;
display: flex;
justify-content: end;
`

export const TextButtonSvg = styled(m.div)`
svg{
    color:  ${props => props.theme.accent};
    font-size: 20px;
    margin-right: 10px;
    path{
      stroke:  ${props => props.theme.accent};
    }
  }
`
export const TextButtonSvgDelete = styled(m.div)`
color:  ${props => props.theme.warn};;
font-size: 20px;

font-weight: bold;
cursor:pointer;
display: flex;

svg{
  path{
    stroke:  ${props => props.theme.warn};
  }
}
`
export const Image = styled(m.img)`


aspect-ratio: 16/12;

`
export const RootInner = styled(m.div)`


`
export const ItemInnerLeft = styled(m.div)`
width: 35%;
padding:40px;
padding-left: 0px;
padding-bottom: 0px;
align-items: center;
display: flex;
@media (max-width: 600px) {
  width: unset;
  padding:40px 0px;
  padding-bottom: 0px;
}
@media (min-width: 601px) and (max-width: 768px) {
  width: unset;
  padding:40px;
  padding-bottom: 0px;
}
`



export const ItemInnerRightOutter = styled(m.div)`
overflow: hidden;
width: 60%;
height: fit-content;
margin:20px;
position: relative;
border-radius: 5px;
@media (max-width: 600px) {
  width: unset;
  margin:0px;
}
@media (min-width: 601px) and (max-width: 768px) {
  width: unset;
  margin:0px;
}
h1{
  margin-bottom:10px;
}
`

export const ItemInnerRight = styled(m.div)`
background: ${props => props.theme.primary}!important;
position: relative;
z-index: 4;
border-radius: ${props => props.showMore ? "5px 5px 0px 0px": "5px"};;
height: fit-content;
padding:20px;

@media (max-width: 600px) {
  width: unset;
}
@media (min-width: 601px) and (max-width: 768px) {
  width: unset;
}
`


export const ItemInnerRightTop = styled(m.div)`
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 20px;

`

export const ItemInnerRightItemText = styled(m.div)`
display: flex;
font-size: 18px;
justify-content: space-between;
width: 100%;
span{
  white-space: nowrap;
margin:0px 10px;
color: ${props => props.theme.accent}!important;
}
`

export const ItemInnerRightItemTextHolder = styled(m.div)`


`

export const ItemInnerRightHidden = styled(m.div)`
transform: ${props => props.showMore ? "translateY(0%)": "translateY(-100%)"};
position: ${props => props.showMore ? "unset": " absolute"};
opacity: ${props => props.showMore ? "100%": " 0%"};
padding: 0px 20px;
background: ${props => props.theme.primary};
border-radius: 0px 0px 10px 10px;
transition: all 0.5s ease;
width: 100%;
right: 0;
left: 0px;

`

export const ItemInnerRightItem = styled(m.div)`
display: flex;
justify-content: space-between;
padding: 15px 0px;
border-bottom: 2px solid ${props => props.theme.secondary};

`
export const ItemInnerRightItemEnd = styled(m.div)`
display: flex;
justify-content: space-between;
padding: 15px 0px;
border-bottom: 2px solid ${props => props.theme.secondary};
`

export const ShowMore = styled(m.h2)`

text-align: center;
color: ${props => props.theme.accent};
padding: 15px 0px;
padding-bottom: 0px;
`

const TimelineFeeding = ({ plant, activeWeek, title, actionTypeData, handleSetCoverImage, publicPage }) => {

  const [feedingData, setFeedingData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [feedingDataFound, setFeedingDataFound] = useState(false)
  
  const [modalData, setModalData] = useState([])
  const [modalType, setModalType] = useState('')
  const params = useParams()

  useEffect(() => {
    if (plant) {

      // socket.on(`image_added${params.plant_id}`, (data) => {
      //   let arr = [...feedingData, data];
      //   console.log('image_added')
      //   group_by(arr, setFeedingData, plant);
      // });

      // socket.on(`action_deleted${params.plant_id}`, (data) => {
      //   console.log('action_deleted', data)
      //   setFeedingData(feedingData.filter((i) => i.plant_action_id !== parseInt(data.plant_action_id)))
      // });

    }
  }, [plant, feedingData]);


  useEffect(() => {
    if (plant) {


      axios.post(`${BASE_URL_PROD}/plants/actions/1`, plant)
        .then((response) => {
          if (response.data.length > 0) {
            group_by(response.data, setFeedingData, plant)
          } else {

          }

        }).catch((err) => {
          console.log("err", err)
        })
    }
  }, [plant]);





  const group_by = (data, setter, plant) => {
    console.log("plant", plant)
    console.log("data", data)

    // Assuming you have the necessary data and variables
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const startDateIn = new Date(getLocalizedDate(plant.creation_date))


    // Localize each date in the object and calculate the week number
    const localizedData = data.map((item) => {
      const localizedDate = utcToZonedTime(item.creation_date, userTimeZone);
      const startDateLocalized = startOfWeek(startDateIn, { weekStartsOn: 1 }); // Adjust week start day if needed
      let day = getWeekandDay(item.creation_date).day
      const week = differenceInWeeks(localizedDate, startDateLocalized) + 1;
      return { ...item, creation_date: localizedDate, week, day };
    });


    let sorted = localizedData.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date))


    const result = sorted.reduce((acc, item) => {
      const { day } = item;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(item);
      return acc;
    }, {});

    setter(result)
    if(result){
      setFeedingDataFound(true)
    }else{
      setFeedingDataFound(false)
    }
  
  }

  const openModal = (type, data) => {
    switch (type) {

      case "deleteImage":
        setModalType(type)
        setModalData(data)
        setModalOpen(!modalOpen)
        break;

    }
  }


  return (
   
       <>
        {feedingDataFound  && 
    <Root>


      <RootInner>

        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
     
          slidesPerView={1}
          breakpoints={{
            0: {
              slidesPerView: 1,
           
            },
            600: {
              slidesPerView: 1,
          
            },
            768: {
              slidesPerView: 1,
             
            },
            1024: {
              slidesPerView: 1,
         
            },
          }}

        >

          {Object.keys(feedingData).map((i) => {
            if (feedingData[i]?.filter((a) => a.week == activeWeek).length > 0) {
              return (
                <SwiperSlide>
                  <Item>

                    <ItemInner >


                      <ItemInnerLeft>
             
                        <PieChart data={feedingData[i]?.filter((a) => a.week == activeWeek).map((a) => a.nutrient_amount)} labels={feedingData[i]?.filter((a) => a.week == activeWeek).map((a) => a.nutrient_name)} />
                      </ItemInnerLeft >

                      <ItemInnerRightOutter >
                      {/* <Heading>{title}</Heading>   */}
                      <ItemInnerRightTop>
                        <Tag>{feedingData[i][0].day}</Tag>
                        </ItemInnerRightTop>
                      <ItemInnerRight showMore={showMore}>
                        
                   
                      
                        <ItemInnerRightItemEnd>{feedingData[i]?.filter((a) => a.week == activeWeek).reduce((accumulator, curValue)=>{return accumulator + curValue.water_amount}, 0) } Litres of Water Used </ItemInnerRightItemEnd>
                        <ItemInnerRightItemEnd>Ph Range {feedingData[i]?.filter((a) => a.week == activeWeek).reduce((accumulator, curValue)=>{return accumulator + curValue.water_amount}, 0) }</ItemInnerRightItemEnd>
                        <ItemInnerRightItemEnd>Ec Range {feedingData[i]?.filter((a) => a.week == activeWeek).reduce((accumulator, curValue)=>{return accumulator + curValue.water_amount}, 0) }</ItemInnerRightItemEnd>

                    
                        <ShowMore onClick={()=>{setShowMore((showMore) => !showMore)}}>Show More</ShowMore>
                      
                      </ItemInnerRight >

                      <ItemInnerRightHidden showMore={showMore}>
                        <ItemInnerRightItemTextHolder >
                        {feedingData[i]?.filter((a) => a.week == activeWeek).map((a) => {
                          return (
                            <ItemInnerRightItem>
                               
                            
                              
                              <ItemInnerRightItemText>
                                
                                <p>{a.nutrient_name}</p>
                                <span>{a.nutrient_amount} {a.nutrient_measurement_unit}</span>
                              </ItemInnerRightItemText>
                             

                              {!publicPage &&
                                <ItemInnerActionHolder>

                                  <TextButtonSvg onClick={() => openModal('editNote', a)}><FiEdit /></TextButtonSvg>
                                  <TextButtonSvgDelete onClick={() => openModal('deleteNote', a)}><RiDeleteBin5Line /></TextButtonSvgDelete>
                                </ItemInnerActionHolder>
                              }
                            </ItemInnerRightItem>
                          )
                        })}
                         </ItemInnerRightItemTextHolder>
                         </ItemInnerRightHidden>
                         </ItemInnerRightOutter >
                    </ItemInner>

                  </Item>
                </SwiperSlide>
              )
            }

          })}

        </Swiper>
      </RootInner>
    </Root>
      }
    </>

 
  )
}

export default TimelineFeeding