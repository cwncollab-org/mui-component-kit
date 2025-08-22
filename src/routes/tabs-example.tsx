import { Box } from '@mui/material'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { RouterTab, RouterTabs } from '../lib'

export const Route = createFileRoute('/tabs-example')({
  component: RouteComponent,
})

function RouteComponent() {
  const match = Route.useMatch()
  return (
    <Box>
      <RouterTabs match={match}>
        <RouterTab value='/tabs-example/tab1' label='Tab 1' />
        <RouterTab value='/tabs-example/tab2' label='Tab 2' />
        <RouterTab value='/tabs-example/tab3' label='Tab 3' />
      </RouterTabs>
      <Outlet />
    </Box>
  )
}
