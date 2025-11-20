import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/DatePicker'
import { useFieldContext } from './formContext'

import { PickerValidDate, usePickerAdapter } from '@mui/x-date-pickers'
import { useMemo } from 'react'
import { createPickerSlotProps } from './utils'

export type DatePickerProps = Omit<
  MuiDatePickerProps,
  'name' | 'value' | 'defaultValue'
> & {
  valueFormat?: 'adapter' | 'Date'
  required?: boolean
  labelBehavior?: 'auto' | 'shrink' | 'static'
  size?: 'small' | 'medium'
  fullWidth?: boolean
}

export function DatePicker(props: DatePickerProps) {
  const field = useFieldContext<Date | PickerValidDate | null>()
  const adapter = usePickerAdapter()

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  const {
    valueFormat = 'adapter',
    required,
    labelBehavior = 'auto',
    size,
    fullWidth,
    onChange,
    slotProps,
    ...rest
  } = props

  // Convert field value to adapter format for MUI component
  const adapterValue = useMemo(() => {
    if (!field.state.value) {
      return null
    }

    if (field.state.value instanceof Date) {
      // Convert native Date to adapter format
      return adapter.date(field.state.value.toISOString())
    }

    // Already in adapter format
    return field.state.value as PickerValidDate
  }, [field.state.value, adapter])

  const handleDateChange = (value: PickerValidDate | null, context: any) => {
    if (!value) {
      field.handleChange(null)
      onChange?.(value, context)
      return
    }

    if (valueFormat === 'Date') {
      // Convert adapter value to native Date
      const nativeDate = adapter.toJsDate(value)
      field.handleChange(nativeDate)
      onChange?.(value, context)
    } else {
      // Keep adapter format
      field.handleChange(value)
      onChange?.(value, context)
    }
  }

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
      name={field.name}
      value={adapterValue}
      onChange={handleDateChange}
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
  )
}
