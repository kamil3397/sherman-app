import { useState, FC } from 'react';
import { Box, Grid } from '@mui/material';
import { formatISO, addHours } from 'date-fns';
import { EventType } from 'types/EventTypes';
import { DateNav } from './DateNav/DateNav';
import { AddEventModal } from './AddEventModal/AddEventModal';
import { EventInfoModal } from './EventInfoModal/EventInfoModal';
import { CalendarDay } from './CalendarDay/CalendarDay';
import { useCalendarContext } from 'context/CalendarContext';

const Calendar: FC = () => {
  const { currentWeek } = useCalendarContext();

  const [eventStartDate, setEventStartDate] = useState<string>();
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
 
  const openAddEventModal = (date: Date, hour: number) => {
    const isoEventStartDate = formatISO(addHours(date, hour));
    setEventStartDate(isoEventStartDate);
  };

  const closeAddEventModal =()=> {
    setEventStartDate(undefined)
  }
  
  const handleOpenInfoModal= (event: EventType) => {
    setSelectedEvent(event);
  };

  const handleCloseInfoModal = () => {
    setSelectedEvent(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'primary.light',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
          maxWidth: '1400px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
          marginTop: '20px',
          marginBottom: '10px',
        }}
      >
        <DateNav />
      </Box>
      <Grid container spacing={2} sx={{ width: '90%', maxWidth: '1400px' }}>
        {currentWeek.map((day) =>
          <CalendarDay day={day} handleOpenInfoModal={handleOpenInfoModal} openAddEventModal={openAddEventModal} />
        )}
      </Grid>

      <AddEventModal
        key={eventStartDate}
        open={!!eventStartDate}
        onClose={closeAddEventModal}
        eventDefaultDate={eventStartDate}
/>

      <EventInfoModal open={!!selectedEvent} event={selectedEvent} onClose={handleCloseInfoModal} />
    </Box>
  );
};
 
export default Calendar;




/*
1. Calendar trzyma za duzo state'ow
 - zrob Context dla obslugi calendarza CalendarContext
 rób po kolei partiami mniejsze czesci kodu latwiej beddzie debugowac

*/