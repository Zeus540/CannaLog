import { startOfDay, differenceInDays } from 'date-fns';
import { getLocalizeTime } from './getLocalizeTime';

export function getElapsedDays(data) {
  const localizedDateTime = startOfDay(new Date(getLocalizeTime(data)));
  const currentDate = startOfDay(new Date());

  const daysDifference = differenceInDays(currentDate, localizedDateTime) + 1;
  
  return daysDifference;
}