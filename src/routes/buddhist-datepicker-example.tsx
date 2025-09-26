import { createFileRoute } from '@tanstack/react-router'
import { Box, Paper, Stack, Typography, Divider } from '@mui/material'
import { AdapterDayjsWithBuddhistEra, useAppForm } from '../lib'
import { useState } from 'react'
import { z } from 'zod'

import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'

const formSchema = z.object({
  buddhistDate: z.date().optional(),
  buddhistBirthDate: z
    .date()
    .max(new Date(), 'Birth date cannot be in the future')
    .optional(),
  buddhistEventDate: z
    .date()
    .min(dayjs('1900-01-01').toDate(), 'Event date must be after 1900')
    .optional(),
  buddhistDayjsDate: z.custom<Dayjs>().optional(),
})

type FormValues = z.infer<typeof formSchema>

export const Route = createFileRoute('/buddhist-datepicker-example')({
  component: BuddhistDatePickerExample,
})

export function BuddhistDatePickerExample() {
  const [value, setValue] = useState<FormValues | undefined>(undefined)

  const form = useAppForm({
    defaultValues: {
      buddhistDate: undefined,
      buddhistBirthDate: undefined,
      buddhistEventDate: undefined,
      buddhistDayjsDate: undefined,
    } as Partial<FormValues>,
    validators: {
      onChange: formSchema,
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      console.log('Form submitted:', value)
      return new Promise(resolve => {
        setTimeout(() => {
          setValue(value as FormValues)
          resolve(true)
        }, 1000)
      })
    },
  })

  // Helper function to convert Gregorian year to Buddhist year
  const toBuddhistYear = (gregorianYear: number) => gregorianYear + 543

  // Display current date in both formats
  const today = dayjs()
  const currentBuddhistYear = toBuddhistYear(today.year())

  return (
    <LocalizationProvider dateAdapter={AdapterDayjsWithBuddhistEra}>
      <Paper sx={{ p: 3 }}>
        <Box mb={3}>
          <Typography variant='h4' gutterBottom>
            Buddhist Date Picker Example
          </Typography>
          <Typography variant='body1' color='text.secondary' paragraph>
            Buddhist calendar adds 543 years to the Gregorian calendar. For
            example, the year {today.year()} CE is {currentBuddhistYear} BE
            (Buddhist Era).
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Today: {today.format('DD/MM/YYYY')} CE ={' '}
            {today.format(`DD/MM/${currentBuddhistYear}`)} BE
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box
          component='form'
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <form.AppForm>
            <Stack spacing={4} alignItems='stretch'>
              <Box>
                <Typography variant='h6' gutterBottom>
                  Basic Buddhist Date Picker
                </Typography>
                <Typography variant='body2' color='text.secondary' paragraph>
                  A standard Buddhist date picker with different label
                  behaviors.
                </Typography>

                <Stack spacing={2}>
                  <form.AppField
                    name='buddhistDate'
                    children={field => (
                      <field.SubscribeDatePicker
                        label='Buddhist Date (Auto)'
                        labelBehavior='auto'
                        size='small'
                        fullWidth
                        valueFormat='Date'
                        format='DD/MM/YYYY'
                      />
                    )}
                  />

                  <form.AppField
                    name='buddhistDate'
                    children={field => (
                      <field.SubscribeDatePicker
                        label='Buddhist Date (Shrink)'
                        labelBehavior='shrink'
                        size='small'
                        fullWidth
                        valueFormat='Date'
                      />
                    )}
                  />

                  <form.AppField
                    name='buddhistDate'
                    children={field => (
                      <field.SubscribeDatePicker
                        label='Buddhist Date (Static)'
                        labelBehavior='static'
                        size='small'
                        fullWidth
                        valueFormat='Date'
                      />
                    )}
                  />
                </Stack>
              </Box>

              <Divider />

              <Box>
                <Typography variant='h6' gutterBottom>
                  Validated Buddhist Date Fields
                </Typography>
                <Typography variant='body2' color='text.secondary' paragraph>
                  Buddhist date pickers with validation rules.
                </Typography>

                <Stack spacing={2}>
                  <form.AppField
                    name='buddhistBirthDate'
                    children={field => (
                      <field.SubscribeDatePicker
                        label='Birth Date (Buddhist Era)'
                        labelBehavior='shrink'
                        size='small'
                        fullWidth
                        valueFormat='Date'
                        maxDate={dayjs()}
                      />
                    )}
                  />

                  <form.AppField
                    name='buddhistEventDate'
                    children={field => (
                      <field.SubscribeDatePicker
                        label='Historical Event Date (Buddhist Era)'
                        labelBehavior='shrink'
                        size='small'
                        fullWidth
                        valueFormat='Date'
                        minDate={dayjs('1900-01-01')}
                        maxDate={dayjs()}
                      />
                    )}
                  />
                </Stack>
              </Box>

              <Divider />

              <Box>
                <Typography variant='h6' gutterBottom>
                  DayJS Buddhist Date Picker
                </Typography>
                <Typography variant='body2' color='text.secondary' paragraph>
                  Buddhist date picker that works with DayJS objects.
                </Typography>

                <form.AppField
                  name='buddhistDayjsDate'
                  children={field => (
                    <field.SubscribeDatePicker
                      label='DayJS Buddhist Date'
                      labelBehavior='shrink'
                      size='small'
                      fullWidth
                    />
                  )}
                />
              </Box>

              <Divider />

              <Box>
                <Typography variant='h6' gutterBottom>
                  Required Buddhist Date
                </Typography>
                <Typography variant='body2' color='text.secondary' paragraph>
                  A required Buddhist date field for important dates.
                </Typography>

                <form.AppField
                  name='buddhistDate'
                  children={field => (
                    <field.SubscribeDatePicker
                      label='Important Buddhist Date'
                      labelBehavior='shrink'
                      size='small'
                      fullWidth
                      required
                      valueFormat='Date'
                    />
                  )}
                />
              </Box>

              <Stack direction='row' spacing={2} sx={{ mt: 3 }}>
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
                <Box>
                  <Typography variant='h6' gutterBottom>
                    Form Values (Debug)
                  </Typography>
                  <Box
                    component='pre'
                    sx={{
                      backgroundColor: 'grey.100',
                      p: 2,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      overflow: 'auto',
                    }}
                  >
                    {JSON.stringify(value, null, 2)}
                  </Box>
                </Box>
              )}
            </Stack>
          </form.AppForm>
        </Box>
      </Paper>
    </LocalizationProvider>
  )
}
