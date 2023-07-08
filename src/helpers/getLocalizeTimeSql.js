import moment from 'moment-timezone';

export function getLocalizeTimeSql(date) {
  const targetDate = moment.utc(date);
  const userTimeZone = moment.tz.guess();
  const getLocalizeTimeSql = targetDate.tz(userTimeZone).format('YYYY-MM-DD HH:mm:ss');

  return getLocalizeTimeSql;
}
