import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogProps,
} from '@mui/material'

export default function ExampleDialog3({
  open,
  onClose,
  ...rest
}: DialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...rest}
      slotProps={{
        paper: { sx: { height: '60vh' } },
      }}
    >
      <DialogTitle>Example Dialog 3</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is an example dialog 3 (lazy loaded)
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
