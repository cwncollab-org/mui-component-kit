import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material'
import { useFieldContext } from './formContext'
import { InputHTMLAttributes, useMemo } from 'react'
import { createTextFieldSlotProps } from './utils'

export type TextFieldProps = Omit<MuiTextFieldProps, 'name' | 'value'> & {
  labelBehavior?: 'auto' | 'shrink' | 'static'
  min?: InputHTMLAttributes<HTMLInputElement>['min']
  max?: InputHTMLAttributes<HTMLInputElement>['max']
  maxLength?: InputHTMLAttributes<HTMLInputElement>['maxLength']
  pattern?: InputHTMLAttributes<HTMLInputElement>['pattern']
}

const converters: Record<
  string,
  { fromString: (value: string) => any; toString: (value: any) => string }
> = {
  number: {
    fromString: (value: string) => {
      const parsed = parseFloat(value)
      return isNaN(parsed) ? null : parsed
    },
    toString: (value: any) => (value == null ? '' : String(value)),
  },
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
  const field = useFieldContext<string | number | undefined | null>()

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  const error = field.state.meta.errors.length > 0

  const { input: inputProps, inputLabel: inputLabelProps } = useMemo(
    () =>
      createTextFieldSlotProps({
        labelBehavior,
        min,
        max,
        maxLength,
        pattern,
        slotProps,
      }),
    [labelBehavior, min, max, maxLength, pattern, slotProps]
  )

  const type = props.type

  return (
    <MuiTextField
      name={field.name}
      label={label}
      value={convertToString(type, field.state.value) ?? ''}
      onBlur={field.handleBlur}
      onChange={ev => {
        onChange?.(ev)
        if (!ev.defaultPrevented) {
          field.handleChange(
            ev.target.value === ''
              ? null
              : convertFromString(type, ev.target.value)
          )
        }
      }}
      slotProps={{
        ...slotProps,
        inputLabel: inputLabelProps,
        input: inputProps,
      }}
      error={error}
      helperText={error ? errorText : helperText}
      data-isdirty={field.state.meta.isDirty || undefined}
      data-ispristine={field.state.meta.isPristine || undefined}
      data-istouched={field.state.meta.isTouched || undefined}
      data-isdefaultvalue={field.state.meta.isDefaultValue || undefined}
      data-isvalid={field.state.meta.isValid || undefined}
      {...rest}
    />
  )
}

function convertToString(type: string | undefined, value: any) {
  if (type && converters[type]) {
    return converters[type].toString(value)
  }
  return value == null ? '' : String(value)
}

function convertFromString(type: string | undefined, value: any) {
  if (type && converters[type]) {
    return converters[type].fromString(value)
  }
  return value
}
