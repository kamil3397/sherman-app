import React, { FC } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, FormControl } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

interface LoginData {
    email: string,
    password: string,
}
const schema = yup.object({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password is too short - should be 8 chars minimum.')
});

const LoginPage: FC = () => {
  const { loginClient } = useAuthContext();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const onSubmit = async (values: LoginData) => {
    const { email, password } = values;
    const userLogin: LoginData = { email, password };

    await loginClient(userLogin)
      .then(() => {
        console.log('Successfully logged in');
        navigate('/');
      }).catch(() => {
        console.log('Wrong login or password provided');
      }
      );

  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
                        Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button variant="contained" fullWidth type='submit'>
                            Log In
            </Button>
            <Typography align="center" sx={{ marginTop: 2, color: '#495057' }}>
                            Don't have an account? <a href="/register">Register</a>
            </Typography>
            <FormControl/>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
