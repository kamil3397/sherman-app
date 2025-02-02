import { FC, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Modal,
  Stack,
  Autocomplete,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SubjectIcon from '@mui/icons-material/Subject';
import { useForm, Controller } from 'react-hook-form';
import { addHours } from 'date-fns';
import axios from 'axios';
import { useAlertContext } from 'context/AlertContext';
import { dayAndTimeToISO } from 'utils/dayAndTimeToISO';
import { FormAutocomplete, OptionType } from 'components/FormAutocomplete';
import { FormTextField } from 'components/FormTextField';

type EventModalProps = {
  open: boolean;
  onClose: () => void;
  dateTime: {
    date: string;
    hour: string;
  };
};

type FormData = {
  title: string;
  description: string;
  duration: number;
  guests: OptionType[];
  time: string;
  date: string;
};

type UserType = {
  id: string;
  fullName: string;
  email: string;
}

const AddEventModal: FC<EventModalProps> = ({ open, onClose, dateTime }) => {
  const [error, setError] = useState<string | null>(null);
  const [guestsOptions, setGuestsOptions] = useState<OptionType[]>([]);
  const { showSuccessAlert } = useAlertContext();

  const { handleSubmit, control, watch } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      duration: 1,
      guests: [],
    },
  });

  const guests = watch('guests');

  useEffect(() => {
    /* ogarnac tak, zeby dzialalo tez przy usuwaniu */
    const fileterdOptions = guestsOptions.filter((option) =>
      !guests.includes(option)
    );
    console.log(fileterdOptions);
    setGuestsOptions(fileterdOptions);
  }, [guests]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<UserType[]>('http://localhost:4000/users');
        const users = response.data;
        const options = users.map((user) => ({
          value: user.id,
          label: user.fullName,
        }));
        setGuestsOptions(options);
      } catch (err) {
        // dodac obsluge bledu
        console.error(err);
      }
    };
    fetchUsers();

  }, []);

  const onSubmit = async ({ duration, ...values }: FormData) => {
    try {
      const startDate = new Date(dayAndTimeToISO(dateTime));
      const endDate = addHours(new Date(startDate), duration);

      const body = {
        ...values,
        startDate,
        endDate,
      };

      await axios.post('http://localhost:4000/calendar/events/add', body);
      // ten endpoint powinien zwracac user'ow w calosci
      showSuccessAlert('Event added successfully');
      onClose();
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'An unexpected error occurred.';
      setError(errorMessage);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'secondary.light',
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'primary.main',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'primary.main',
          }}
        >
          Dodaj wydarzenie
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CreateIcon sx={{ color: 'primary.dark' }} />
              <FormTextField
                name="title"
                control={control}
                label="Tytuł wydarzenia"
                fullWidth
              />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon sx={{ color: 'primary.dark' }} />
              <FormTextField
                name='date'
                control={control}
                label="Data"
                type="date"
                fullWidth
              />
              <FormTextField
                name="time"
                control={control}
                label="Godzina"
                type="time"
                fullWidth
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
              />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <PeopleIcon sx={{ color: 'primary.dark' }} />
              <FormAutocomplete
                name="guests"
                control={control}
                label="Goście"
                options={guestsOptions}
                fullWidth
              />
            </Stack>

            <Button
              variant="contained"
              type="submit"
              size="medium"
              sx={{
                alignSelf: 'flex-end',
                mt: 2,
                backgroundColor: 'primary.dark',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.main',
                },
              }}
            >
              Zapisz
            </Button>

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default AddEventModal;
