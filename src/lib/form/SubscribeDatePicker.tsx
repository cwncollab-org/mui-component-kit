import { DatePicker } from './DatePicker'
import { useFormContext } from './formContext'
import { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers'

type Props = Omit<
  MuiDatePickerProps,
  'name' | 'value' | 'onChange' | 'defaultValue'
> & {
  required?: boolean
  labelShrink?: boolean
  size?: 'small' | 'medium'
  fullWidth?: boolean
}

export function SubscribeDatePicker(props: Props) {
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
