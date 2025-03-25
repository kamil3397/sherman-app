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
// import { TextField, TextFieldProps } from '@mui/material';
// //import typów z react-hook-form
// import {
//   FieldPath,
//   FieldValues,
//   UseControllerProps,
//   useController,
// } from 'react-hook-form';

// type FormTextfieldProps<
// // TFieldValues - to typ właściwości formularza,
//   TFieldValues extends FieldValues = FieldValues, // rozszerzam o prawowite FieldValues i ustawiam na domyślny FieldValues
//   // TName - to ścieka do pola w obiekcie formularza
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues> // rozszerzam o prawowite FieldPath i ustawiam na domyślny FieldPath
// > = UseControllerProps<TFieldValues, TName> & TextFieldProps; // taki zapis sprawia ze FormTextField bedzie akceptował wszystkie
// // propsy zwiazane z formularzem i wyglądem i zachowaniem TextField

// export const FormTextfield = <
// TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
//   // otypowane wyzej propsy wraz z controlerm z react-hook-form
//     name,
//     control,
//     fullWidth = true,
//     ...props
//   }:
// FormTextfieldProps<TFieldValues, TName>) => {
//   // integracja z react-hook-form
//   const { fieldState: { error, invalid }, field: { value, onBlur, onChange } } = useController({ name, control });
//   return (
//     <TextField
//       {...props} // to pozwala na przekzanie dodatkowych właściwosci które nie są specyficzne dla formularza
//       onChange={onChange}
//       onBlur={onBlur}
//       value={value !== null ? value : ''}
//       error={invalid}
//       fullWidth={fullWidth}
//       helperText={invalid && error?.message && error.message}
//     />
//   );
// };
