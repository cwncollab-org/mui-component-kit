import { IMaskInput, IMaskInputProps } from 'react-imask'
import { Input as MuiInput } from '@mui/material'
import React from 'react'

export type MaskedInputProps = {
  mask: IMaskInputProps<HTMLInputElement>['mask']
  value?: string
  onChange?: (value: string) => void
}

type CustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const TextMaskCustom = React.forwardRef<
  HTMLInputElement,
  CustomProps & { mask: string }
>(function TextMaskCustom(props, ref) {
  const { onChange, mask, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask={mask}
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value: any) =>
        onChange({ target: { name: props.name, value } })
      }
      overwrite
    />
  )
})

export function MaskedInput(props: MaskedInputProps) {
  const { mask, value, onChange } = props

  return (
    <MuiInput
      value={value}
      onChange={e => onChange?.(e.target.value)}
      name='maskedInput'
      inputComponent={TextMaskCustom as any}
      inputProps={{
        mask: mask,
      }}
    />
  )
}
