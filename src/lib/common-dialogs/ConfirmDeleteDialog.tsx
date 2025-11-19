import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { useState } from 'react'
import { DialogProps, DialogResult } from '../dialogs/types'

export type ConfirmDeleteDialogOptions = {
  title?: string
  message?: string | React.ReactNode
  confirmText?: string
  cancelText?: string
  confirmInputText?: string
  inputLabel?: string
  inputPlaceholder?: string
  slotProps?: {
    confirm?: ButtonProps
    cancel?: ButtonProps
    input?: Omit<TextFieldProps, 'value' | 'onChange'>
  }
  dialogKey?: string
}

type ConfirmDeleteDialogProps = DialogProps<ConfirmDeleteDialogOptions>

export function ConfirmDeleteDialog(props: ConfirmDeleteDialogProps) {
  const { open, onClose, payload, ...rest } = props
  const [inputValue, setInputValue] = useState('')

  const title = payload?.title ?? 'Confirm Delete'
  const message =
    payload?.message ?? 'Are you sure you want to delete this item?'
  const confirmText = payload?.confirmText ?? 'Delete'
  const cancelText = payload?.cancelText ?? 'Cancel'
  const confirmInputText = payload?.confirmInputText
  const inputLabel = payload?.inputLabel ?? 'Type to confirm'
  const inputPlaceholder = payload?.inputPlaceholder ?? confirmInputText

  const requiresInput = !!confirmInputText
  const isConfirmEnabled = !requiresInput || inputValue === confirmInputText

  const confirmProps: ButtonProps = {
    color: 'error',
    variant: 'contained',
    ...payload?.slotProps?.confirm,
    onClick: () => onClose({}, { success: true }),
    disabled: !isConfirmEnabled,
  }

  const cancelProps: ButtonProps = {
    color: 'primary',
    variant: 'outlined',
    ...payload?.slotProps?.cancel,
    onClick: () => onClose({}, { success: false }),
  }

  const inputProps: Omit<TextFieldProps, 'value' | 'onChange'> = {
    autoFocus: true,
    margin: 'dense',
    label: inputLabel,
    placeholder: inputPlaceholder,
    fullWidth: true,
    sx: { mt: 2 },
    ...payload?.slotProps?.input,
  }

  const handleDialogClose = (
    ev: {},
    reason: DialogResult<never> | 'backdropClick' | 'escapeKeyDown'
  ) => {
    onClose(ev, reason)
  }

  const handleTransitionExited = () => {
    setInputValue('')
  }

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      onTransitionExited={handleTransitionExited}
      maxWidth='sm'
      fullWidth
      {...rest}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        {requiresInput && (
          <TextField
            {...inputProps}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button {...cancelProps}>{cancelText}</Button>
        <Button {...confirmProps}>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  )
}
