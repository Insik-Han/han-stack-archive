import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Header } from '~/components/layout/Header'
import { Main } from '~/components/layout/Main'
import { UsersTable } from '~/features/users/components/users-table'
import { userColumns } from '~/features/users/components/users-table/columns'
import { orpc } from '~/lib/orpc'

export const Route = createFileRoute('/_admin-console/users/')({
	component: RouteComponent,
	loader: async ({ context: { queryClient } }) => {
		await queryClient.ensureQueryData(
			orpc.users.list.queryOptions({ input: {} }),
		)
	},
})

function RouteComponent() {
	const { data: users } = useSuspenseQuery(
		orpc.users.list.queryOptions({ input: {} }),
	)

	return (
		<>
			<Header fixed={true} />

			<Main>
				<div className="flex h-full flex-1 flex-col space-y-8 p-8">
					<div className="flex items-center justify-between space-y-2">
						<div>
							<h2 className="text-2xl font-bold tracking-tight">Users</h2>
							<p className="text-muted-foreground">
								Manage your application users and their permissions
							</p>
						</div>
					</div>
					<UsersTable columns={userColumns} data={users} />
				</div>
			</Main>
		</>
	)
}
