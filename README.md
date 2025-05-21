# Component Kit

> **Note**: This documentation was generated with the assistance of AI. While we strive for accuracy, please verify any code examples or implementation details in your specific use case.

A React component library built with TypeScript and Vite. This package provides a set of reusable components built on top of [Material-UI (MUI)](https://mui.com/) and [Tanstack Form](https://tanstack.com/form/latest) for form handling.


## Features

- Built on Material-UI 
- Type-safe dialog management
- Lazy loading support
- Payload and result handling for dialogs
- Form components with TanStack Form integration

## Usage Examples

### Basic Dialog Usage

```tsx
import { DialogsProvider, useDialogs } from '@cwncollab-org/component-kit'
import ExampleDialog from './examples/ExampleDialog'

function App() {
  return (
    <DialogsProvider>
      <AppPage />
    </DialogsProvider>
  )
}

function AppPage() {
  const { openDialog } = useDialogs()

  return (
    <Button
      variant='contained'
      onClick={() => openDialog('example-dialog', ExampleDialog)}
    >
      Open Basic Dialog
    </Button>
  )
}
```

#### ExampleDialog Implementation

```tsx
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogProps,
} from '@mui/material'

export default function ExampleDialog({ open, onClose, ...rest }: DialogProps) {
  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      <DialogTitle>Example Dialog</DialogTitle>
      <DialogContent>
        <DialogContentText>This is an example dialog</DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
```

### Dialog with Payload

```tsx
import { DialogsProvider, useDialogs } from '@cwncollab-org/component-kit'
import ExampleDialogWithPayload from './examples/ExampleDialogWithPayload'

function AppPage() {
  const { openDialog } = useDialogs()
  const [name, setName] = useState('')

  return (
    <>
      <Input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder='Enter your name'
      />
      <Button
        variant='contained'
        onClick={() => {
          openDialog(
            'example-dialog-with-payload',
            ExampleDialogWithPayload,
            { payload: { name } }
          )
        }}
      >
        Open Dialog with Payload
      </Button>
    </>
  )
}
```

#### ExampleDialogWithPayload Implementation

```tsx
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
} from '@mui/material'
import { DialogProps } from '../lib'

type Payload = {
  name: string
}

export default function ExampleDialogWithPayload({
  open,
  onClose,
  payload,
  ...rest
}: DialogProps<Payload>) {
  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      <DialogTitle>Example Dialog</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is an example dialog with payload {JSON.stringify(payload)}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
```

### Dialog with Result

```tsx
import { DialogsProvider, useDialogs } from '@cwncollab-org/component-kit'
import ExampleDialogWithResult from './examples/ExampleDialogWithResult'

function AppPage() {
  const { openDialog } = useDialogs()
  const [result, setResult] = useState<{ name: string } | null>(null)

  return (
    <>
      <Button
        variant='contained'
        onClick={async () => {
          const result = await openDialog(
            'example-dialog-with-result',
            ExampleDialogWithResult,
            { payload: { name: 'Initial Name' } }
          )
          if (result?.success) {
            setResult(result.data)
          }
        }}
      >
        Open Dialog with Result
      </Button>
      {result && (
        <Typography variant='body1'>
          Result: {result.name}
        </Typography>
      )}
    </>
  )
}
```

#### ExampleDialogWithResult Implementation

```tsx
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
```

### Lazy Loading Dialog

```tsx
import { DialogsProvider, useDialogs } from '@cwncollab-org/component-kit'
import { lazy } from 'react'

const ExampleDialog2 = lazy(() => import('./examples/ExampleDialog2'))

function AppPage() {
  const { openDialog } = useDialogs()

  return (
    <Button
      variant='contained'
      onClick={() => openDialog('example-dialog2', ExampleDialog2)}
    >
      Open Lazy Loaded Dialog
    </Button>
  )
}
```

#### ExampleDialog2 Implementation

```tsx
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogProps,
} from '@mui/material'

export default function ExampleDialog2({
  open,
  onClose,
  ...rest
}: DialogProps) {
  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      <DialogTitle>Example Dialog</DialogTitle>
      <DialogContent>
        <DialogContentText>This is an example dialog 2</DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
```

### Form Example with Zod Validation

```tsx
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { useAppForm } from '@cwncollab-org/component-kit'
import { useState } from 'react'
import { z } from 'zod'

// Define your form schema with Zod
const formSchema = z.object({
  username: z.string()
    .min(1, 'Username is required')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  age: z.number()
    .min(18, 'You must be at least 18 years old')
    .max(120, 'Please enter a valid age'),
  subscribe: z.boolean()
    .refine(val => val === true, 'You must subscribe to continue'),
  role: z.string()
    .min(1, 'Please select a role'),
  birthDate: z.date()
    .min(new Date('1900-01-01'), 'Please enter a valid birth date')
    .max(new Date(), 'Birth date cannot be in the future'),
})

// Infer the form type from the schema
type FormValues = z.infer<typeof formSchema>

export function FormExample() {
  const [value, setValue] = useState<FormValues>({
    username: '',
    email: '',
    age: 18,
    subscribe: false,
    role: '',
    birthDate: new Date(),
  })

  const form = useAppForm({
    defaultValues: {
      username: '',
      email: '',
      age: 18,
      subscribe: false,
      role: '',
      birthDate: new Date(),
    },
    onSubmit: ({ value }) => {
      setValue(value as FormValues)
    },
    // Add Zod validation
    validators: { onChange: formSchema },
  })

  return (
    <Paper sx={{ p: 2 }}>
      <Box>
        <Typography>Form Example with Zod Validation</Typography>
      </Box>
      <Box
        component='form'
        sx={{ py: 2 }}
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Stack spacing={2}>
          <form.AppField
            name='username'
            children={field => (
              <field.TextField 
                label='Username' 
                fullWidth 
              />
            )}
          />
          <form.AppField
            name='email'
            children={field => (
              <field.TextField 
                label='Email' 
                fullWidth
              />
            )}
          />
          <form.AppField
            name='age'
            children={field => (
              <field.TextField 
                label='Age' 
                type='number'
                fullWidth 
              />
            )}
          />
          <form.AppField
            name='birthDate'
            children={field => (
              <field.DatePicker
                label='Birth Date'
              />
            )}
          />
          <form.AppField
            name='role'
            children={field => (
              <field.Select
                label='Role'
                fullWidth
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='user'>User</MenuItem>
              </field.Select>
            )}
          />
          <form.AppField
            name='subscribe'
            children={field => (
              <field.Checkbox 
                label='Subscribe to newsletter'
              />
            )}
          />
          <form.AppForm>
            <form.SubscribeButton type='submit' variant='contained'>
              Submit
            </form.SubscribeButton>
            <form.SubscribeButton
              type='reset'
              variant='outlined'
              onClick={() => form.reset()}
            >
              Reset
            </form.SubscribeButton>
          </form.AppForm>
          <Typography variant='body1'>{JSON.stringify(value)}</Typography>
        </Stack>
      </Box>
    </Paper>
  )
}
```

### MultiSelect Component

The MultiSelect component provides a multiple selection dropdown with checkboxes, built on top of MUI's Select component and integrated with TanStack Form.

```tsx
import { useAppForm } from '@cwncollab-org/component-kit'
import { z } from 'zod'

// Define your form schema
const formSchema = z.object({
  categories: z.array(z.string()).min(1, 'Please select at least one category'),
})

// Define your options
const categories = [
  { value: 'tech', label: 'Technology' },
  { value: 'sports', label: 'Sports' },
  { value: 'news', label: 'News' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'science', label: 'Science' },
]

function MyForm() {
  const form = useAppForm({
    defaultValues: {
      categories: [],
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      console.log('Selected categories:', value.categories)
    },
  })

  return (
    <form.AppField
      name="categories"
      children={field => (
        <field.MultiSelect
          label="Categories"
          required
          options={categories}
          labelShrink
          size="small"
          fullWidth
          // Optional: Sort selected values by label or value
          sortSelected="label"
        />
      )}
    />
  )
}
```

#### MultiSelect Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | The label text for the select field |
| `labelShrink` | `boolean` | `false` | Whether the label should shrink |
| `size` | `'small' \| 'medium'` | `'medium'` | The size of the select field |
| `fullWidth` | `boolean` | `false` | Whether the select should take full width |
| `options` | `Array<{ value: string, label: string }> \| string[]` | `[]` | The options to display in the select |
| `sortSelected` | `'label' \| 'value' \| false` | `false` | Sort selected values by label or value |
| `slotProps` | `object` | - | Props for underlying MUI components |


### Common Dialog Patterns

Here are some common dialog patterns you can implement using the component kit:

#### Confirmation Dialog

```tsx
import { useConfirmDialog } from '@cwncollab-org/component-kit'

function MyComponent() {
  const confirm = useConfirmDialog()

  const handleClick = async () => {
    const result = await confirm({
      title: 'Confirm',
      message: 'Are you sure you want to add this item to cart?',
    })

    if (result) {
      // Proceed
    }
  }

  return (
    <Button onClick={handleClick}>
      Click
    </Button>
  )
}
```

#### Delete Confirmation Dialog

```tsx
import { useConfirmDeleteDialog } from '@cwncollab-org/component-kit'

function MyComponent() {
  const confirmDelete = useConfirmDeleteDialog()

  const handleDelete = async () => {
    const result = await confirmDelete({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
    })

    if (result) {
      // Proceed with deletion
    }
  }

  return (
    <Button onClick={handleDelete}>
      Delete Item
    </Button>
  )
}
```
