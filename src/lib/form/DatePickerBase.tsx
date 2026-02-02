import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/DatePicker'
import { PickerValidDate, usePickerAdapter } from '@mui/x-date-pickers'
import { useMemo } from 'react'
import { createPickerSlotProps } from './utils'

export type DatePickerBaseProps = MuiDatePickerProps & {
  labelBehavior?: 'auto' | 'shrink' | 'static'
  size?: 'small' | 'medium'
  fullWidth?: boolean
  required?: boolean
  error?: boolean
  helperText?: string | null
}

export function DatePickerBase(props: DatePickerBaseProps) {
  const adapter = usePickerAdapter()

  const {
    labelBehavior = 'auto',
    size,
    fullWidth,
    required,
    error,
    helperText,
    value,
    defaultValue,
    onChange,
    slotProps,
    ...rest
  } = props

  // Convert value to adapter format for MUI component (controlled mode)
  const adapterValue = useMemo(() => {
    if (value === undefined) return undefined
    if (!value) return null

    if (value instanceof Date) {
      // Convert native Date to adapter format
      return adapter.date(value.toISOString())
    }

    // Already in adapter format
    return value as PickerValidDate
  }, [value, adapter])

  // Convert defaultValue to adapter format (uncontrolled mode)
  const adapterDefaultValue = useMemo(() => {
    if (defaultValue === undefined) return undefined
    if (!defaultValue) return null

    if (defaultValue instanceof Date) {
      // Convert native Date to adapter format
      return adapter.date(defaultValue.toISOString())
    }

    // Already in adapter format
    return defaultValue as PickerValidDate
  }, [defaultValue, adapter])

  const { inputProps, inputLabelProps } = useMemo(
    () =>
      createPickerSlotProps({
        labelBehavior,
        sx: props?.sx,
      }),
    [labelBehavior, props?.sx]
  )

  return (
    <MuiDatePicker
      {...rest}
      value={adapterValue}
      defaultValue={adapterDefaultValue}
      onChange={onChange}
      slotProps={{
        ...slotProps,
        textField: {
          required: required,
          error: error,
          helperText: helperText,
          size: size,
          fullWidth: fullWidth,
          InputLabelProps: inputLabelProps,
          InputProps: inputProps,
          ...(slotProps?.textField as any),
        },
      }}
    />
  )
}
