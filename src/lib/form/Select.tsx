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

type Option = {
  value: string
  label: string
}

export type SelectProps = MuiFormControlProps & {
  label?: string
  labelShrink?: boolean
  size?: 'small' | 'medium'
  fullWidth?: boolean
  options?: Option[] | string[]
  multiple?: boolean
  slotProps?: {
    inputLabel?: Omit<MuiInputLabelProps, 'id'>
    select?: Omit<
      MuiSelectProps,
      'id' | 'labelId' | 'name' | 'value' | 'onChange' | 'defaultValue'
    >
    helperText?: MuiFormHelperTextProps
  }
}

export function Select(props: SelectProps) {
  const field = useFieldContext<string>()
  const {
    children,
    slotProps,
    options,
    multiple,
    labelShrink,
    size,
    fullWidth,
    ...rest
  } = props

  const id = useId()
  const labelId = `${id}-label`
  const selectId = `${id}-select`

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

  return (
    <MuiFormControl
      error={Boolean(errorText)}
      fullWidth={fullWidth}
      size={size}
      {...rest}
    >
      <MuiInputLabel
        id={labelId}
        {...slotProps?.inputLabel}
        shrink={labelShrink}
      >
        {props.label}
      </MuiInputLabel>
      <MuiSelect
        id={selectId}
        labelId={labelId}
        notched={labelShrink}
        multiple={multiple}
        {...slotProps?.select}
        label={props.label}
        name={field.name}
        value={field.state.value ?? ''}
        onChange={ev => field.handleChange(ev.target.value as string)}
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
