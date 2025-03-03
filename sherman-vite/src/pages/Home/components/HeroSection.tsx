import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import tagLogo from '../../../images/shermanTag.jpg';

export const HeroSection: FC = () => {
  return (
    <Box
      sx={{
        height: '50vh',
        backgroundImage: `url(${tagLogo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h2"
        color="white"
        sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
      >
                Welcome to Sherman Shooting Team
      </Typography>
    </Box>
  );
};
