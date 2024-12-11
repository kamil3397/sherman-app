import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

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
            {/*JAK zrobic zeby spinner był w około logo zeby zdąrzyło się załadować??? */}
            <img
                src="/images/loaderLogo.png"
                alt="Sherman Shooting Team Logo"
                style={{
                    width: '80px',
                    height: '80px',
                }}
            />
        </Box>
    );
};
