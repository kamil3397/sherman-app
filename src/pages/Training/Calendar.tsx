import { useState, useEffect, FC, useCallback } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { getWeek, parse, lastDayOfISOWeek, eachDayOfInterval, format } from 'date-fns';
import axios from 'axios';
import { dayAndTimeToISO } from 'utils/dayAndTimeToISO';
import { DateNav } from './DateNav/DateNav';
import AddEventModal from './AddEventModal/AddEventModal';
import { getCurrentWeek } from './utils/getCurrentWeek';
import { EventBadge } from './components/EventBadge';

type DateISO = {
  day: {
    date: string;
    name: string;
  };
  hours: string[];
};

export type Event = {
  startDate: string;
  endDate: string;
  title: string;
  description: string;
};

const Calendar: FC = () => {
  const [currentWeek, setCurrentWeek] = useState<DateISO[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: string; hour: string } | null>(null);

  const handleHourClick = (date: string, hour: string) => {
    setSelectedDateTime({ date, hour });
    setOpenModal(true);
  };

  const closeModal = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  useEffect(() => {
    const currentWeek = getCurrentWeek(startDate);
    setCurrentWeek(currentWeek);

    const fetchEvents = async () => {
      const startDate = dayAndTimeToISO({ date: currentWeek[0].day.date, hour: '00:00' });
      const endDate = dayAndTimeToISO({ date: currentWeek[6].day.date, hour: '23:59' });
      await axios.get(`events?startDate=${startDate}&endDate=${endDate}`)
        .then((res) => {
        /*
        event, ktory dostaniesz z backendu bedziesz mial strukture:
        title, description, startDate, endDate
        */

        }).catch((err) => {
          console.log(err);
        });
    };
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
          padding: '10px 20px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
          marginTop: '20px',
          marginBottom: '10px',
        }}
      >
        <Typography variant="h6" sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
          Today: {format(new Date(), 'dd/MM/yyyy')}
        </Typography>
        <DateNav startDate={startDate} setStartDate={setStartDate} />
      </Box>
      <Grid container spacing={2} sx={{ width: '90%', maxWidth: '1400px' }}>
        {currentWeek.map(({ day, hours }) => {
          const isToday = format(new Date(), 'dd/MM/yyyy') === day.date;

          return (
            <Grid item xs={12 / 7} key={day.date}>
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
                  {day.name}
                </Typography>
                <Typography variant="h6" sx={{ color: isToday ? 'secondary.main' : 'primary.dark', textAlign: 'center', marginBottom: 2 }}>
                  {day.date}
                </Typography>
                <Box sx={{ flex: 1, position: 'relative', marginTop: 2 }}>
                  {/* <EventBadge hoursLength={hours}/> */}
                  {hours.map((hour, index) => (
                    <Box
                      key={hour}
                      onClick={() => handleHourClick(day.date, hour)}
                      sx={{
                        position: 'relative',
                        height: `calc(100% / ${hours.length})`,
                        borderBottom: index < 11 ? '1px solid #ddd' : 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingLeft: 5,
                        paddingRight: 5,
                        // backgroundColor: events.find(
                        //   (event) => event.date === day.date && event.hour === hour
                        // )
                        //   ? '#d3f9d8'
                        //   : 'transparent',
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.75rem',
                          color: isToday ? '#ffffff' : '#666',
                        }}
                      >
                        {hour}
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
      {selectedDateTime && <AddEventModal open={openModal} onClose={closeModal} dateTime={selectedDateTime}/>}
    </Box>
  );
};

export default Calendar;
