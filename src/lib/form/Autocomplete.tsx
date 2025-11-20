import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  FormControl as MuiFormControl,
  FormControlProps as MuiFormControlProps,
  FormHelperText as MuiFormHelperText,
  FormHelperTextProps as MuiFormHelperTextProps,
} from '@mui/material'
import { useFieldContext } from './formContext'
import { useId, useMemo } from 'react'
import { createTextFieldSlotProps } from './utils'

type Option = {
  value: string
  label: string
}

export type AutocompleteProps = Omit<MuiFormControlProps, 'onChange'> & {
  label?: string
  labelBehavior?: 'auto' | 'shrink' | 'static'
  size?: 'small' | 'medium'
  fullWidth?: boolean
  options?: Option[] | string[]
  multiple?: boolean
  freeSolo?: boolean
  placeholder?: string
  required?: boolean
  disabled?: boolean
  slotProps?: {
    autocomplete?: Omit<
      MuiAutocompleteProps<Option, boolean, boolean, boolean>,
      'options' | 'value' | 'onChange' | 'renderInput' | 'multiple' | 'freeSolo'
    >
    textField?: Omit<MuiTextFieldProps, 'value' | 'onChange' | 'name'>
    helperText?: MuiFormHelperTextProps
  }
  onChange?: (value: string | string[] | null) => void
}

export function Autocomplete(props: AutocompleteProps) {
  const field = useFieldContext<string | string[]>()
  const {
    slotProps,
    options,
    multiple = false,
    freeSolo = false,
    labelBehavior = 'auto',
    size,
    fullWidth,
    placeholder,
    required,
    disabled,
    onChange,
    ...rest
  } = props

  const id = useId()

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  const renderedOptions = useMemo<Option[]>(() => {
    if (options) {
      return options.map(option =>
        typeof option === 'string' ? { value: option, label: option } : option
      )
    }
    return []
  }, [options])

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

  const getCurrentValue = () => {
    const value = field.state.value
    if (multiple) {
      if (Array.isArray(value)) {
        return renderedOptions.filter(option => value.includes(option.value))
      }
      return []
    } else {
      if (typeof value === 'string') {
        return renderedOptions.find(option => option.value === value) || null
      }
      return null
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
        options={renderedOptions}
        getOptionLabel={option => {
          if (typeof option === 'string') return option
          return option.label
        }}
        isOptionEqualToValue={(option, value) => {
          if (typeof option === 'string' && typeof value === 'string') {
            return option === value
          }
          return option.value === value.value
        }}
        value={getCurrentValue()}
        onChange={(event, newValue) => {
          let processedValue: string | string[] | null = null

          if (multiple) {
            if (Array.isArray(newValue)) {
              processedValue = newValue.map(item =>
                typeof item === 'string' ? item : (item as Option).value
              )
            } else {
              processedValue = []
            }
          } else {
            if (newValue) {
              processedValue =
                typeof newValue === 'string'
                  ? newValue
                  : (newValue as Option).value
            }
          }

          onChange?.(processedValue)
          if (!event.defaultPrevented) {
            field.handleChange(processedValue as string | string[])
          }
        }}
        renderInput={params => (
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
        )}
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
