import { Button, ButtonProps, ButtonTypeMap } from '@mui/material'
import { useFormContext } from './formContext'

export type SubscribeButtonProps<
  RootComponent extends React.ElementType = ButtonTypeMap['defaultComponent'],
  ButtonComponent extends React.ElementType<ButtonProps> = typeof Button,
  AdditionalProps = {},
> = ButtonProps<RootComponent, AdditionalProps> & {
  showIndicator?: boolean
  ButtonComponent?: ButtonComponent
}

export function SubscribeButton<
  RootComponent extends React.ElementType = ButtonTypeMap['defaultComponent'],
  ButtonComponent extends React.ElementType<ButtonProps> = typeof Button,
  AdditionalProps = {},
>(
  props: SubscribeButtonProps<RootComponent, ButtonComponent, AdditionalProps>
) {
  const form = useFormContext()
  const { children, disabled, showIndicator, ButtonComponent, ...rest } = props

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => {
        const loading = showIndicator && isSubmitting
        return ButtonComponent ? (
          <ButtonComponent
            disabled={isSubmitting || disabled}
            loading={loading}
            {...(rest as any)}
          >
            {children}
          </ButtonComponent>
        ) : (
          <Button
            disabled={isSubmitting || disabled}
            loading={loading}
            {...rest}
          >
            {children}
          </Button>
        )
      }}
    </form.Subscribe>
  )
}
