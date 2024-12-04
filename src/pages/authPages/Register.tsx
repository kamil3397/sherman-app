import React, { FC } from 'react';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import NavigationBar from '../homePage/NavigationBar';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeRequest } from '../../hooks/makeRequest';

type FormData = {
    name: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

const schema = yup.object().shape({
    // w required, powinien byc message, zeby wyswietlic w helperText
    name: yup.string().min(2).max(50).required(),
    lastName: yup.string().min(2).max(50).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup.string().label('confirm password').required().oneOf([yup.ref('password')], 'Passwords must match'),
})
const RegistrationPage: FC = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    })

    const onSubmit = async (values: FormData) => {
        const { confirmPassword: _, ...newUserData } = values;

        await makeRequest('POST', '/register', newUserData)
            .then(() => {
                //+ alert z AlertContext
                navigate('/login')
            })
            .catch((error) => {
                // tutaj powinnismy ustawiac jakis state np error
                // a ponizej zrobic, np pod formularzem Mui alert* z tym bledem
                console.log(error)
            })

    };
    return (
        <>
            <NavigationBar />
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField {...register('name')}
                                label="Name"
                                variant="outlined"
                                fullWidth
                                error={!!errors.email}
                                helperText={!!errors.email && errors.email.message}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField {...register('lastName')}
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                error={!!errors.email}
                                helperText={!!errors.email && errors.email.message}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField {...register('email')}
                                label="Email Address"
                                type="email"
                                variant="outlined"
                                fullWidth
                                error={!!errors.email}
                                helperText={!!errors.email && errors.email.message}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField {...register('password')}
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                error={!!errors.email}
                                helperText={!!errors.email && errors.email.message}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField {...register('confirmPassword')}
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                error={!!errors.email}
                                helperText={!!errors.email && errors.email.message}
                            />
                        </Box>
                        <Button type='submit' variant="contained" color="primary" fullWidth>
                            Register
                        </Button>
                        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                            Already have an account? <a href="/login">Log in</a>
                        </Typography>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default RegistrationPage;
