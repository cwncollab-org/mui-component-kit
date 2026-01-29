import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material'

import { InputHTMLAttributes, useMemo } from 'react'
import { createTextFieldSlotProps } from './utils'

export type TextFieldBaseProps = MuiTextFieldProps & {
  labelBehavior?: 'auto' | 'shrink' | 'static'
  min?: InputHTMLAttributes<HTMLInputElement>['min']
  max?: InputHTMLAttributes<HTMLInputElement>['max']
  maxLength?: InputHTMLAttributes<HTMLInputElement>['maxLength']
  pattern?: InputHTMLAttributes<HTMLInputElement>['pattern']
}

export function TextFieldBase(props: TextFieldBaseProps) {
  const {
    labelBehavior = 'auto',
    min,
    max,
    maxLength,
    pattern,
    slotProps,
    ...rest
  } = props

  const { input: inputProps, inputLabel: inputLabelProps } = useMemo(
    () =>
      createTextFieldSlotProps({
        labelBehavior,
        min,
        max,
        maxLength,
        pattern,
        slotProps,
      }),
    [labelBehavior, min, max, maxLength, pattern, slotProps]
  )

  return (
    <MuiTextField
      {...rest}
      slotProps={{
        ...slotProps,
        inputLabel: inputLabelProps,
        input: inputProps,
      }}
    />
  )
}
