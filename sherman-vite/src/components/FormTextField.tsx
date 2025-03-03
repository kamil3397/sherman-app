import { FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Controller} from 'react-hook-form';

type FormTextFieldProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  label: string;
} & TextFieldProps; // to daje wszystkie funkcjoinalnosci TextField z MUI

export const FormTextField: FC<FormTextFieldProps> = ({ name, control, fullWidth = true, ...params }) => (
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

// https://www.freecodecamp.org/news/typescript-generics-with-functional-react-components/
// PRZECZYTAC
// import { TextField, TextFieldProps } from "@mui/material";
// import {
//   FieldPath,
//   FieldValues,
//   UseControllerProps,
//   useController,
// } from "react-hook-form";

// type FormTextfieldProps<
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
// > = UseControllerProps<TFieldValues, TName> & TextFieldProps;

// export const FormTextfield = <
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
// >({
//   name,
//   control,
//   fullWidth = true,
//   ...props
// }:
// FormTextfieldProps<TFieldValues, TName>) => {
//   const {
//     fieldState: { error, invalid },
//     field: { value, onBlur, onChange },
//   } = useController({ name, control });
//   return (
//     <TextField
//       {...props}
//       onChange={onChange}
//       onBlur={onBlur}
//       value={value !== null ? value : ""}
//       error={invalid}
//       fullWidth={fullWidth}
//       helperText={invalid && error?.message && error.message}
//     />
//   );
// };
