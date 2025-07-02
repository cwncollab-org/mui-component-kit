import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material'
import { useFieldContext } from './formContext'
import { useMemo } from 'react'

export type TextFieldProps = Omit<MuiTextFieldProps, 'name' | 'value'> & {
  labelShrink?: boolean
}

export function TextField(props: TextFieldProps) {
  const {
    label,
    slotProps,
    labelShrink,
    onChange,
    helperText = '',
    ...rest
  } = props
  const field = useFieldContext<string | undefined | null>()

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  const error = field.state.meta.errors.length > 0

  return (
    <MuiTextField
      name={field.name}
      label={label}
      value={field.state.value ?? ''}
      onBlur={field.handleBlur}
      onChange={ev => {
        onChange?.(ev)
        if (!ev.defaultPrevented) {
          field.handleChange(ev.target.value === '' ? null : ev.target.value)
        }
      }}
      slotProps={{
        inputLabel: { shrink: labelShrink },
        ...slotProps,
      }}
      error={error}
      helperText={error ? errorText : helperText}
      {...rest}
    />
  )
}
