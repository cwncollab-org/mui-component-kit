import { useFormContext } from './formContext'
import { Password, PasswordProps } from './Password'

export type SubscribePasswordProps = PasswordProps

export function SubscribePassword(props: SubscribePasswordProps) {
  const form = useFormContext()
  const { disabled, ...rest } = props

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <Password disabled={isSubmitting || disabled} {...rest} />
      )}
    </form.Subscribe>
  )
}
