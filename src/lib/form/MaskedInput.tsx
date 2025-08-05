import { IMaskInput, IMaskInputProps } from 'react-imask'
import { Input as MuiInput } from '@mui/material'
import React from 'react'

export type MaskedInputProps = {
  mask: IMaskInputProps<HTMLInputElement>['mask']
  pattern?: string
  definitions?: Record<string, RegExp>
  blocks?: Record<string, any>
  value?: string
  onChange?: (value: string) => void
}

type CustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
  mask: IMaskInputProps<HTMLInputElement>['mask']
  definitions?: Record<string, RegExp>
  blocks?: Record<string, any>
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props
    return (
      <IMaskInput
        {...(other as any)}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    )
  }
)

export function MaskedInput(props: MaskedInputProps) {
  const { mask, value, onChange, definitions, blocks, pattern } = props

  return (
    <MuiInput
      value={value}
      onChange={e => onChange?.(e.target.value)}
      name='maskedInput'
      inputComponent={TextMaskCustom as any}
      inputProps={{
        mask: mask,
        definitions: definitions,
        blocks: blocks,
        pattern: pattern,
      }}
    />
  )
}
