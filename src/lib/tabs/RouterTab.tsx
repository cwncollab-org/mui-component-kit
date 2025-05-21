import { Tab, TabProps } from '@mui/material'
import { Link, ValidateToPath } from '@tanstack/react-router'

type Props = Omit<TabProps, 'value'> & {
  value: ValidateToPath
}

export function RouterTab({ label, value, ...props }: Props) {
  return (
    <Tab label={label} component={Link} to={value} value={value} {...props} />
  )
}
