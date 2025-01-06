import { Box } from '@mui/material';
import { FC } from 'react';

export const EventBadge: FC<{ hours: string[], eventDuration: number, startHour: string }> = ({ hours, eventDuration, startHour }) => {

  const calculateDurationInPixels = () => {
    const x = `calc(100% / ${hours.length})`;
    // zrobic mape godzin i ustalic placement
  };

  const height = `calc(100% / ${hours.length})`;
  const topPlacement = `calc(100% / ${hours.length})`;
  return (
    <Box sx={{ position: 'absolute', top: `calc(100% / ${hours.length})`, left: 0, width: '100%', height, zIndex: 1, bgcolor: 'red' }}>
                hi
    </Box>
  );
};
