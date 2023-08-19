import { startOfDay, differenceInDays,differenceInHours,differenceInMinutes } from 'date-fns';
import { getLocalizeTime } from './getLocalizeTime';

export function getElapsedDays(data) {
  const localizedDateTime = startOfDay(new Date(getLocalizeTime(data)));
  const currentDate = startOfDay(new Date());

  const daysDifference = differenceInDays(currentDate, localizedDateTime) + 1;
  
  return daysDifference;
}

 export function getElapsedDaysNotifications(data) {
   const localizedDateTime = startOfDay(new Date(getLocalizeTime(data)));
  const currentDate = startOfDay(new Date());

   const daysDifference = differenceInDays(currentDate, localizedDateTime);

   return daysDifference;
 }

export function getElapsedDaysNotificationsFull(data) {
  const localizedDateTime = new Date(getLocalizeTime(data));
  const currentDate = new Date();

  const daysDifference = differenceInDays(currentDate, localizedDateTime);
  const hoursDifference = differenceInHours(currentDate, localizedDateTime);
  const minutesDifference = differenceInMinutes(currentDate, localizedDateTime);

  return {
    daysDifference,
    hoursDifference,
    minutesDifference
  };
}