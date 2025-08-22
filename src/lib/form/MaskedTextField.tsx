import React from 'react'
import { IMaskInputProps } from 'react-imask'
import { TextField, TextFieldProps } from './TextField'
import { IMaskInput } from 'react-imask'

export type MaskedTextFieldProps = Omit<TextFieldProps, 'slotProps'> & {
  mask: IMaskInputProps<HTMLInputElement>['mask']
  blocks?: Record<string, any>
  definitions?: Record<string, any>
  pattern?: string
  lazy?: boolean

  slotProps?: Omit<TextFieldProps['slotProps'], 'input'> & {
    input?: Omit<TextFieldProps['slotProps'], 'input'>
  }
}

const MaskedInputAdapter = React.forwardRef<HTMLInputElement, any>(
  function MaskedInputAdapter(props, ref) {
    const { onChange, ...other } = props
    return (
      <IMaskInput
        {...other}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    )
  }
)

export function MaskedTextField(props: MaskedTextFieldProps) {
  const { mask, blocks, definitions, pattern, lazy, slotProps, ...rest } = props

  return (
    <TextField
      {...rest}
      slotProps={{
        ...slotProps,
        input: {
          inputComponent: MaskedInputAdapter as any,
          inputProps: {
            mask: mask,
            blocks: blocks,
            definitions: definitions,
            pattern: pattern,
            lazy: lazy,
          },
          ...slotProps?.input,
        },
      }}
    />
  )
}
