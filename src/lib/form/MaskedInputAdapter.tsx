import React from 'react'
import { IMaskInput, IMaskInputProps } from 'react-imask'

export type MaskedInputAdapterProps = {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
  mask: IMaskInputProps<HTMLInputElement>['mask']
  definitions?: Record<string, RegExp>
  blocks?: Record<string, any>
  overwrite?: boolean
}

export const MaskedInputAdapter = React.forwardRef<
  HTMLInputElement,
  MaskedInputAdapterProps
>(function MaskedInputAdapter(props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...(other as any)}
      inputRef={ref}
      onComplete={(value: any) => {
        onChange({ target: { name: props.name, value } })
      }}
    />
  )
})
