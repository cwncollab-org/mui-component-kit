import { createFileRoute } from '@tanstack/react-router'
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { DatePicker, useAppForm } from '../lib'
import { useState } from 'react'
import { z } from 'zod'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const formSchema = z.object({
  startDate: z.date({ message: 'Start date is required' }),
  endDate: z.date().optional(),
})

type FormValues = z.infer<typeof formSchema>

export const Route = createFileRoute('/datepicker-example')({
  component: DatePickerExample,
})

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  )
}

export function DatePickerExample() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null)

  const form = useAppForm({
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
    } as Partial<FormValues>,
    validators: { onChange: formSchema, onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      setSubmitted(value as FormValues)
    },
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper sx={{ p: 3, maxWidth: 800 }}>
        <Typography variant='h4' gutterBottom>
          DatePicker Example
        </Typography>

        <Stack spacing={4}>
          {/* ── Minimal ─────────────────────────────────────────── */}
          <Section title='Minimal'>
            <DatePicker label='Pick a date' />
          </Section>

          <Divider />

          {/* ── Size ─────────────────────────────────────────────── */}
          <Section title='Size'>
            <Stack direction='row' spacing={2} sx={{ flexWrap: 'wrap' }}>
              <DatePicker label='Small' size='small' />
              <DatePicker label='Medium (default)' size='medium' />
            </Stack>
          </Section>

          <Divider />

          {/* ── fullWidth ─────────────────────────────────────────── */}
          <Section title='Full Width'>
            <DatePicker label='Full width' fullWidth />
          </Section>

          <Divider />

          {/* ── required ─────────────────────────────────────────── */}
          <Section title='Required'>
            <DatePicker label='Required field' required />
          </Section>

          <Divider />

          {/* ── error + helperText ────────────────────────────────── */}
          <Section title='Error & Helper Text'>
            <Stack direction='row' spacing={2} sx={{ flexWrap: 'wrap' }}>
              <DatePicker
                label='With helper text'
                helperText='Pick any future date'
              />
              <DatePicker
                label='Error state'
                error
                helperText='Date is required'
              />
            </Stack>
          </Section>

          <Divider />

          {/* ── labelBehavior ─────────────────────────────────────── */}
          <Section title='Label Behavior'>
            <Stack direction='row' spacing={2} sx={{ flexWrap: 'wrap' }}>
              <DatePicker label='Auto (default)' labelBehavior='auto' />
              <DatePicker label='Shrink' labelBehavior='shrink' />
              <DatePicker label='Static' labelBehavior='static' />
            </Stack>
          </Section>

          <Divider />

          {/* ── disabled ─────────────────────────────────────────── */}
          <Section title='Disabled'>
            <DatePicker label='Disabled' disabled />
          </Section>

          <Divider />

          {/* ── readOnly ─────────────────────────────────────────── */}
          <Section title='Read Only'>
            <DatePicker label='Read only' readOnly />
          </Section>

          <Divider />

          {/* ── slotProps ─────────────────────────────────────────── */}
          <Section title='slotProps'>
            <Stack spacing={2}>
              {/* slotProps.textField — pass arbitrary TextField props */}
              <DatePicker
                label='Custom size + helper via slotProps.textField'
                slotProps={{
                  textField: {
                    size: 'small',
                    helperText: 'Set via slotProps.textField.helperText',
                  },
                }}
              />

              {/* slotProps.textField.slotProps.inputLabel — label styling */}
              <DatePicker
                label='Bold label via slotProps.textField.slotProps.inputLabel'
                slotProps={{
                  textField: {
                    slotProps: {
                      inputLabel: { sx: { fontWeight: 'bold' } },
                    },
                  },
                }}
              />

              {/* slotProps.textField.slotProps.input — input adornment / styling */}
              <DatePicker
                label='Red border via slotProps.textField.slotProps.input'
                slotProps={{
                  textField: {
                    slotProps: {
                      input: { sx: { '& fieldset': { borderColor: 'red' } } },
                    },
                  },
                }}
              />

              {/* slotProps.textField.slotProps.formHelperText — helper text styling */}
              <DatePicker
                label='Styled helper text'
                helperText='Styled via slotProps.textField.slotProps.formHelperText'
                slotProps={{
                  textField: {
                    slotProps: {
                      formHelperText: { sx: { color: 'purple' } },
                    },
                  },
                }}
              />

              {/* slotProps.day — custom day rendering */}
              <DatePicker
                label='Highlighted weekends (slotProps.day)'
                slotProps={{
                  day: ownerState => ({
                    sx:
                      ownerState.day.day() === 0 || ownerState.day.day() === 6
                        ? { color: 'error.main', fontWeight: 'bold' }
                        : {},
                  }),
                }}
              />
            </Stack>
          </Section>

          <Divider />

          {/* ── Form integration ─────────────────────────────────── */}
          <Section title='Form Integration'>
            <form
              onSubmit={e => {
                e.preventDefault()
                form.handleSubmit()
              }}
            >
              <Stack spacing={2} sx={{ maxWidth: 400 }}>
                <form.AppField name='startDate'>
                  {field => (
                    <field.DatePicker
                      label='Start Date'
                      required
                      fullWidth
                      valueFormat='Date'
                    />
                  )}
                </form.AppField>
                <form.AppField name='endDate'>
                  {field => (
                    <field.DatePicker
                      label='End Date (optional)'
                      fullWidth
                      valueFormat='Date'
                      helperText='End date must be after start date'
                    />
                  )}
                </form.AppField>
                <Button type='submit' variant='contained'>
                  Submit
                </Button>
              </Stack>
            </form>

            {submitted && (
              <Box sx={{ mt: 2 }}>
                <Typography variant='subtitle2'>Submitted values:</Typography>
                <pre style={{ fontSize: 12 }}>
                  {JSON.stringify(
                    {
                      startDate: submitted.startDate?.toISOString(),
                      endDate: submitted.endDate?.toISOString() ?? null,
                    },
                    null,
                    2
                  )}
                </pre>
              </Box>
            )}
          </Section>
        </Stack>
      </Paper>
    </LocalizationProvider>
  )
}
