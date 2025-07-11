import {
  InputLabelProps,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material'
import { useFieldContext } from './formContext'
import { InputHTMLAttributes, useMemo } from 'react'

export type TextFieldProps = Omit<MuiTextFieldProps, 'name' | 'value'> & {
  labelBehavior?: 'auto' | 'shrink' | 'static'
  min?: InputHTMLAttributes<HTMLInputElement>['min']
  max?: InputHTMLAttributes<HTMLInputElement>['max']
  maxLength?: InputHTMLAttributes<HTMLInputElement>['maxLength']
  pattern?: InputHTMLAttributes<HTMLInputElement>['pattern']
}

export function TextField(props: TextFieldProps) {
  const {
    labelBehavior = 'auto',
    min,
    max,
    maxLength,
    pattern,
    label,
    slotProps,
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
  const labelShrink = labelBehavior === 'shrink' ? true : undefined

  let inputLabelProps: Partial<InputLabelProps> = {
    ...(slotProps?.inputLabel as Partial<InputLabelProps>),
    shrink: labelShrink,
    sx: {
      ...(slotProps?.inputLabel as any)?.sx,
    },
  }
  let inputProps = {
    ...slotProps?.input,
    slotProps: {
      ...(slotProps?.input as any)?.slotProps,
      input: {
        ...(slotProps?.input as any)?.slotProps?.input,
        min: min,
        max: max,
        maxLength: maxLength,
        pattern: pattern,
      },
    },
  }

  if (labelBehavior === 'static') {
    inputLabelProps = {
      ...inputLabelProps,
      sx: {
        ...(inputLabelProps as any)?.sx,
        position: 'relative',
        transform: 'none',
      },
    }
    inputProps = {
      ...inputProps,
      notched: true,
      sx: {
        ...(inputProps as any)?.sx,
        '& legend > span': {
          display: 'none',
        },
      },
    }
  }

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
        ...slotProps,
        inputLabel: inputLabelProps,
        input: inputProps,
      }}
      error={error}
      helperText={error ? errorText : helperText}
      {...rest}
    />
  )
}
