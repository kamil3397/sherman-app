import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logoSherman.png';
import { useAuthContext } from '../context/AuthContext';
import { ThemeSwitch } from './ThemeSwitch';

export const NavigationBar: FC = () => {
  const { logoutClient } = useAuthContext();
  const isLoggedIn = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutClient()
      .then(() => {
        console.log('Logout successful');
        navigate('/');
      })
      .catch((error) => {
        console.log('Error during logout:', error);
      });
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.dark' }}>
      <Toolbar>
        <Box
          component="img"
          src={logo}
          alt="Sherman Shooting Logo"
          sx={{
            height: 40,
            width: 'auto',
            marginRight: 1,
          }}
        />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Sherman Shooting Team
        </Typography>
        <Button component={Link} to="/" >Home</Button>
        <Button >About</Button>
        <Button component={Link} to='/training' >Training</Button>
        <Button >Contact</Button>
        <ThemeSwitch/>
        {isLoggedIn ? (
          <Button onClick={handleLogout} >
                        Log out
          </Button>
        ) : (
          <Button component={Link} to="/register" >
                        Join Us!
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );

};
