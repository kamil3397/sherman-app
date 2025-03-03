export const darkPalette = {
  primary: {
    main: '#262A2E',
    light: '#6C757D',
    dark: '#212529',
  },
  secondary: {
    main: '#DEE2E5',
    light: '#F8F9FA',
    dark: '#C4C9CE',
  },
  text: {
    primary: 'rgba(245,245,245, 0.9)',
    secondary: 'rgba(245,245,245, 0.6)',
    disabled: 'rgba(245,245,245, 0.3)',
  },
  components: {
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: 'rgba(255, 255, 255, 0.1)', // Tło dla ciemnego motywu
    //       color: 'rgba(245,245,245, 0.9)', // Tekst
    //       '& fieldset': {
    //         borderColor: 'rgba(245,245,245, 0.3)', // Ramka
    //       },
    //       '&.Mui-focused fieldset': {
    //         borderColor: 'secondary.main', // Ramka po fokusie
    //       },
    //     },
    //   },
    // },
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
