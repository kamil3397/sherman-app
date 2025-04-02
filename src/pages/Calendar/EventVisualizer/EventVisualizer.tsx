import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { EventType } from 'types/EventTypes';
import { HOURS_ARR } from '../../../config/hoursMap';
import { useCalendarContext } from 'context/CalendarContext';
import { format } from 'date-fns';

interface EventsVisualizerProps {
  isToday: boolean;
  formattedDay: string
  handleOpenInfoModal: (event: EventType) => void;
}

export const EventsVisualizer: FC<EventsVisualizerProps> = ({  isToday, handleOpenInfoModal, formattedDay }) => {
  const {events}= useCalendarContext()

  const dayEvents = events
      .filter(
        (event) =>
          format(new Date(event.startDate), 'dd/MM/yyyy') === formattedDay
      )
      .map(({ startDate, endDate, ...rest }) => ({
        startDate,
        endDate,
        startHour: new Date(startDate).getHours(),
        endHour: new Date(endDate).getHours(),
        duration: new Date(endDate).getHours() - new Date(startDate).getHours(),
        ...rest,
      }));

  return (
    <>
      {dayEvents.map((event) => (
        <Box
          key={event._id}
          onClick={() => handleOpenInfoModal(event) }
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
