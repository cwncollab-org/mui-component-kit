import { ReactMaskOpts } from 'react-imask'
import { TextField, TextFieldProps } from './TextField'
import {
  MaskedInputAdapter,
  MaskedInputAdapterProps,
} from './MaskedInputAdapter'

export type MaskedTextFieldProps = Omit<TextFieldProps, 'slotProps'> & {
  slotProps?: Omit<TextFieldProps['slotProps'], 'input'> & {
    input?: Omit<TextFieldProps['slotProps'], 'input'>
  }
} & ReactMaskOpts & {
    triggerChangeOnAccept?: boolean
    triggerChangeOnComplete?: boolean
  }

export function MaskedTextField(props: MaskedTextFieldProps) {
  const {
    slotProps,
    labelBehavior,
    fullWidth,
    triggerChangeOnAccept,
    triggerChangeOnComplete,
    ...rest
  } = props

  return (
    <TextField
      labelBehavior={labelBehavior}
      fullWidth={fullWidth}
      {...rest}
      slotProps={{
        ...slotProps,
        input: {
          inputComponent: MaskedInputAdapter,
          inputProps: {
            ...rest,
            triggerChangeOnAccept,
            triggerChangeOnComplete,
          } as MaskedInputAdapterProps,
          ...slotProps?.input,
        },
      }}
    />
  )
}
