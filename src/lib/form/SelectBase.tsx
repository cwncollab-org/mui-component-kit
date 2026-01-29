import {
  FormControl as MuiFormControl,
  FormControlProps as MuiFormControlProps,
  InputLabel as MuiInputLabel,
  InputLabelProps as MuiInputLabelProps,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  FormHelperText as MuiFormHelperText,
  FormHelperTextProps as MuiFormHelperTextProps,
  MenuItem,
} from '@mui/material'
import { useId, useMemo } from 'react'
import { createSelectSlotProps, renderOptions } from './utils'

export type SelectOption = {
  value: string
  label: string
  description?: string
}

export type SelectBaseProps<TOption = SelectOption | string | any> = Omit<
  MuiFormControlProps,
  'onChange' | 'value'
> & {
  name?: string
  label?: string
  labelBehavior?: 'auto' | 'shrink' | 'static'
  size?: 'small' | 'medium'
  fullWidth?: boolean
  helperText?: string
  options?: TOption[]
  multiple?: boolean
  slotProps?: {
    inputLabel?: Omit<MuiInputLabelProps, 'id'>
    select?: Omit<
      MuiSelectProps,
      'id' | 'labelId' | 'name' | 'value' | 'onChange' | 'defaultValue'
    >
    helperText?: MuiFormHelperTextProps
  }
  getOptionLabel?: (option: TOption) => string
  getOptionValue?: (option: TOption) => string
  onChange?: MuiSelectProps['onChange']
  value?: string
}

export function SelectBase<TOption = SelectOption | string | any>(
  props: SelectBaseProps<TOption>
) {
  const {
    children,
    slotProps,
    options,
    multiple,
    name,
    label,
    labelBehavior = 'auto',
    size,
    fullWidth,

    helperText,
    disabled,
    value,
    onChange,
    getOptionLabel,
    getOptionValue,
    ...rest
  } = props

  const id = useId()
  const labelId = `${id}-label`
  const selectId = `${id}-select`

  const renderedOptions = useMemo<SelectOption[]>(
    () => renderOptions(options, getOptionLabel, getOptionValue),
    [options, getOptionLabel, getOptionValue]
  )

  const { inputLabelProps, selectProps } = useMemo(
    () =>
      createSelectSlotProps({
        labelBehavior,
        slotProps,
      }),
    [labelBehavior, slotProps]
  )

  return (
    <MuiFormControl
      {...rest}
      fullWidth={fullWidth}
      size={size}
      disabled={disabled}
    >
      <MuiInputLabel id={labelId} {...inputLabelProps}>
        {label}
      </MuiInputLabel>
      <MuiSelect
        id={selectId}
        labelId={labelId}
        multiple={multiple}
        {...selectProps}
        label={label}
        name={name}
        value={value}
        onChange={(ev, child) => {
          onChange?.(ev, child)
        }}
      >
        {children}
        {renderedOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {Boolean(helperText) && (
        <MuiFormHelperText {...slotProps?.helperText}>
          {helperText}
        </MuiFormHelperText>
      )}
    </MuiFormControl>
  )
}
