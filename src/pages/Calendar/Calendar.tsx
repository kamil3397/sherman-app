import { useState, useEffect, FC, useCallback, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { formatISO, addHours, endOfDay } from 'date-fns';
import axios from 'axios';
import { EventType } from 'types/EventTypes';
import { DateNav } from './DateNav/DateNav';
import { AddEventModal } from './AddEventModal/AddEventModal';
import { getCurrentWeek } from 'utils/getCurrentWeek';
import { EventInfoModal } from './EventInfoModal/EventInfoModal';
import { useAlertContext } from 'context/AlertContext/AlertContext';
import { CalendarDay } from './CalendarDay/CalendarDay';

const Calendar: FC = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [eventStartDate, setEventStartDate] = useState<string>();
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const { showErrorAlert } = useAlertContext();

  const currentWeek = useMemo(() => getCurrentWeek(startDate), [startDate]);

  const startWeek = currentWeek[0].toISOString();
  const endWeek = endOfDay(currentWeek[6].toISOString());

  const handleHourClick = (date: Date, hour: number) => {
    const isoEventStartDate = formatISO(addHours(date, hour));
    setEventStartDate(isoEventStartDate);
    setOpenModal(true);
  };

  const closeModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  useEffect(() => {
    const fetchEvents = async() => {
      await axios.get(`http://localhost:4000/calendar?startDate=${startWeek}&endDate=${endWeek}`)
      .then((res) => {
          setEvents(res.data);
        })
        .catch((error) => {
          console.error('Błąd przy pobieraniu wydarzeń:', error);
          showErrorAlert('Wystąpił błąd podczas pobierania wydarzeń');
        });
    };
    fetchEvents();
  }, [currentWeek, showErrorAlert]);

  const handleEventClick = (event: EventType) => {
    setSelectedEvent(event);
    setInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setInfoModalOpen(false);
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
        <DateNav startDate={startDate} setStartDate={setStartDate} />
      </Box>
      <Grid container spacing={2} sx={{ width: '90%', maxWidth: '1400px' }}>
        {currentWeek.map((day) =>
          <CalendarDay day={day} events={events} handleEventClick={handleEventClick} handleHourClick={handleHourClick} />
        )}
      </Grid>

      <AddEventModal
        open={openModal}
        onClose={closeModal}
        eventDefaultDate={eventStartDate}
      />

      {selectedEvent && <EventInfoModal open={infoModalOpen} event={selectedEvent} onClose={handleCloseInfoModal} />}
    </Box>
  );
};

export default Calendar;




/*
1. Calendar trzyma za duzo state'ow
 - zrob pr z tego co masz i zrob merge
 - zrob Context dla obslugi calendarza CalendarContext
 rób po kolei partiami mniejsze czesci kodu latwiej beddzie debugowac

*/