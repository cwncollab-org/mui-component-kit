import {
  Dialog,
  DialogContentText,
  DialogContent,
  DialogProps,
  DialogTitle,
} from '@mui/material'
import { DialogCloseButton } from '../lib/dialogs'

export default function ExampleDialog({ open, onClose, ...rest }: DialogProps) {
  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      <DialogTitle>Example Dialog</DialogTitle>
      <DialogCloseButton onClick={() => onClose?.({}, 'escapeKeyDown')} />
      <DialogContent>
        <DialogContentText>This is an example dialog</DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
