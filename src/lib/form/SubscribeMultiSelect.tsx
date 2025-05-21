import { MultiSelect, MultiSelectProps } from './MultiSelect'
import { useFormContext } from './formContext'

export function SubscribeMultiSelect(props: MultiSelectProps) {
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
