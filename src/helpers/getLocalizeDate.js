import { toDate} from 'date-fns-tz';
import { format,startOfToday, startOfDay, differenceInWeeks } from 'date-fns';

export function getLocalizedDate(date) {
  const targetDate = toDate(date);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localizedDate = format(targetDate, 'MMM d, yyyy', { timeZone: userTimeZone });

  return localizedDate;
}

export function getWeekandDay(date) {
  const targetDate = toDate(date);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // Get the day of the year and week number
  const dayOfWeek = format(targetDate, 'EEE', { timeZone: userTimeZone });

  const specifiedDate = new Date(date);
  const currentDate = startOfToday();

  // Localize the specified date to the user's timezone
  const localizedDateTime = startOfDay(specifiedDate);

  // Calculate the number of elapsed days
  const daysDifference = differenceInWeeks(currentDate, localizedDateTime);

  // Calculate the number of weeks passed
  const weeksPassed = Math.floor(daysDifference) + 1 ;
    
  return {day:dayOfWeek,week:weeksPassed};
}
