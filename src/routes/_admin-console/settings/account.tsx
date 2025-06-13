import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin-console/settings/account')({
	component: RouteComponent,
})

function RouteComponent() {
	return <>Account</>
}
