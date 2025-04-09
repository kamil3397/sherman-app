import { parseISO, format, addHours } from 'date-fns';
import { FormData } from '../pages/Calendar/AddEventModal/schema';

export const getEventDefaultValues = (eventDefaultDate?: string): FormData => {
  if (!eventDefaultDate) {
    return {
      title: '',
      description: '',
      guests: [],
      date: '',
      time: '',
      endTime: '',
    };
  }

  const dateObj = parseISO(eventDefaultDate);

  return {
    title: '',
    description: '',
    guests: [],
    date: format(dateObj, 'yyyy-MM-dd'),
    time: format(dateObj, 'HH:mm'),
    endTime: format(addHours(dateObj, 1), 'HH:mm'),
  };
};
