import { DatePicker, DatePickerProps } from './DatePicker'
import { useFormContext } from './formContext'

export type SubscribeDatePickerProps = DatePickerProps

export function SubscribeDatePicker(props: SubscribeDatePickerProps) {
  const form = useFormContext()

  const { disabled, ...rest } = props

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <DatePicker disabled={isSubmitting || disabled} {...rest} />
      )}
    </form.Subscribe>
  )
}
