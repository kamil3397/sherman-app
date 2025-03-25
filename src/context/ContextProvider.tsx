import { PropsWithChildren } from 'react';
import { ThemeProvider, useMediaQuery } from '@mui/material';
import { theme } from '../theme/theme';
import { AuthProvider } from './AuthContext';
import { AlertProvider } from './AlertContext/AlertContext';

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={theme} defaultMode={prefersDarkMode ? 'dark' : 'light'}>
      <AlertProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
};
