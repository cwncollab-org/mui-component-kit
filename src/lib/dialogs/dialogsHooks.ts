import { useContext } from 'react'
import { dialogsContext } from './dialogsContext'

export function useDialogs() {
  const { openDialog, closeDialog, dialogs } = useContext(dialogsContext)
  return { openDialog, closeDialog, dialogs }
}
