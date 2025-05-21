import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
} from '@mui/material'
import { DialogProps } from '../lib'

type Payload = {
  name: string
}

export default function ExampleDialogWithPayload({
  open,
  onClose,
  payload,
  ...rest
}: DialogProps<Payload>) {
  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      <DialogTitle>Example Dialog</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is an example dialog with payload {JSON.stringify(payload)}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
