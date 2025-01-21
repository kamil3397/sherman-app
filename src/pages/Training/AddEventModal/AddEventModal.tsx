import { FC, useState } from 'react';
import { Box, Typography, Button, Modal, Stack, Autocomplete, TextField, IconButton } from '@mui/material';
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
import FormTextField from 'components/FormTextField';

type EventModalProps = {
  open: boolean;
  onClose: () => void;
  dateTime: {
    date: string;
    hour: string;
  };
};

type Guest = {
  id: string;
  name: string;
};

type FormData = {
  title: string;
  description: string;
  duration: number;
  guests: Guest[];
  time: string;
  date: string;
};

const AddEventModal: FC<EventModalProps> = ({ open, onClose, dateTime }) => {
  const [error, setError] = useState<string | null>(null);
  const { showSuccessAlert } = useAlertContext();

  const guestsList: Guest[] = [
    { id: '1', name: 'Jan Kowalski' },
    { id: '2', name: 'Anna Nowak' },
    { id: '3', name: 'Kamil Kamiński' },
  ];

  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      duration: 1,
      guests: [],
    },
  });

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
          bgcolor: '#fff',
          boxShadow: 24,
          p: 3,
          borderRadius: 2
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

        <Stack direction="column" spacing={0.5} mb={2}>
          <Typography variant="body2" sx={{ color: 'primary.main' }}>
            {`${dateTime.date}, ${dateTime.hour}`}
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.main' }}>
            Dodaj wydarzenie
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CreateIcon sx={{ color: 'primary.dark' }} />
              <FormTextField
                name="title"
                control={control}
                label="Tytuł"
              />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="flex-start">
              <SubjectIcon sx={{ color: 'primary.dark', mt: 1 }} />
              <FormTextField
                name="description"
                control={control}
                label="Opis"
                multiline
                rows={2}
              />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <PeopleIcon sx={{ color: 'primary.dark' }} />
              <Controller
                name="guests"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    multiple
                    options={guestsList}
                    getOptionLabel={(option) => option.name}
                    value={value}
                    onChange={(_, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Dodaj gości"
                        placeholder="Wybierz..."
                        fullWidth
                      />
                    )}
                    sx={{ flex: 1 }}
                  />
                )}
              />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon sx={{ color: 'primary.dark' }} />
              <FormTextField
                name="duration"
                control={control}
                label="Czas trwania (w godzinach)"
                type="number"
              />
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon sx={{ color: 'primary.dark' }} />
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Data"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                )}
              />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon sx={{ color: 'primary.dark' }} />
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Godzina"
                    type="time"
                    fullWidth
                  />
                )}
              />
            </Stack>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: 'primary.dark',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                }}
              >
                Zapisz
              </Button>
            </Box>
          </Stack>
        </form>

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default AddEventModal;
