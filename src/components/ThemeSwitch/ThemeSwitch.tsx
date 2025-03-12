import {
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
  useColorScheme,
} from '@mui/material';

export const ThemeSwitch = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <Box>
      <FormGroup>
        <FormControlLabel
          value={mode}
          onChange={(event) =>
            setMode(
              // eslint-disable-next-line no-undef
              (event.target as HTMLInputElement).checked ? 'dark' : 'light'
            )
          }
          control={<Switch checked={mode === 'dark'} />}
          label={`Current mode: ${mode}`}
        />
      </FormGroup>
    </Box>
  );
};
