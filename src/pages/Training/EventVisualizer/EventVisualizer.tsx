import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { HOURS_ARR } from '../../../config/hoursMap';

export interface DayEvent {
  _id: string;
  title: string;
  startHour: number;
  endHour: number;
  duration: number;
}

interface EventsVisualizerProps {
  events: DayEvent[];
  isToday: boolean;
  onEventClick: (event: DayEvent) => void;
}

const EventsVisualizer: FC<EventsVisualizerProps> = ({ events, isToday, onEventClick }) => {
  return (
    <>
      {events.map((event) => (
        <Box
          key={event._id}
          onClick={() => onEventClick && onEventClick(event) }
          sx={{
            position: 'absolute',
            top: `${((event.startHour - HOURS_ARR[0].value) / HOURS_ARR.length) * 100}%`,
            height: `${(event.duration / HOURS_ARR.length) * 100}%`,
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

export default EventsVisualizer;
