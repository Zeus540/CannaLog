import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion as m } from 'framer-motion'
import axios from '../../lib/axios'
import { BASE_URL_PROD } from '../../lib/Constants'
import { getLocalizedDate, getWeekandDay } from '../../helpers/getLocalizeDate'
import { startOfWeek, differenceInWeeks } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useSocket } from '../../context/SocketContext'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import PieChart from '../charts/PieChart'
import TimeLineHeading from '../headings/TimeLineHeading'


const Root = styled(m.div)`
max-width: 1920px;
margin: 0px auto;
padding: 15px;
padding-bottom: 20px;
 width: 70%;
@media (max-width: 600px) {
  width: unset;
}
@media (min-width: 601px) and (max-width: 768px) {
  width: unset;
}
@media (min-width: 769px) and (max-width: 1440px) {
  width: unset;
}

`

const Item = styled(m.div)`
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


const Tag = styled(m.div)`
background:${props => props.theme.accent};
padding: 0px 15px;
width: fit-content;
border-radius: 50px;
color: ${props => props.theme.textW}!important;
`


const ItemHolder = styled(m.div)`
display: flex;
justify-content: space-between;
padding: 10px;
border-bottom: 2px solid ${props => props.theme.accent};
div{
  display: flex;
}
p{
  color: ${props => props.theme.text}!important;
}
svg:nth-child(1){
  color: ${props => props.theme.accent}!important;
  font-size: 20px;
  margin-right:10px
}
svg:nth-child(2){
  color: ${props => props.theme.warn}!important;
  font-size: 20px;
}
`


const Holder = styled(m.div)`
padding: 0px 20px;
width: 50%;

@media (max-width: 600px) {
  width: 100%;

}

`

const RootInner = styled(m.div)`
display: flex;
justify-content: space-between;
flex-wrap:wrap;
`
const PieChartHolder = styled(m.div)`
width: 50%;
padding:40px 0px;

align-items: center;
display: flex;
margin: 0 auto;
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





const TimelineFeeding = ({ plant, activeWeek, publicPage,openModal }) => {

  const [feedingData, setFeedingData] = useState([]);
  const [wateringData, setWateringData] = useState([]);
  
  const [modalOpen, setModalOpen] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [feedingDataFound, setFeedingDataFound] = useState(false)

  const [modalData, setModalData] = useState([])
  const [modalType, setModalType] = useState('')
  const socket = useSocket()
  const params = useParams()

  useEffect(() => {

    if (plant && socket) {

      socket.on(`watering_added${params.plant_id}`, (data) => {
        let arr = [...Object.values(wateringData).flat(), data];
         group_by(arr, setWateringData, plant);
      });

      socket.on(`feeding_added${params.plant_id}`, (data) => {
        let arr = [...Object.values(feedingData).flat(), data];
        group_by(arr, setFeedingData, plant);
      });

        socket.on(`action_deleted${params.plant_id}`, (data) => {
          console.log('action_deleted', data)
          group_by(Object.values(wateringData).flat().filter((i) => i.plant_action_id !== parseInt(data.plant_action_id)), setWateringData, plant);
          group_by(Object.values(feedingData).flat().filter((i) => i.plant_action_id !== parseInt(data.plant_action_id)), setFeedingData, plant);
        });

    }
  }, [plant,feedingData,wateringData, socket]);


  useEffect(() => {
    if (plant) {

      axios.post(`${BASE_URL_PROD}/plants/actions/1/${plant.plant_id}`)
        .then((response) => {
          if (response.data.length > 0) {
            group_by(response.data, setWateringData, plant)
          } 

        }).catch((err) => {
          console.log("err", err)
        })

        axios.post(`${BASE_URL_PROD}/plants/actions/2/${plant.plant_id}`)
        .then((response) => {
          if (response.data.length > 0) {
            group_by(response.data, setFeedingData, plant)
          } 

        }).catch((err) => {
          console.log("err", err)
        })
    }
  }, [plant]);


  function groupByAndSortCustomOrder(array, key) {
    const customOrder = ['Sun', 'Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon'];

    const groupedData = array.reduce((result, obj) => {
        (result[obj[key]] = result[obj[key]] || []).push(obj);
        return result;
    }, {});

    // Sort keys based on the custom order
    const sortedKeys = Object.keys(groupedData).sort((a, b) => {
        return customOrder.indexOf(a) - customOrder.indexOf(b);
    });

    const sortedGroupedData = {};
    sortedKeys.forEach((key) => {
        sortedGroupedData[key] = groupedData[key];
    });

    return sortedGroupedData;
}


  const group_by = (data, setter, plant) => {

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

    let sorted = localizedData

    const groupedAndSortedData = groupByAndSortCustomOrder(sorted, 'day');

    setter(groupedAndSortedData)

  }




 


  return (

        <Root>

<TimeLineHeading heading="feeding"/>
          <RootInner>
          <Holder>
       
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
                      <Tag>{i}</Tag>
                       
                          {feedingData[i]?.filter((a) => a.week == activeWeek ).length > 0 &&
                            <PieChartHolder>
                              <PieChart data={feedingData[i]?.filter((a) => a.week == activeWeek ).map((a) => a.nutrient_amount)} labels={feedingData[i]?.filter((a) => a.week == activeWeek ).map((a) => a.nutrient_name)} />

                            </PieChartHolder >
                          }

                            {feedingData[i].map((itm)=>{
                          return(
                            <ItemHolder>
                              <div>
                              <p>{itm.nutrient_amount} {itm.measurement_unit } {itm.nutrient_name} </p>
                           
                           
                            </div>
                            {!publicPage && 
                            <div>
                              <FiEdit onClick={() => openModal('editFeeding', itm)}/>
                              <RiDeleteBin5Line onClick={() => openModal('deleteFeeding', itm)}/>
                            </div>
                            }
                            </ItemHolder>
                          )
                        })

                        }
                      </Item>
                    </SwiperSlide>
                  )
                }

              })}

            </Swiper>
            </Holder>
            <Holder>
          
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

              {Object.keys(wateringData).map((i) => {
                if (wateringData[i]?.filter((a) => a.week == activeWeek).length > 0) {
                  return (
                    <SwiperSlide>
                      <Item>

                      <Tag>{i}</Tag>
                        {wateringData[i].map((itm)=>{
                          return(
                            <ItemHolder>
                            <p>{itm.water_amount} {itm.measurement_unit } Water</p>
{!publicPage && 
<div>
                              <FiEdit onClick={() => openModal('editWatering', itm)}/>
                              <RiDeleteBin5Line onClick={() => openModal('deleteWatering', itm)}/>
                            </div>
                            }
                            

                            </ItemHolder>
                          )
                        })

                        }
              
                      </Item>
                    </SwiperSlide>
                  )
                }

              })}

            </Swiper>
            </Holder>
          </RootInner>
        </Root>
     
  )
}

export default TimelineFeeding