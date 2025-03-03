import { Box, Typography } from '@mui/material';
import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
        color: 'white',
        py: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Sherman Shooting Team. All Rights Reserved.
      </Typography>
    </Box>
  );
};
