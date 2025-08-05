import { createFileRoute } from '@tanstack/react-router'
import {
  Box,
  Paper,
  Stack,
  Typography,
  FormControl,
  FormLabel,
} from '@mui/material'
import { useState } from 'react'
import { MaskedInput } from '../lib'

export const Route = createFileRoute('/masked-input-example')({
  component: MaskedInputExample,
})

export function MaskedInputExample() {
  const [phoneValue, setPhoneValue] = useState('')
  const [ssnValue, setSsnValue] = useState('')
  const [creditCardValue, setCreditCardValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [timeValue, setTimeValue] = useState('')
  const [zipCodeValue, setZipCodeValue] = useState('')

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 2 }}>
      <Box>
        <Typography variant='h4' gutterBottom>
          MaskedInput Examples
        </Typography>
        <Typography variant='body1' color='text.secondary' paragraph>
          Demonstration of various input masks using the MaskedInput component.
        </Typography>
      </Box>

      <Stack spacing={3} sx={{ mt: 3 }}>
        <FormControl>
          <FormLabel>Phone Number</FormLabel>
          <MaskedInput
            mask='(000) 000-0000'
            value={phoneValue}
            onChange={setPhoneValue}
          />
          <Typography variant='caption' color='text.secondary'>
            Format: (123) 456-7890
          </Typography>
        </FormControl>

        <FormControl>
          <FormLabel>Social Security Number</FormLabel>
          <MaskedInput
            mask='000-00-0000'
            value={ssnValue}
            onChange={setSsnValue}
          />
          <Typography variant='caption' color='text.secondary'>
            Format: 123-45-6789
          </Typography>
        </FormControl>

        <FormControl>
          <FormLabel>Credit Card Number</FormLabel>
          <MaskedInput
            mask='0000 0000 0000 0000'
            value={creditCardValue}
            onChange={setCreditCardValue}
          />
          <Typography variant='caption' color='text.secondary'>
            Format: 1234 5678 9012 3456
          </Typography>
        </FormControl>

        <FormControl>
          <FormLabel>Date</FormLabel>
          <MaskedInput
            mask='00/00/0000'
            value={dateValue}
            onChange={setDateValue}
          />
          <Typography variant='caption' color='text.secondary'>
            Format: MM/DD/YYYY
          </Typography>
        </FormControl>

        <FormControl>
          <FormLabel>Time</FormLabel>
          <MaskedInput mask='00:00' value={timeValue} onChange={setTimeValue} />
          <Typography variant='caption' color='text.secondary'>
            Format: HH:MM
          </Typography>
        </FormControl>

        <FormControl>
          <FormLabel>ZIP Code</FormLabel>
          <MaskedInput
            mask='00000-0000'
            value={zipCodeValue}
            onChange={setZipCodeValue}
          />
          <Typography variant='caption' color='text.secondary'>
            Format: 12345-6789
          </Typography>
        </FormControl>

        <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant='h6' gutterBottom>
            Current Values:
          </Typography>
          <Stack spacing={1}>
            <Typography variant='body2'>
              <strong>Phone:</strong> {phoneValue || 'Not entered'}
            </Typography>
            <Typography variant='body2'>
              <strong>SSN:</strong> {ssnValue || 'Not entered'}
            </Typography>
            <Typography variant='body2'>
              <strong>Credit Card:</strong> {creditCardValue || 'Not entered'}
            </Typography>
            <Typography variant='body2'>
              <strong>Date:</strong> {dateValue || 'Not entered'}
            </Typography>
            <Typography variant='body2'>
              <strong>Time:</strong> {timeValue || 'Not entered'}
            </Typography>
            <Typography variant='body2'>
              <strong>ZIP Code:</strong> {zipCodeValue || 'Not entered'}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  )
}
