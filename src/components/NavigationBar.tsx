import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import React, { FC } from 'react';
import logo from '../images/logoSherman.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export const NavigationBar: FC = () => {
    const { logoutClient } = useAuthContext()
    const isLoggedIn = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutClient()
            .then(() => {
                console.log('Logout successful')
                navigate('/')
            })
            .catch((error) => {
                console.log('Error during logout:', error)
            })
    }


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
                {isLoggedIn ? (
                    <Button onClick={handleLogout} color="inherit">
                        Log out
                    </Button>
                ) : (
                    <Button component={Link} to="/register" color="inherit">
                        Join Us!
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )

}
