import { Circle } from '@mui/icons-material'
import { Box } from '@mui/material'

type Props = {
  label: string
  error?: boolean
}

export function TabLabel({ label, error = false }: Props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {label}
      {error && <Circle sx={{ fontSize: 8, color: 'error.main' }} />}
    </Box>
  )
}
