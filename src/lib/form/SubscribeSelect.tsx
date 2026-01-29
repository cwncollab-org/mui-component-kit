import { Select, SelectProps } from './Select'
import { SelectOption } from './SelectBase'
import { useFormContext } from './formContext'

export type SubscribeSelectProps<TOption = SelectOption | string | any> =
  SelectProps<TOption>

export function SubscribeSelect<TOption = SelectOption | string | any>(
  props: SubscribeSelectProps<TOption>
) {
  const form = useFormContext()

  const { disabled, ...rest } = props

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => <Select disabled={isSubmitting || disabled} {...rest} />}
    </form.Subscribe>
  )
}
