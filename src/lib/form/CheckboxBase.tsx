import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel as MuiFormControlLabel,
  FormControlLabelProps as MuiFormControlLabelProps,
} from '@mui/material'

export type CheckboxBaseProps = Pick<
  MuiCheckboxProps,
  | 'name'
  | 'checked'
  | 'onChange'
  | 'defaultChecked'
  | 'value'
  | 'indeterminate'
  | 'color'
  | 'size'
  | 'id'
> &
  Pick<MuiFormControlLabelProps, 'label' | 'required' | 'disabled'>

export function CheckboxBase(props: CheckboxBaseProps) {
  const {
    label,
    name,
    required,
    disabled,
    checked,
    defaultChecked,
    onChange,
    value,
    indeterminate,
    color,
    size,
    id,
    ...rest
  } = props
  return (
    <MuiFormControlLabel
      {...rest}
      label={label}
      disabled={disabled}
      required={required}
      control={
        <MuiCheckbox
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          value={value}
          indeterminate={indeterminate}
          color={color}
          size={size}
          id={id}
        />
      }
    />
  )
}
