import { useCallback } from 'react'
import { useDialogs } from '../dialogs/dialogsHooks'
import { ConfirmDialog, ConfirmDialogOptions } from './ConfirmDialog'

export function useConfirmDialog() {
  const { openDialog } = useDialogs()
  const confirm = useCallback(
    (options?: ConfirmDialogOptions) =>
      openDialog(ConfirmDialog, {
        dialogKey: options?.dialogKey,
        payload: options,
      }),
    [openDialog]
  )
  return confirm
}
