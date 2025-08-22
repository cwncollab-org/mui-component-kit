import { useDialogs } from '../dialogs/dialogsHooks'
import { ConfirmDialog, ConfirmDialogOptions } from './ConfirmDialog'

export function useConfirmDialog() {
  const { openDialog } = useDialogs()
  const confirm = (options?: ConfirmDialogOptions) =>
    openDialog(ConfirmDialog, {
      dialogKey: options?.dialogKey,
      payload: options,
    })
  return confirm
}
