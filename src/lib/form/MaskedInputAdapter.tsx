import { InputBaseComponentProps as MuiInputBaseComponentProps } from '@mui/material'
import React from 'react'
import { IMaskInput, ReactMaskOpts } from 'react-imask'

export type MaskedInputAdapterProps = MuiInputBaseComponentProps & ReactMaskOpts

export const MaskedInputAdapter = React.forwardRef<
  HTMLInputElement,
  MaskedInputAdapterProps
>(function MaskedInputAdapter(props, ref) {
  const { name, value, onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      name={name}
      value={value}
      inputRef={ref}
      onAccept={newValue => {
        if (value === newValue) {
          return
        }
        onChange({ target: { name: name, value: newValue } })
      }}
    />
  )
})
