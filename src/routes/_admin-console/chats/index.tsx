import { createFileRoute } from '@tanstack/react-router'
import { Header } from '~/components/layout/Header'
import { Main } from '~/components/layout/Main'

export const Route = createFileRoute('/_admin-console/chats/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<Header />

			<Main fixed={true}>Chats</Main>
		</>
	)
}
