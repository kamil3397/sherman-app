/* eslint-disable import/extensions */
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Logo from 'images/loader.svg';

export const Loader = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
      }}
    >
      <CircularProgress
        size={100}
        sx={{
          color: '#444b51',
          position: 'absolute',
        }}
      />
      <img
        src={Logo as unknown as string}
        alt="Sherman Shooting Team Logo"
        style={{
          width: '80px',
          height: '80px',
        }}
      />
    </Box>
  );
};
