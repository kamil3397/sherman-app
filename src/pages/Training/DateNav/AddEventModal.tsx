import { FC } from 'react';
import { Box, Typography, TextField, Button, Modal } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

type EventModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: { title: string; description: string }) => void;
};

type FormData = {
  title: string;
  description: string;
};

const AddEventModal: FC<EventModalProps> = ({ open, onClose, onSave }) => {
  const { handleSubmit, control, reset } = useForm<FormData>({
    defaultValues: { title: '', description: '' },
  });

  const onSubmit = (data: FormData) => {
    onSave(data);
    reset();
    onClose();
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
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add Event
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#444b51',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      '&.Mui-focused': {
                        color: '#444b51', 
                      },
                    },
                  }}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field, fieldState }) => (
              <TextField {...field} label="Training description" fullWidth  
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#444b51', 
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: '#444b51',
                  },
                },
              }}
              />
            )}
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
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddEventModal;
