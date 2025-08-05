import { createFileRoute } from '@tanstack/react-router'
import { Tab1 } from '../../examples/Tab1'

export const Route = createFileRoute('/tabs-example/tab1')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Tab1 />
}
