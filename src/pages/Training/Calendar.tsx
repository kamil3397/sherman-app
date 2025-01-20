import { useState, useEffect, FC, useCallback, useMemo } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { format, formatISO, addHours } from 'date-fns';
import axios from 'axios';
import { DateNav } from './DateNav/DateNav';
import AddEventModal from './AddEventModal/AddEventModal';
import { HOURS_ARR } from '../../config/hoursMap';
import { getCurrentWeek } from './utils/getCurrentWeek';

export type Event = {
  startDate: string;
  endDate: string;
  title: string;
  description: string;
};

const Calendar: FC = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [eventStartDate, setEventStartDate] = useState('');

  const currentWeek = useMemo(() => getCurrentWeek(startDate), [startDate]);

  const handleHourClick = (date: Date, hour: number) => {
    const isoEventStartDate = formatISO(addHours(date, hour));
    console.log(isoEventStartDate);
    setEventStartDate(isoEventStartDate);
    setOpenModal(true);
  };

  const closeModal = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  useEffect(() => {

    const fetchEvents = async () => {
      await axios.get(`http://localhost:4000/calendar?startDate=${currentWeek[0]}&endDate=${currentWeek[currentWeek.length - 1]}`)
        .then((res) => {
          console.log(res);
          /*
        event, ktory dostaniesz z backendu bedziesz mial strukture:
        title, description, startDate, endDate
        */
          console.log('currentWeek[0]:', currentWeek[0]);
          console.log('currentWeek[last]:', currentWeek[currentWeek.length - 1]);

        }).catch((err) => {
          console.log(err);
        });
    };
    fetchEvents();
  }, [startDate, closeModal]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
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
          const isToday = format(new Date(), 'dd/MM/yyyy') === format(day, 'dd/MM/yyyy');

          return (
            <Grid item xs={12 / 7} key={day.getDay()}>
              <Paper
                elevation={3}
                sx={{
                  padding: 3,
                  height: '600px',
                  backgroundColor: isToday ? 'primary.dark' : 'secondary.main',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  overflow: 'hidden',
                }}
              >
                <Typography variant="h5" sx={{ color: isToday ? 'secondary.main' : 'primary.dark', textAlign: 'center', marginBottom: 2 }}>
                  {format(day, 'EEEE')}
                </Typography>
                <Typography variant="h6" sx={{ color: isToday ? 'secondary.main' : 'primary.dark', textAlign: 'center', marginBottom: 2 }}>
                  {format(day, 'dd/MM/yyyy')}
                </Typography>
                <Box sx={{ flex: 1, position: 'relative', marginTop: 2 }}>
                  {HOURS_ARR.map(({ label, value }, index) => (
                    <Box
                      key={value}
                      onClick={() => handleHourClick(day, value)}
                      sx={{
                        position: 'relative',
                        height: `calc(100% / ${HOURS_ARR.length})`,
                        borderBottom: index < 11 ? '1px solid #ddd' : 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingLeft: 5,
                        paddingRight: 5,
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                          backgroundColor: isToday ? 'primary.main' : 'primary.light',
                          cursor: 'pointer',
                        }
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.75rem',
                          color: isToday ? '#ffffff' : '#666',
                        }}
                      >
                        {label}
                      </Typography>
                      {/* {events
                        .filter((event) => event.date === day.date && event.hour === hour)
                        .map((event, i) => (
                          <Typography
                            key={i}
                            variant="caption"
                            sx={{ fontSize: '0.75rem', color: '#444' }}
                          >
                            {event.title}
                          </Typography>
                        ))} */}
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      {eventStartDate && <AddEventModal open={openModal} onClose={closeModal} dateTime={{
        date: eventStartDate.split('T')[0],
        hour: eventStartDate.split('T')[1].slice(0, 5),
      }}/>}
    </Box>
  );
};

export default Calendar;
