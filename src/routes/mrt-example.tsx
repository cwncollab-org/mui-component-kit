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
  {
    column1: 'Row 4',
    column2: 'Row 4',
    column3: 'Row 4',
    column4: 'Row 4',
  },
  {
    column1: 'Row 5',
    column2: 'Row 5',
    column3: 'Row 5',
    column4: 'Row 5',
  },
  {
    column1: 'Row 6',
    column2: 'Row 6',
    column3: 'Row 6',
    column4: 'Row 6',
  },
  {
    column1: 'Row 7',
    column2: 'Row 7',
    column3: 'Row 7',
    column4: 'Row 7',
  },
  {
    column1: 'Row 8',
    column2: 'Row 8',
    column3: 'Row 8',
    column4: 'Row 8',
  },
  {
    column1: 'Row 9',
    column2: 'Row 9',
    column3: 'Row 9',
    column4: 'Row 9',
  },
  {
    column1: 'Row 10',
    column2: 'Row 10',
    column3: 'Row 10',
    column4: 'Row 10',
  },
  {
    column1: 'Row 11',
    column2: 'Row 11',
    column3: 'Row 11',
    column4: 'Row 11',
  },
  {
    column1: 'Row 12',
    column2: 'Row 12',
    column3: 'Row 12',
    column4: 'Row 12',
  },
  {
    column1: 'Row 13',
    column2: 'Row 13',
    column3: 'Row 13',
    column4: 'Row 13',
  },
  {
    column1: 'Row 14',
    column2: 'Row 14',
    column3: 'Row 14',
    column4: 'Row 14',
  },
  {
    column1: 'Row 15',
    column2: 'Row 15',
    column3: 'Row 15',
    column4: 'Row 15',
  },
  {
    column1: 'Row 16',
    column2: 'Row 16',
    column3: 'Row 16',
    column4: 'Row 16',
  },
  {
    column1: 'Row 17',
    column2: 'Row 17',
    column3: 'Row 17',
    column4: 'Row 17',
  },
  {
    column1: 'Row 18',
    column2: 'Row 18',
    column3: 'Row 18',
    column4: 'Row 18',
  },
  {
    column1: 'Row 19',
    column2: 'Row 19',
    column3: 'Row 19',
    column4: 'Row 19',
  },
  {
    column1: 'Row 20',
    column2: 'Row 20',
    column3: 'Row 20',
    column4: 'Row 20',
  },
  {
    column1: 'Row 21',
    column2: 'Row 21',
    column3: 'Row 21',
    column4: 'Row 21',
  },
  {
    column1: 'Row 22',
    column2: 'Row 22',
    column3: 'Row 22',
    column4: 'Row 22',
  },
  {
    column1: 'Row 23',
    column2: 'Row 23',
    column3: 'Row 23',
    column4: 'Row 23',
  },
  {
    column1: 'Row 24',
    column2: 'Row 24',
    column3: 'Row 24',
    column4: 'Row 24',
  },
  {
    column1: 'Row 25',
    column2: 'Row 25',
    column3: 'Row 25',
    column4: 'Row 25',
  },
  {
    column1: 'Row 26',
    column2: 'Row 26',
    column3: 'Row 26',
    column4: 'Row 26',
  },
  {
    column1: 'Row 27',
    column2: 'Row 27',
    column3: 'Row 27',
    column4: 'Row 27',
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
    pagination: { pageIndex: 0, pageSize: 20 },
  },
}

function RouteComponent() {
  const table = useMaterialRouterTable(opts)
  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  )
}

export const Route = createFileRoute('/mrt-example')({
  component: RouteComponent,
})
