import { useState, useEffect, FC } from 'react';
import { Box, Typography, Paper, Grid, Modal, TextField, Button } from '@mui/material';
import { getWeek, parse, lastDayOfISOWeek, eachDayOfInterval, format } from 'date-fns';
import { DateNav } from './DateNav/DateNav';

type DateISO = {
  day: {
    date: string;
    name: string;
  };
  hours: string[];
};

type Event = {
  date: string;
  hour: string;
  title: string;
  description: string;
};

const Calendar: FC = () => {
  const [currentWeek, setCurrentWeek] = useState<DateISO[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: string; hour: string } | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const getCurrentWeek = (startDate: Date) => {
    const currentWeek = getWeek(startDate);
    const firstDayOfWeek = parse(currentWeek.toString(), 'I', startDate);
    const lastDayOfWeek = lastDayOfISOWeek(firstDayOfWeek);

    const daysOfWeek = eachDayOfInterval({ start: firstDayOfWeek, end: lastDayOfWeek });

    const weekdays = daysOfWeek.map((day) => {
      return {
        day: {
          date: format(day, 'dd/MM/yyyy'),
          name: format(day, 'EEEE'), // return day name
        },
        hours: [...Array(12)].map((_, hourIndex) => {
          const hour = 9 + hourIndex;
          return `${hour < 10 ? '0' : ''}${hour}:00`; // return in timestamp format
        }),
      };
    });
    setCurrentWeek(weekdays);
  };

  const handleHourClick = (date: string, hour: string) => {
    setSelectedDateTime({ date, hour });
    setOpenModal(true);
  };

  const handleSaveEvent = () => {
    if (selectedDateTime && eventTitle && eventDescription) {
      setEvents((prevEvents) => [
        ...prevEvents,
        { date: selectedDateTime.date, hour: selectedDateTime.hour, title: eventTitle, description: eventDescription },
      ]);
      setEventTitle('');
      setEventDescription('');
      setOpenModal(false);
    }
  };

  useEffect(() => {
    getCurrentWeek(startDate);
  }, [startDate]);

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
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
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
                  backgroundColor: isToday ? '#444b51' : '#ffffff',
                  color: isToday ? '#ffffff' : '#000000',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  overflow: 'hidden',
                }}
              >
                <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 2 }}>
                  {day.name}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
                  {day.date}
                </Typography>
                <Box sx={{ flex: 1, position: 'relative', marginTop: 2 }}>
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
                        backgroundColor: events.find(
                          (event) => event.date === day.date && event.hour === hour
                        )
                          ? '#d3f9d8'
                          : 'transparent',
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
                      {events
                        .filter((event) => event.date === day.date && event.hour === hour)
                        .map((event, i) => (
                          <Typography
                            key={i}
                            variant="caption"
                            sx={{ fontSize: '0.75rem', color: '#444' }}
                          >
                            {event.title}
                          </Typography>
                        ))}
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add Event
          </Typography>
          <TextField
            fullWidth
            label="Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Training description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleSaveEvent}>
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Calendar;
