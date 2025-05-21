import { TimePicker } from './TimePicker'
import { useFormContext } from './formContext'
import { TimePickerProps as MuiTimePickerProps } from '@mui/x-date-pickers'

type Props = Omit<
  MuiTimePickerProps,
  'name' | 'value' | 'onChange' | 'defaultValue'
> & {
  required?: boolean
  labelShrink?: boolean
  size?: 'small' | 'medium'
  fullWidth?: boolean
}

export function SubscribeTimePicker(props: Props) {
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
