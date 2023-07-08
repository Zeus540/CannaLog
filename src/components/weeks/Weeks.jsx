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
import { getWeeksElapsed } from '../../helpers/getWeeksElapsed'
import { getLocalizeTime } from '../../helpers/getLocalizeTime'
import moment from 'moment-timezone';
import Timeline from '../timeline/Timeline'



const Weeks = ({startDate,actions}) => {

const [weeks, setWeeks] = useState([])
const [actionsList, setActionsList] = useState([])

const [activeWeek, setActiveWeek] = useState('')  
const userTimeZone = moment.tz.guess(); // Determine the user's timezone

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

 // Localize each date in the object and calculate the week number
 const localizedData = actions.map((item) => {
   const localizedDate = moment.tz(item.creation_date, userTimeZone);
   const startDateLocalized = moment.tz(startDate, userTimeZone);
   const week = localizedDate.diff(startDateLocalized, 'weeks') + 1;
   return { ...item, creation_date: localizedDate, week  };
 });
 
// Remove duplicate weeks from localizedData
const uniqueLocalizedData = removeDuplicateWeeks(localizedData);

 setWeeks(uniqueLocalizedData.sort((a,b) => a.week - b.week))
 setActionsList(localizedData.sort((a,b) => a.week - b.week)) 
 setActiveWeek(uniqueLocalizedData[uniqueLocalizedData.length - 1]?.week)

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