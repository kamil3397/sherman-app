import React, { FC } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { EventType } from 'types/EventTypes';

interface EventInfoModalProps {
  open: boolean;
  event: EventType;
  onClose: () => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

export const EventInfoModal: FC<EventInfoModalProps> = ({ open, event, onClose }) => {

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="event-info-title"
      aria-describedby="event-info-description"
    >
      <Box sx={style}>
        <Typography id="event-info-title" variant="h6">
          {event.title}
        </Typography>
        <Typography id="event-info-description" sx={{ mt: 2 }}>
          Czas trwania: {event.startHour}:00 - {event.endHour}:00
        </Typography>
        {event.description && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            {event.description}
          </Typography>
        )}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={onClose}>
            Zamknij
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
