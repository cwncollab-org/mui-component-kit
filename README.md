# Component Kit

> **Note**: This documentation was generated with the assistance of AI. While we strive for accuracy, please verify any code examples or implementation details in your specific use case.

A React component library built with TypeScript and Vite. This package provides a set of reusable components built on top of [Material-UI (MUI)](https://mui.com/) and [Tanstack Form](https://tanstack.com/form/latest) for form handling.


## Features

- Built on Material-UI 
- Type-safe dialog management
- Lazy loading support
- Payload and result handling for dialogs
- Form components with TanStack Form integration
- Router-integrated tabs with URL synchronization

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
      onClick={() => openDialog(ExampleDialog)}
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
  DialogContentText,
  DialogContent,
  DialogProps,
  DialogTitle,
} from '@mui/material'
import { DialogCloseButton } from '@cwncollab-org/component-kit'

export default function ExampleDialog({ open, onClose, ...rest }: DialogProps) {
  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      <DialogTitle>Example Dialog</DialogTitle>
      <DialogCloseButton onClick={() => onClose?.({}, 'escapeKeyDown')} />
      <DialogContent>
        <DialogContentText>This is an example dialog</DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
```

> **Note**: The `DialogCloseButton` is an optional component that provides a close button (X) in the top-right corner of the dialog. It's positioned absolutely and styled to match Material-UI design patterns.

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
        onClick={async () => {
          await openDialog(ExampleDialogWithPayload, { payload: { name } })
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
import { DialogProps } from '@cwncollab-org/component-kit'

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
  const [result, setResult] = useState('')

  return (
    <>
      <Button
        variant='contained'
        onClick={async () => {
          const result = await openDialog(ExampleDialogWithResult)
          setResult(JSON.stringify(result))
        }}
      >
        Open Dialog with Result
      </Button>
      <Typography variant='body1' sx={{ mt: 1 }}>
        Result: {result}
      </Typography>
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
import { DialogProps } from '@cwncollab-org/component-kit'
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
      onClick={() => openDialog(ExampleDialog2)}
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

The component now supports the full `react-imask` API, allowing for advanced masking patterns including custom definitions, blocks, regular expressions, and more complex validation patterns.

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
      {/* Basic phone number mask */}
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

The MaskedTextField component now supports advanced react-imask features including custom definitions, blocks, regular expressions, and complex validation patterns:

```tsx
import { useAppForm } from '@cwncollab-org/component-kit'
import { IMask } from 'react-imask'
import { z } from 'zod'

// Advanced masking patterns using react-imask features
function AdvancedMaskingExamples() {
  const form = useAppForm({
    defaultValues: {
      productCode: '',
      email: '',
      serialNumber: '',
      dateRange: '',
      time: '',
    },
    onSubmit: ({ value }) => {
      console.log('Advanced mask values:', value)
    },
  })

  return (
    <>
      {/* Custom definitions for product codes */}
      <form.AppField
        name="productCode"
        children={field => (
          <field.MaskedTextField
            mask="AA-####-**"
            definitions={{
              A: /[A-Z]/,          // Uppercase letters only
              '#': /[1-9]/,        // Digits 1-9 only
              '*': /[A-Z0-9]/,     // Alphanumeric uppercase
            }}
            label="Product Code"
            labelBehavior="shrink"
            size="small"
            fullWidth
            placeholder="AB-1234-CD"
          />
        )}
      />

      {/* Email validation with regex pattern */}
      <form.AppField
        name="email"
        children={field => (
          <field.MaskedTextField
            mask={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
            label="Email with Pattern Validation"
            labelBehavior="shrink"
            size="small"
            fullWidth
            placeholder="user@example.com"
          />
        )}
      />

      {/* Serial number with mixed definitions */}
      <form.AppField
        name="serialNumber"
        children={field => (
          <field.MaskedTextField
            mask="SN-LLLNNN-CCC"
            definitions={{
              L: /[A-Z]/,      // Letters
              N: /[0-9]/,      // Numbers
              C: /[A-Z0-9]/,   // Alphanumeric
            }}
            label="Serial Number"
            labelBehavior="shrink"
            size="small"
            fullWidth
            placeholder="SN-ABC123-XYZ"
          />
        )}
      />

      {/* Date range with blocks (advanced pattern) */}
      <form.AppField
        name="dateRange"
        children={field => (
          <field.MaskedTextField
            mask={Date}
            pattern="d{/}`m{/}`Y - d{/}`m{/}`Y*"
            blocks={{
              d: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 31,
                maxLength: 2,
              },
              m: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 12,
                maxLength: 2,
              },
              Y: {
                mask: IMask.MaskedRange,
                from: 1900,
                to: 9999,
                maxLength: 4,
              },
            }}
            label="Date Range"
            labelBehavior="shrink"
            size="small"
            fullWidth
            placeholder="DD/MM/YYYY - DD/MM/YYYY"
          />
        )}
      />

      {/* Time format with validation */}
      <form.AppField
        name="time"
        children={field => (
          <field.MaskedTextField
            mask="HH:MM"
            blocks={{
              HH: {
                mask: IMask.MaskedRange,
                from: 0,
                to: 23,
                maxLength: 2,
              },
              MM: {
                mask: IMask.MaskedRange,
                from: 0,
                to: 59,
                maxLength: 2,
              },
            }}
            label="Time (24h format)"
            labelBehavior="shrink"
            size="small"
            placeholder="14:30"
          />
        )}
      />
    </>
  )
}
```

#### MaskedTextField Props

The MaskedTextField component accepts all `react-imask` options as props, providing full access to the masking library's capabilities:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mask` | `ReactMaskOpts['mask']` | - | The mask pattern - can be string, RegExp, function, or IMask class |
| `definitions` | `ReactMaskOpts['definitions']` | - | Custom character definitions for the mask pattern |
| `blocks` | `ReactMaskOpts['blocks']` | - | Block definitions for complex patterns with validation |
| `pattern` | `ReactMaskOpts['pattern']` | - | Pattern string when using blocks |
| `lazy` | `ReactMaskOpts['lazy']` | - | Show placeholder and fixed characters only on focus |
| `placeholderChar` | `ReactMaskOpts['placeholderChar']` | - | Character to show for unfilled mask positions |
| `label` | `string` | - | The label text for the text field |
| `labelBehavior` | `'auto' \| 'shrink' \| 'static'` | `'auto'` | How the label should behave |
| `size` | `'small' \| 'medium'` | `'medium'` | The size of the text field |
| `fullWidth` | `boolean` | `false` | Whether the text field should take full width |
| `placeholder` | `string` | - | Placeholder text when the field is empty |
| `disabled` | `boolean` | `false` | Whether the text field is disabled |
| `required` | `boolean` | `false` | Whether the text field is required |
| `slotProps` | `object` | - | Props for underlying MUI components |

The MaskedTextField component accepts all standard MUI TextField props and all `react-imask` options, providing full flexibility for complex masking scenarios.

**Basic Mask Patterns:**
- `0` - any digit (0-9)
- `a` - any letter (a-z, A-Z)  
- `*` - any character
- `[]` - make input optional
- `{}` - include fixed part in unmasked value
- `\` - escape character

**Advanced Features:**
- **Custom Definitions**: Define your own character patterns using regular expressions
- **Blocks**: Create complex validated input segments (like date ranges, time validation)
- **Regular Expressions**: Use regex patterns for complex validation rules
- **IMask Classes**: Access to all IMask functionality including MaskedRange, MaskedDate, etc.
- **Dynamic Masking**: Conditional masks based on input content

**Label Behaviors:**
- `'auto'`: Default MUI behavior - label floats when focused or has value
- `'shrink'`: Label is always in the shrunk (floating) position  
- `'static'`: Label appears as a static label above the input

**SubscribeMaskedTextField:**
The `SubscribeMaskedTextField` component has the same props as `MaskedTextField` but automatically disables the field when the form is submitting, providing better UX during form submission.

For more advanced masking scenarios, refer to the [react-imask documentation](https://imask.js.org/) as the MaskedTextField component provides full access to all react-imask features.


### Router Tabs

The Router Tabs components provide tabbed navigation integrated with TanStack Router, allowing you to create tabs that are synced with the browser URL and support nested routing.

#### Basic Router Tabs Usage

```tsx
import { Box } from '@mui/material'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { RouterTab, RouterTabs } from '@cwncollab-org/component-kit'

export const Route = createFileRoute('/tabs-example')({
  component: RouteComponent,
})

function RouteComponent() {
  const match = Route.useMatch()
  
  return (
    <Box>
      <RouterTabs match={match}>
        <RouterTab value='/tabs-example/tab1' label='Tab 1' />
        <RouterTab value='/tabs-example/tab2' label='Tab 2' />
        <RouterTab value='/tabs-example/tab3' label='Tab 3' />
      </RouterTabs>
      <Outlet />
    </Box>
  )
}
```

#### Router Tabs with TabLabel Components

The `TabLabel` component allows you to add visual indicators like error states to your tabs:

```tsx
import { RouterTab, RouterTabs, TabLabel } from '@cwncollab-org/component-kit'

function MyTabsComponent() {
  const match = Route.useMatch()
  const [hasError, setHasError] = useState(false)
  
  return (
    <RouterTabs match={match}>
      <RouterTab 
        value='/dashboard/overview' 
        label={<TabLabel label='Overview' />} 
      />
      <RouterTab 
        value='/dashboard/settings' 
        label={<TabLabel label='Settings' error={hasError} />} 
      />
      <RouterTab 
        value='/dashboard/profile' 
        label='Profile' 
      />
    </RouterTabs>
  )
}
```

#### Nested Router Tabs

Router Tabs support nested routing structures:

```tsx
// Parent route: /tabs-example/tab3
function Tab3Component() {
  const match = Route.useMatch()
  
  return (
    <Box>
      <Typography variant='h6'>Tab 3 Content</Typography>
      <RouterTabs match={match}>
        <RouterTab value='/tabs-example/tab3/list' label='List View' />
        <RouterTab value='/tabs-example/tab3/123' label='Detail View' />
      </RouterTabs>
      <Outlet />
    </Box>
  )
}
```

#### RouterTabs Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `match` | `MakeRouteMatch` | - | The route match object from TanStack Router used to determine active tab |
| `children` | `ReactNode` | - | RouterTab components |

The RouterTabs component also accepts all standard MUI Tabs props except `value` which is automatically managed based on the current route.

#### RouterTab Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `ValidateToPath` | - | The route path this tab should navigate to |
| `label` | `ReactNode` | - | The label content for the tab (can be string or TabLabel component) |

The RouterTab component also accepts all standard MUI Tab props except `value` which is used for routing.

#### TabLabel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | The text label for the tab |
| `error` | `boolean` | `false` | Whether to show an error indicator (red dot) next to the label |

**Features:**
- **URL Synchronization**: Tab selection is automatically synchronized with the browser URL
- **Nested Routing**: Supports complex nested tab structures with child routes
- **Type Safety**: Full TypeScript support with path validation
- **MUI Integration**: Built on top of Material-UI Tabs with full styling support
- **Error Indicators**: Visual error states with the TabLabel component


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
      message: 'Are you sure you want to confirm?',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
    })
    
    if (result.success) {
      // Proceed with the action
      console.log('User confirmed')
    } else {
      console.log('User cancelled')
    }
  }

  return (
    <Button onClick={handleClick}>
      Confirm Action
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
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this item?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    })

    if (result.success) {
      // Proceed with deletion
      console.log('Item deleted')
    } else {
      console.log('Deletion cancelled')
    }
  }

  return (
    <Button onClick={handleDelete} color="error">
      Delete Item
    </Button>
  )
}
```

#### Advanced Dialog Usage with Dialog Count

```tsx
import { useDialogs, useConfirmDialog } from '@cwncollab-org/component-kit'

function DialogManager() {
  const { openDialog, dialogs } = useDialogs()
  const confirm = useConfirmDialog()

  return (
    <Stack spacing={2}>
      <Typography variant='body1'>
        Active dialogs: {dialogs.length}
      </Typography>
      
      <Button
        variant='contained'
        onClick={async () => {
          const result = await confirm({
            title: 'Multiple Dialogs',
            message: 'You can open multiple dialogs simultaneously.',
            confirmText: 'OK',
            cancelText: 'Cancel',
          })
          console.log(result)
        }}
      >
        Open Confirmation Dialog
      </Button>
    </Stack>
  )
}
```
