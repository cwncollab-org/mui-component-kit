import {
  PropsWithChildren,
  Suspense,
  useCallback,
  useId,
  useRef,
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

  // Stable registry: same component ref => same generated key
  const componentKeyMapRef = useRef(new WeakMap<object, string>())
  const componentSeqRef = useRef(0)

  const getFallbackDialogKey = useCallback(
    (Dialog: unknown) => {
      if (
        typeof Dialog !== 'function' &&
        (typeof Dialog !== 'object' || Dialog === null)
      ) {
        componentSeqRef.current += 1
        return `${providerId}-dialog-${componentSeqRef.current}`
      }

      const comp = Dialog as object
      const existing = componentKeyMapRef.current.get(comp)
      if (existing) return existing

      componentSeqRef.current += 1
      const maybeName =
        (Dialog as any).displayName ||
        (Dialog as any).name ||
        ((Dialog as any)?.$$typeof === Symbol.for('react.lazy')
          ? 'lazy-dialog'
          : 'dialog')

      const key = `${providerId}-${maybeName}-${componentSeqRef.current}`
      componentKeyMapRef.current.set(comp, key)
      return key
    },
    [providerId]
  )

  const openDialog = useCallback(
    async <TPayload, TResult>(
      Dialog: React.FC<DialogProps<TPayload, TResult>>,
      opts?: OpenDialogOptions<TPayload, TResult>
    ): Promise<DialogResult<TResult>> => {
      const { dialogKey, ...props } = opts || {}
      const resolvedDialogKey = dialogKey ?? getFallbackDialogKey(Dialog)

      return new Promise<DialogResult<TResult>>(resolve => {
        const existingDialog = dialogs.find(
          dialog => dialog.dialogKey === resolvedDialogKey
        )
        if (existingDialog) {
          existingDialog.open = true
          existingDialog.resolve = resolve as (
            value: DialogResult<unknown> | PromiseLike<DialogResult<unknown>>
          ) => void
          existingDialog.props = props as ManagedDialogProps<unknown, unknown>
          setDialogs(prev =>
            prev.map(d =>
              d.dialogKey === resolvedDialogKey ? existingDialog : d
            )
          )
          return
        }

        const dialogId = `${providerId}-${resolvedDialogKey}`
        const dialog: ManagedDialog<unknown, unknown> = {
          id: dialogId,
          open: true,
          Component: Dialog as React.FC<DialogProps<unknown, unknown>>,
          dialogKey: resolvedDialogKey,
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
