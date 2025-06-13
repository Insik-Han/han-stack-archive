import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin-console/settings/')({
	component: RouteComponent,
})

function RouteComponent() {
	return <>Profile</>
}
