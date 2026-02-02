import {
  FormControl as MuiFormControl,
  FormControlProps as MuiFormControlProps,
  FormHelperText as MuiFormHelperText,
  FormLabel as MuiFormLabel,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps as MuiRadioGroupProps,
} from '@mui/material'
import { useId } from 'react'

export type RadioGroupBaseProps = Pick<
  MuiRadioGroupProps,
  'name' | 'value' | 'defaultValue' | 'onChange' | 'row' | 'children'
> &
  Pick<MuiFormControlProps, 'disabled' | 'required' | 'fullWidth' | 'sx'> & {
    label?: string
    error?: boolean
    helperText?: string | null
  }

export function RadioGroupBase(props: RadioGroupBaseProps) {
  const {
    label,
    children,
    disabled,
    required,
    fullWidth,
    sx,
    name,
    value,
    defaultValue,
    onChange,
    row,
    error,
    helperText,
  } = props

  const id = useId()
  const labelId = `${id}-label`

  return (
    <MuiFormControl
      disabled={disabled}
      required={required}
      fullWidth={fullWidth}
      error={error}
      sx={sx}
    >
      {label && <MuiFormLabel id={labelId}>{label}</MuiFormLabel>}
      <MuiRadioGroup
        aria-labelledby={label ? labelId : undefined}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        row={row}
      >
        {children}
      </MuiRadioGroup>
      {Boolean(helperText) && (
        <MuiFormHelperText>{helperText}</MuiFormHelperText>
      )}
    </MuiFormControl>
  )
}
