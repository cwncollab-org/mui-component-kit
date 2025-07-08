import { RadioGroup, RadioGroupProps } from './RadioGroup'
import { useFormContext } from './formContext'

export type SubscribeRadioGroupProps = RadioGroupProps

export function SubscribeRadioGroup(props: SubscribeRadioGroupProps) {
  const form = useFormContext()

  const { disabled, ...rest } = props

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <RadioGroup disabled={isSubmitting || disabled} {...rest} />
      )}
    </form.Subscribe>
  )
}
