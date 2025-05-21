import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogProps,
} from '@mui/material'

export default function ExampleDialog2({
  open,
  onClose,
  ...rest
}: DialogProps) {
  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      <DialogTitle>Example Dialog</DialogTitle>
      <DialogContent>
        <DialogContentText>This is an example dialog 2</DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
