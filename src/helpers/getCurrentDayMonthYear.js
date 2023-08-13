import { format, getYear, getMonth, getDate } from 'date-fns';

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const dayNames = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];

export function getCurrentDayMonthYear() {

  const currentDate = new Date();
  const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  const year = getYear(currentDate);
  const month = getMonth(currentDate);
  const monthAbbreviation = monthNames[month];
  const day = getDate(currentDate) - 1;
  const dayAbbreviation = dayNames[day];
  
  // Construct the full date string
  const fullDate = format(currentDate, "MMM d, yyyy h:mm aa");
  
  let obj = {
    year,
    month,
    monthAbbreviation,
    day,
    dayAbbreviation,
    fullDate,
  };
  
  return obj;
}