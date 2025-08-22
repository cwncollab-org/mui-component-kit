import { Box } from '@mui/material'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/tabs-example/tab3')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Box>
      <ul>
        <li>
          <Link to='/tabs-example/tab3/list'>Tab 3 List</Link>
        </li>
        <li>
          <Link to='/tabs-example/tab3/$id' params={{ id: '123' }}>
            Tab 3 Item 123
          </Link>
        </li>
      </ul>
      <Outlet />
    </Box>
  )
}
