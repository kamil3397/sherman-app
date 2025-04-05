import { OptionType } from 'components/FormAutocomplete';
import  * as yup from 'yup'

export const schema = yup.object({
  title: yup.string().required('Tytuł jest wymagany').min(3, 'Tytuł musi mieć co najmniej 3 znaki'),
  description: yup.string().required('Opis jest wymagany').min(3, 'Opis musi mieć co najmniej 3 znaki'),
  guests: yup.array().default([]),
  time: yup.string().required('Godzina rozpoczęcia jest wymagana'),
  endTime: yup
    .string()
    .required('Godzina zakończenia jest wymagana')
    .test(
      'is-later',
      'Ten sam czas zakończenia!',
      (endTime, { parent }) => {
        const startTime = parent.time;
        return startTime && endTime ? startTime < endTime : true;
      }
    ),
  date: yup.string().required('Data jest wymagana'),
});

export type FormData = {
    title: string;
    description: string;
    guests: OptionType[];
    time: string;
    endTime: string;
    date: string;
  };