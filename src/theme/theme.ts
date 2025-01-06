import { createTheme } from '@mui/material';
import { darkPalette } from './colorSchemes/dark';

export const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: darkPalette
    },
    light: {
      palette: {
        primary: {
          main: '#FF0000'
        },
        text: {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.6)',
          disabled: 'rgba(0, 0, 0, 0.3)',
        }
      }
    } },

  // palette: {
  //   primary: {
  //     main: '#ADB5BD',
  //     light: '#DEE2E6',
  //     dark: '#495057',
  //     contrastText: '#000000' // recznie zmien na ta wartosc w cardach kalendarza
  //   },
  //   secondary: {
  //     main: '#F3F5F7',
  //     light: '#F8F9FA',
  //     dark: '#DAE0E7'
  //   },
  //   text: {
  //     primary: 'rgba(245,245,245, 0.9)',
  //     secondary: 'rgba(245,245,245, 0.6)',
  //     disabled: 'rgba(245,245,245, 0.3)',
  //   },
  //   background: {
  //     paper: '#F5F5F5',
  //     default: '#FFFFFF',
  //   }
  // },
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
      // variants: [
      //   h1: {
      //     color: 'text.secondary'
      //   }
      // ]
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
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.6)', // Kolor etykiety domyślnym
          '&.Mui-focused': {
            color: 'rgba(0, 0, 0, 0.87)', // Kolor etykiety w fokusie
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#495057',
          color: 'primary.main',
        },
      },
    }
  }

});

/*
✅1. Uaktualnic aplikacje tak, zeby nieuzywala nigdzie castomowych wartosci dla kolorow oraz przeniesc co uwazasz za sluszne do theme'a
2. Zrobic light theme i dark theme https://mui.com/material-ui/customization/dark-mode/?srsltid=AfmBOorUbwO2B0rlkdv35qivksZjQZy4eajoOYHlQpfk7uA1YSouGBcM
✅3. Pozbyc sie bledow eslintowych oraz go nie wylaczac :)
✅5. Zrobic zalegla prace domowa, zebysmy mogli kontynuowac
4. odpytka z RHF i form walidajci RHF
*/
