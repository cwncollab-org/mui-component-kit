import { createFileRoute } from '@tanstack/react-router'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { useAppForm } from '../lib'
import { useState, useEffect } from 'react'
import { z } from 'zod'

const formSchema = z.object({
  interests: z.array(z.string()).min(1, 'Please select at least one interest'),
  asyncInterests: z
    .array(z.string())
    .min(1, 'Please select at least one async interest'),
})

type FormValues = z.infer<typeof formSchema>

export const Route = createFileRoute('/checkboxlist-example')({
  component: CheckboxListExample,
})

const interests = [
  { value: 'coding', label: 'Coding', description: 'Writing code' },
  { value: 'music', label: 'Music', description: 'Listening to music' },
  { value: 'reading', label: 'Reading', description: 'Reading books' },
  {
    value: 'traveling',
    label: 'Traveling',
    description: 'Visiting new places',
  },
  { value: 'gaming', label: 'Gaming', description: 'Playing video games' },
]

export function CheckboxListExample() {
  const [value, setValue] = useState<FormValues | undefined>(undefined)
  const [asyncOptions, setAsyncOptions] = useState<
    { value: string; label: string; description?: string }[]
  >([])
  const [isLoadingAsyncOptions, setIsLoadingAsyncOptions] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAsyncOptions([
        {
          value: 'react',
          label: 'React',
          description: 'A JavaScript library for building user interfaces',
        },
        {
          value: 'vue',
          label: 'Vue',
          description: 'The Progressive JavaScript Framework',
        },
        {
          value: 'angular',
          label: 'Angular',
          description: "The modern web developer's platform",
        },
        {
          value: 'svelte',
          label: 'Svelte',
          description: 'Cybernetically enhanced web apps',
        },
      ])
      setIsLoadingAsyncOptions(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const form = useAppForm({
    defaultValues: {
      interests: [],
      asyncInterests: [],
    } as FormValues,
    validators: {
      onChange: formSchema,
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      return new Promise(resolve => {
        setTimeout(() => {
          setValue(value as FormValues)
          resolve(true)
        }, 1000)
      })
    },
  })

  return (
    <Paper sx={{ p: 2 }}>
      <Box>
        <Typography variant='h5' gutterBottom>
          CheckboxList Example
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
          <Stack spacing={2}>
            <form.AppField
              name='interests'
              children={field => (
                <field.SubscribeCheckboxList
                  fullWidth
                  label='Select your interests'
                  options={interests}
                />
              )}
            />

            <form.AppField
              name='asyncInterests'
              children={field => (
                <field.SubscribeCheckboxList
                  label='Select your favorite frameworks (Async)'
                  options={asyncOptions}
                  isLoading={isLoadingAsyncOptions}
                />
              )}
            />

            <form.SubscribeButton type='submit' variant='contained'>
              Submit
            </form.SubscribeButton>

            <Typography variant='body1'>
              Submitted Value: {JSON.stringify(value)}
            </Typography>
          </Stack>
        </form.AppForm>
      </Box>
    </Paper>
  )
}
