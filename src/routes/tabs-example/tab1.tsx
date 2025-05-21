import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tabs-example/tab1')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tabs-example/tab1"!</div>
}
