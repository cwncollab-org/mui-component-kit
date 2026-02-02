import { ReactMaskOpts } from 'react-imask'

import {
  MaskedInputAdapter,
  MaskedInputAdapterProps,
} from './MaskedInputAdapter'
import { InputProps as MuiInputProps } from '@mui/material'
import { TextFieldBase, TextFieldBaseProps } from './TextFieldBase'

export type MaskedTextFieldBaseProps = Omit<TextFieldBaseProps, 'slotProps'> & {
  slotProps?: Omit<NonNullable<TextFieldBaseProps['slotProps']>, 'input'> & {
    input?: MaskedInputAdapterProps
  }
} & ReactMaskOpts & {
    triggerChangeOnAccept?: boolean
    triggerChangeOnComplete?: boolean
  }

export function MaskedTextFieldBase(props: MaskedTextFieldBaseProps) {
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
    <TextFieldBase
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
