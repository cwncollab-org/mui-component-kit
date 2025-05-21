import {
  Dialog,
  DialogTitle,
  DialogContent,
  Input,
  DialogActions,
  Button,
} from '@mui/material'
import { DialogProps } from '../lib'
import { useState } from 'react'
type Payload = {
  name: string
}

type ResultData = {
  name: string
}

export default function ExampleDialogWithResult({
  open,
  onClose,
  payload,
  ...rest
}: DialogProps<Payload, ResultData>) {
  const [name, setName] = useState(payload?.name || '')
  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      <DialogTitle>Example Dialog</DialogTitle>
      <DialogContent>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='Name'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={ev => onClose(ev, { success: true, data: { name } })}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
