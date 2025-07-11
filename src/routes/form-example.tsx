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
  categories: z.array(z.string()).min(1, 'Please select at least one category'),
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
      categories: [],
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
                <field.SubscribeRadioGroup label='Priority'>
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
            <form.AppField
              name='email'
              children={field => <field.TextField label='Email' fullWidth />}
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
