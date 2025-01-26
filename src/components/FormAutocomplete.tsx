import { FC } from 'react';
import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import { Controller } from 'react-hook-form';

export type OptionType = {
    value: string;
    label: string;
}

type FormTextFieldProps = {
  name: string;
  control: any;
  label: string;
  options: OptionType[]
} & TextFieldProps; // to daje wszystkie funkcjoinalnosci TextField z MUI

export const FormAutocomplete:FC<FormTextFieldProps> = ({ name, control, options }) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option) => option.label}
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Dodaj gości"
            placeholder="Wybierz..."
            fullWidth
          />
        )}
        sx={{ flex: 1 }}
      />
    )}
  />
);
