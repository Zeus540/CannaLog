import { startOfToday, startOfDay, differenceInWeeks } from 'date-fns';

export function getWeek(data) {
  const specifiedDate = new Date(data);
  const currentDate = startOfToday();

  // Localize the specified date to the user's timezone
  const localizedDateTime = startOfDay(specifiedDate);

  // Calculate the number of elapsed days
  const daysDifference = differenceInWeeks(currentDate, localizedDateTime);

  // Calculate the number of weeks passed
  const weeksPassed = Math.floor(daysDifference) ;


  return weeksPassed;
}

