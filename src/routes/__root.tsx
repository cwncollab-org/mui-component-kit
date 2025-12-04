import { Box, Link, Stack } from '@mui/material'
import {
  createRootRoute,
  Outlet,
  Link as RouterLink,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Box>
      <Stack component='nav' direction='row' spacing={2}>
        <Link component={RouterLink} to='/'>
          Home
        </Link>
        <Link component={RouterLink} to='/dialogs-example'>
          Dialogs Example
        </Link>
        <Link component={RouterLink} to='/form-example'>
          Form Example
        </Link>
        <Link component={RouterLink} to='/select-example'>
          Select Example
        </Link>
        <Link component={RouterLink} to='/buddhist-datepicker-example'>
          Buddhist Date Picker Example
        </Link>
        <Link component={RouterLink} to='/masked-input-example'>
          Masked Input Example
        </Link>
        <Link component={RouterLink} to='/mrt-example'>
          Material Router Table Example
        </Link>
        <Link component={RouterLink} to='/tabs-example'>
          Tabs Example
        </Link>
        <Link component={RouterLink} to='/checkboxlist-example'>
          CheckboxList Example
        </Link>
      </Stack>

      <Outlet />
      <TanStackRouterDevtools />
    </Box>
  )
}
