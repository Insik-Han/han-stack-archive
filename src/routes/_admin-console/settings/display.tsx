import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin-console/settings/display')({
	component: RouteComponent,
})

function RouteComponent() {
	return <>Display</>
}
