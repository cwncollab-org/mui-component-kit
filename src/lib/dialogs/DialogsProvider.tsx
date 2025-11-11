import {
  PropsWithChildren,
  Suspense,
  useCallback,
  useId,
  useState,
} from 'react'
import {
  dialogsContext,
  ManagedDialog,
  ManagedDialogProps,
  OpenDialogOptions,
} from './dialogsContext'
import { DialogProps, DialogResult } from './types'
import { Backdrop, CircularProgress } from '@mui/material'

export function DialogsProvider({ children }: PropsWithChildren) {
  const [dialogs, setDialogs] = useState<ManagedDialog<unknown, unknown>[]>([])
  const providerId = useId()

  const openDialog = useCallback(
    async <TPayload, TResult>(
      Dialog: React.FC<DialogProps<TPayload, TResult>>,
      opts?: OpenDialogOptions<TPayload, TResult>
    ): Promise<DialogResult<TResult>> => {
      const { dialogKey = Dialog.name, ...props } = opts || {}
      return new Promise<DialogResult<TResult>>(resolve => {
        const existingDialog = dialogs.find(
          dialog => dialog.dialogKey === dialogKey
        )
        if (existingDialog) {
          existingDialog.open = true
          existingDialog.resolve = resolve as (
            value: DialogResult<unknown> | PromiseLike<DialogResult<unknown>>
          ) => void
          existingDialog.props = props as ManagedDialogProps<unknown, unknown>
          setDialogs(prev =>
            prev.map(d => (d.dialogKey === dialogKey ? existingDialog : d))
          )
          return
        }

        const dialogId = `${providerId}-${dialogKey}`
        const dialog: ManagedDialog<unknown, unknown> = {
          id: dialogId,
          open: true,
          Component: Dialog as React.FC<DialogProps<unknown, unknown>>,
          dialogKey,
          props: props as ManagedDialogProps<unknown, unknown>,
          resolve: resolve as (
            value: DialogResult<unknown> | PromiseLike<DialogResult<unknown>>
          ) => void,
        }
        setDialogs(prev => [...prev, dialog])
      })
    },
    [dialogs, providerId]
  )

  const closeDialog = useCallback(
    <TResult,>(
      key: string,
      result: DialogResult<TResult> | 'backdropClick' | 'escapeKeyDown'
    ) => {
      const dialog = dialogs.find(dialog => dialog.dialogKey === key)
      if (!dialog) {
        return
      }
      dialog.open = false
      setDialogs(prev => prev.map(d => (d.dialogKey === key ? dialog : d)))
      if (result === 'backdropClick' || result === 'escapeKeyDown') {
        dialog.resolve({ success: false })
        return
      }
      dialog.resolve(result)
    },
    [dialogs]
  )

  const removeDialog = (key: string) => {
    setDialogs(prev => prev.filter(d => d.dialogKey !== key))
  }

  const handleCloseWithResult = <TResult,>(
    key: string,
    result: DialogResult<TResult> | 'backdropClick' | 'escapeKeyDown'
  ) => {
    closeDialog(key, result)
  }

  return (
    <dialogsContext.Provider
      value={{
        providerId,
        dialogs,
        openDialog,
        closeDialog,
      }}
    >
      {children}
      <Suspense
        fallback={
          <Backdrop open sx={{ zIndex: t => t.zIndex.drawer + 1 }}>
            <CircularProgress color='inherit' />
          </Backdrop>
        }
      >
        {dialogs.map(dialog => (
          <dialog.Component
            id={dialog.id}
            key={dialog.id}
            open={dialog.open}
            onClose={(
              _,
              result: DialogResult<unknown> | 'backdropClick' | 'escapeKeyDown'
            ) => handleCloseWithResult(dialog.dialogKey, result)}
            closeAfterTransition={false}
            onTransitionExited={() => {
              removeDialog(dialog.dialogKey)
            }}
            {...dialog.props}
          />
        ))}
      </Suspense>
    </dialogsContext.Provider>
  )
}
