import { useMemo } from 'react'
import { useFieldContext } from './formContext'
import { PasswordBase, PasswordBaseProps } from './PasswordBase'

export type PasswordProps = Omit<PasswordBaseProps, 'name' | 'value' | 'type'>

export function Password(props: PasswordProps) {
  const { onChange, helperText = '', ...rest } = props
  const field = useFieldContext<string | undefined | null>()

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  const error = field.state.meta.errors.length > 0

  return (
    <PasswordBase
      {...rest}
      name={field.name}
      value={field.state.value ?? ''}
      onBlur={field.handleBlur}
      onChange={ev => {
        onChange?.(ev)
        if (!ev.defaultPrevented) {
          field.handleChange(ev.target.value === '' ? null : ev.target.value)
        }
      }}
      error={error}
      helperText={error ? errorText : helperText}
      data-isdirty={field.state.meta.isDirty || undefined}
      data-ispristine={field.state.meta.isPristine || undefined}
      data-istouched={field.state.meta.isTouched || undefined}
      data-isdefaultvalue={field.state.meta.isDefaultValue || undefined}
      data-isvalid={field.state.meta.isValid || undefined}
    />
  )
}
