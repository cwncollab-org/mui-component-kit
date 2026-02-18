import { createFileRoute } from '@tanstack/react-router'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { useAppForm } from '../lib'
import { useState } from 'react'
import { z } from 'zod'

const formSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof formSchema>

export const Route = createFileRoute('/password-example')({
  component: PasswordExample,
})

function PasswordExample() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null)

  const form = useAppForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    } as FormValues,
    validators: { onChange: formSchema },
    onSubmit: async ({ value }) => {
      setSubmitted(value)
    },
  })

  return (
    <Box sx={{ p: 4, maxWidth: 480 }}>
      <Typography variant='h5' gutterBottom>
        Password Example
      </Typography>
      <Typography variant='body2' color='text.secondary' gutterBottom>
        Demonstrates the <code>Password</code> / <code>SubscribePassword</code>{' '}
        components with show/hide toggle and form validation.
      </Typography>

      <Paper variant='outlined' sx={{ p: 3, mt: 2 }}>
        <form
          onSubmit={e => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <form.AppForm>
            <Stack spacing={2}>
              <form.AppField name='password'>
                {field => (
                  <field.SubscribePassword
                    label='Password'
                    showToggle
                    fullWidth
                  />
                )}
              </form.AppField>

              <form.AppField name='confirmPassword'>
                {field => (
                  <field.SubscribePassword
                    label='Confirm Password'
                    showToggle
                    fullWidth
                  />
                )}
              </form.AppField>

              <form.SubscribeButton type='submit' variant='contained'>
                Submit
              </form.SubscribeButton>
            </Stack>
          </form.AppForm>
        </form>
      </Paper>

      {submitted && (
        <Paper variant='outlined' sx={{ p: 3, mt: 3 }}>
          <Typography variant='subtitle2' gutterBottom>
            Submitted values
          </Typography>
          <Typography variant='body2'>
            <strong>password:</strong> {'*'.repeat(submitted.password.length)}
          </Typography>
          <Typography variant='body2'>
            <strong>confirmPassword:</strong>{' '}
            {'*'.repeat(submitted.confirmPassword.length)}
          </Typography>
        </Paper>
      )}
    </Box>
  )
}
