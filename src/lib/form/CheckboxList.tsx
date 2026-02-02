import { useMemo } from 'react'
import { CheckboxListBase, CheckboxListBaseProps } from './CheckboxListBase'
import { useFieldContext } from './formContext'

export type CheckboxListProps<TOption = string | any> = Omit<
  CheckboxListBaseProps<TOption>,
  'name' | 'value' | 'onChange' | 'error' | 'helperText'
>

export function CheckboxList<TOption = string | any>(
  props: CheckboxListProps<TOption>
) {
  const field = useFieldContext<string[] | null | undefined>()

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return undefined
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  return (
    <CheckboxListBase<TOption>
      {...props}
      name={field.name}
      value={field.state.value}
      onChange={field.handleChange}
      error={Boolean(errorText)}
      helperText={errorText}
      data-isdirty={field.state.meta.isDirty || undefined}
      data-ispristine={field.state.meta.isPristine || undefined}
      data-istouched={field.state.meta.isTouched || undefined}
      data-isdefaultvalue={field.state.meta.isDefaultValue || undefined}
      data-isvalid={field.state.meta.isValid || undefined}
    />
  )
}
