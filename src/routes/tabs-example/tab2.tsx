import { createFileRoute } from '@tanstack/react-router'
import { Tab2 } from '../../examples/Tab2'

export const Route = createFileRoute('/tabs-example/tab2')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Tab2 />
}
