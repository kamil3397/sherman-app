import React, { FC } from 'react';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import NavigationBar from '../homePage/NavigationBar';

const LoginPage: FC = () => {
    return (
        <>
            <NavigationBar />
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Login
                    </Typography>
                    <form>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                label="Email Address"
                                type="email"
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </Box>
                        <Button variant="contained" color="primary" fullWidth>
                            Log In
                        </Button>
                        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                            Don't have an account? <a href="/register">Register</a>
                        </Typography>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default LoginPage;
