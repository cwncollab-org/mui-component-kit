import { createFileRoute } from '@tanstack/react-router'
import { useAppForm, MaskedTextField } from '../lib'
import { Paper, Box, Stack, Typography, Divider, Button } from '@mui/material'
import { z } from 'zod'
import { useState } from 'react'

export const Route = createFileRoute('/maskedtextfield-example')({
  component: MaskedTextFieldExample,
})

const formSchema = z.object({
  // Label behavior examples
  labelAuto: z.string().min(1, 'This field is required'),
  labelShrink: z.string().optional(),
  labelStatic: z.string().optional(),

  // Basic masks
  phone: z.string().min(14, 'Please enter a valid phone number'),
  ssn: z.string().min(11, 'Please enter a valid SSN'),
  zipCode: z.string().optional(),

  // Trigger behavior examples
  phoneAccept: z.string().optional(),
  phoneComplete: z.string().optional(),

  // Block-based masks
  dateOfBirth: z.string().optional(),
  creditCard: z.string().optional(),

  // Custom definitions
  productCode: z.string().optional(),
  serialNumber: z.string().optional(),

  // Width variants
  fullWidthField: z.string().optional(),
  normalWidthField: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

function MaskedTextFieldExample() {
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(
    null
  )
  const [standalonePhone, setStandalonePhone] = useState('')
  const [standaloneCreditCard, setStandaloneCreditCard] = useState('')

  const form = useAppForm({
    defaultValues: {
      labelAuto: '',
      labelShrink: '',
      labelStatic: '',
      phone: '',
      ssn: '',
      zipCode: '',
      phoneAccept: '',
      phoneComplete: '',
      dateOfBirth: '',
      creditCard: '',
      productCode: '',
      serialNumber: '',
      fullWidthField: '',
      normalWidthField: '',
    } as FormValues,
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmittedValues(value)
    },
  })

  return (
    <Paper sx={{ p: 2 }}>
      <Box>
        <Typography variant='h5' gutterBottom>
          MaskedTextField Component Examples
        </Typography>
        <Typography variant='body2' color='text.secondary' paragraph>
          Demonstrates the MaskedTextField component with form integration,
          various mask patterns, and TextField behaviors.
        </Typography>
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
            {/* Label Behavior Section */}
            <Box>
              <Typography variant='h6' gutterBottom>
                Label Behaviors
              </Typography>
              <Typography variant='body2' color='text.secondary' paragraph>
                Different labelBehavior props affect how the label is displayed.
              </Typography>
              <Stack spacing={2}>
                <form.AppField
                  name='labelAuto'
                  children={field => (
                    <field.SubscribeMaskedTextField
                      mask='(000) 000-0000'
                      label='Auto Label (default)'
                      labelBehavior='auto'
                      placeholder='Enter phone number'
                      helperText='Label shrinks when focused or has value'
                      fullWidth
                    />
                  )}
                />

                <form.AppField
                  name='labelShrink'
                  children={field => (
                    <field.SubscribeMaskedTextField
                      mask='(000) 000-0000'
                      label='Shrink Label'
                      labelBehavior='shrink'
                      placeholder='Enter phone number'
                      helperText='Label always stays shrunk'
                      fullWidth
                    />
                  )}
                />

                <form.AppField
                  name='labelStatic'
                  children={field => (
                    <field.SubscribeMaskedTextField
                      mask='(000) 000-0000'
                      label='Static Label'
                      labelBehavior='static'
                      helperText='Label stays in place (no shrinking)'
                      fullWidth
                    />
                  )}
                />
              </Stack>
            </Box>

            <Divider />

            {/* Basic Masks Section */}
            <Box>
              <Typography variant='h6' gutterBottom>
                Basic Pattern Masks
              </Typography>
              <Typography variant='body2' color='text.secondary' paragraph>
                Common mask patterns using string templates with 0 (digit)
                placeholder.
              </Typography>
              <Stack spacing={2}>
                <form.AppField
                  name='phone'
                  children={field => (
                    <field.SubscribeMaskedTextField
                      mask='(000) 000-0000'
                      label='Phone Number'
                      placeholder='(555) 123-4567'
                      helperText='Format: (000) 000-0000'
                      required
                      fullWidth
                    />
                  )}
                />

                <form.AppField
                  name='ssn'
                  children={field => (
                    <field.SubscribeMaskedTextField
                      mask='000-00-0000'
                      label='Social Security Number'
                      placeholder='123-45-6789'
                      helperText='Format: 000-00-0000'
                      required
                      fullWidth
                    />
                  )}
                />

                <form.AppField
                  name='zipCode'
                  children={field => (
                    <field.SubscribeMaskedTextField
                      mask='00000-0000'
                      label='ZIP Code'
                      placeholder='12345-6789'
                      helperText='Format: 00000-0000 (optional)'
                      fullWidth
                    />
                  )}
                />
              </Stack>
            </Box>

            <Divider />

            {/* Trigger Behavior Section */}
            <Box>
              <Typography variant='h6' gutterBottom>
                Change Trigger Behaviors
              </Typography>
              <Typography variant='body2' color='text.secondary' paragraph>
                Control when onChange fires: on accept (default) or only when
                mask is complete.
              </Typography>
              <Stack spacing={2}>
                <form.AppField
                  name='phoneAccept'
                  children={field => (
                    <field.SubscribeMaskedTextField
                      mask='(000) 000-0000'
                      label='Trigger on Accept (default)'
                      placeholder='Type to see onChange fire'
                      helperText={`Value updates as you type: "${field.state.value}"`}
                      triggerChangeOnAccept={true}
                      triggerChangeOnComplete={false}
                      fullWidth
                    />
                  )}
                />

                <form.AppField
                  name='phoneComplete'
                  children={field => (
                    <field.SubscribeMaskedTextField
                      mask='(000) 000-0000'
                      label='Trigger on Complete'
                      placeholder='Complete the mask to see value'
                      helperText={`Value only updates when complete: "${field.state.value}"`}
                      triggerChangeOnAccept={false}
                      triggerChangeOnComplete={true}
                      fullWidth
                    />
                  )}
                />
              </Stack>
            </Box>

            <Divider />

            {/* Block-based Masks Section */}
            <Box>
              <Typography variant='h6' gutterBottom>
                Block-based Masks
              </Typography>
              <Typography variant='body2' color='text.secondary' paragraph>
                More complex masks using blocks for dates and numbers with
                ranges.
              </Typography>
              <Stack spacing={2}>
                <form.AppField
                  name='dateOfBirth'
                  children={field => (
                    <field.SubscribeMaskedTextField
                      mask={Date}
                      blocks={{
                        d: { mask: '00', from: 1, to: 31 },
                        m: { mask: '00', from: 1, to: 12 },
                        Y: { mask: '0000', from: 1900, to: 2099 },
                      }}
                      pattern='m/d/Y'
                      label='Date of Birth'
                      placeholder='MM/DD/YYYY'
                      helperText='Validates day (1-31), month (1-12), year (1900-2099)'
                      fullWidth
                    />
                  )}
                />

                <form.AppField
                  name='creditCard'
                  children={field => (
                    <field.SubscribeMaskedTextField
                      mask='0000 0000 0000 0000'
                      label='Credit Card Number'
                      placeholder='1234 5678 9012 3456'
                      helperText='Format: 0000 0000 0000 0000'
                      fullWidth
                    />
                  )}
                />
              </Stack>
            </Box>

            <Divider />

            {/* Custom Definitions Section */}
            <Box>
              <Typography variant='h6' gutterBottom>
                Custom Character Definitions
              </Typography>
              <Typography variant='body2' color='text.secondary' paragraph>
                Define custom placeholder characters for specific patterns.
              </Typography>
              <Stack spacing={2}>
                <form.AppField
                  name='productCode'
                  children={field => (
                    <field.SubscribeMaskedTextField
                      mask='AA-####-**'
                      definitions={{
                        A: /[A-Z]/,
                        '#': /[0-9]/,
                        '*': /[A-Z0-9]/,
                      }}
                      label='Product Code'
                      placeholder='AB-1234-XY'
                      helperText='A=uppercase letter, #=digit, *=letter or digit'
                      fullWidth
                    />
                  )}
                />

                <form.AppField
                  name='serialNumber'
                  children={field => (
                    <field.SubscribeMaskedTextField
                      mask='SN-LLLNNN-CCC'
                      definitions={{
                        L: /[A-Z]/,
                        N: /[0-9]/,
                        C: /[A-Z0-9]/,
                      }}
                      label='Serial Number'
                      placeholder='SN-ABC123-XYZ'
                      helperText='Prefix "SN-" + 3 letters + 3 digits + 3 alphanumeric'
                      fullWidth
                    />
                  )}
                />
              </Stack>
            </Box>

            <Divider />

            {/* Width Variants Section */}
            <Box>
              <Typography variant='h6' gutterBottom>
                Width Variants
              </Typography>
              <Typography variant='body2' color='text.secondary' paragraph>
                TextField can be full-width or normal width (default).
              </Typography>
              <Stack spacing={2}>
                <form.AppField
                  name='fullWidthField'
                  children={field => (
                    <field.SubscribeMaskedTextField
                      mask='00:00'
                      label='Full Width Time Field'
                      placeholder='HH:MM'
                      helperText='fullWidth={true}'
                      fullWidth
                    />
                  )}
                />

                <form.AppField
                  name='normalWidthField'
                  children={field => (
                    <field.SubscribeMaskedTextField
                      mask='00:00'
                      label='Normal Width Time Field'
                      placeholder='HH:MM'
                      helperText='fullWidth={false} - takes only needed space'
                      fullWidth={false}
                    />
                  )}
                />
              </Stack>
            </Box>

            <Divider />

            {/* Form Actions */}
            <Stack direction='row' spacing={2}>
              <form.Subscribe
                selector={state => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type='submit'
                    variant='contained'
                    disabled={!canSubmit}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                )}
              </form.Subscribe>

              <Button
                type='button'
                variant='outlined'
                onClick={() => {
                  form.reset()
                  setSubmittedValues(null)
                }}
              >
                Reset
              </Button>
            </Stack>

            {/* Submitted Values Display */}
            {submittedValues && (
              <Box sx={{ mt: 2 }}>
                <Typography variant='h6' gutterBottom>
                  Submitted Values:
                </Typography>
                <Paper variant='outlined' sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <pre style={{ margin: 0, fontSize: '0.875rem' }}>
                    {JSON.stringify(submittedValues, null, 2)}
                  </pre>
                </Paper>
              </Box>
            )}
          </Stack>
        </form.AppForm>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Standalone Examples Section */}
      <Box>
        <Typography variant='h5' gutterBottom>
          Standalone Examples (Non-Form)
        </Typography>
        <Typography variant='body2' color='text.secondary' paragraph>
          Using MaskedTextFieldBase without form integration for controlled
          inputs.
        </Typography>

        <Stack spacing={3} sx={{ mt: 2 }}>
          <Box>
            <MaskedTextField
              mask='(000) 000-0000'
              label='Standalone Phone Number'
              placeholder='(555) 123-4567'
              helperText={`Current value: "${standalonePhone}"`}
              value={standalonePhone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStandalonePhone(e.target.value)
              }
              fullWidth
            />
          </Box>

          <Box>
            <MaskedTextField
              mask='0000 0000 0000 0000'
              label='Standalone Credit Card'
              placeholder='1234 5678 9012 3456'
              helperText={`Current value: "${standaloneCreditCard}"`}
              value={standaloneCreditCard}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStandaloneCreditCard(e.target.value)
              }
              fullWidth
            />
          </Box>

          <Paper variant='outlined' sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Typography variant='subtitle2' gutterBottom>
              Standalone Values:
            </Typography>
            <pre style={{ margin: 0, fontSize: '0.875rem' }}>
              {JSON.stringify(
                { standalonePhone, standaloneCreditCard },
                null,
                2
              )}
            </pre>
          </Paper>
        </Stack>
      </Box>
    </Paper>
  )
}
