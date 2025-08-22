import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tabs-example/tab3/list')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tabs-example/tab3/tab3a"!</div>
}
