import { createFileRoute } from '@tanstack/react-router'
import {
  Box,
  Paper,
  Stack,
  Typography,
  Divider,
  ButtonProps,
  Button,
} from '@mui/material'
import { useAppForm } from '../lib'
import { useState } from 'react'
import { z } from 'zod'
import { Save, UploadFile } from '@mui/icons-material'

const formSchema = z.object({
  name: z.string().optional(),
})

type FormSchema = z.infer<typeof formSchema>

export const Route = createFileRoute('/subscribe-button-example')({
  component: SubscribeButtonExample,
})

function SubscribeButtonExample() {
  const [value, setValue] = useState<FormSchema | null>(null)

  const form = useAppForm({
    defaultValues: {
      name: '',
    } as FormSchema,
    validators: {
      onChange: formSchema,
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      return new Promise<void>(resolve => {
        setTimeout(() => {
          setValue(value)
          resolve()
        }, 1500)
      })
    },
  })

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant='h4' gutterBottom>
        Subscribe Button Example
      </Typography>
      <Typography variant='body2' color='text.secondary' paragraph>
        Demonstrates the SubscribeButton component with various configurations.
        The button automatically disables during form submission and shows
        loading state.
      </Typography>

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
            {/* Form Fields */}
            <Typography variant='h6'>Form Fields</Typography>

            <form.AppField
              name='name'
              children={field => (
                <field.SubscribeTextField
                  label='Name'
                  placeholder='Enter your name'
                  fullWidth
                />
              )}
            />

            <Divider sx={{ my: 2 }} />

            {/* Button Examples */}
            <Typography variant='h6'>Button Variants</Typography>

            <Stack direction='row' spacing={2} flexWrap='wrap'>
              {/* Submit with loading indicator */}
              <form.SubscribeButton
                type='submit'
                variant='contained'
                showIndicator
              >
                Submit (with loading)
              </form.SubscribeButton>

              <form.SubscribeButton
                type='submit'
                variant='contained'
                showIndicator
                loadingPosition='start'
                startIcon={<Save />}
              >
                Submit (with loading)
              </form.SubscribeButton>

              <form.SubscribeButton
                ButtonComponent={CustomButton}
                type='submit'
                variant='contained'
                showIndicator
                loadingPosition='start'
                startIcon={<Save />}
                label='SubscribeButton (custom)'
              />

              <form.SubscribeButton
                ButtonComponent={CustomButton}
                type='submit'
                variant='contained'
                showIndicator
                loadingPosition='start'
              >
                SubscribeButton (custom children)
              </form.SubscribeButton>

              <Button
                component={CustomButton}
                variant='outlined'
                label='Button (custom)'
                loading={true}
                loadingPosition='start'
              />

              {/* Submit without loading indicator */}
              <form.SubscribeButton type='submit' variant='outlined'>
                Submit (no loading)
              </form.SubscribeButton>

              {/* Reset button */}
              <form.SubscribeButton
                type='button'
                variant='text'
                onClick={() => form.reset()}
              >
                Reset
              </form.SubscribeButton>

              {/* Secondary action button */}
              <form.SubscribeButton
                type='button'
                variant='contained'
                color='secondary'
                onClick={() => {
                  console.log('Secondary action clicked')
                }}
              >
                Secondary Action
              </form.SubscribeButton>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Display submitted value */}
            <Typography variant='h6'>Submitted Value</Typography>
            <Typography
              variant='body1'
              component='pre'
              sx={{
                backgroundColor: 'grey.100',
                p: 2,
                borderRadius: 1,
                overflow: 'auto',
              }}
            >
              {value ? JSON.stringify(value, null, 2) : 'No data submitted yet'}
            </Typography>
          </Stack>
        </form.AppForm>
      </Box>
    </Paper>
  )
}

type CustomButtonProps = ButtonProps & {
  label?: string
  something?: string
}

function CustomButton(props: CustomButtonProps) {
  const { children, label, variant, ...rest } = props

  return (
    <Button startIcon={<UploadFile />} {...rest}>
      {label ?? children}
    </Button>
  )
}
