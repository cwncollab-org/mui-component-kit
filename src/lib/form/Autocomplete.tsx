import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  FormControl as MuiFormControl,
  FormControlProps as MuiFormControlProps,
  FormHelperText as MuiFormHelperText,
  FormHelperTextProps as MuiFormHelperTextProps,
  ChipTypeMap,
  AutocompleteValue,
  AutocompleteRenderInputParams,
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from '@mui/material'
import { useFieldContext } from './formContext'
import { useId, useMemo } from 'react'
import { createTextFieldSlotProps } from './utils'

export type AutocompleteProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
> = Omit<MuiFormControlProps, 'onChange'> & {
  label?: string
  labelBehavior?: 'auto' | 'shrink' | 'static'
  size?: 'small' | 'medium'
  fullWidth?: boolean

  select?: (value: Value) => string | number
  options: MuiAutocompleteProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  >['options']
  renderInput?: MuiAutocompleteProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  >['renderInput']

  multiple?: Multiple
  freeSolo?: FreeSolo
  placeholder?: string
  required?: boolean
  disabled?: boolean
  slotProps?: {
    autocomplete?: Omit<
      MuiAutocompleteProps<
        Value,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent
      >,
      'options' | 'value' | 'onChange' | 'renderInput' | 'multiple' | 'freeSolo'
    >
    textField?: Omit<MuiTextFieldProps, 'value' | 'onChange' | 'name'>
    helperText?: MuiFormHelperTextProps
  }
  onChange?: MuiAutocompleteProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  >['onChange']
}

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
    Value | Value[] | string | string[] | number | number[]
  >()

  const {
    slotProps,
    options,
    select,
    renderInput,
    multiple,
    freeSolo,
    labelBehavior = 'auto',
    size,
    fullWidth,
    placeholder,
    required,
    disabled,
    onChange,
    ...rest
  } = props

  const defaultIsOptionEqualToValue = (option: Value, value: Value) => {
    if (!option) return false

    if (
      typeof option === 'object' &&
      (typeof value === 'string' || typeof value === 'number')
    ) {
      const selectedOption = select
        ? select(option)
        : (option as unknown as string | number)
      return selectedOption === value
    }
    return option === value
  }

  const { input: inputProps, inputLabel: inputLabelProps } = useMemo(
    () =>
      createTextFieldSlotProps({
        labelBehavior,
        slotProps: slotProps?.textField?.slotProps,
      }),
    [labelBehavior, slotProps?.textField?.slotProps]
  )

  const textFieldProps: Partial<MuiTextFieldProps> = {
    ...slotProps?.textField,
    slotProps: {
      ...slotProps?.textField?.slotProps,
      inputLabel: inputLabelProps,
      input: inputProps,
    },
  }

  const defaultRenderInput = (params: AutocompleteRenderInputParams) => {
    return (
      <MuiTextField
        {...params}
        label={props.label}
        placeholder={placeholder}
        error={Boolean(errorText)}
        required={required}
        name={field.name}
        slotProps={{
          ...textFieldProps.slotProps,
          input: {
            ...params.InputProps,
            ...inputProps,
          },
          inputLabel: inputLabelProps,
        }}
        {...(({ slotProps: _, ...rest }) => rest)(textFieldProps)}
      />
    )
  }

  const id = useId()

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  const value = useMemo(() => {
    const value = field.state.value
    const eq =
      slotProps?.autocomplete?.isOptionEqualToValue ??
      defaultIsOptionEqualToValue
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
  }, [
    field.state.value,
    options,
    multiple,
    slotProps?.autocomplete?.isOptionEqualToValue,
  ])

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<Value> | undefined
  ) => {
    onChange?.(event, newValue, reason, details)
    if (!event.defaultPrevented) {
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
            select ? select(item) : item
          ) as Value[]
        }
      } else {
        if (!Array.isArray(newValue)) {
          processedValue = select
            ? select(newValue as Value)
            : (newValue as Value)
        }
      }
      if (processedValue) {
        field.handleChange(processedValue)
      }
    }
  }

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
      {...rest}
    >
      <MuiAutocomplete
        id={id}
        multiple={multiple}
        freeSolo={freeSolo}
        disabled={disabled}
        options={options}
        isOptionEqualToValue={
          slotProps?.autocomplete?.isOptionEqualToValue ??
          defaultIsOptionEqualToValue
        }
        value={value}
        onChange={handleChange}
        renderInput={renderInput ?? defaultRenderInput}
        {...slotProps?.autocomplete}
      />
      {Boolean(errorText) && (
        <MuiFormHelperText {...slotProps?.helperText}>
          {errorText}
        </MuiFormHelperText>
      )}
    </MuiFormControl>
  )
}
