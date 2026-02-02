import { useMemo } from 'react'
import { useFieldContext } from './formContext'
import { RadioGroupBase, RadioGroupBaseProps } from './RadioGroupBase'

export type RadioGroupProps = Omit<
  RadioGroupBaseProps,
  'name' | 'value' | 'defaultValue' | 'error' | 'helperText'
>

export function RadioGroup(props: RadioGroupProps) {
  const { onChange, ...rest } = props

  const field = useFieldContext<string | undefined | null>()

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  return (
    <RadioGroupBase
      {...rest}
      name={field.name}
      value={field.state.value ?? ''}
      onChange={ev => {
        if (!ev.defaultPrevented) {
          field.handleChange(ev.target.value === '' ? null : ev.target.value)
        }
        onChange?.(ev, ev.target.value)
      }}
      error={field.state.meta.errors.length > 0}
      helperText={errorText}
      data-isdirty={field.state.meta.isDirty || undefined}
      data-ispristine={field.state.meta.isPristine || undefined}
      data-istouched={field.state.meta.isTouched || undefined}
      data-isdefaultvalue={field.state.meta.isDefaultValue || undefined}
      data-isvalid={field.state.meta.isValid || undefined}
    />
  )
}
