import { Checkbox } from './Checkbox'
import { useFormContext } from './formContext'
import {
  CheckboxProps as MuiCheckboxProps,
  FormControlLabelProps as MuiFormControlLabelProps,
} from '@mui/material'

type Props = Omit<MuiCheckboxProps, 'name'> &
  Pick<MuiFormControlLabelProps, 'label' | 'required' | 'disabled'>

export function SubscribeCheckbox(props: Props) {
  const form = useFormContext()

  const { disabled, ...rest } = props

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <Checkbox disabled={isSubmitting || disabled} {...rest} />
      )}
    </form.Subscribe>
  )
}
