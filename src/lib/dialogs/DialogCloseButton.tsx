import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  onClick: () => void
}

export function DialogCloseButton(props: Props) {
  const { onClick } = props

  return (
    <IconButton
      sx={{ position: 'absolute', right: 12, top: 12 }}
      onClick={onClick}
    >
      <CloseIcon />
    </IconButton>
  )
}
