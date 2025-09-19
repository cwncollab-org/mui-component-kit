import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker'
import { TimePickerProps as MuiTimePickerProps } from '@mui/x-date-pickers/TimePicker'
import { useFieldContext } from './formContext'

import { useMemo } from 'react'
import {
  PickersOutlinedInputProps,
  PickerValidDate,
  usePickerAdapter,
} from '@mui/x-date-pickers'

import { InputLabelProps } from '@mui/material'

export type TimePickerProps = Omit<
  MuiTimePickerProps,
  'name' | 'value' | 'defaultValue'
> & {
  valueFormat?: 'adapter' | 'Date'
  required?: boolean
  labelBehavior?: 'auto' | 'shrink' | 'static'
  size?: 'small' | 'medium'
  fullWidth?: boolean
}

export function TimePicker(props: TimePickerProps) {
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
    <MuiTimePicker
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
