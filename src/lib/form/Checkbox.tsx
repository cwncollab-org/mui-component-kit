import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel as MuiFormControlLabel,
  FormControlLabelProps as MuiFormControlLabelProps,
} from '@mui/material'
import { useFieldContext } from './formContext'

type Props = Omit<MuiCheckboxProps, 'name'> &
  Pick<MuiFormControlLabelProps, 'label' | 'required' | 'disabled'>

export function Checkbox(props: Props) {
  const field = useFieldContext<boolean>()
  const { label, required, disabled, ...rest } = props
  return (
    <MuiFormControlLabel
      label={label}
      disabled={disabled}
      required={required}
      control={
        <MuiCheckbox
          name={field.name}
          checked={field.state.value}
          onChange={e => field.handleChange(e.target.checked)}
          {...rest}
        />
      }
    />
  )
}
