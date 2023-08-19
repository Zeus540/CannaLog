import React, { useEffect, useState, useRef } from 'react'
import { Heading } from '../../utils/global_styles'
import {
  Root,
  WeekHolder,
  WeekActive,
  WeekTextTop,
  WeekTextBottom,
  Week
} from './Weeks_styles'
import { format, startOfWeek, addWeeks, differenceInWeeks } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/bundle';



const Weeks = ({ startDate, actions, handleActiveWeeks, activeWeek }) => {

  const [weeks, setWeeks] = useState([])

  function removeDuplicateWeeks(data) {
    const uniqueWeeks = new Set();
    return data.filter((item) => {
      if (uniqueWeeks.has(item.week)) {
        return false;
      }
      uniqueWeeks.add(item.week);
      return true;
    });
  }

  useEffect(() => {

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const startDateIn = new Date(startDate)

    const localizedData = actions.map((item) => {
      const localizedDate = utcToZonedTime(item.creation_date, userTimeZone);
      const startDateLocalized = startOfWeek(startDateIn, { weekStartsOn: 1 });
      const week = differenceInWeeks(localizedDate, startDateLocalized) + 1;
      return { ...item, creation_date: localizedDate, week };
    });

    const uniqueLocalizedData = removeDuplicateWeeks(localizedData);

    setWeeks(uniqueLocalizedData.sort((a, b) => a.week - b.week));
    handleActiveWeeks(uniqueLocalizedData[uniqueLocalizedData.length - 1]?.week);
  }, [actions]);

  const handleActiveWeekSelect = (w) => {
    handleActiveWeeks(w)
  }

  return (
    <Root>

      <Heading>Weeks</Heading>
      <WeekHolder>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          normalizeSlideIndex={true}
          modules={[Pagination]}
          initialSlide={4}
          updateOnWindowResize={true}
        
          spaceBetween={weeks.length > 1 ? 20 : 0}
          slidesPerView={4}
          activeIndex={activeWeek}
          breakpoints={{

            320: {
              slidesPerView: 3,
              spaceBetween: weeks.length > 1 ? 20 : 0,
            },
            375: {
              slidesPerView: 3,
              spaceBetween: weeks.length > 1 ? 20 : 0,
            },
            425: {
              slidesPerView: 4,
              spaceBetween: weeks.length > 1 ? 20 : 0,
            },
            600: {
              slidesPerView: 5,
              spaceBetween: weeks.length > 1 ? 20 : 0,
            },
            768: {
              slidesPerView: 7,
              spaceBetween: weeks.length > 1 ? 20 : 0,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: weeks.length > 1 ? 20 : 0,
            },
          }}

        >
          {weeks.map((w) => {
            return (
              <SwiperSlide >
                {activeWeek == w.week ?
                  <WeekActive onClick={() => handleActiveWeekSelect(w.week)}  >
                    <WeekTextTop>Week</WeekTextTop>
                    <WeekTextBottom>{w.week}</WeekTextBottom>
                  </WeekActive>
                  :
                  <Week onClick={() => handleActiveWeekSelect(w.week)}>
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