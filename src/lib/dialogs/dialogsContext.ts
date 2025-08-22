import { createContext } from 'react'
import { DialogProps, DialogResult } from './types'

export type ManagedDialogProps<TPayload, TResult> = Omit<
  DialogProps<TPayload, TResult>,
  'id' | 'open' | 'onClose'
>

export type ManagedDialog<TPayload, TResult> = {
  dialogKey: string
  Component: React.FC<DialogProps<TPayload, TResult>>
  props: ManagedDialogProps<TPayload, TResult>
  id: string
  open: boolean
  resolve: (
    value: DialogResult<TResult> | PromiseLike<DialogResult<TResult>>
  ) => void
}

export type OpenDialogOptions<TPayload, TResult> = ManagedDialogProps<
  TPayload,
  TResult
> & {
  dialogKey?: string
}

type DialogManagerContextType = {
  providerId: string
  openDialog: <TPayload, TResult>(
    Dialog: React.FC<DialogProps<TPayload, TResult>>,
    opts?: OpenDialogOptions<TPayload, TResult>
  ) => Promise<DialogResult<TResult>>
  closeDialog: <TData>(key: string, result: DialogResult<TData>) => void
  dialogs: ManagedDialog<unknown, unknown>[]
}

export const dialogsContext = createContext<DialogManagerContextType>(null!)
