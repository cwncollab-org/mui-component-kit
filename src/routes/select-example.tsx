import { createFileRoute } from '@tanstack/react-router'
import { Box, MenuItem, Paper, Stack, Typography } from '@mui/material'
import { Select, useAppForm } from '../lib'
import { useState, useEffect } from 'react'
import { z } from 'zod'

const formSchema = z.object({
  role: z.string().min(1, 'Role is required'),
  category: z.string().optional(),
  status: z.string().optional(),
  multiSelect: z.array(z.string()).min(1, 'Select at least one'),
  asyncRole: z.string().optional(),
  asyncMultiSelect: z.array(z.string()).min(1, 'Select at least one'),
})

type FormValues = z.infer<typeof formSchema>

export const Route = createFileRoute('/select-example')({
  component: SelectExample,
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
]

const statuses = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
]

export function SelectExample() {
  const [value, setValue] = useState<FormValues | undefined>(undefined)
  const [asyncOptions, setAsyncOptions] = useState<
    { value: string; text: string }[]
  >([])
  const [asyncMultiOptions, setAsyncMultiOptions] = useState<
    { value: string; label: string }[]
  >([])
  const [loading, setLoading] = useState(true)

  const [controlledValue, setControlledValue] = useState('user')

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setAsyncOptions([
        { value: 'remote', text: 'Remote' },
        { value: 'onsite', text: 'On-site' },
        { value: 'hybrid', text: 'Hybrid' },
      ])
      setAsyncMultiOptions([
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' },
      ])
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const form = useAppForm({
    defaultValues: {
      role: '',
      category: '',
      status: '',
      multiSelect: [],
      asyncRole: 'remote',
      asyncMultiSelect: ['react'],
    } as FormValues,
    validators: {
      onChange: formSchema,
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      setValue(value)
    },
  })

  return (
    <Paper sx={{ p: 2 }}>
      <Box>
        <Typography variant='h5' gutterBottom>
          Select Example
        </Typography>
      </Box>

      <Box>
        <Typography variant='h6'>Controlled Select</Typography>
        <Select
          label='Controlled Select'
          labelBehavior='static'
          options={roles}
          value={controlledValue}
          onChange={e => setControlledValue(e.target.value as string)}
          fullWidth
          size='small'
        ></Select>
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
          <Stack spacing={3}>
            <Typography variant='h6'>Basic Select</Typography>
            <form.AppField
              name='role'
              children={field => (
                <field.SubscribeSelect
                  label='Role (Required)'
                  required
                  options={roles}
                  fullWidth
                  size='small'
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                </field.SubscribeSelect>
              )}
            />

            <Typography variant='h6'>Label Behaviors</Typography>
            <Stack direction='row' spacing={2}>
              <form.AppField
                name='category'
                children={field => (
                  <field.SubscribeSelect
                    label='Category (Auto)'
                    options={categories}
                    labelBehavior='auto'
                    fullWidth
                    size='small'
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                  </field.SubscribeSelect>
                )}
              />
              <form.AppField
                name='category'
                children={field => (
                  <field.SubscribeSelect
                    label='Category (Shrink)'
                    options={categories}
                    labelBehavior='shrink'
                    fullWidth
                    size='small'
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                  </field.SubscribeSelect>
                )}
              />
              <form.AppField
                name='category'
                children={field => (
                  <field.SubscribeSelect
                    label='Category (Static)'
                    options={categories}
                    labelBehavior='static'
                    fullWidth
                    size='small'
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                  </field.SubscribeSelect>
                )}
              />
            </Stack>

            <Typography variant='h6'>Multi Select</Typography>
            <form.AppField
              name='multiSelect'
              children={field => (
                <field.SubscribeMultiSelect
                  label='Multi Select'
                  required
                  options={statuses}
                  labelBehavior='shrink'
                  size='small'
                  fullWidth
                />
              )}
            />

            <Typography variant='h6'>Async Options (Simulated API)</Typography>
            <form.AppField
              name='asyncRole'
              children={field => (
                <field.SubscribeSelect
                  label={loading ? 'Work Type (Loading...)' : 'Work Type'}
                  isLoading={loading}
                  options={asyncOptions}
                  labelBehavior='shrink'
                  size='small'
                  fullWidth
                  getOptionLabel={option => option.text}
                  getOptionValue={option => option.value}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                </field.SubscribeSelect>
              )}
            />

            <Typography variant='h6'>Async Multi Select</Typography>
            <form.AppField
              name='asyncMultiSelect'
              children={field => (
                <field.SubscribeMultiSelect
                  isLoading={loading}
                  label={loading ? 'Frameworks (Loading...)' : 'Frameworks'}
                  options={asyncMultiOptions}
                  labelBehavior='shrink'
                  size='small'
                  fullWidth
                />
              )}
            />

            <Stack direction='row' spacing={2}>
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
            </Stack>

            {value && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant='subtitle2'>Submitted Values:</Typography>
                <pre>{JSON.stringify(value, null, 2)}</pre>
              </Box>
            )}
          </Stack>
        </form.AppForm>
      </Box>
    </Paper>
  )
}
