import { Button, ButtonProps } from '@mui/material'
import { useFormContext } from './formContext'

export type SubscribeButtonProps = ButtonProps & {
  showIndicator?: boolean
}

export function SubscribeButton(props: SubscribeButtonProps) {
  const form = useFormContext()
  const { children, disabled, showIndicator, ...rest } = props
  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <Button
          disabled={isSubmitting || disabled}
          loading={showIndicator && isSubmitting}
          {...rest}
        >
          {children}
        </Button>
      )}
    </form.Subscribe>
  )
}
