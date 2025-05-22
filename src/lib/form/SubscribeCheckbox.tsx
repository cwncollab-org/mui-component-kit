import { Checkbox, CheckboxProps } from './Checkbox'
import { useFormContext } from './formContext'

export type SubscribeCheckboxProps = CheckboxProps

export function SubscribeCheckbox(props: SubscribeCheckboxProps) {
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
