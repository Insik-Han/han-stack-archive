import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin-console/settings/appearance')({
	component: RouteComponent,
})

function RouteComponent() {
	return <>Appearance</>
}
