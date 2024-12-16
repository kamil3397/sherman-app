import { useState, useEffect, FC } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { getWeek, parse, lastDayOfISOWeek, eachDayOfInterval, format, } from 'date-fns';
import { DateNav } from './DateNav/DateNav';

type DateISO = {
  day: {
    date:string,
    name: string
  }
  hours: string[];
}
const Calendar: FC = () => {
  const [currentWeek, setCurrentWeek] = useState<DateISO[]>([]);
  const [startDate, setStartDate] =  useState(new Date());


  const getCurrentWeek = (startDate: Date) => {
    const currentWeek = getWeek(startDate);
    const firstDayOfWeek = parse(currentWeek.toString(),'I', startDate);
    const lastDayOfWeek = lastDayOfISOWeek(firstDayOfWeek);

    const daysOfWeek = eachDayOfInterval({ start: firstDayOfWeek, end: lastDayOfWeek });

    const weekdays = daysOfWeek.map((day) => {
      return {
        day: {
          date: format(day, 'dd/MM/yyyy'),
          name: format(day, 'EEEE') // return day name
        },
        hours: [...Array(12)].map((_, hourIndex) =>  {
          const hour=9 + hourIndex;
          return `${hour<10 ? 0 : ''}${hour}:00` // return in timestamp format
        })
      }
      
    });
    setCurrentWeek(weekdays);
  }

  useEffect(()=>{
    getCurrentWeek(startDate);
  }, [startDate])


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
          Dzisiaj: {format(new Date(), 'dd/MM/yyyy')}
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
                      sx={{
                        position: 'relative',
                        height: `calc(100% / ${hours.length})`,
                        borderBottom: index < 11 ? '1px solid #ddd' : 'none',
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          position: 'absolute',
                          left: 5,
                          top: 0,
                          fontSize: '0.75rem',
                          color: isToday ? '#ffffff' : '#666',
                        }}
                      >
                        {hour}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Calendar;
