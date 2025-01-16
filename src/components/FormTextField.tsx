import { FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Controller } from 'react-hook-form';

type FormTextFieldProps = {
  name: string;
  control: any;
  label: string;
} & TextFieldProps; // to daje wszystkie funkcjoinalnosci TextField z MUI

const FormTextField: FC<FormTextFieldProps> = ({ name, control, fullWidth = true, ...params }) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        {...params}
        fullWidth={fullWidth}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        type={params.type === 'number' ? 'number' : params.type}
        onChange={(e) => field.onChange(params.type === 'number' ? Number(e.target.value) : e.target.value)}
        // dla pól o typie number zmieniam ich wartość na Number i tak wysłam jesli typ to nie 'number' to zostawiam string
        sx={{
          mb: 2,
        }}
      />
    )}
  />
);

export default FormTextField;
