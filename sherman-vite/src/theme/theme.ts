import { createTheme } from '@mui/material';
import { darkPalette } from './colorSchemes/dark';
import { lightPalette } from './colorSchemes/light';

export const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: darkPalette
    },
    light: {
      palette: lightPalette
    }
  },

  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      mb: 2,
      textAlign: 'center',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: 'rgba(245,245,245, 0.6)',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    button: {
      fontSize: '1rem',
      fontWeight: 700,
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        color: 'text.primary',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.87)', // Kolor tekstu w polu
          backgroundColor: '#FFFFFF',
          '& .MuiOutlinedInput-input': {
            color: 'rgba(0, 0, 0, 0.87)', // Kolor wpisywanego tekstu
          },
          '& fieldset': {
            borderColor: '#ADB5BD', // Domyślny kolor ramki
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ADB5BD', // Kolor ramki w fokusie
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.87)' }
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.6)', // Kolor etykiety domyślnym
          '&.Mui-focused': {
            color: 'rgba(0, 0, 0, 9)', // Kolor etykiety w fokusie
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.light,
          },
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'text.primary', // Domyślny kolor linku
          '&:visited': {
            color: '#ccc', // Kolor linku po kliknięciu
          },
        },
      },
    },
  }

});

/*
✅1. Uaktualnic aplikacje tak, zeby nieuzywala nigdzie castomowych wartosci dla kolorow oraz przeniesc co uwazasz za sluszne do theme'a
2. Zrobic light theme i dark theme https://mui.com/material-ui/customization/dark-mode/?srsltid=AfmBOorUbwO2B0rlkdv35qivksZjQZy4eajoOYHlQpfk7uA1YSouGBcM
✅3. Pozbyc sie bledow eslintowych oraz go nie wylaczac :)
✅5. Zrobic zalegla prace domowa, zebysmy mogli kontynuowac
4. odpytka z RHF i form walidajci RHF
*/
