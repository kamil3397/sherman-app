import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import React, { FC } from 'react';
import logo from '../../images/logoSherman.png';
import { Link } from 'react-router-dom';

const NavigationBar: FC = () => {

    const isLoggedIn = localStorage.getItem('accessToken');

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1c1c1c' }}>
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
                <Button component={Link} to="/" color="inherit">Home</Button>
                <Button color="inherit">About</Button>
                <Button color="inherit">Training</Button>
                <Button color="inherit">Contact</Button>
                <Button component={Link} to={isLoggedIn ? "/" : "/register"} color="inherit">        {isLoggedIn ? "Log out" : "Join Us!"}
                </Button>
            </Toolbar>
        </AppBar>
    )

}
export default NavigationBar;