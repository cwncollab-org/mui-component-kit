import { SelectProps as MuiSelectProps } from '@mui/material'
import { useFieldContext } from './formContext'
import { useMemo } from 'react'
import { renderOptions } from './utils'
import { SelectOption } from './SelectBase'
import { MultiSelectBase, MultiSelectBaseProps } from './MultiSelectBase'

type SortBy = 'label' | 'value' | false

export type MultiSelectProps<TOption = SelectOption | string | any> = Omit<
  MultiSelectBaseProps<TOption>,
  'name' | 'value' | 'helperText'
> & {
  isLoading?: boolean
  sortSelected?: SortBy
  onChange?: MuiSelectProps<string[]>['onChange']
}

export function MultiSelect<TOption = SelectOption | string | any>(
  props: MultiSelectProps<TOption>
) {
  const field = useFieldContext<string[] | null | undefined>()
  const {
    options,
    isLoading,
    disabled,
    sortSelected = false,
    onChange,
    getOptionLabel,
    getOptionValue,
    ...rest
  } = props

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

  return (
    <MultiSelectBase
      {...rest}
      options={options}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      name={field.name}
      value={isLoading ? [] : sortedSelectedValues}
      error={Boolean(errorText)}
      helperText={errorText ?? undefined}
      disabled={isLoading || disabled}
      data-isdirty={field.state.meta.isDirty || undefined}
      data-ispristine={field.state.meta.isPristine || undefined}
      data-istouched={field.state.meta.isTouched || undefined}
      data-isdefaultvalue={field.state.meta.isDefaultValue || undefined}
      data-isvalid={field.state.meta.isValid || undefined}
      onChange={(ev, child) => {
        onChange?.(ev, child)
        if (!ev.defaultPrevented) {
          field.handleChange(ev.target.value as string[])
        }
      }}
    />
  )
}
