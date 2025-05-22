import { TimePicker, TimePickerProps } from './TimePicker'
import { useFormContext } from './formContext'

export type SubscribeTimePickerProps = TimePickerProps

export function SubscribeTimePicker(props: SubscribeTimePickerProps) {
  const form = useFormContext()

  const { disabled, ...rest } = props

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <TimePicker disabled={isSubmitting || disabled} {...rest} />
      )}
    </form.Subscribe>
  )
}
