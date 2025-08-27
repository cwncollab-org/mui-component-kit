import { IMaskInputProps } from 'react-imask'
import { TextField, TextFieldProps } from './TextField'
import { MaskedInputAdapter } from './MaskedInputAdapter'

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
