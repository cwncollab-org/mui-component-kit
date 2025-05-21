import { useDialogs } from '../dialogs/dialogsHooks'
import { ConfirmDialog, ConfirmDialogOptions } from './ConfirmDialog'

export function useConfirmDialog() {
  const { openDialog } = useDialogs()
  const confirm = (options?: ConfirmDialogOptions) =>
    openDialog('confirm-dialog', ConfirmDialog, {
      payload: options,
    })
  return confirm
}
