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
  ListItemText,
  OutlinedInput,
} from '@mui/material'
import { useFieldContext } from './formContext'
import { useId, useMemo } from 'react'

type Option = {
  value: string
  label: string
}

type SortBy = 'label' | 'value' | false

export type MultiSelectProps = MuiFormControlProps & {
  label?: string
  labelShrink?: boolean
  size?: 'small' | 'medium'
  fullWidth?: boolean
  options?: Option[] | string[]
  sortSelected?: SortBy
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

export function MultiSelect(props: MultiSelectProps) {
  const field = useFieldContext<string[]>()
  const {
    children,
    slotProps,
    options,
    labelShrink,
    size,
    fullWidth,
    sortSelected = false,
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

  const getSortedSelectedValues = useMemo(() => {
    if (!sortSelected) return field.state.value

    const selectedOptions = field.state.value.map(
      value =>
        renderedOptions.find(opt => opt.value === value) || {
          value,
          label: value,
        }
    )

    return selectedOptions
      .sort((a, b) => {
        if (sortSelected === 'label') {
          return a.label.localeCompare(b.label)
        }
        return a.value.localeCompare(b.value)
      })
      .map(option => option.value)
  }, [field.state.value, renderedOptions, sortSelected])

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
        multiple
        value={getSortedSelectedValues}
        onChange={(ev, child) => {
          onChange?.(ev, child)
          if (!ev.defaultPrevented) {
            field.handleChange(ev.target.value as string[])
          }
        }}
        input={<OutlinedInput label={props.label} />}
        renderValue={selected => {
          const selectedValues = selected as string[]
          return selectedValues
            .map(
              value =>
                renderedOptions.find(opt => opt.value === value)?.label || value
            )
            .join(', ')
        }}
        {...slotProps?.select}
        name={field.name}
      >
        {children}
        {renderedOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={field.state.value.includes(option.value)} />
            <ListItemText primary={option.label} />
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
