import { DialogProps as MuiDialogProps } from '@mui/material'

export type DialogResult<TResult> =
  | {
      success: false
    }
  | {
      success: true
      data?: TResult
    }

export type DialogProps<TPayload = unknown, TResult = never> = Omit<
  MuiDialogProps,
  'onClose'
> & {
  payload?: TPayload
  onClose: (
    ev: {},
    result: DialogResult<TResult> | 'backdropClick' | 'escapeKeyDown'
  ) => void
}
