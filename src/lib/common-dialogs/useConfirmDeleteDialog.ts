import { ConfirmDialogOptions } from './ConfirmDialog'
import { useConfirmDialog } from './useConfirmDialog'

export function useConfirmDeleteDialog() {
  const confirm = useConfirmDialog()
  const confirmDelete = async (options?: ConfirmDialogOptions) => {
    return await confirm({
      ...options,
      slotProps: {
        ...options?.slotProps,
        confirm: {
          color: 'error',
          variant: 'contained',
          ...options?.slotProps?.confirm,
        },
      },
      dialogKey: 'confirm-delete-dialog',
    })
  }
  return confirmDelete
}
