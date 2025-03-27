import { useState, useEffect, FC, useCallback, useMemo } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { format, formatISO, addHours } from 'date-fns';
import axios from 'axios';
import { EventType } from 'types/EventTypes';
import { DateNav } from './DateNav/DateNav';
import AddEventModal from './AddEventModal/AddEventModal';
import { HOURS_ARR } from '../../config/hoursMap';
import { getCurrentWeek } from '../../utils/getCurrentWeek';
import EventsVisualizer from './EventVisualizer/EventVisualizer';
import { EventInfoModal } from './EventInfoModal/EventInfoModal';
import { useAlertContext } from '../../context/AlertContext/AlertContext';

// export type Event = {
//   startDate: string;
//   endDate: string;
//   title: string;
//   description: string;
//   _id: string;
// };

const Calendar: FC = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [eventStartDate, setEventStartDate] = useState('');
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const { showErrorAlert } = useAlertContext();

  const currentWeek = useMemo(() => getCurrentWeek(startDate), [startDate]);

  const handleHourClick = (date: Date, hour: number) => {
    const isoEventStartDate = formatISO(addHours(date, hour));
    setEventStartDate(isoEventStartDate);
    setOpenModal(true);
  };

  const closeModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  useEffect(() => {
    const fetchEvents = () => {
      axios
  .get(`
    http://localhost:4000/calendar?startDate=${currentWeek[0]}&endDate=${currentWeek[6]}`)
  .then((res) => {
    console.log('Dane z API:', res.data);
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
        {currentWeek.map((day) => {
          const formattedDay = format(day, 'dd/MM/yyyy');
          const isToday = format(new Date(), 'dd/MM/yyyy') === formattedDay;
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
            <Grid item xs={12 / 7} key={day.getTime()}>
              <Paper
                elevation={3}
                sx={{
                  padding: 3,
                  height: '600px',
                  backgroundColor: isToday ? 'secondary.main' : 'primary.dark',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: isToday ? 'primary.dark' : 'secondary.dark',
                    textAlign: 'center',
                    marginBottom: 2,
                  }}
                >
                  {format(day, 'EEEE')}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: isToday ? 'primary.dark' : 'secondary.main',
                    textAlign: 'center',
                    marginBottom: 2,
                  }}
                >
                  {formattedDay}
                </Typography>
                <Box sx={{ flex: 1, position: 'relative', marginTop: 2 }}>
                  {HOURS_ARR.map(({ label, value }, index) => (
                    <Box
                      key={value}
                      onClick={() => handleHourClick(day, value)}
                      sx={{
                        position: 'relative',
                        height: `calc(100% / ${HOURS_ARR.length})`,
                        borderBottom: index < HOURS_ARR.length - 1 ? '1px solid #ddd' : 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingLeft: 5,
                        paddingRight: 5,
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                          backgroundColor: isToday ? 'secondary.dark' : 'primary.main',
                        },
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.75rem',
                          color: isToday ? 'primary.light' : 'text.primary',
                        }}
                      >
                        {label}
                      </Typography>
                    </Box>
                  ))}
                  <EventsVisualizer events={dayEvents} isToday={isToday} onEventClick={handleEventClick} />
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      {eventStartDate && (
        <AddEventModal
          open={openModal}
          onClose={closeModal}
          dateTime={{
            date: eventStartDate.split('T')[0],
            hour: eventStartDate.split('T')[1].slice(0, 5),
          }}
        />
      )}
      <EventInfoModal open={infoModalOpen} event={selectedEvent} onClose={handleCloseInfoModal} />
    </Box>
  );
};

export default Calendar;
