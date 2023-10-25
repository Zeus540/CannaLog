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

export const Root = styled(m.div)`
max-width: 1920px;
margin: 0px auto;
padding: 15px;
padding-bottom: 20px;
`
export const TimeLineHolder = styled(m.div)`
display: flex;
margin-top: 10px;
overflow: hidden;
user-select: none;
`


export const Item = styled(m.div)`
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
export const ItemInner = styled.div`
color: ${props => props.theme.text}!important;
cursor: pointer;
border-radius: 5px;
background: ${props => props.theme.primary}!important;
padding: 15px;
position: relative;


transition: all 0.5s ease;
z-index: 2;
justify-content: space-between;
`
export const ImageItemInner = styled.div`
color: ${props => props.theme.text}!important;
cursor: pointer;
border-radius: 5px;

position: relative;


transition: all 0.5s ease;
z-index: 2;
justify-content: space-between;
`
export const Tag = styled(m.div)`
background: ${props => props.theme.accent};
padding: 0px 15px;
width: fit-content;
border-radius: 50px;
align-items: center;
display: flex;
color: ${props => props.theme.textW}!important;
`

export const ItemInnerUpper = styled(m.div)`
display: flex;
justify-content: space-between;
`
export const ImageItemInnerUpper = styled(m.div)`
display: flex;
justify-content: space-between;
padding:15px 0px;

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
picture,source,img{
  
border-radius: 5px;
}
`

export const ItemInnerActionHolder = styled(m.div)`
display: flex;
justify-content: end;
`
export const ImageItemInnerActionHolder = styled(m.div)`
padding: 15px 0px;
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


aspect-ratio: 16/15;

`
export const RootInner = styled(m.div)`


`

const TimelineImages = ({ plant, activeWeek, title, actionTypeData, handleSetCoverImage, publicPage }) => {

  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState([])
  const [modalType, setModalType] = useState('')
  const params = useParams()
  const socket = useSocket()

  useEffect(() => {
    if (plant && socket) {

      socket.on(`image_added${params.plant_id}`, (data) => {
        let arr = [...images, data];
        console.log('image_added')
        group_by(arr, setImages, plant);
      });

      socket.on(`action_deleted${params.plant_id}`, (data) => {
        console.log('action_deleted',data)
        setImages(images.filter((i)=> i.plant_action_id !== parseInt(data.plant_action_id)))
      });
      
    }
  }, [plant, images,socket]);


  useEffect(() => {
    if (plant) {


      axios.post(`${BASE_URL_PROD}/plants/actions/4/${plant.plant_id}`)
        .then((response) => {
          if (response.data.length > 0) {
            group_by(response.data, setImages, plant)
          } else {

          }


        }).catch((err) => {
          console.log("err", err)
        })
    }
  }, [plant]);





  const group_by = (data, setter, plant) => {

    console.log("data", data)

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


      {images?.filter((a) => a.week == activeWeek).length > 0 &&
        <Root>
          {/* <Heading>{title}</Heading> */}
          <RootInner>
            {modalOpen && <PopupModal openModal={openModal} plant={plant} data={modalData} modalType={modalType} />}

            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              spaceBetween={50}
              slidesPerView={5}
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
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                1440: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
                1920: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
                2560: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
             //loop={true}
            >

              {images?.filter((a) => a.week == activeWeek)?.map((a,index) => {
                return (
                  <SwiperSlide  key={index}>

                    <Item >
                      <ImageItemInner >

                        <ImageItemInnerUpper>
                          <Tag>{getWeekandDay(a.creation_date).day}</Tag>
                          <h2>{getLocalizedDate(a.creation_date)}</h2>


                        </ImageItemInnerUpper>

                        <ItemInnerContentImage>
                          <picture>
                            <source src={a.thumbnail_img_next_gen} type="image/webp" />

                            <Image src={a.thumbnail_img} width="100%" />
                          </picture>
                        </ItemInnerContentImage>


                        {!publicPage &&
                          <ImageItemInnerActionHolder>


                            <TextButtonSvg onClick={() => handleSetCoverImage(a.full_img, a.thumbnail_img)}><FiEdit /></TextButtonSvg>
                            <TextButtonSvgDelete onClick={() => openModal('deleteImage', a)}><RiDeleteBin5Line /></TextButtonSvgDelete>
                          </ImageItemInnerActionHolder>
                        }
                      </ImageItemInner>
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

export default TimelineImages