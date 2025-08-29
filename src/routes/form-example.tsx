import { createFileRoute } from '@tanstack/react-router'
import {
  Box,
  MenuItem,
  Paper,
  Stack,
  Typography,
  Radio,
  FormControlLabel,
} from '@mui/material'
import { useAppForm } from '../lib'
import { useState } from 'react'
import { z } from 'zod'

import dayjs from 'dayjs'
const formSchema = z.object({
  username: z.string().min(1),
  role: z.enum(['admin', 'user']),
  priority: z.enum(['low', 'medium', 'high']),
  date: z.date().max(dayjs().add(1, 'day').toDate()),
  time: z.date(),
  agree: z.boolean(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  ssn: z.string().optional(),
  creditCard: z.string().optional(),
  categories: z.array(z.string()).min(1, 'Please select at least one category'),
  skills: z.array(z.string()).optional(),
  country: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export const Route = createFileRoute('/form-example')({
  component: FormExample,
})

const roles = [
  { value: 'admin', label: 'Administrator' },
  { value: 'user', label: 'User' },
  { value: 'guest', label: 'Guest' },
]

const categories = [
  { value: 'tech', label: 'Technology' },
  { value: 'sports', label: 'Sports' },
  { value: 'news', label: 'News' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'science', label: 'Science' },
]

const priorities = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' },
]

const skills = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'node', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
]

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
  { value: 'br', label: 'Brazil' },
  { value: 'in', label: 'India' },
  { value: 'cn', label: 'China' },
]

export function FormExample() {
  const [value, setValue] = useState<FormValues | undefined>(undefined)
  const form = useAppForm({
    defaultValues: {
      username: 'default',
      role: undefined,
      priority: undefined,
      agree: false,
      date: undefined,
      time: undefined,
      phone: '(123) 456-7890',
      ssn: undefined,
      creditCard: undefined,
      categories: [],
      skills: [],
      country: undefined,
    } as Partial<FormValues>,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      return new Promise(resolve => {
        setTimeout(() => {
          setValue(value as FormValues)
          resolve(true)
        }, 2000)
      })
    },
  })
  return (
    <Paper sx={{ p: 2 }}>
      <Box>
        <Typography>Form Example</Typography>
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
        <form.AppForm>
          <form.Subscribe selector={state => state.isDirty}>
            {isDirty => <>isDirty: {isDirty ? 'true' : 'false'}</>}
          </form.Subscribe>
          <Stack spacing={2} alignItems='stretch'>
            <Typography variant='h6'>
              TextField with different label behaviors
            </Typography>
            <form.AppField
              name='username'
              children={field => (
                <field.SubscribeTextField
                  required
                  label='Username (auto)'
                  maxLength={20}
                  fullWidth
                  labelBehavior='auto'
                  size='small'
                />
              )}
            />
            <form.AppField
              name='username'
              children={field => (
                <field.SubscribeTextField
                  required
                  label='Username (shrink)'
                  maxLength={20}
                  fullWidth
                  labelBehavior='shrink'
                  size='small'
                />
              )}
            />
            <form.AppField
              name='username'
              children={field => (
                <field.SubscribeTextField
                  required
                  label='Username (static)'
                  maxLength={20}
                  fullWidth
                  labelBehavior='static'
                  size='small'
                />
              )}
            />
            <form.AppField
              name='agree'
              children={field => (
                <field.SubscribeCheckbox label='Agree to terms' />
              )}
            />
            <Typography variant='h6'>
              Select with different label behaviors
            </Typography>
            <form.AppField
              name='role'
              children={field => (
                <field.SubscribeSelect
                  label='Role (auto)'
                  required
                  options={roles}
                  labelBehavior='auto'
                  size='small'
                  fullWidth
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                </field.SubscribeSelect>
              )}
            />
            <form.AppField
              name='role'
              children={field => (
                <field.SubscribeSelect
                  label='Role (shrink)'
                  required
                  options={roles}
                  labelBehavior='shrink'
                  size='small'
                  fullWidth
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                </field.SubscribeSelect>
              )}
            />
            <form.AppField
              name='role'
              children={field => (
                <field.SubscribeSelect
                  label='Role (static)'
                  required
                  options={roles}
                  labelBehavior='static'
                  size='small'
                  fullWidth
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                </field.SubscribeSelect>
              )}
            />
            <Typography variant='h6'>
              MultiSelect with different label behaviors
            </Typography>
            <form.AppField
              name='categories'
              children={field => (
                <field.SubscribeMultiSelect
                  label='Categories (auto)'
                  required
                  options={categories}
                  labelBehavior='auto'
                  size='small'
                  sortSelected='label'
                  fullWidth
                />
              )}
            />
            <form.AppField
              name='categories'
              children={field => (
                <field.SubscribeMultiSelect
                  label='Categories (shrink)'
                  required
                  options={categories}
                  labelBehavior='shrink'
                  size='small'
                  sortSelected='label'
                  fullWidth
                />
              )}
            />
            <form.AppField
              name='categories'
              children={field => (
                <field.SubscribeMultiSelect
                  label='Categories (static)'
                  required
                  options={categories}
                  labelBehavior='static'
                  size='small'
                  sortSelected='label'
                  fullWidth
                />
              )}
            />
            <form.AppField
              name='role'
              children={field => (
                <field.SubscribeSelect
                  label='Role'
                  required
                  options={roles}
                  labelBehavior='shrink'
                  size='small'
                  fullWidth
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                </field.SubscribeSelect>
              )}
            />
            <form.AppField
              name='categories'
              children={field => (
                <field.SubscribeMultiSelect
                  label='Categories'
                  required
                  options={categories}
                  labelBehavior='shrink'
                  size='small'
                  sortSelected='label'
                  fullWidth
                />
              )}
            />
            <form.AppField
              name='priority'
              children={field => (
                <field.SubscribeRadioGroup label='Priority' required>
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
            <Typography variant='h6'>
              DatePicker with different label behaviors
            </Typography>
            <form.AppField
              name='date'
              children={field => (
                <field.SubscribeDatePicker
                  label='Date (auto)'
                  required
                  labelBehavior='auto'
                  fullWidth
                  size='small'
                />
              )}
            />
            <form.AppField
              name='date'
              children={field => (
                <field.SubscribeDatePicker
                  label='Date (shrink)'
                  required
                  labelBehavior='shrink'
                  fullWidth
                  size='small'
                />
              )}
            />
            <form.AppField
              name='date'
              children={field => (
                <field.SubscribeDatePicker
                  label='Date (static)'
                  required
                  labelBehavior='static'
                  fullWidth
                  size='small'
                />
              )}
            />
            <Typography variant='h6'>
              TimePicker with different label behaviors
            </Typography>
            <form.AppField
              name='time'
              children={field => (
                <field.SubscribeTimePicker
                  label='Time (auto)'
                  labelBehavior='auto'
                  size='small'
                  fullWidth
                />
              )}
            />
            <form.AppField
              name='time'
              children={field => (
                <field.SubscribeTimePicker
                  label='Time (shrink)'
                  labelBehavior='shrink'
                  size='small'
                  fullWidth
                />
              )}
            />
            <form.AppField
              name='time'
              children={field => (
                <field.SubscribeTimePicker
                  label='Time (static)'
                  labelBehavior='static'
                  size='small'
                  fullWidth
                />
              )}
            />
            <Typography variant='h6'>
              Autocomplete with different label behaviors
            </Typography>
            <form.AppField
              name='country'
              children={field => (
                <field.SubscribeAutocomplete
                  label='Country (auto)'
                  labelBehavior='auto'
                  size='small'
                  required
                  fullWidth
                  options={countries}
                  placeholder='Select a country'
                />
              )}
            />
            <form.AppField
              name='country'
              children={field => (
                <field.SubscribeAutocomplete
                  label='Country (shrink)'
                  labelBehavior='shrink'
                  size='small'
                  fullWidth
                  options={countries}
                  placeholder='Select a country'
                />
              )}
            />
            <form.AppField
              name='country'
              children={field => (
                <field.SubscribeAutocomplete
                  label='Country (static)'
                  labelBehavior='static'
                  size='small'
                  fullWidth
                  options={countries}
                  placeholder='Select a country'
                />
              )}
            />
            <Typography variant='h6'>
              Multiple Autocomplete with different behaviors
            </Typography>
            <form.AppField
              name='skills'
              children={field => (
                <field.SubscribeAutocomplete
                  label='Skills (auto)'
                  labelBehavior='auto'
                  size='small'
                  fullWidth
                  multiple
                  options={skills}
                  placeholder='Select skills'
                />
              )}
            />
            <form.AppField
              name='skills'
              children={field => (
                <field.SubscribeAutocomplete
                  label='Skills (shrink)'
                  labelBehavior='shrink'
                  size='small'
                  fullWidth
                  multiple
                  options={skills}
                  placeholder='Select skills'
                />
              )}
            />
            <form.AppField
              name='skills'
              children={field => (
                <field.SubscribeAutocomplete
                  label='Skills (static)'
                  labelBehavior='static'
                  size='small'
                  fullWidth
                  multiple
                  options={skills}
                  placeholder='Select skills'
                />
              )}
            />
            <form.AppField
              name='email'
              children={field => <field.TextField label='Email' fullWidth />}
            />
            <Typography variant='h6'>
              MaskedTextField with different label behaviors
            </Typography>
            <form.AppField
              name='phone'
              children={field => (
                <field.SubscribeMaskedTextField
                  mask='(000) 000-0000'
                  label='Phone Number (auto)'
                  labelBehavior='auto'
                  size='small'
                  fullWidth
                  placeholder='(123) 456-7890'
                />
              )}
            />
            {/* <form.AppField
              name='phone'
              children={field => (
                <field.SubscribeMaskedTextField
                  mask='(000) 000-0000'
                  label='Phone Number (shrink)'
                  labelBehavior='shrink'
                  size='small'
                  fullWidth
                  placeholder='(123) 456-7890'
                />
              )}
            />
            <form.AppField
              name='phone'
              children={field => (
                <field.SubscribeMaskedTextField
                  mask='(000) 000-0000'
                  label='Phone Number (static)'
                  labelBehavior='static'
                  size='small'
                  fullWidth
                  placeholder='(123) 456-7890'
                />
              )}
            /> */}
            <Typography variant='h6'>Other Masked Input Examples</Typography>
            <form.AppField
              name='ssn'
              children={field => (
                <field.SubscribeMaskedTextField
                  mask='000-00-0000'
                  label='Social Security Number'
                  labelBehavior='shrink'
                  size='small'
                  fullWidth
                  placeholder='123-45-6789'
                />
              )}
            />
            <form.AppField
              name='creditCard'
              children={field => (
                <field.SubscribeMaskedTextField
                  mask='0000 0000 0000 0000'
                  label='Credit Card Number'
                  labelBehavior='shrink'
                  size='small'
                  fullWidth
                  placeholder='1234 5678 9012 3456'
                />
              )}
            />
            <Typography variant='h6'>Advanced Pattern Examples</Typography>
            <form.AppField
              name='email'
              children={field => (
                <field.SubscribeMaskedTextField
                  mask={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
                  label='Email with Pattern Validation'
                  labelBehavior='shrink'
                  size='small'
                  fullWidth
                  placeholder='user@example.com'
                />
              )}
            />

            <form.AppField
              name='ssn'
              children={field => (
                <field.SubscribeMaskedTextField
                  mask='SSN: 000-00-0000'
                  blocks={{
                    SSN: {
                      mask: 'SSN:',
                      lazy: false,
                    },
                  }}
                  definitions={{
                    '0': {
                      mask: /[0-9]/,
                      placeholderChar: '#',
                    },
                  }}
                  label='SSN with Custom Placeholder'
                  labelBehavior='shrink'
                  size='small'
                  fullWidth
                  placeholder='SSN: ###-##-####'
                />
              )}
            />
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
            <Typography variant='body1'>{JSON.stringify(value)}</Typography>
          </Stack>
        </form.AppForm>
      </Box>
    </Paper>
  )
}
