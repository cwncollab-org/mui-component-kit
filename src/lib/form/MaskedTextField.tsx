import { ReactMaskOpts } from 'react-imask'
import { TextField, TextFieldProps } from './TextField'
import {
  MaskedInputAdapter,
  MaskedInputAdapterProps,
} from './MaskedInputAdapter'
import { InputProps as MuiInputProps } from '@mui/material'

export type MaskedTextFieldProps = Omit<TextFieldProps, 'slotProps'> & {
  slotProps?: Omit<NonNullable<TextFieldProps['slotProps']>, 'input'> & {
    input?: MaskedInputAdapterProps
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
    helperText,
    ...rest
  } = props

  return (
    <TextField
      labelBehavior={labelBehavior}
      fullWidth={fullWidth}
      helperText={helperText}
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
        } as MuiInputProps,
      }}
    />
  )
}
