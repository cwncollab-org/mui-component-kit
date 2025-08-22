import { TabsProps as MuiTabProps, Tabs as MuiTabs } from '@mui/material'
import { useRouterState, type MakeRouteMatch } from '@tanstack/react-router'

type Match = MakeRouteMatch

export type RouterTabsProps = Omit<MuiTabProps, 'value'> & {
  match: Match
}

export function RouterTabs(props: RouterTabsProps) {
  const { match, children, ...rest } = props
  const matches = useRouterState({ select: state => state.matches })
  const value = matches[match.index + 1]?.fullPath ?? ''

  return (
    <MuiTabs value={value} {...rest}>
      {children}
    </MuiTabs>
  )
}
