import { format } from 'date-fns';
import { toDate } from 'date-fns-tz';

export function getLocalizeTime(date) {
  const targetDate = toDate(date);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localizedTime = format(targetDate, 'MMM d, yyyy h:mm aa', { timeZone: userTimeZone });

  return localizedTime;
}