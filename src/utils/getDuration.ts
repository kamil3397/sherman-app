import { differenceInHours, parseISO } from 'date-fns';

export const getDuration = (startDate: string, endDate: string): number => {
  try {
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    return differenceInHours(end, start);
  } catch (err) {
    return 0; // 0 as falsy value
  }
};
