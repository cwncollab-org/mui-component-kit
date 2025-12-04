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
import { useFieldContext } from './formContext'
import { useId, useMemo } from 'react'
import { createSelectSlotProps, renderOptions } from './utils'

export type SelectOption = {
  value: string
  label: string
}

export type SelectProps<TOption = SelectOption | string | any> =
  MuiFormControlProps & {
    label?: string
    labelBehavior?: 'auto' | 'shrink' | 'static'
    size?: 'small' | 'medium'
    fullWidth?: boolean
    isLoading?: boolean
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
  }

export function Select<TOption = SelectOption | string | any>(
  props: SelectProps<TOption>
) {
  const field = useFieldContext<string>()
  const {
    children,
    slotProps,
    options,
    multiple,
    labelBehavior = 'auto',
    size,
    fullWidth,
    isLoading,
    disabled,
    onChange,
    getOptionLabel,
    getOptionValue,
    ...rest
  } = props

  const id = useId()
  const labelId = `${id}-label`
  const selectId = `${id}-select`

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

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
      error={Boolean(errorText)}
      fullWidth={fullWidth}
      size={size}
      data-isdirty={field.state.meta.isDirty || undefined}
      data-ispristine={field.state.meta.isPristine || undefined}
      data-istouched={field.state.meta.isTouched || undefined}
      data-isdefaultvalue={field.state.meta.isDefaultValue || undefined}
      data-isvalid={field.state.meta.isValid || undefined}
      disabled={isLoading || disabled}
      {...rest}
    >
      <MuiInputLabel id={labelId} {...inputLabelProps}>
        {props.label}
      </MuiInputLabel>
      <MuiSelect
        id={selectId}
        labelId={labelId}
        multiple={multiple}
        {...selectProps}
        label={props.label}
        name={field.name}
        value={isLoading ? '' : (field.state.value ?? '')}
        onChange={(ev, child) => {
          onChange?.(ev, child)
          if (!ev.defaultPrevented) {
            field.handleChange(ev.target.value as string)
          }
        }}
      >
        {children}
        {renderedOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {Boolean(errorText) && (
        <MuiFormHelperText {...slotProps?.helperText}>
          {errorText}
        </MuiFormHelperText>
      )}
    </MuiFormControl>
  )
}
