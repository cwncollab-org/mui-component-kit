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
  labelBehavior?: 'auto' | 'shrink' | 'static'
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
  onChange?: MuiSelectProps['onChange']
}

export function Select(props: SelectProps) {
  const field = useFieldContext<string>()
  const {
    children,
    slotProps,
    options,
    multiple,
    labelBehavior = 'auto',
    size,
    fullWidth,
    onChange,
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

  const labelShrink = labelBehavior === 'shrink' ? true : undefined

  let inputLabelProps: Partial<MuiInputLabelProps> = {
    ...slotProps?.inputLabel,
    shrink: labelShrink,
  }

  let selectProps = {
    ...slotProps?.select,
    notched: labelShrink,
  }

  if (labelBehavior === 'static') {
    inputLabelProps = {
      ...inputLabelProps,
      sx: {
        ...(inputLabelProps as any)?.sx,
        position: 'relative',
        transform: 'none',
      },
    }
    selectProps = {
      ...selectProps,
      notched: true,
      sx: {
        ...(selectProps as any)?.sx,
        '& legend > span': {
          display: 'none',
        },
      },
    }
  }

  return (
    <MuiFormControl
      error={Boolean(errorText)}
      fullWidth={fullWidth}
      size={size}
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
        value={field.state.value ?? ''}
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
