import { MaskedTextField, MaskedTextFieldProps } from './MaskedTextField'
import { useFormContext } from './formContext'

export type SubscribeMaskedTextFieldProps = MaskedTextFieldProps

export function SubscribeMaskedTextField(props: SubscribeMaskedTextFieldProps) {
  const form = useFormContext()

  const { disabled, ...rest } = props

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <MaskedTextField disabled={isSubmitting || disabled} {...rest} />
      )}
    </form.Subscribe>
  )
}
