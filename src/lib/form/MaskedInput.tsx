import { ReactMaskOpts } from 'react-imask'
import { InputProps as MuiInputProps, Input as MuiInput } from '@mui/material'
import {
  MaskedInputAdapter,
  MaskedInputAdapterProps,
} from './MaskedInputAdapter'
import React from 'react'

export type MaskedInputProps = MuiInputProps & ReactMaskOpts

export const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  (props, ref) => {
    const { value, onChange, ...inputProps } = props

    return (
      <MuiInput
        ref={ref}
        value={value}
        onChange={onChange}
        inputComponent={MaskedInputAdapter}
        inputProps={inputProps as MaskedInputAdapterProps}
      />
    )
  }
)
