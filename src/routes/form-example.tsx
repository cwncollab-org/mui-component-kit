import { createFileRoute } from '@tanstack/react-router'
import { Box, Button, MenuItem, Paper, Stack, Typography } from '@mui/material'
import { useAppForm } from '../lib'
import { useState } from 'react'
import { z } from 'zod'

import dayjs from 'dayjs'
const formSchema = z.object({
  username: z.string().min(1),
  role: z.enum(['admin', 'user']),
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

export function FormExample() {
  const [value, setValue] = useState<FormValues | undefined>(undefined)
  const form = useAppForm({
    defaultValues: {
      username: 'default',
      role: undefined,
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
          <Stack spacing={2} alignItems='flex-start'>
            <form.AppField
              name='username'
              children={field => (
                <field.SubscribeTextField
                  label='Username'
                  maxLength={20}
                  fullWidth
                  required
                  labelShrink
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

            <form.AppField
              name='role'
              children={field => (
                <field.SubscribeSelect
                  label='Role'
                  required
                  options={roles}
                  labelShrink
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
                  labelShrink
                  size='small'
                  sortSelected='label'
                  fullWidth
                />
              )}
            />

            <form.AppField
              name='date'
              children={field => (
                <field.SubscribeDatePicker
                  label='Date'
                  required
                  labelShrink
                  fullWidth
                  size='small'
                />
              )}
            />

            <form.AppField
              name='time'
              children={field => (
                <field.SubscribeTimePicker
                  label='Time'
                  labelShrink
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
