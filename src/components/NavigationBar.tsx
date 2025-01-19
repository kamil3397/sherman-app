import { AppBar, Toolbar, Box, Typography, Tabs, Tab, Stack } from '@mui/material';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logoSherman.png';
import { ThemeSwitch } from './ThemeSwitch';

export const NavigationBar: FC = () => {
  const isLoggedIn = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'primary.dark',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingX: 2,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            component="img"
            src={logo}
            alt="Sherman Shooting Logo"
            sx={{
              height: 40,
              width: 'auto',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Sherman Shooting Team
          </Typography>
        </Stack>

        {/* Tabs for Navigation */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={value}
            onChange={(_, newValue) => setValue(newValue)}
            indicatorColor="primary"
            sx={{
              '.MuiTab-root': {
                textTransform: 'none',
                fontWeight: 'bold',
                '&.Mui-selected': {
                  color: 'text.primary',
                },
              },
              '.MuiTabs-indicator': {
                backgroundColor: 'primary.light',
              },
            }}
          >
            <Tab label="Home" component={Link} to="/" />
            <Tab label="About" />
            <Tab label="Training" component={Link} to="/training" />
            <Tab label="Contact" />
            {isLoggedIn ? (
              <Tab label="Log out" />
            ) : (
              <Tab label="Join Us!" component={Link} to="/register" />
            )}
          </Tabs>
        </Box>
        <ThemeSwitch />
      </Toolbar>
    </AppBar>
  );
};
