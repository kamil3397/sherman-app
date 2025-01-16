import { eachDayOfInterval, format, getWeek, lastDayOfISOWeek, parse } from 'date-fns';

export const getCurrentWeek = (startDate: Date) => {
  const currentWeek = getWeek(startDate);
  const firstDayOfWeek = parse(currentWeek.toString(), 'I', startDate);
  const lastDayOfWeek = lastDayOfISOWeek(firstDayOfWeek);

  const daysOfWeek = eachDayOfInterval({ start: firstDayOfWeek, end: lastDayOfWeek });

  return daysOfWeek;
};
