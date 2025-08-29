import { IconButton, IconButtonProps } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export type DialogCloseButtonProps = IconButtonProps

export function DialogCloseButton(props: DialogCloseButtonProps) {
  const { sx, ...rest } = props

  return (
    <IconButton
      sx={{
        ...sx,
        position: 'absolute',
        right: 12,
        top: 12,
      }}
      {...rest}
    >
      <CloseIcon />
    </IconButton>
  )
}
