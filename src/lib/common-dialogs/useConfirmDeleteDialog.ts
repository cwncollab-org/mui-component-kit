import { useCallback } from 'react'
import { useDialogs } from '../dialogs/dialogsHooks'
import {
  ConfirmDeleteDialog,
  ConfirmDeleteDialogOptions,
} from './ConfirmDeleteDialog'

export function useConfirmDeleteDialog() {
  const { openDialog } = useDialogs()
  const confirmDelete = useCallback(
    (options?: ConfirmDeleteDialogOptions) =>
      openDialog(ConfirmDeleteDialog, {
        dialogKey: 'confirm-delete-dialog',
        payload: {
          title: 'Confirm Delete',
          confirmText: 'Delete',
          ...options,
          slotProps: {
            ...options?.slotProps,
            confirm: {
              color: 'error',
              variant: 'contained',
              ...options?.slotProps?.confirm,
            },
          },
        },
      }),
    [openDialog]
  )
  return confirmDelete
}
