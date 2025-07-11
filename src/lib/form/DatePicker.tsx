import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/DatePicker'
import { useFieldContext } from './formContext'
import dayjs from 'dayjs'
import {
  LocalizationProvider,
  PickersOutlinedInputProps,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useMemo } from 'react'
import { InputLabelProps } from '@mui/material'

export type DatePickerProps = Omit<
  MuiDatePickerProps,
  'name' | 'value' | 'defaultValue'
> & {
  required?: boolean
  labelBehavior?: 'auto' | 'shrink' | 'static'
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
    labelBehavior = 'auto',
    size,
    fullWidth,
    onChange,
    slotProps,
    ...rest
  } = props

  const labelShrink = labelBehavior === 'shrink' ? true : undefined

  let inputLabelProps: Partial<InputLabelProps> = {
    shrink: labelShrink,
  }

  let inputProps: Partial<PickersOutlinedInputProps> = {
    notched: labelShrink,
  }

  if (labelBehavior === 'static') {
    inputLabelProps = {
      ...inputLabelProps,
      shrink: true,
      sx: {
        position: 'relative',
        transform: 'none',
      },
    }
    inputProps = {
      ...inputProps,
      notched: true,
      sx: {
        ...props?.sx,
        '& legend > span': {
          display: 'none',
        },
      },
    }
  }

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
            size: size,
            fullWidth: fullWidth,
            InputLabelProps: inputLabelProps,
            InputProps: inputProps,
            ...(slotProps?.textField as any),
          },
        }}
      />
    </LocalizationProvider>
  )
}
