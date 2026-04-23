import { createFileRoute } from '@tanstack/react-router'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { Autocomplete } from '../lib'

type Option = { value: string; label: string }

const roles: Option[] = [
  { value: 'admin', label: 'Administrator' },
  { value: 'user', label: 'User' },
  { value: 'guest', label: 'Guest' },
]

const frameworks: Option[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
]

export const Route = createFileRoute('/autocomplete-example')({
  component: AutocompleteExample,
})

function AutocompleteExample() {
  const [minimalValue, setMinimalValue] = useState<Option | null>(null)
  const [propsValue, setPropsValue] = useState<Option | null>(roles[1])
  const [slotValue, setSlotValue] = useState<Option[]>([frameworks[0]])

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h5' gutterBottom>
        Autocomplete Example
      </Typography>

      <Stack spacing={4} sx={{ py: 2 }}>
        <Box>
          <Typography variant='h6' gutterBottom>
            Minimal
          </Typography>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            Only required props: options, value, onChange, getOptionLabel.
          </Typography>
          <Autocomplete
            options={roles}
            value={minimalValue}
            getOptionLabel={option => option.label}
            getOptionValue={option => option.value}
            onChange={(_, v) => setMinimalValue(v)}
          />
          <Typography variant='caption'>
            value: {minimalValue ? minimalValue.label : '(none)'}
          </Typography>
        </Box>

        <Box>
          <Typography variant='h6' gutterBottom>
            With Props
          </Typography>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            label, helperText, placeholder, required, size, fullWidth,
            labelBehavior, error.
          </Typography>
          <Autocomplete
            options={roles}
            value={propsValue}
            getOptionLabel={option => option.label}
            getOptionValue={option => option.value}
            onChange={(_, v) => setPropsValue(v)}
            label='Role'
            labelBehavior='shrink'
            placeholder='Select a role'
            helperText='Pick the role for this user'
            required
            size='small'
            fullWidth
            error={!propsValue}
          />
          <Typography variant='caption'>
            value: {propsValue ? propsValue.label : '(none)'}
          </Typography>
        </Box>

        <Box>
          <Typography variant='h6' gutterBottom>
            With slotProps (multiple)
          </Typography>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            slotProps.autocomplete (sx, disableCloseOnSelect via override),
            slotProps.textField (variant, color), slotProps.helperText.
          </Typography>
          <Autocomplete
            multiple
            options={frameworks}
            value={slotValue}
            getOptionLabel={option => option.label}
            getOptionValue={option => option.value}
            onChange={(_, v) => setSlotValue(v)}
            label='Frameworks'
            labelBehavior='static'
            helperText='Select one or more frameworks'
            fullWidth
            slotProps={{
              autocomplete: {
                sx: { backgroundColor: 'action.hover', borderRadius: 1 },
              },
              textField: {
                variant: 'filled',
                color: 'secondary',
              },
              helperText: {
                sx: { fontStyle: 'italic', color: 'secondary.main' },
              },
            }}
          />
          <Typography variant='caption'>
            value: {slotValue.map(v => v.label).join(', ') || '(none)'}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  )
}
