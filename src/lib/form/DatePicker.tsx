import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/DatePicker'
import { useFieldContext } from './formContext'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useMemo } from 'react'

type Props = Omit<
  MuiDatePickerProps,
  'name' | 'value' | 'onChange' | 'defaultValue'
> & {
  required?: boolean
  labelShrink?: boolean
  size?: 'small' | 'medium'
  fullWidth?: boolean
}

export function DatePicker(props: Props) {
  const field = useFieldContext<Date | string>()

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  const { required, labelShrink, size, fullWidth, ...rest } = props

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        {...rest}
        name={field.name}
        value={field.state.value ? dayjs(field.state.value) : null}
        onChange={value => {
          if (value) {
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
          },
        }}
      />
    </LocalizationProvider>
  )
}
