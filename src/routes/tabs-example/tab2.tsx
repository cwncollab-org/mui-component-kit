import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tabs-example/tab2')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tabs-example/tab2"!</div>
}
