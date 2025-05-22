import { MultiSelect, MultiSelectProps } from './MultiSelect'
import { useFormContext } from './formContext'

export type SubscribeMultiSelectProps = MultiSelectProps

export function SubscribeMultiSelect(props: SubscribeMultiSelectProps) {
  const form = useFormContext()

  const { disabled, ...rest } = props

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <MultiSelect disabled={isSubmitting || disabled} {...rest} />
      )}
    </form.Subscribe>
  )
}
