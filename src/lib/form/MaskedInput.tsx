import { IMaskInput, IMaskInputProps } from 'react-imask'
import { Input as MuiInput } from '@mui/material'
import React from 'react'
import { MaskedInputAdapter } from './MaskedInputAdapter'

export type MaskedInputProps = {
  mask: IMaskInputProps<HTMLInputElement>['mask']
  pattern?: string
  definitions?: Record<string, RegExp>
  blocks?: Record<string, any>
  value?: string
  onChange?: (value: string) => void
}

export function MaskedInput(props: MaskedInputProps) {
  const { mask, value, onChange, definitions, blocks, pattern } = props

  return (
    <MuiInput
      value={value}
      onChange={e => onChange?.(e.target.value)}
      inputComponent={MaskedInputAdapter as any}
      inputProps={{
        mask: mask,
        definitions: definitions,
        blocks: blocks,
        pattern: pattern,
      }}
    />
  )
}
