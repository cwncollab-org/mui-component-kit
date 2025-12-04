import { CheckboxList, CheckboxListProps } from './CheckboxList'
import { useFormContext } from './formContext'

export type SubscribeCheckboxListProps = CheckboxListProps

export function SubscribeCheckboxList(props: SubscribeCheckboxListProps) {
  const form = useFormContext()

  const { disabled, ...rest } = props

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <CheckboxList disabled={isSubmitting || disabled} {...rest} />
      )}
    </form.Subscribe>
  )
}
