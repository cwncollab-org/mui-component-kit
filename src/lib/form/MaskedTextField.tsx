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
} & ReactMaskOpts

export function MaskedTextField(props: MaskedTextFieldProps) {
  const { slotProps, labelBehavior, fullWidth, ...rest } = props

  return (
    <TextField
      labelBehavior={labelBehavior}
      fullWidth={fullWidth}
      {...rest}
      slotProps={{
        ...slotProps,
        input: {
          inputComponent: MaskedInputAdapter,
          inputProps: rest as MaskedInputAdapterProps,
          ...slotProps?.input,
        },
      }}
    />
  )
}
