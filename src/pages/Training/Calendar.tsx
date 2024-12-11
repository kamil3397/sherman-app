import { useState, useEffect, FC } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

  const Calendar: FC = () => {
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);
  const [today, setToday] = useState<Date>(new Date());
 
const generateCurrentWeek=():Date[]=>{
const today = new Date() //biore sobie dzisiejsza date i godzine 
const dayOfWeek = today.getDay() //dzisiejszy dzien w formie liczby 0 niedziela 6 sobota
const monday = new Date(today) // kopia dzisiejszej daty zeby nie zmieniac jej wartosci
monday.setDate(today.getDate() - ((dayOfWeek+6)%7) ) //biore dzisiejsza date i przesuwam(odejmuje) o 6 dni do poniedzialku

const week = []
for (let i=0; i<7; i++){
const day= new Date(monday)
day.setDate(monday.getDate()+i) // dodaje do pon reszte dni
week.push(day)
}
return week
}

useEffect(()=>{
setCurrentWeek(generateCurrentWeek())
setToday(new Date())
}, [])

const formatDate = (date: Date): string => {
  const day= String(date.getDate()).padStart(2, '0')//jesli ciag znakow <2 to dodaje 0 na poczatku
  const month= String(date.getMonth()+1).padStart(2, '0')//+1 bo msc w JS sa od 0
  const year= date.getFullYear()
  return `${day}/${month}/${year}`
}

return(
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
  <Grid container spacing={2} sx={{ width: '90%', maxWidth: '1400px' }}>
    {currentWeek.map((date, index) => {
      const isToday = today.toDateString() === date.toDateString(); // Porównuje, czy data to dziś

      return (
        <Grid item xs={12 / 7} key={index}>
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
              {date.toLocaleDateString('en-US', { weekday: 'long' })} {/* Nazwa dnia */}
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
              {formatDate(date)} {/* Data dziś w  moim formacie DD/MM/YYYY */}
            </Typography>
            <Box sx={{ flex: 1, position: 'relative', marginTop: 2 }}>
              {/* Podział godzin */}
              {[...Array(12)].map((_, hourIndex) => {
                const hour = 9 + hourIndex; // Godziny od 9:00 do 20:00
                return (
                  <Box
                    key={hour}
                    sx={{
                      position: 'relative',
                      height: '8.33%',
                      borderBottom: hourIndex < 11 ? '1px solid #ddd' : 'none',
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
                      {`${hour}:00`}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Grid>
      );
    })}
  </Grid>
</Box>
)

}
export default Calendar;
