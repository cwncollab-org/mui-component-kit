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
import { IMask, IMaskInput } from 'react-imask'

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
  const [customDefinitionValue, setCustomDefinitionValue] = useState('')
  const [blockValue, setBlockValue] = useState('')
  const [serialNumberValue, setSerialNumberValue] = useState('')
  const [imaskDirectValue, setImaskDirectValue] = useState('')

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 2 }}>
      <Box>
        <Typography variant='h4' gutterBottom>
          MaskedInput Examples
        </Typography>
        <Typography variant='body1' color='text.secondary' paragraph>
          Demonstration of various input masks using the MaskedInput component,
          including basic masks, custom definitions, and block-based patterns.
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

        <FormControl>
          <FormLabel>Product Code (Custom Definitions)</FormLabel>
          <MaskedInput
            mask='AA-####-**'
            value={customDefinitionValue}
            onChange={setCustomDefinitionValue}
            definitions={{
              A: /[A-Z]/,
              '#': /[1-9]/,
              '*': /[A-Z0-9]/,
            }}
          />
          <Typography variant='caption' color='text.secondary'>
            Format: AA-####-** (A=uppercase letter, #=digit 1-9, *=alphanumeric)
          </Typography>
        </FormControl>

        <FormControl>
          <FormLabel>Date (Blocks)</FormLabel>
          <MaskedInput
            mask={Date}
            pattern='d{/}`m{/}`Y - d{/}`m{/}`Y*'
            value={blockValue}
            onChange={value => setBlockValue(value)}
            blocks={{
              d: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 31,
                maxLength: 2,
              },
              m: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 12,
                maxLength: 2,
              },
              Y: {
                mask: IMask.MaskedRange,
                from: 1900,
                to: 9999,
                maxLength: 4,
              },
            }}
            //placeholder='DD/MM/YYYY - DD/MM/YYYY'
          />
          <Typography variant='caption' color='text.secondary'>
            Format: DD/MM/YYYY - DD/MM/YYYY
          </Typography>
        </FormControl>

        <FormControl>
          <FormLabel>Serial Number (Mixed Definitions)</FormLabel>
          <MaskedInput
            mask='SN-LLLNNN-CCC'
            value={serialNumberValue}
            onChange={setSerialNumberValue}
            definitions={{
              L: /[A-Z]/,
              N: /[0-9]/,
              C: /[A-Z0-9]/,
            }}
          />
          <Typography variant='caption' color='text.secondary'>
            Format: SN-LLLNNN-CCC (L=letter, N=number, C=alphanumeric)
          </Typography>
        </FormControl>

        <FormControl>
          <FormLabel>Direct IMask Component (Date Range)</FormLabel>
          <IMaskInput
            mask={Date}
            pattern='d{/}`m{/}`Y - d{/}`m{/}`Y*'
            value={imaskDirectValue}
            onAccept={value => setImaskDirectValue(value)}
            blocks={{
              d: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 31,
                maxLength: 2,
              },
              m: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 12,
                maxLength: 2,
              },
              Y: {
                mask: IMask.MaskedRange,
                from: 1900,
                to: 9999,
                maxLength: 4,
              },
            }}
            placeholder='DD/MM/YYYY - DD/MM/YYYY'
          />
          <Typography variant='caption' color='text.secondary'>
            Direct IMask component with blocks rendering HTML input element
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
            <Typography variant='body2'>
              <strong>Product Code:</strong>{' '}
              {customDefinitionValue || 'Not entered'}
            </Typography>
            <Typography variant='body2'>
              <strong>Date Range:</strong> {blockValue || 'Not entered'}
            </Typography>
            <Typography variant='body2'>
              <strong>Serial Number:</strong>{' '}
              {serialNumberValue || 'Not entered'}
            </Typography>
            <Typography variant='body2'>
              <strong>Direct IMask:</strong> {imaskDirectValue || 'Not entered'}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  )
}
