import { formatISO, parse } from 'date-fns';

export const dayAndTimeToISO = (dateTime: {date: string, hour: string}) => {
  const dateTimeString = `${dateTime.date} ${dateTime.hour}`;
  const parsedDate = parse(dateTimeString, 'dd/MM/yyyy HH:mm', new Date());
  const isoDate = formatISO(parsedDate);
  return isoDate;
};
