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

export type RenderedOption = SelectOption & {
  disabled?: boolean
}

export type SelectBaseProps<TOption = SelectOption | string | any> = Omit<
  MuiFormControlProps,
  'onChange' | 'value' | 'error' | 'required'
> &
  Pick<
    MuiSelectProps,
    | 'id'
    | 'labelId'
    | 'name'
    | 'value'
    | 'onChange'
    | 'defaultValue'
    | 'size'
    | 'error'
    | 'required'
    | 'displayEmpty'
    | 'renderValue'
    | 'MenuProps'
    | 'IconComponent'
    | 'input'
    | 'open'
    | 'onOpen'
    | 'onClose'
    | 'autoFocus'
    | 'readOnly'
    | 'tabIndex'
    | 'inputProps'
    | 'SelectDisplayProps'
  > & {
    label?: string
    labelBehavior?: 'auto' | 'shrink' | 'static'
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
  }

export function SelectBase<TOption = SelectOption | string | any>(
  props: SelectBaseProps<TOption>
) {
  const {
    id,
    input,
    children,
    slotProps,
    options,
    multiple,
    name,
    label,
    labelId,
    labelBehavior = 'auto',
    size,
    fullWidth,
    helperText,
    disabled,
    value,
    onChange,
    getOptionLabel,
    getOptionValue,
    error,
    required,
    displayEmpty,
    renderValue,
    MenuProps,
    IconComponent,
    open,
    onOpen,
    onClose,
    autoFocus,
    readOnly,
    tabIndex,
    inputProps,
    SelectDisplayProps,
    ...rest
  } = props

  const defaultId = useId()
  const labelIdFinal = labelId ?? `${defaultId}-label`
  const idFinal = id ?? `${defaultId}-select`

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
      error={error}
      required={required}
    >
      <MuiInputLabel id={labelIdFinal} {...inputLabelProps}>
        {label}
      </MuiInputLabel>
      <MuiSelect
        id={idFinal}
        labelId={labelIdFinal}
        input={input}
        multiple={multiple}
        {...selectProps}
        label={label}
        name={name}
        value={value}
        onChange={(ev, child) => {
          onChange?.(ev, child)
        }}
        error={error}
        required={required}
        displayEmpty={displayEmpty}
        renderValue={renderValue}
        MenuProps={MenuProps}
        IconComponent={IconComponent}
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        autoFocus={autoFocus}
        readOnly={readOnly}
        tabIndex={tabIndex}
        inputProps={inputProps}
        SelectDisplayProps={SelectDisplayProps}
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
