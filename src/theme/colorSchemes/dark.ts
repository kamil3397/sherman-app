export const darkPalette = {
  primary: {
    main: '#212529',
    light: '#DEE2E6',
    dark: '#495057',
  },
  secondary: {
    main: '#F3F5F7',
    light: '#F8F9FA',
    dark: '#DAE0E7'
  },
  text: {
    primary: 'rgba(245,245,245, 0.9)',
    secondary: 'rgba(245,245,245, 0.6)',
    disabled: 'rgba(245,245,245, 0.3)',
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Tło dla ciemnego motywu
          color: 'rgba(245,245,245, 0.9)', // Tekst
          '& fieldset': {
            borderColor: 'rgba(245,245,245, 0.3)', // Ramka
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
          backgroundColor: '#495057', // Tło przycisku
          color: 'rgba(245,245,245, 0.9)', // Kolor tekstu
          '&:hover': {
            backgroundColor: '#343A40', // Tło po najechaniu
          },
        },
      },
    },
  },
};
