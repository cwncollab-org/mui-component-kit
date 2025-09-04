import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps as MuiRadioGroupProps,
} from '@mui/material'
import { useFieldContext } from './formContext'
import { useId } from 'react'

export type RadioGroupProps = Omit<
  MuiRadioGroupProps,
  'name' | 'value' | 'defaultValue'
> & {
  label?: string
  disabled?: boolean
  required?: boolean
}

export function RadioGroup(props: RadioGroupProps) {
  const { label, children, disabled, required, ...radioGroupProps } = props

  const field = useFieldContext<string | undefined | null>()
  const id = useId()
  const labelId = `${id}-label`

  return (
    <FormControl
      disabled={disabled}
      required={required}
      data-isdirty={field.state.meta.isDirty || undefined}
      data-ispristine={field.state.meta.isPristine || undefined}
      data-istouched={field.state.meta.isTouched || undefined}
      data-isdefaultvalue={field.state.meta.isDefaultValue || undefined}
      data-isvalid={field.state.meta.isValid || undefined}
    >
      <FormLabel id={labelId}>{label}</FormLabel>
      <MuiRadioGroup
        aria-labelledby={labelId}
        name={field.name}
        value={field.state.value ?? ''}
        onChange={ev => {
          if (!ev.defaultPrevented) {
            field.handleChange(ev.target.value === '' ? null : ev.target.value)
          }
        }}
        {...radioGroupProps}
      >
        {children}
      </MuiRadioGroup>
    </FormControl>
  )
}
