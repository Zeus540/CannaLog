import { useEffect, useState } from 'react'
import {
  Root,
  WeekHolder,
  WeekActive,
  WeekTextTop,
  WeekTextBottom,
  Week
} from './Weeks_styles'
import {  startOfWeek, differenceInWeeks } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/bundle';


const Weeks = ({ startDate, actions, handleActiveWeeks, activeWeek }) => {

  const [weeks, setWeeks] = useState([])

  function removeDuplicateWeeks(data) {
    const uniqueWeeks = new Set();
    return  data.filter((item) => {
      if (uniqueWeeks.has(item.week)) {
        return false;
      }
      uniqueWeeks.add(item.week);
      return true;
    });
  }


  useEffect(() => {
    group_by(startDate, actions.filter((a)=> a.plant_action_type_id !== 14), activeWeek)
  }, [startDate,actions,activeWeek]);

  const group_by = async(startDate, actions, activeWeek) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const startDateIn = new Date(startDate)

    const localizedData = actions.map((item) => {
      const localizedDate = utcToZonedTime(item.creation_date, userTimeZone);
      const startDateLocalized = startOfWeek(startDateIn, { weekStartsOn: 1 });
      const week = differenceInWeeks(localizedDate, startDateLocalized)  ;
      return { ...item, creation_date: localizedDate, week };
    });

    const uniqueLocalizedData = await removeDuplicateWeeks(localizedData);

     setWeeks(uniqueLocalizedData.sort((a, b) => a.week - b.week));

    if (activeWeek == undefined) {
       handleActiveWeeks(uniqueLocalizedData[uniqueLocalizedData.length - 1]?.week);
    }

  }

 

  return (
    <Root>

      {/* <Heading>Weeks</Heading> */}
      <WeekHolder>
    
        
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          normalizeSlideIndex={true}
          modules={[Pagination]}
          initialSlide={activeWeek}
          updateOnWindowResize={true}
          spaceBetween={20}
          activeindex={activeWeek}
  
          breakpoints={{

            320: {
              slidesPerView: 3,
           
            },
            375: {
              slidesPerView: 3,
         
            },
            425: {
              slidesPerView: 3,
           
            },
            600: {
              slidesPerView: 5,
            
            },
            768: {
              slidesPerView: 7,
             
            },
            1024: {
              slidesPerView: 7,
             
            },
          }}

        >
          {weeks.map((w,index) => {
            return (
              <SwiperSlide key={index}>
                {activeWeek == w.week ?
                  <WeekActive onClick={() => handleActiveWeeks(w.week)}  >
                    <WeekTextTop>Week</WeekTextTop>
                    <WeekTextBottom>{w.week}</WeekTextBottom>
                  </WeekActive>
                  :
                  <Week onClick={() => handleActiveWeeks(w.week)}>
                    <WeekTextTop>Week</WeekTextTop>
                    <WeekTextBottom>{w.week}</WeekTextBottom>
                  </Week>
                }
              </SwiperSlide>
            )
          })}
        </Swiper>

      </WeekHolder>

    </Root>
  )
}

export default Weeks