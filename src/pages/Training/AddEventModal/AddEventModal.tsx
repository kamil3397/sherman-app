import { FC, useState } from 'react';
import { Box, Typography, TextField, Button, Modal } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useAlertContext } from 'context/AlertContext';
import { addHours, formatISO, } from 'date-fns';
import { dayAndTimeToISO } from 'utils/dayAndTimeToISO';
import axios from 'axios';
import FormTextField from '../../../components/FormTextField';

type EventModalProps = {
  open: boolean;
  onClose: () => void;
  dateTime: {
    date: string;
    hour: string;
  }
};

type FormData = {
  title: string;
  description: string;
  duration: number;
};

const AddEventModal: FC<EventModalProps> = ({ open, onClose, dateTime }) => {
  const [error, setError] = useState<string | null>(null);
  const { showSuccessAlert, showErrorAlert } = useAlertContext();
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: { title: '', description: '', duration: 3 },
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
      console.log(body);

      await axios.post('http://localhost:4000/calendar/events/add', body);
      showSuccessAlert('Event added successfully');
      onClose();
    } catch (err) {
      showErrorAlert('Failed to add the event');
      const errorMessage = (err as any).response?.data?.message || 'An unexpected error occurred.';
      setError(errorMessage);
      console.log(err);
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
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: 'primary.dark', mb: 2 }}>
          Dodaj wydarzenie na {dateTime.date} o {dateTime.hour}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormTextField
            name="title"
            control={control}
            label="Tytuł"
          />
          <FormTextField
            name="description"
            control={control}
            label="Opis"
          />
          <FormTextField
            name="duration"
            control={control}
            label="Czas trwania (godziny)"
            type = 'number'
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: '#444b51',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#3b4045',
                },
              }}
            >
              Zapisz
            </Button>
          </Box>
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
