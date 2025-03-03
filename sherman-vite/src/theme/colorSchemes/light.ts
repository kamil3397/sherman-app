export const lightPalette = {
  primary: {
    main: '#e9ecef',
    light: '#f8f9fa',
    dark: '#ADB5BD',
  },
  secondary: {
    main: '#495057',
    light: '#ADB5BD',
    dark: '#343A40',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.3)',
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // Tło dla jasnego motywu
          color: 'rgba(0, 0, 0, 0.87)', // Tekst
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.3)', // Ramka
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ADB5BD', // Ramka po fokusie
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#ADB5BD', // Tło przycisku
          color: 'rgba(0, 0, 0, 0.87)', // Kolor tekstu
          '&:hover': {
            backgroundColor: '#DEE2E6', // Tło po najechaniu
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.87)', // Domyślny kolor tekstu
        },
      },
    },
  },
};
