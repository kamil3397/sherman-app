import React, { FC, useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, FormControl, Alert, AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeRequest } from 'hooks/makeRequest';
import { useAlertContext } from 'context/AlertContext';

type FormData = {
    name: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const schema = yup.object().shape({
    name: yup.string().min(2, 'Name must be at least 2 characters').max(50).required('Name is required'),
    lastName: yup.string().min(2, 'Last name must be at least 2 characters').max(50).required('Last name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').matches(passwordRegex, "Your password must include at least one uppercase letter and one one number").required('Password is required'),
    confirmPassword: yup.string().required('Confirm password is a required field').oneOf([yup.ref('password')], 'Passwords must match'),
});

const RegistrationPage: FC = () => {
    const [error, setError] = useState<string | null>(null);
    const {showSuccessAlert, showErrorAlert} = useAlertContext();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>({
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
                showSuccessAlert('Registered succesfully')
                navigate('/login')
            })
            .catch((error) => {
                showErrorAlert('Wrong credencials provided')
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
                setError(errorMessage);
                console.log(error)
            })

    };
    return (
        <>
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
                                error={!!errors.name}
                                helperText={!!errors.name && errors.name.message}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField {...register('lastName')}
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                error={!!errors.lastName}
                                helperText={!!errors.lastName && errors.lastName.message}
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
                                error={!!errors.password}
                                helperText={!!errors.password && errors.password.message}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField {...register('confirmPassword')}
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                error={!!errors.confirmPassword}
                                helperText={!!errors.confirmPassword && errors.confirmPassword.message}
                            />
                        </Box>
                        
                        <Button type='submit' variant="contained" sx={{backgroundColor: '#444b51'}} fullWidth>
                            Register
                        </Button>
                        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                            Already have an account? <a href="/login">Log in</a>
                        </Typography>
                        {error && (<Alert severity='error'><AlertTitle>Error</AlertTitle>{error}</Alert>)}
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default RegistrationPage;
