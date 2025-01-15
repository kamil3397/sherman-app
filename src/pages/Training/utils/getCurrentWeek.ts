import { eachDayOfInterval, format, getWeek, lastDayOfISOWeek, parse } from 'date-fns';

export const getCurrentWeek = (startDate: Date) => {
  const currentWeek = getWeek(startDate);
  const firstDayOfWeek = parse(currentWeek.toString(), 'I', startDate);
  const lastDayOfWeek = lastDayOfISOWeek(firstDayOfWeek);

  const daysOfWeek = eachDayOfInterval({ start: firstDayOfWeek, end: lastDayOfWeek });

  return daysOfWeek;
  // const weekdays = daysOfWeek.map((day) => {
  //   return {
  //     day: {
  //       date: format(day, 'dd/MM/yyyy'),
  //       name: format(day, 'EEEE'),
  //     },
  //     hours: [...Array(12)].map((_, hourIndex) => {
  //       const hour = 9 + hourIndex;
  //       return `${hour < 10 ? '0' : ''}${hour}:00`;
  //     }),
  //   };
  // });
  // return weekdays;
};
