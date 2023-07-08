import { format } from 'date-fns';
import { toDate } from 'date-fns-tz';

export function getLocalizedDate(date) {
  const targetDate = toDate(date);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localizedDate = format(targetDate, 'MMM d, yyyy', { timeZone: userTimeZone });

  return localizedDate;
}