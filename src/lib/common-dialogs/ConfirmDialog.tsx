import {
  Button,
  ButtonProps,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogProps } from '../dialogs/types'

export type ConfirmDialogOptions = {
  title?: string
  message?: string | React.ReactNode
  confirmText?: string
  cancelText?: string
  slotProps?: {
    confirm?: ButtonProps
    cancel?: ButtonProps
  }
  dialogKey?: string
}

type ConfirmDialogProps = DialogProps<ConfirmDialogOptions>

export function ConfirmDialog(props: ConfirmDialogProps) {
  const { open, onClose, payload, ...rest } = props
  const title = payload?.title ?? ''
  const message = payload?.message ?? ''

  const confirmText = payload?.confirmText ?? 'Confirm'
  const confirmProps = payload?.slotProps?.confirm ?? {
    color: 'primary',
    variant: 'contained',
  }
  confirmProps.onClick = () => onClose({}, { success: true })
  const cancelText = payload?.cancelText ?? 'Cancel'
  const cancelProps = payload?.slotProps?.cancel ?? {
    color: 'primary',
    variant: 'outlined',
  }
  cancelProps.onClick = () => onClose({}, { success: false })

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button {...cancelProps}>{cancelText}</Button>
        <Button {...confirmProps}>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  )
}
