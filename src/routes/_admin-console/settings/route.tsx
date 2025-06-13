import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Header } from '~/components/layout/Header'
import { Main } from '~/components/layout/Main'
import { Separator } from '~/components/ui/separator'
import { SidebarNav } from '~/features/settings/components/SidebarNav'

export const Route = createFileRoute('/_admin-console/settings')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<Header />

			<Main fixed={true}>
				<div className="space-y-0.5">
					<h1 className="text-2xl font-bold tracking-tight md:text-3xl">
						Settings
					</h1>
					<p className="text-muted-foreground">
						Manage your account settings and set e-mail preferences.
					</p>
				</div>
				<Separator className="my-4 lg:my-6" />
				<div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
					<aside className="top-0 lg:sticky lg:w-1/5">
						<SidebarNav />
					</aside>
					<div className="flex w-full overflow-y-hidden p-1">
						<Outlet />
					</div>
				</div>
			</Main>
		</>
	)
}
