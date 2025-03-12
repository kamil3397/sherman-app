import { FC } from 'react';
import { Autocomplete, TextField, TextFieldProps, Chip, } from '@mui/material';
import { Controller } from 'react-hook-form';

export type OptionType = {
  value: string;
  label: string;
};

type FormTextFieldProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  label: string;
  limitTags: number;
  options: OptionType[];
} & TextFieldProps; // to daje wszystkie funkcjonalności TextField z MUI

export const FormAutocomplete: FC<FormTextFieldProps> = ({ name, control, options, limitTags, }) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option) => option.label}
        value={value}
        limitTags={limitTags}
        onChange={(_, newValue) => onChange(newValue)}
        renderTags={(selected, getTagProps) =>
          selected.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option.value}
              label={option.label}
              sx={{
                backgroundColor: 'secondary.main',
                color: 'primary.main',
                fontWeight: 'bold',
                borderRadius: '12px',
                padding: '4px',
                '& .MuiChip-deleteIcon': {
                  color: 'primary.main',
                },
              }}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Dodaj gości"
            placeholder={value?.length === 0 ? 'Wybierz gościa' : ''}
            fullWidth
          />
        )}
        sx={{ flex: 1 }}
      />
    )}
  />
);
