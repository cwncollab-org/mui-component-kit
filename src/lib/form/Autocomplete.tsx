import {
  ChipTypeMap,
  AutocompleteValue,
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from '@mui/material'
import { useFieldContext } from './formContext'
import { useMemo } from 'react'
import { AutocompleteBase, AutocompleteBaseProps } from './AutocompleteBase'

export type AutocompleteProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
> = Omit<
  AutocompleteBaseProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  >,
  'name' | 'value'
>

export function Autocomplete<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
>(
  props: AutocompleteProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  >
) {
  const field = useFieldContext<
    Value | Value[] | string | string[] | number | number[] | null
  >()

  const {
    getOptionValue,
    onChange,
    multiple,
    options,
    isOptionEqualToValue,
    helperText,
    ...rest
  } = props

  const defaultIsOptionEqualToValue = (option: Value, value: Value) => {
    if (!option) return false

    if (
      typeof option === 'object' &&
      (typeof value === 'string' || typeof value === 'number')
    ) {
      const selectedOption = getOptionValue
        ? getOptionValue(option)
        : (option as unknown as string | number)
      return selectedOption === value
    }
    return option === value
  }

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  const value = useMemo(() => {
    const value = field.state.value
    const eq = isOptionEqualToValue ?? defaultIsOptionEqualToValue
    if (multiple) {
      if (Array.isArray(value)) {
        return options.filter(option =>
          value.some(v => eq(option, v as any))
        ) as AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>
      }
      return [] as AutocompleteValue<
        Value,
        Multiple,
        DisableClearable,
        FreeSolo
      >
    } else {
      if (!Array.isArray(value) && value != null) {
        return (options.find(option => eq(option, value as any)) ??
          null) as AutocompleteValue<
          Value,
          Multiple,
          DisableClearable,
          FreeSolo
        >
      }
      return null as AutocompleteValue<
        Value,
        Multiple,
        DisableClearable,
        FreeSolo
      >
    }
  }, [field.state.value, options, multiple, isOptionEqualToValue])

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<Value> | undefined
  ) => {
    onChange?.(event, newValue, reason, details)
    if (!event.defaultPrevented) {
      if (newValue === null) {
        field.handleChange(null)
        return
      }
      let processedValue:
        | Value
        | Value[]
        | string
        | string[]
        | number
        | number[]
        | null = null
      if (multiple) {
        if (Array.isArray(newValue)) {
          processedValue = newValue.map(item =>
            getOptionValue ? getOptionValue(item) : item
          ) as Value[]
        }
      } else {
        if (!Array.isArray(newValue)) {
          processedValue = newValue
            ? getOptionValue
              ? getOptionValue(newValue as Value)
              : (newValue as Value)
            : null
        }
      }
      if (processedValue !== null) {
        field.handleChange(processedValue)
      }
    }
  }

  return (
    <AutocompleteBase
      {...rest}
      multiple={multiple}
      error={Boolean(errorText)}
      data-isdirty={field.state.meta.isDirty || undefined}
      data-ispristine={field.state.meta.isPristine || undefined}
      data-istouched={field.state.meta.isTouched || undefined}
      data-isdefaultvalue={field.state.meta.isDefaultValue || undefined}
      data-isvalid={field.state.meta.isValid || undefined}
      options={options}
      value={value}
      onChange={handleChange}
      helperText={errorText ?? helperText}
    />
  )
}
