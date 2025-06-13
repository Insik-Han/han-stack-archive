import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin-console/settings/notifications')({
	component: RouteComponent,
})

function RouteComponent() {
	return <>Notifications</>
}
