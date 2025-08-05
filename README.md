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
import { Box, Button, Paper, Stack, Typography, Radio, FormControlLabel } from '@mui/material'
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
  priority: z.enum(['low', 'medium', 'high'])
    .refine(val => val !== undefined, 'Please select a priority'),
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
    priority: undefined,
    birthDate: new Date(),
  })

  const form = useAppForm({
    defaultValues: {
      username: '',
      email: '',
      age: 18,
      subscribe: false,
      role: '',
      priority: undefined,
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
          <form.AppField
            name='priority'
            children={field => (
              <field.RadioGroup label='Priority'>
                <FormControlLabel
                  value='low'
                  control={<Radio />}
                  label='Low Priority'
                />
                <FormControlLabel
                  value='medium'
                  control={<Radio />}
                  label='Medium Priority'
                />
                <FormControlLabel
                  value='high'
                  control={<Radio />}
                  label='High Priority'
                />
              </field.RadioGroup>
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


### Autocomplete Component

The Autocomplete component provides a searchable dropdown with support for single and multiple selection, built on top of MUI's Autocomplete component and integrated with TanStack Form.

```tsx
import { useAppForm } from '@cwncollab-org/component-kit'
import { z } from 'zod'

// Define your form schema
const formSchema = z.object({
  country: z.string().optional(),
  skills: z.array(z.string()).optional(),
})

// Define your options
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
]

const skills = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
]

function MyForm() {
  const form = useAppForm({
    defaultValues: {
      country: undefined,
      skills: [],
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      console.log('Selected country:', value.country)
      console.log('Selected skills:', value.skills)
    },
  })

  return (
    <>
      {/* Single selection autocomplete */}
      <form.AppField
        name="country"
        children={field => (
          <field.Autocomplete
            label="Country"
            labelBehavior="shrink"
            size="small"
            fullWidth
            options={countries}
            placeholder="Select a country"
          />
        )}
      />

      {/* Multiple selection autocomplete */}
      <form.AppField
        name="skills"
        children={field => (
          <field.Autocomplete
            label="Skills"
            labelBehavior="shrink"
            size="small"
            fullWidth
            multiple
            options={skills}
            placeholder="Select skills"
          />
        )}
      />

      {/* SubscribeAutocomplete automatically disables during form submission */}
      <form.AppField
        name="country"
        children={field => (
          <field.SubscribeAutocomplete
            label="Country"
            labelBehavior="auto"
            size="small"
            fullWidth
            options={countries}
            placeholder="Select a country"
          />
        )}
      />
    </>
  )
}
```

#### Autocomplete Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | The label text for the autocomplete field |
| `labelBehavior` | `'auto' \| 'shrink' \| 'static'` | `'auto'` | How the label should behave |
| `size` | `'small' \| 'medium'` | `'medium'` | The size of the autocomplete field |
| `fullWidth` | `boolean` | `false` | Whether the autocomplete should take full width |
| `options` | `Array<{ value: string, label: string }> \| string[]` | `[]` | The options to display in the autocomplete |
| `multiple` | `boolean` | `false` | Whether multiple values can be selected |
| `freeSolo` | `boolean` | `false` | If true, the Autocomplete is free solo, meaning that the user input is not bound to provided options |
| `placeholder` | `string` | - | Placeholder text when no option is selected |
| `slotProps` | `object` | - | Props for underlying MUI components (autocomplete, textField, helperText) |
| `onChange` | `(value: string \| string[] \| null) => void` | - | Callback fired when the value changes |

The Autocomplete component also accepts all standard MUI FormControl props except those that conflict with the managed props.

**Label Behaviors:**
- `'auto'`: Default MUI behavior - label floats when focused or has value
- `'shrink'`: Label is always in the shrunk (floating) position
- `'static'`: Label appears as a static label above the input

**SubscribeAutocomplete:**
The `SubscribeAutocomplete` component has the same props as `Autocomplete` but automatically disables the field when the form is submitting, providing better UX during form submission.


### RadioGroup Component

The RadioGroup component provides radio button selection, built on top of MUI's FormControl and RadioGroup components and integrated with TanStack Form.

```tsx
import { useAppForm } from '@cwncollab-org/component-kit'
import { Radio, FormControlLabel } from '@mui/material'
import { z } from 'zod'

// Define your form schema
const formSchema = z.object({
  priority: z.enum(['low', 'medium', 'high']),
})

// Define your options
const priorities = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' },
]

function MyForm() {
  const form = useAppForm({
    defaultValues: {
      priority: undefined,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      console.log('Selected priority:', value.priority)
    },
  })

  return (
    <form.AppField
      name="priority"
      children={field => (
        <field.RadioGroup label="Priority">
          {priorities.map(priority => (
            <FormControlLabel
              key={priority.value}
              value={priority.value}
              control={<Radio />}
              label={priority.label}
            />
          ))}
        </field.RadioGroup>
      )}
    />
    
    // Alternative: You can also use SubscribeRadioGroup which automatically
    // disables the radio group when the form is submitting
    <form.AppField
      name="priority"
      children={field => (
        <field.SubscribeRadioGroup label="Priority">
          {priorities.map(priority => (
            <FormControlLabel
              key={priority.value}
              value={priority.value}
              control={<Radio />}
              label={priority.label}
            />
          ))}
        </field.SubscribeRadioGroup>
      )}
    />
  )
}
```

#### RadioGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | The label text for the radio group |
| `disabled` | `boolean` | `false` | Whether the radio group is disabled |
| `children` | `ReactNode` | - | Radio buttons (typically FormControlLabel components) |

The RadioGroup component also accepts all standard MUI RadioGroup props except `name`, `value`, and `defaultValue` which are managed by the form field.


### MaskedTextField Component

The MaskedTextField component provides input masking functionality, built on top of MUI's TextField component and `react-imask` library, integrated with TanStack Form. This component is useful for formatting user input such as phone numbers, credit card numbers, social security numbers, and other structured data.

```tsx
import { useAppForm } from '@cwncollab-org/component-kit'
import { z } from 'zod'

// Define your form schema
const formSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
  ssn: z.string().min(1, 'SSN is required'),
  creditCard: z.string().min(1, 'Credit card number is required'),
  zipCode: z.string().min(1, 'ZIP code is required'),
  date: z.string().min(1, 'Date is required'),
})

function MyForm() {
  const form = useAppForm({
    defaultValues: {
      phone: '',
      ssn: '',
      creditCard: '',
      zipCode: '',
      date: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      console.log('Form values:', value)
    },
  })

  return (
    <>
      {/* Phone number mask */}
      <form.AppField
        name="phone"
        children={field => (
          <field.MaskedTextField
            mask="(000) 000-0000"
            label="Phone Number"
            labelBehavior="shrink"
            size="small"
            fullWidth
            placeholder="(123) 456-7890"
          />
        )}
      />

      {/* Social Security Number mask */}
      <form.AppField
        name="ssn"
        children={field => (
          <field.MaskedTextField
            mask="000-00-0000"
            label="Social Security Number"
            labelBehavior="shrink"
            size="small"
            fullWidth
            placeholder="123-45-6789"
          />
        )}
      />

      {/* Credit Card Number mask */}
      <form.AppField
        name="creditCard"
        children={field => (
          <field.MaskedTextField
            mask="0000 0000 0000 0000"
            label="Credit Card Number"
            labelBehavior="shrink"
            size="small"
            fullWidth
            placeholder="1234 5678 9012 3456"
          />
        )}
      />

      {/* ZIP Code mask */}
      <form.AppField
        name="zipCode"
        children={field => (
          <field.MaskedTextField
            mask="00000"
            label="ZIP Code"
            labelBehavior="shrink"
            size="small"
            placeholder="12345"
          />
        )}
      />

      {/* Date mask */}
      <form.AppField
        name="date"
        children={field => (
          <field.MaskedTextField
            mask="00/00/0000"
            label="Date (MM/DD/YYYY)"
            labelBehavior="shrink"
            size="small"
            fullWidth
            placeholder="12/31/2023"
          />
        )}
      />

      {/* SubscribeMaskedTextField automatically disables during form submission */}
      <form.AppField
        name="phone"
        children={field => (
          <field.SubscribeMaskedTextField
            mask="(000) 000-0000"
            label="Phone Number"
            labelBehavior="auto"
            size="small"
            fullWidth
            placeholder="(123) 456-7890"
          />
        )}
      />
    </>
  )
}
```

#### Advanced Masking Examples

```tsx
// Custom mask patterns
function AdvancedMaskingExamples() {
  const form = useAppForm({
    defaultValues: {
      license: '',
      time: '',
      currency: '',
      alphanumeric: '',
    },
    onSubmit: ({ value }) => {
      console.log('Advanced mask values:', value)
    },
  })

  return (
    <>
      {/* License plate (letters and numbers) */}
      <form.AppField
        name="license"
        children={field => (
          <field.MaskedTextField
            mask="aaa-0000"
            label="License Plate"
            labelBehavior="shrink"
            size="small"
            fullWidth
            placeholder="ABC-1234"
          />
        )}
      />

      {/* Time format */}
      <form.AppField
        name="time"
        children={field => (
          <field.MaskedTextField
            mask="00:00"
            label="Time (24h format)"
            labelBehavior="shrink"
            size="small"
            placeholder="14:30"
          />
        )}
      />

      {/* Currency with decimal */}
      <form.AppField
        name="currency"
        children={field => (
          <field.MaskedTextField
            mask="$num"
            blocks={{
              num: {
                mask: Number,
                scale: 2,
                thousandsSeparator: ',',
                padFractionalZeros: true,
                normalizeZeros: true,
                radix: '.',
                mapToRadix: ['.'],
              },
            }}
            label="Amount"
            labelBehavior="shrink"
            size="small"
            fullWidth
            placeholder="$1,234.56"
          />
        )}
      />

      {/* Mixed alphanumeric */}
      <form.AppField
        name="alphanumeric"
        children={field => (
          <field.MaskedTextField
            mask="aa00aa"
            label="Product Code"
            labelBehavior="shrink"
            size="small"
            placeholder="AB12CD"
          />
        )}
      />
    </>
  )
}
```

#### MaskedTextField Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mask` | `IMaskInputProps['mask']` | - | The mask pattern to apply to the input |
| `label` | `string` | - | The label text for the text field |
| `labelBehavior` | `'auto' \| 'shrink' \| 'static'` | `'auto'` | How the label should behave |
| `size` | `'small' \| 'medium'` | `'medium'` | The size of the text field |
| `fullWidth` | `boolean` | `false` | Whether the text field should take full width |
| `placeholder` | `string` | - | Placeholder text when the field is empty |
| `disabled` | `boolean` | `false` | Whether the text field is disabled |
| `required` | `boolean` | `false` | Whether the text field is required |
| `slotProps` | `object` | - | Props for underlying MUI components |

The MaskedTextField component accepts all standard MUI TextField props and forwards them to the underlying TextField component.

**Mask Patterns:**
- `0` - any digit (0-9)
- `a` - any letter (a-z, A-Z)
- `*` - any alphanumeric character
- `[]` - make input optional (example: `[00]` for optional digits)
- `{}` - define range of repetitions (example: `{1,3}` for 1 to 3 repetitions)

**Label Behaviors:**
- `'auto'`: Default MUI behavior - label floats when focused or has value
- `'shrink'`: Label is always in the shrunk (floating) position
- `'static'`: Label appears as a static label above the input

**Advanced Masking:**
For complex masking scenarios like currency formatting or custom validation, you can pass an object with `blocks` configuration to define custom mask behaviors.

**SubscribeMaskedTextField:**
The `SubscribeMaskedTextField` component has the same props as `MaskedTextField` but automatically disables the field when the form is submitting, providing better UX during form submission.


### Common Dialog Patterns

Here are some common dialog patterns you can implement using the component kit:

#### Confirmation Dialog

```tsx
import { useConfirmDialog } from '@cwncollab-org/component-kit'

function MyComponent() {
  const confirm = useConfirmDialog()

  const handleClick = async () => {
    const { success } = await confirm({
      title: 'Confirm',
      message: 'Are you sure you want to add this item to cart?',
    })

    if (success) {
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
    const { success } = await confirmDelete({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
    })

    if (success) {
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
