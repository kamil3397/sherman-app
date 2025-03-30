import { Box, Grid, Paper, Typography } from "@mui/material";
import { format } from "date-fns";
import {EventsVisualizer} from "../EventVisualizer/EventVisualizer";
import { EventType } from "types/EventTypes";
import { FC } from "react";
import { CalendarHours } from "../CalendarHours/CalendarHours";

interface CalendarDayProps {
    day: Date
    events: EventType[]
    handleHourClick:(date:Date, hour: number) => void
    handleEventClick: (event: EventType) => void
}

export const CalendarDay:FC<CalendarDayProps> = ({day, events, handleEventClick, handleHourClick})=> {

    
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
            <CalendarHours day={day} isToday={isToday} handleHourClick={handleHourClick}/>
            <EventsVisualizer events={dayEvents} isToday={isToday} onEventClick={handleEventClick} />
          </Box>
        </Paper>
      </Grid>
    );
  }