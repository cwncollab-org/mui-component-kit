import { InputBaseComponentProps as MuiInputBaseComponentProps } from '@mui/material'
import React from 'react'
import { IMaskInput, ReactMaskOpts } from 'react-imask'

export type MaskedInputAdapterProps = MuiInputBaseComponentProps & ReactMaskOpts

export const MaskedInputAdapter = React.forwardRef<
  HTMLInputElement,
  MaskedInputAdapterProps
>(function MaskedInputAdapter(props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      inputRef={ref}
      onComplete={value => {
        onChange({ target: { name: props.name, value } })
      }}
    />
  )
})
