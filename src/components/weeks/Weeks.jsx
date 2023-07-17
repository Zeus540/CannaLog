import React,{useEffect,useState} from 'react'

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



const Weeks = ({startDate,actions}) => {

const [weeks, setWeeks] = useState([])
const [actionsList, setActionsList] = useState([])

const [activeWeek, setActiveWeek] = useState('')   // Determine the user's timezone


 // Helper function to remove duplicate weeks
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
  // Assuming you have the necessary data and variables
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const startDateIn = new Date(startDate)
  

  // Localize each date in the object and calculate the week number
  const localizedData = actions.map((item) => {
    const localizedDate = utcToZonedTime(item.creation_date, userTimeZone);
    const startDateLocalized = startOfWeek(startDateIn, { weekStartsOn: 1 }); // Adjust week start day if needed
    const week = differenceInWeeks(localizedDate, startDateLocalized) + 1;
    return { ...item, creation_date: localizedDate, week };
  });

  // Remove duplicate weeks from localizedData
  const uniqueLocalizedData = removeDuplicateWeeks(localizedData);

  setWeeks(uniqueLocalizedData.sort((a, b) => a.week - b.week));
  setActionsList(localizedData.sort((a, b) => a.week - b.week));
  setActiveWeek(uniqueLocalizedData[uniqueLocalizedData.length - 1]?.week);
}, [actions]);

const handleActiveWeek = (w)=>{
  setActiveWeek(w)
}

  return (
    <Root>
      

         <Heading>Weeks</Heading>
         <WeekHolder>
         {weeks.map((w)=>{
        return(
          <>
            {activeWeek == w.week ? 
            <WeekActive onClick={()=>handleActiveWeek(w.week)}>
            <WeekTextTop>Week</WeekTextTop>
            <WeekTextBottom>{w.week}</WeekTextBottom>
          </WeekActive>
          :
          <Week onClick={()=>handleActiveWeek(w.week)}>
          <WeekTextTop>Week</WeekTextTop>
          <WeekTextBottom>{w.week}</WeekTextBottom>
        </Week>
          }
          </>
        )
         })}
        </WeekHolder>

     
    </Root>
  )
}

export default Weeks