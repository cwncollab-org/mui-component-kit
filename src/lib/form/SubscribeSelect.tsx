import { Select, SelectProps } from './Select'
import { useFormContext } from './formContext'

export type SubscribeSelectProps = SelectProps

export function SubscribeSelect(props: SubscribeSelectProps) {
  const form = useFormContext()

  const { disabled, ...rest } = props

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => <Select disabled={isSubmitting || disabled} {...rest} />}
    </form.Subscribe>
  )
}
