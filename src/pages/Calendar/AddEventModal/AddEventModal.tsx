import { FC, useEffect, useMemo, useState } from 'react';
import { Box, Typography, Button, Modal, Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SubjectIcon from '@mui/icons-material/Subject';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { useAlertContext } from '../../../context/AlertContext/AlertContext';
import { dayAndTimeToISO } from '../../../utils/dayAndTimeToISO';
import { FormAutocomplete, OptionType } from '../../../components/FormAutocomplete';
import { FormTextField } from '../../../components/FormTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateTimeISO } from 'types/DateTimeISO';
import { schema , FormData} from './schema';
import { getEventDefaultValues } from './getEventDefaultValues';

type EventModalProps = {
  open: boolean;
  onClose: () => void;
  eventDefaultDate?: DateTimeISO 
};


type UserType = {
  id: string;
  fullName: string;
  email: string;
};



export const AddEventModal: FC<EventModalProps> = ({ open, onClose, eventDefaultDate }) => {
  const [error, setError] = useState<string | null>(null);
  const [guestsOptions, setGuestsOptions] = useState<OptionType[]>([]);
  const { showSuccessAlert } = useAlertContext();

  const { control, handleSubmit, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: getEventDefaultValues(eventDefaultDate),
  });
  

  const closeModal = () => {
    reset();
    onClose()
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<UserType[]>('http://localhost:4000/users');
        const options = response.data.map((user) => ({
          value: user.id,
          label: user.fullName,
        }));
        setGuestsOptions(options);
      } catch {
        setError('Wystąpił błąd podczas pobierania użytkowników');
      }
    };
    fetchUsers();
  }, []);

  const guests = watch('guests');

  const filteredGuestsOptions = useMemo(() =>
    guestsOptions.filter(
      (option) => !guests.some((selected) => selected.value === option.value)
    ),
    [guests, guestsOptions]
  );

  // sprawdzam czy któryś z option nie jest w liscie guests
  // const filteredGuestsOptions = guestsOptions.filter(
  // jeśli któraś z option nie ma w liscie guests to pokazuje ją raz jeszcze w filteredGuestsOptions
  //   (option) => !guests.some((selected) => selected.value === option.value)
  // );

  const onSubmit = async (values: FormData) => {
    try {
      const startDate = dayAndTimeToISO({ date: values.date, hour: values.time });
      const endDate = dayAndTimeToISO({ date: values.date, hour: values.endTime });

      const body = {
        ...values,
        startDate,
        endDate,
      };

      await axios.post('http://localhost:4000/calendar/events/add', body);
      showSuccessAlert('Event added successfully');
      closeModal();
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || 'An unexpected error occurred.';
      setError(errorMessage);
        // przetestowac error case
    }
  };

  return (
    <Modal open={open} onClose={closeModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 455,
          bgcolor: 'secondary.light',
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <IconButton
          onClick={closeModal}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'primary.main',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" sx={{ color: 'primary.main' }}>
          Dodaj wydarzenie
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CreateIcon sx={{ color: 'primary.dark' }} />
              <FormTextField
                variant="outlined"
                name="title"
                control={control}
                label="Tytuł wydarzenia"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon sx={{ color: 'primary.dark' }} />
              <FormTextField name="date" control={control} label="Data" type="date" fullWidth />
              <FormTextField
                name="time"
                control={control}
                label="Godzina rozpoczęcia"
                type="time"
                fullWidth
                error={!!errors.time}
                helperText={errors.time?.message}
              />
              <FormTextField
                name="endTime"
                control={control}
                label="Godzina zakończenia"
                type="time"
                fullWidth
                error={!!errors.endTime}
                helperText={errors.endTime?.message}
              />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <SubjectIcon sx={{ color: 'primary.dark' }} />
              <FormTextField
                name="description"
                control={control}
                label="Opis"
                multiline
                rows={3}
                fullWidth
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" color="primary.main">
              <PeopleIcon sx={{ color: 'primary.dark' }} />
              <FormAutocomplete
                name="guests"
                control={control}
                label="Goście"
                limitTags={3}
                options={filteredGuestsOptions}
                fullWidth
              />
            </Stack>

            <Button type="submit" sx={{ alignSelf: 'flex-end', mt: 2 }}>
              Zapisz
            </Button>

            {error && <Typography color="error">{error}</Typography>}
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

