import { useEffect, useMemo, useState } from 'react'
import {
  useNavigate,
  useSearch,
  ValidateFromPath,
} from '@tanstack/react-router'
import { z } from 'zod'
import {
  MRT_DensityState,
  MRT_PaginationState,
  MRT_RowData,
  MRT_SortingState,
  MRT_VisibilityState,
  useMaterialReactTable,
  type MRT_TableOptions,
} from 'material-react-table'

const defaultPageSize = 10
const defaultDensity = 'compact'
const searchColumnsSeparator = '-'

export const tableSearchSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
  order: z.string().optional(),
  desc: z.boolean().optional(),
  density: z.enum(['compact', 'spacious', 'comfortable']).optional(),
  columns: z
    .string()
    .transform(val => val.split(searchColumnsSeparator))
    .optional(),
})

export type TableSearch = z.infer<typeof tableSearchSchema>

export function useMaterialRouterTable<TData extends MRT_RowData>(
  path: ValidateFromPath,
  opts: MRT_TableOptions<TData>
) {
  const {
    onPaginationChange,
    onSortingChange,
    onDensityChange,
    onColumnVisibilityChange,
    state,
    ...rest
  } = opts

  const initialState = opts.initialState
  const search = tableSearchSchema.parse(useSearch({ strict: false }))
  const navigate = useNavigate({ from: path })

  const initialPaginationState: MRT_PaginationState = {
    pageIndex: initialState?.pagination?.pageIndex ?? 0,
    pageSize: initialState?.pagination?.pageSize ?? defaultPageSize,
  }

  const initialSortingState: MRT_SortingState = initialState?.sorting ?? []

  const initialDensityState: MRT_DensityState =
    initialState?.density ?? defaultDensity

  const initialColumnVisibilityState = initialState?.columnVisibility ?? {}
  const initialVisibleColumns = useMemo(
    () =>
      opts.columns
        .map<string | undefined>(column => column.accessorKey)
        .filter(column => column !== undefined)
        .filter(
          column =>
            initialColumnVisibilityState[column] === undefined ||
            initialColumnVisibilityState[column] === true
        )
        .join(searchColumnsSeparator),
    [opts.columns, initialColumnVisibilityState]
  )

  const searchPaginationState: MRT_PaginationState = {
    pageIndex: search.page ? search.page - 1 : 0,
    pageSize: search.pageSize ?? defaultPageSize,
  }

  const searchDensityState: MRT_DensityState =
    search.density ?? initialDensityState

  const searchSortingState: MRT_SortingState = search.order
    ? [{ id: search.order, desc: search.desc ?? false }]
    : initialSortingState

  const searchColumnVisibilityState: MRT_VisibilityState = useMemo(() => {
    return search.columns
      ? opts.columns.reduce((acc, column) => {
          const accessorKey = column.accessorKey
          if (!accessorKey) return acc
          acc[accessorKey] = search.columns?.includes(accessorKey) ?? false
          return acc
        }, initialColumnVisibilityState)
      : initialColumnVisibilityState
  }, [opts.columns, initialColumnVisibilityState, search.columns])

  const [pagination, setPagination] = useState<MRT_PaginationState>(
    searchPaginationState
  )
  const [sorting, setSorting] = useState<MRT_SortingState>(searchSortingState)
  const [density, setDensity] = useState<MRT_DensityState>(searchDensityState)
  const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>(
    searchColumnVisibilityState
  )

  useEffect(() => {
    const singleSorting = sorting[0]
    const order = singleSorting ? singleSorting.id : undefined
    const desc = singleSorting?.desc

    const searchColumns = search.columns?.join(searchColumnsSeparator)

    const nextVisibleColumns = opts.columns
      .map<string | undefined>(column => column.accessorKey)
      .filter(column => column !== undefined)
      .filter(
        column =>
          columnVisibility[column] === undefined ||
          columnVisibility[column] === true
      )
      .join(searchColumnsSeparator)

    const nextSearch = {
      page:
        pagination.pageIndex === initialPaginationState.pageIndex
          ? undefined
          : pagination.pageIndex + 1,
      pageSize:
        pagination.pageSize === initialPaginationState.pageSize
          ? undefined
          : pagination.pageSize,
      order,
      desc: desc ? true : undefined,
      density: density === initialDensityState ? undefined : density,
      columns:
        nextVisibleColumns === initialVisibleColumns
          ? undefined
          : nextVisibleColumns,
    }

    if (
      search.page !== nextSearch.page ||
      search.pageSize !== nextSearch.pageSize ||
      search.order !== nextSearch.order ||
      search.desc !== nextSearch.desc ||
      search.density !== nextSearch.density ||
      searchColumns !== nextSearch.columns
    ) {
      navigate({
        replace: true,
        // @ts-ignore
        search: nextSearch,
      })
    }
  }, [
    navigate,
    initialVisibleColumns,
    pagination,
    sorting,
    density,
    columnVisibility,
  ])

  return useMaterialReactTable({
    onPaginationChange: state => {
      setPagination(state)
      onPaginationChange?.(state)
    },
    onSortingChange: state => {
      setSorting(state)
      onSortingChange?.(state)
    },
    onDensityChange: state => {
      setDensity(state)
      onDensityChange?.(state)
    },
    onColumnVisibilityChange: state => {
      setColumnVisibility(state)
      onColumnVisibilityChange?.(state)
    },
    ...rest,
    initialState: {
      ...initialState,
    },
    state: {
      ...state,
      pagination,
      sorting,
      density,
      columnVisibility,
    },
  })
}
