import { createContext } from 'react'
import { DialogProps, DialogResult } from './types'

export type ManagedDialogProps<TPayload, TResult> = Omit<
  DialogProps<TPayload, TResult>,
  'id' | 'open' | 'onClose'
>

export type ManagedDialog<TPayload, TResult> = {
  key: string
  Component: React.FC<DialogProps<TPayload, TResult>>
  props: ManagedDialogProps<TPayload, TResult>
  id: string
  open: boolean
  resolve: (
    value: DialogResult<TResult> | PromiseLike<DialogResult<TResult>>
  ) => void
}

type DialogManagerContextType = {
  providerId: string
  openDialog: <TPayload, TResult>(
    key: string,
    Dialog: React.FC<DialogProps<TPayload, TResult>>,
    props?: ManagedDialogProps<TPayload, TResult>
  ) => Promise<DialogResult<TResult>>
  closeDialog: <TData>(key: string, result: DialogResult<TData>) => void
  dialogs: ManagedDialog<unknown, unknown>[]
}

export const dialogsContext = createContext<DialogManagerContextType>(null!)
