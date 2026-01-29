import { useFieldContext } from './formContext'
import { CheckboxBase, CheckboxBaseProps } from './CheckboxBase'

export type CheckboxProps = Omit<CheckboxBaseProps, 'name' | 'checked'>

export function Checkbox(props: CheckboxProps) {
  const field = useFieldContext<boolean>()
  const { onChange, ...rest } = props

  return (
    <CheckboxBase
      {...rest}
      name={field.name}
      checked={field.state.value}
      onChange={(ev, child) => {
        onChange?.(ev, child)
        if (!ev.defaultPrevented) {
          field.handleChange(ev.target.checked)
        }
      }}
      data-isdirty={field.state.meta.isDirty || undefined}
      data-ispristine={field.state.meta.isPristine || undefined}
      data-istouched={field.state.meta.isTouched || undefined}
      data-isdefaultvalue={field.state.meta.isDefaultValue || undefined}
      data-isvalid={field.state.meta.isValid || undefined}
    />
  )
}
