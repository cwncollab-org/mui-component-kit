import { PropsWithChildren, Suspense, useId, useState } from 'react'
import {
  dialogsContext,
  ManagedDialog,
  ManagedDialogProps,
} from './dialogsContext'
import { DialogProps, DialogResult } from './types'
import { Backdrop, CircularProgress } from '@mui/material'

export function DialogsProvider({ children }: PropsWithChildren) {
  const [dialogs, setDialogs] = useState<ManagedDialog<unknown, unknown>[]>([])
  const providerId = useId()

  const openDialog = async <TPayload, TResult>(
    key: string,
    Dialog: React.FC<DialogProps<TPayload, TResult>>,
    props?: ManagedDialogProps<TPayload, TResult>
  ): Promise<DialogResult<TResult>> => {
    return new Promise<DialogResult<TResult>>(resolve => {
      const existingDialog = dialogs.find(dialog => dialog.key === key)
      if (existingDialog) {
        existingDialog.open = true
        existingDialog.resolve = resolve as (
          value: DialogResult<unknown> | PromiseLike<DialogResult<unknown>>
        ) => void
        existingDialog.props = props as ManagedDialogProps<unknown, unknown>
        setDialogs(prev => prev.map(d => (d.key === key ? existingDialog : d)))
        return
      }

      const dialogId = `${providerId}-${key}`
      const dialog: ManagedDialog<unknown, unknown> = {
        id: dialogId,
        open: true,
        Component: Dialog as React.FC<DialogProps<unknown, unknown>>,
        key,
        props: props as ManagedDialogProps<unknown, unknown>,
        resolve: resolve as (
          value: DialogResult<unknown> | PromiseLike<DialogResult<unknown>>
        ) => void,
      }
      setDialogs(prev => [...prev, dialog])
    })
  }

  const closeDialog = <TResult,>(
    key: string,
    result: DialogResult<TResult> | 'backdropClick' | 'escapeKeyDown'
  ) => {
    const dialog = dialogs.find(dialog => dialog.key === key)
    if (!dialog) {
      return
    }
    dialog.open = false
    setDialogs(prev => prev.map(d => (d.key === key ? dialog : d)))
    if (result === 'backdropClick' || result === 'escapeKeyDown') {
      dialog.resolve({ success: false })
      return
    }
    dialog.resolve(result)
  }

  const removeDialog = (key: string) => {
    setDialogs(prev => prev.filter(d => d.key !== key))
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
            ) => handleCloseWithResult(dialog.key, result)}
            slotProps={{
              transition: {
                onExited: () => {
                  removeDialog(dialog.key)
                },
              },
            }}
            closeAfterTransition={false}
            {...dialog.props}
          />
        ))}
      </Suspense>
    </dialogsContext.Provider>
  )
}
