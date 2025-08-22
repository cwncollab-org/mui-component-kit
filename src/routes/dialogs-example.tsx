import { Box, Button, Input, Paper, Stack, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import { lazy, useState } from 'react'
import ExampleDialog from '../examples/ExampleDialog'
import ExampleDialogWithPayload from '../examples/ExampleDialogWithPayload'
import ExampleDialogWithResult from '../examples/ExampleDialogWithResult'
import { useConfirmDialog, useDialogs, useConfirmDeleteDialog } from '../lib'
export const Route = createFileRoute('/dialogs-example')({
  component: DialogsExample,
})

const ExampleDialog2 = lazy(() => import('../examples/ExampleDialog2'))

export function DialogsExample() {
  const { openDialog, dialogs } = useDialogs()
  const [name, setName] = useState('')
  const [result, setResult] = useState('')
  const confirm = useConfirmDialog()
  const confirmDelete = useConfirmDeleteDialog()
  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant='body1'>Dialog count: {dialogs.length}</Typography>
      </Box>
      <Paper sx={{ p: 2 }}>
        <Button
          variant='contained'
          onClick={async () => {
            const result = await confirm({
              title: 'Confirm',
              message: 'Are you sure you want to confirm?',
              confirmText: 'Confirm',
              cancelText: 'Cancel',
            })
            console.log(result)
          }}
        >
          Confirm
        </Button>
        <Button
          variant='contained'
          onClick={async () => {
            const result = await confirmDelete({
              title: 'Confirm Delete',
              message: 'Are you sure you want to delete this item?',
              confirmText: 'Delete',
              cancelText: 'Cancel',
            })
            console.log(result)
          }}
        >
          Confirm Delete
        </Button>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant='h6'>Example dialog</Typography>
        <Button variant='contained' onClick={() => openDialog(ExampleDialog)}>
          Open Dialog
        </Button>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant='h6'>Example dialog 2 (Lazy)</Typography>
        <Button variant='contained' onClick={() => openDialog(ExampleDialog2)}>
          Open Dialog
        </Button>
      </Paper>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'start',
        }}
      >
        <Typography variant='h6'>Example dialog with payload</Typography>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='Name'
        />
        <Button
          variant='contained'
          onClick={async () => {
            await openDialog(ExampleDialogWithPayload, { payload: { name } })
          }}
        >
          Open Dialog
        </Button>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant='h6'>Example dialog with result</Typography>
        <Button
          variant='contained'
          onClick={async () => {
            const result = await openDialog(ExampleDialogWithResult)
            setResult(JSON.stringify(result))
          }}
        >
          Open Dialog
        </Button>
        <Typography variant='body1' sx={{ mt: 1 }}>
          Result: {result}
        </Typography>
      </Paper>
    </Stack>
  )
}
