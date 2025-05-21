import { TextField, TextFieldProps } from './TextField'
import { useFormContext } from './formContext'

export function SubscribeTextField(props: TextFieldProps) {
  const form = useFormContext()

  const { disabled, ...rest } = props

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <TextField disabled={isSubmitting || disabled} {...rest} />
      )}
    </form.Subscribe>
  )
}
