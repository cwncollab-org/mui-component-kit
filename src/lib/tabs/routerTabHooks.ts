import { useRouterState } from '@tanstack/react-router'
import { useMemo } from 'react'
import { removeTrailingSlash } from './removeTrailingSlash'

export function useRouterTabsValue() {
  const matches = useRouterState({ select: state => state.matches })

  const normalizedValue = useMemo(
    () => removeTrailingSlash(matches[matches.length - 1].fullPath),
    [matches]
  )
  return normalizedValue
}
