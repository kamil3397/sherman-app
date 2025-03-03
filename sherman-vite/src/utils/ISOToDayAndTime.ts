import { format,  parseISO } from 'date-fns';

export const ISOToDayAndTime = (isoDate: string) => {
  const parsedDate = parseISO(isoDate);
  const formattedDate = format(parsedDate, 'dd/MM/yyyy');
  const formattedHour = format(parsedDate, 'HH:mm');
  return { date: formattedDate, hour: formattedHour };
};
