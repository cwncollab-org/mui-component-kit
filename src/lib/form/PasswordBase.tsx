import { useState } from 'react'
import { IconButton, InputAdornment } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { TextFieldBase, TextFieldBaseProps } from './TextFieldBase'

export type PasswordBaseProps = Omit<TextFieldBaseProps, 'type'> & {
  showToggle?: boolean
}

export function PasswordBase(props: PasswordBaseProps) {
  const { showToggle = false, slotProps, ...rest } = props
  const [isVisible, setIsVisible] = useState(false)
  const inputType = showToggle ? (isVisible ? 'text' : 'password') : 'password'

  const mergedSlotProps = !showToggle
    ? slotProps
    : {
        ...slotProps,
        input: {
          ...(typeof slotProps?.input !== 'function' && slotProps?.input),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label={isVisible ? 'Hide password' : 'Show password'}
                edge='end'
                onClick={() => setIsVisible(prev => !prev)}
              >
                {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }

  return (
    <TextFieldBase type={inputType} slotProps={mergedSlotProps} {...rest} />
  )
}
