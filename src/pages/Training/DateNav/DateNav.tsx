import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import { previousMonday, nextMonday, startOfWeek, endOfWeek, format } from 'date-fns';

interface DateNavProps {
  startDate: Date;
  setStartDate: (date: Date) => void;
}

export const DateNav: FC<DateNavProps> = ({ startDate, setStartDate }) => {
  const setPreviousWeek = () => {
    const previousWeekStartDate = previousMonday(startOfWeek(startDate));
    setStartDate(previousWeekStartDate);
  };

  const setNextWeek = () => {
    const nextWeekStartDate = nextMonday(endOfWeek(startDate));
    setStartDate(nextWeekStartDate);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        width: '100%',
        backgroundColor: 'primary.dark',
        padding: '10px 20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      <Button
        onClick={setPreviousWeek}
        variant="contained"
        sx={{
          backgroundColor: 'secondary.dark',
          color: 'primary.dark',
          '&:hover': { backgroundColor: '#333b41' },
        }}
      >
        Previous Week
      </Button>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'secondary.dark' }}>
        {`Today: ${format(new Date(), 'dd/MM/yyyy')}`}
      </Typography>
      <Button
        onClick={setNextWeek}
        variant="contained"
        sx={{
          backgroundColor: 'secondary.dark',
          color: 'primary.dark',
          '&:hover': { backgroundColor: '#333b41' },
        }}
      >
        Next Week
      </Button>
    </Box>
  );
};
