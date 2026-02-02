import { PickerValidDate, usePickerAdapter } from '@mui/x-date-pickers'
import { useMemo } from 'react'
import { useFieldContext } from './formContext'
import { TimePickerBase, TimePickerBaseProps } from './TimePickerBase'

export type TimePickerProps = Omit<
  TimePickerBaseProps,
  'name' | 'value' | 'defaultValue' | 'error' | 'helperText'
> & {
  valueFormat?: 'adapter' | 'Date'
}

export function TimePicker(props: TimePickerProps) {
  const field = useFieldContext<Date | PickerValidDate | null>()
  const adapter = usePickerAdapter()

  const { valueFormat = 'adapter', onChange, ...rest } = props

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  // Convert field value to adapter format for Base component
  const adapterValue = useMemo(() => {
    if (!field.state.value) return null

    if (field.state.value instanceof Date) {
      // Convert native Date to adapter format
      return adapter.date(field.state.value.toISOString())
    }

    // Already in adapter format
    return field.state.value as PickerValidDate
  }, [field.state.value, adapter])

  const handleTimeChange = (value: PickerValidDate | null, context: any) => {
    if (!value) {
      field.handleChange(null)
    } else if (valueFormat === 'Date') {
      // Convert adapter value to native Date
      const nativeDate = adapter.toJsDate(value)
      field.handleChange(nativeDate)
    } else {
      // Keep adapter format
      field.handleChange(value)
    }

    // Always pass original adapter value to user's onChange (matching MUI signature)
    onChange?.(value, context)
  }

  return (
    <TimePickerBase
      {...rest}
      name={field.name}
      value={adapterValue}
      onChange={handleTimeChange}
      error={field.state.meta.errors.length > 0}
      helperText={errorText}
    />
  )
}
