import moment from 'moment-timezone';

const getCurrentTimestamp = (): string => {
  const now = moment().tz('America/Los_Angeles');
  const year = now.format('YYYY');
  const month = now.format('MM');
  const day = now.format('DD');
  const hours = now.format('HH');
  const minutes = now.format('mm');
  const seconds = now.format('ss');
  return `${year}${month}${day}_${hours}${minutes}${seconds}_PST`;
};

export { getCurrentTimestamp };
