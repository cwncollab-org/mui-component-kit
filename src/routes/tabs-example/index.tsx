import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/tabs-example/')({
  beforeLoad: () => {
    throw redirect({ to: '/tabs-example/tab1' })
  },
})
