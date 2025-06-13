import { createFileRoute } from '@tanstack/react-router'

import { Header } from '~/components/layout/Header'
import { Main } from '~/components/layout/Main'

export const Route = createFileRoute('/_admin-console/users/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<Header fixed={true} />

			<Main>Users</Main>
		</>
	)
}
