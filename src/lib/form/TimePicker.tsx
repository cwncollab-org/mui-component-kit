import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker'
import { TimePickerProps as MuiTimePickerProps } from '@mui/x-date-pickers/TimePicker'
import { useFieldContext } from './formContext'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export type TimePickerProps = Omit<
  MuiTimePickerProps,
  'name' | 'value' | 'defaultValue'
> & {
  required?: boolean
  labelShrink?: boolean
  size?: 'small' | 'medium'
  fullWidth?: boolean
}

export function TimePicker(props: TimePickerProps) {
  const field = useFieldContext<Date | string>()

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  const { required, labelShrink, size, fullWidth, onChange, ...rest } = props
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiTimePicker
        {...rest}
        name={field.name}
        value={field.state.value ? dayjs(field.state.value) : null}
        onChange={(value, context) => {
          if (value) {
            field.handleChange(value.toDate())
            onChange?.(value, context)
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
