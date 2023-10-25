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
import { useSocket } from '../../context/SocketContext'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

 const Root = styled(m.div)`
max-width: 1920px;
margin: 0px auto;
padding: 15px 20px;
`
 const TimeLineHolder = styled(m.div)`
display: flex;
margin-top: 10px;
overflow: hidden;
user-select: none;
`


 const Item = styled(m.div)`
position: relative;

width: 100%;
margin: 10px 20px;
&:not(:first-child)::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 5px;
  transition: all 0.5s ease;
  background: ${props => props.border}!important;
  top: 50%;
  transform: translateY(-50%);
  z-index: unset;
  left: -100%;
}
&:first-child{
  margin-left: 0px;
  
}
&:last-child{
  margin-right: 0px;
}

@media (min-width: 0px) and (max-width: 425px)  {

}
@media (min-width: 426px) and (max-width: 768px) {

}
`
 const ItemInner = styled.div`
color: ${props => props.theme.text}!important;
cursor: pointer;
border-radius: 5px;

padding: 0px 0px;
position: relative;
padding-bottom: 0px;
transition: all 0.5s ease;
z-index: 2;
justify-content: space-between;
`
 const ImageItemInner = styled.div`
color: ${props => props.theme.text}!important;
cursor: pointer;
border-radius: 5px;

position: relative;


transition: all 0.5s ease;
z-index: 2;
justify-content: space-between;
`
 const Tag = styled(m.div)`
background: ${props => props.theme.accent};
padding: 5px 15px;
width: fit-content;
font-size:14px;
border-radius: 50px;
color: ${props => props.theme.textW}!important;
`

 const ItemInnerUpper = styled(m.div)`
display: flex;
justify-content: space-between;
padding: 15px 0px;
padding-top: 0px;
align-items: center;
color: ${props => props.theme.text}!important;
`

const ItemInnerUpperDiv = styled(m.div)`
width: 100%;
height: 2px;
background: ${props => props.theme.accent}!important;
`

const ItemInnerUpperHeading = styled(m.h1)`
white-space: nowrap;
margin: 0px 20px;
`

 const ItemInnerContent = styled(m.div)`
 padding: 15px;
text-align: center;

color:${props => props.theme.text};
margin: 0px 0px;
border-radius: 5px;

`

const ItemInnerContentFlex = styled(m.div)`
display: flex;
    justify-content: space-between;
`

 const ItemInnerActionHolder = styled(m.div)`
display: flex;
justify-content: center;
padding-top: 15px;
`

 const TextButtonSvg = styled(m.div)`
 padding: 5px;
svg{
    color:  ${props => props.theme.accent};
    font-size: 20px;

    path{
      stroke:  ${props => props.theme.accent};
    }
  }
`
 const TextButtonSvgDelete = styled(m.div)`
 padding: 5px;
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

 const RootInner = styled(m.div)`


`

const TimelineNotes = ({ plant, activeWeek,openModal, title,publicPage }) => {
  const [notes, setNotes] = useState([]);
  const params = useParams()
  const socket = useSocket()

  useEffect(() => {

    if (plant && socket) {
      socket.on(`note_added${params.plant_id}`, (data) => {
        console.log(data)
        let arr = [...notes, data];
        group_by(arr, setNotes, plant);
      });

      socket.on(`action_deleted${params.plant_id}`, (data) => {
        console.log('action_deleted',data)
        setNotes(notes.filter((i)=> i.plant_action_id !== parseInt(data.plant_action_id)))
      });

    }

  }, [plant, notes,socket]);


  useEffect(() => {

    if (plant) {
      axios.post(`${BASE_URL_PROD}/plants/actions/13/${plant.plant_id}`)
        .then((response) => {
          if (response.data.length > 0) {
            group_by(response.data, setNotes, plant)
          } else {

          }

        }).catch((err) => {
          console.log("err", err)
        })
    }
  }, [plant]);


  const group_by = (data, setter, plant) => {

    // Assuming you have the necessary data and variables
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const startDateIn = new Date(getLocalizedDate(plant.creation_date))


    // Localize each date in the object and calculate the week number
    const localizedData = data.map((item) => {
      const localizedDate = utcToZonedTime(item.creation_date, userTimeZone);
      const startDateLocalized = startOfWeek(startDateIn, { weekStartsOn: 1 }); // Adjust week start day if needed
      const week = differenceInWeeks(localizedDate, startDateLocalized) + 1;
      return { ...item, creation_date: localizedDate, week };
    });



    setter(localizedData.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date)))
  }





  return (
    <>
      {notes?.filter((a) => a.week == activeWeek).length > 0 &&
        <Root>
          {/* <Heading>{title}</Heading> */}
          <RootInner>
           
            <ItemInnerUpper>
                         <ItemInnerUpperDiv></ItemInnerUpperDiv>
                         <ItemInnerUpperHeading>YOUR COMMMENTS</ItemInnerUpperHeading>
                         <ItemInnerUpperDiv></ItemInnerUpperDiv>
                          </ItemInnerUpper>
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              spaceBetween={50}
              slidesPerView={1}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                600: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 50,
                },
              }}
             //loop={true}
            >

              {notes?.filter((a) => a.week == activeWeek)?.map((a,index) => {
                return (
                  <SwiperSlide key={index}>
                      <Item >
                         

                        <ItemInner >
                        <ItemInnerContentFlex>
                        <Tag>{getWeekandDay(a.creation_date).day}</Tag>
                        <Tag>{getLocalizedDate(a.creation_date)}</Tag> 
                    
                       
                            </ItemInnerContentFlex>
                         
                          <ItemInnerContent>
                      
                            <p>{a.plant_note}</p>
                          </ItemInnerContent>
                          {!publicPage &&
                            <ItemInnerActionHolder>

                              <TextButtonSvg onClick={() => openModal('editNote', a)}><FiEdit /></TextButtonSvg>
                              <TextButtonSvgDelete onClick={() => openModal('deleteNote', a)}><RiDeleteBin5Line /></TextButtonSvgDelete>
                            </ItemInnerActionHolder>
                          }


                        </ItemInner>
                      </Item>
                  </SwiperSlide>

                )
              })


              }

            </Swiper>
          </RootInner>
        </Root>
      }
    </>
  )
}

export default TimelineNotes