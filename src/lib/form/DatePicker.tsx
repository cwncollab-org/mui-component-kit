import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/DatePicker'
import { useFieldContext } from './formContext'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useMemo } from 'react'

export type DatePickerProps = Omit<
  MuiDatePickerProps,
  'name' | 'value' | 'defaultValue'
> & {
  required?: boolean
  labelShrink?: boolean
  size?: 'small' | 'medium'
  fullWidth?: boolean
}

export function DatePicker(props: DatePickerProps) {
  const field = useFieldContext<Date | string>()

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  const {
    required,
    labelShrink,
    size,
    fullWidth,
    onChange,
    slotProps,
    ...rest
  } = props

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        {...rest}
        name={field.name}
        value={field.state.value ? dayjs(field.state.value) : null}
        onChange={(value, context) => {
          if (value) {
            onChange?.(value, context)
            field.handleChange(value.toDate())
          }
        }}
        slotProps={{
          textField: {
            required: required,
            error: Boolean(errorText),
            helperText: errorText,
            InputLabelProps: { shrink: labelShrink },
            size: size,
            fullWidth: fullWidth,
            InputProps: {
              notched: labelShrink,
            },
            ...(slotProps?.textField as any),
          },
        }}
      />
    </LocalizationProvider>
  )
}
