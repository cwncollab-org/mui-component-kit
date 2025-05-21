import { createFileRoute } from '@tanstack/react-router'
import { useMaterialRouterTable } from '../lib'
import { MaterialReactTable } from 'material-react-table'

const columns = [
  {
    header: 'Column 1',
    accessorKey: 'column1',
  },
  {
    header: 'Column 2',
    accessorKey: 'column2',
  },
  {
    header: 'Column 3',
    accessorKey: 'column3',
  },
  {
    header: 'Column 4',
    accessorKey: 'column4',
  },
]

const data = [
  {
    column1: 'Row 1',
    column2: 'Row 1',
    column3: 'Row 1',
    column4: 'Row 1',
  },
  {
    column1: 'Row 2',
    column2: 'Row 2',
    column3: 'Row 2',
    column4: 'Row 2',
  },
  {
    column1: 'Row 3',
    column2: 'Row 3',
    column3: 'Row 3',
    column4: 'Row 3',
  },
]

const opts = {
  columns: columns,
  data: data,
  initialState: {
    columnVisibility: {
      column3: false,
      column4: false,
    },
  },
}

function RouteComponent() {
  const table = useMaterialRouterTable(Route.fullPath, opts)
  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  )
}

export const Route = createFileRoute('/mrt-example')({
  component: RouteComponent,
})
