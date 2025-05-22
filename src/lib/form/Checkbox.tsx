import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel as MuiFormControlLabel,
  FormControlLabelProps as MuiFormControlLabelProps,
} from '@mui/material'
import { useFieldContext } from './formContext'

export type CheckboxProps = Omit<MuiCheckboxProps, 'name'> &
  Pick<MuiFormControlLabelProps, 'label' | 'required' | 'disabled' | 'onChange'>

export function Checkbox(props: CheckboxProps) {
  const field = useFieldContext<boolean>()
  const { label, required, disabled, onChange, ...rest } = props
  return (
    <MuiFormControlLabel
      label={label}
      disabled={disabled}
      required={required}
      control={
        <MuiCheckbox
          name={field.name}
          checked={field.state.value}
          onChange={(ev, child) => {
            onChange?.(ev, child)
            if (!ev.defaultPrevented) {
              field.handleChange(ev.target.checked)
            }
          }}
          {...rest}
        />
      }
    />
  )
}
