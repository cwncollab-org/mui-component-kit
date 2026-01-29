import { useFieldContext } from './formContext'
import { useMemo } from 'react'
import { SelectBase, SelectBaseProps, SelectOption } from './SelectBase'

export type SelectProps<TOption> = Omit<
  SelectBaseProps<TOption>,
  'name' | 'value'
> & {
  isLoading?: boolean
}

export function Select<TOption = SelectOption | string | any>(
  props: SelectProps<TOption>
) {
  const field = useFieldContext<string>()
  const { children, isLoading, disabled, onChange, ...rest } = props

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return undefined
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  return (
    <SelectBase<TOption>
      {...rest}
      error={Boolean(errorText)}
      data-isdirty={field.state.meta.isDirty || undefined}
      data-ispristine={field.state.meta.isPristine || undefined}
      data-istouched={field.state.meta.isTouched || undefined}
      data-isdefaultvalue={field.state.meta.isDefaultValue || undefined}
      data-isvalid={field.state.meta.isValid || undefined}
      disabled={isLoading || disabled}
      helperText={errorText}
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
    </SelectBase>
  )
}
