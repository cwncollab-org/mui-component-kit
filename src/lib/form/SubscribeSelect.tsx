import { Select, SelectProps } from './Select'
import { useFormContext } from './formContext'

export function SubscribeSelect(props: SelectProps) {
  const form = useFormContext()

  const { disabled, ...rest } = props

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => <Select disabled={isSubmitting || disabled} {...rest} />}
    </form.Subscribe>
  )
}
