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
  Checkbox,
  CheckboxProps as MuiCheckboxProps,
  ListItemText,
  OutlinedInput,
} from '@mui/material'
import { useId, useMemo } from 'react'
import { createSelectSlotProps, renderOptions } from './utils'
import { SelectOption } from './SelectBase'

export type MultiSelectBaseProps<TOption = SelectOption | string | any> = Omit<
  MuiFormControlProps,
  'onChange' | 'value' | 'error' | 'required'
> &
  Pick<
    MuiSelectProps,
    | 'id'
    | 'labelId'
    | 'name'
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
    value?: string[]
    onChange?: MuiSelectProps['onChange']
    slotProps?: {
      inputLabel?: Omit<MuiInputLabelProps, 'id'>
      select?: Omit<
        MuiSelectProps,
        'id' | 'labelId' | 'name' | 'value' | 'onChange' | 'defaultValue'
      >
      helperText?: MuiFormHelperTextProps
      checkbox?: Omit<MuiCheckboxProps, 'checked'>
    }
    getOptionLabel?: (option: TOption) => string
    getOptionValue?: (option: TOption) => string
  }

export function MultiSelectBase<TOption = SelectOption | string | any>(
  props: MultiSelectBaseProps<TOption>
) {
  const {
    id,
    input,
    children,
    slotProps,
    options,
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

  const currentValue = value ?? []

  const renderedOptions = useMemo<SelectOption[]>(
    () => renderOptions(options, getOptionLabel, getOptionValue),
    [options, getOptionLabel, getOptionValue]
  )

  const { inputLabelProps, selectProps: baseSelectProps } = useMemo(
    () =>
      createSelectSlotProps({
        labelBehavior,
        slotProps: {
          inputLabel: slotProps?.inputLabel,
          select: slotProps?.select,
        },
      }),
    [labelBehavior, slotProps?.inputLabel, slotProps?.select]
  )

  // Default renderValue for multi-select: comma-separated labels
  const defaultRenderValue = useMemo(() => {
    return (selected: string[]) => {
      const selectedValues = selected ?? []
      return selectedValues
        .map(
          val => renderedOptions.find(opt => opt.value === val)?.label ?? val
        )
        .join(', ')
    }
  }, [renderedOptions])

  // Build input based on labelBehavior
  const inputElement = useMemo(() => {
    if (input) return input

    if (labelBehavior === 'static') {
      return (
        <OutlinedInput
          label={label}
          notched={true}
          sx={{
            '& legend > span': {
              display: 'none',
            },
          }}
        />
      )
    }

    return <OutlinedInput label={label} />
  }, [input, label, labelBehavior])

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
        input={inputElement}
        multiple
        {...(baseSelectProps as any)}
        label={label}
        name={name}
        value={currentValue}
        onChange={(ev, child) => {
          onChange?.(ev, child)
        }}
        error={error}
        required={required}
        displayEmpty={displayEmpty}
        renderValue={renderValue ?? defaultRenderValue}
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
            <Checkbox
              checked={currentValue.includes(option.value)}
              {...slotProps?.checkbox}
            />
            <ListItemText primary={option.label} />
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
