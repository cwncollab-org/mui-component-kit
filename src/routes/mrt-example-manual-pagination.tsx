import { createFileRoute } from '@tanstack/react-router'
import { useMaterialRouterTable } from '../lib'
import {
  MaterialReactTable,
  type MRT_PaginationState,
  type MRT_SortingState,
} from 'material-react-table'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

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

const data = Array.from({ length: 1500 }, (_, i) => ({
  column1: `Row ${i + 1}`,
  column2: `Row ${i + 1}`,
  column3: `Row ${i + 1}`,
  column4: `Row ${i + 1}`,
}))

const fetchData = async (
  pagination: MRT_PaginationState,
  sorting: MRT_SortingState
) => {
  const { pageIndex, pageSize } = pagination
  await new Promise(resolve => setTimeout(resolve, 1000))

  const sortedData = [...data]
  if (sorting.length > 0) {
    const { id, desc } = sorting[0]
    sortedData.sort((a, b) => {
      if (desc) {
        return (b as any)[id].localeCompare((a as any)[id], undefined, {
          numeric: true,
        })
      }
      return (a as any)[id].localeCompare((b as any)[id], undefined, {
        numeric: true,
      })
    })
  }

  const start = pageIndex * pageSize
  const end = start + pageSize
  const pageData = sortedData.slice(start, end)

  return {
    data: pageData,
    meta: {
      totalRowCount: data.length,
    },
  }
}

function RouteComponent() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<MRT_SortingState>([])

  const {
    data: queryData,
    isError,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [
      'table-data',
      pagination.pageIndex,
      pagination.pageSize,
      sorting,
    ],
    queryFn: () => fetchData(pagination, sorting),
    placeholderData: keepPreviousData,
  })

  const opts = {
    columns: columns,
    data: queryData?.data ?? [],
    rowCount: queryData?.meta.totalRowCount ?? 0,
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    initialState: {
      columnVisibility: {
        column3: false,
        column4: false,
      },
    },
    state: {
      pagination,
      sorting,
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isFetching,
    },
  }

  const table = useMaterialRouterTable(opts)
  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  )
}

export const Route = createFileRoute('/mrt-example-manual-pagination')({
  component: RouteComponent,
})
