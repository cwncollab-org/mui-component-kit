import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material'
import { useFieldContext } from './formContext'
import { useMemo } from 'react'

export type TextFieldProps = Omit<MuiTextFieldProps, 'name'> & {
  labelShrink?: boolean
}

export function TextField(props: TextFieldProps) {
  const { label, slotProps, labelShrink, ...rest } = props
  const field = useFieldContext<string | undefined | null>()

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  return (
    <MuiTextField
      name={field.name}
      label={label}
      value={field.state.value ?? ''}
      onBlur={field.handleBlur}
      onChange={e =>
        field.handleChange(e.target.value === '' ? null : e.target.value)
      }
      slotProps={{
        inputLabel: { shrink: labelShrink },
        ...slotProps,
      }}
      error={field.state.meta.errors.length > 0}
      helperText={errorText}
      {...rest}
    />
  )
}
