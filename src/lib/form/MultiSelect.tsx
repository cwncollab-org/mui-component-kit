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
import { createSelectSlotProps, renderOptions } from './utils'
import { SelectOption } from './SelectBase'

type SortBy = 'label' | 'value' | false

export type MultiSelectProps<TOption = SelectOption | string | any> =
  MuiFormControlProps & {
    label?: string
    labelBehavior?: 'auto' | 'shrink' | 'static'
    size?: 'small' | 'medium'
    fullWidth?: boolean
    isLoading?: boolean
    options?: TOption[]
    sortSelected?: SortBy
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

export function MultiSelect(props: MultiSelectProps) {
  const field = useFieldContext<string[] | null | undefined>()
  const {
    children,
    slotProps,
    options,
    labelBehavior = 'auto',
    size,
    fullWidth,
    isLoading,
    disabled,
    sortSelected = false,
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

  const sortedSelectedValues = useMemo(() => {
    const currentValue = field.state.value ?? []
    if (!sortSelected) return currentValue

    const selectedOptions = currentValue.map(
      value =>
        renderedOptions.find(opt => opt.value === value) ?? {
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

  const { inputLabelProps, selectProps: baseSelectProps } = useMemo(
    () =>
      createSelectSlotProps({
        labelBehavior,
        slotProps,
      }),
    [labelBehavior, slotProps]
  )

  // MultiSelect needs special handling for OutlinedInput
  const selectProps = {
    ...baseSelectProps,
    input: <OutlinedInput label={props.label} />,
    renderValue: (selected: any) => {
      const selectedValues = (selected ?? []) as string[]
      return selectedValues
        .map(
          value =>
            renderedOptions.find(opt => opt.value === value)?.label ?? value
        )
        .join(', ')
    },
  }

  // Override input for static label behavior
  if (labelBehavior === 'static') {
    selectProps.input = (
      <OutlinedInput
        label={props.label}
        notched={true}
        sx={{
          '& legend > span': {
            display: 'none',
          },
        }}
      />
    )
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
      disabled={isLoading || disabled}
      {...rest}
    >
      <MuiInputLabel id={labelId} {...inputLabelProps}>
        {props.label}
      </MuiInputLabel>
      <MuiSelect
        id={selectId}
        labelId={labelId}
        multiple
        value={isLoading ? [] : sortedSelectedValues}
        onChange={(ev, child) => {
          onChange?.(ev, child)
          if (!ev.defaultPrevented) {
            field.handleChange(ev.target.value as string[])
          }
        }}
        {...selectProps}
        name={field.name}
      >
        {children}
        {renderedOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox
              checked={(field.state.value ?? []).includes(option.value)}
            />
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
