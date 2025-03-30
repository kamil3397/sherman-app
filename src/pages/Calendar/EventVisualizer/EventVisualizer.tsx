import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { EventType } from 'types/EventTypes';
import { HOURS_ARR } from '../../../config/hoursMap';

interface EventsVisualizerProps {
  events: EventType[];
  isToday: boolean;
  onEventClick: (event: EventType) => void;
}

export const EventsVisualizer: FC<EventsVisualizerProps> = ({ events, isToday, onEventClick }) => {
  return (
    <>
      {events.map((event) => (
        <Box
          key={event._id}
          onClick={() => onEventClick && onEventClick(event) }
          sx={{
            position: 'absolute',
            top: `${(((event.startHour ?? 0) - HOURS_ARR[0].value) / HOURS_ARR.length) * 100}%`,
            height: `${((event.duration ?? 0) / HOURS_ARR.length) * 100}%`,
            width: '100%',
            backgroundColor: isToday ? 'primary.main' : 'secondary.dark',
            // kolor czcionki nie nadpisuje sie....
            color: isToday ? 'secondary.main' : 'primary.dark',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4px',
            boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
            cursor: 'pointer',
          }}
        >
          <Typography variant="subtitle2">
            {event.title}
          </Typography>
          <Typography variant="caption">
            {event.startHour}:00 - {event.endHour}:00
          </Typography>
        </Box>
      ))}
    </>
  );
};
