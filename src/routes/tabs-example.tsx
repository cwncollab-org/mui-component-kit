import { Box, Tabs } from '@mui/material'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { RouterTab, useRouterTabsValue } from '../lib'
export const Route = createFileRoute('/tabs-example')({
  component: RouteComponent,
})

function RouteComponent() {
  const value = useRouterTabsValue()
  return (
    <Box>
      <Tabs value={value}>
        <RouterTab value='/tabs-example/tab1' label='Tab 1' />
        <RouterTab value='/tabs-example/tab2' label='Tab 2' />
      </Tabs>
      <Outlet />
    </Box>
  )
}
