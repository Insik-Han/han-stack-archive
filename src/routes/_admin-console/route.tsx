import { Outlet, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import { SkipToMain } from '~/components/SkipToMain'
import { AppSidebar } from '~/components/layout/AppSidebar'
import { SIDEBAR_COOKIE_NAME, SidebarProvider } from '~/components/ui/sidebar'
import { SearchProvider } from '~/features/global-search/contexts/search-context'
import { cn } from '~/lib/utils'

const getSidebarCookie = createServerFn().handler(() => {
	const cookie = getCookie(SIDEBAR_COOKIE_NAME)
	return cookie ? (JSON.parse(cookie) as boolean) : false
})

export const Route = createFileRoute('/_admin-console')({
	component: RouteComponent,
	loader: async () => {
		const sidebarState = await getSidebarCookie()
		return { sidebarState }
	},
})

function RouteComponent() {
	const { sidebarState } = Route.useLoaderData()
	return (
		<SearchProvider>
			<SidebarProvider defaultOpen={sidebarState}>
				<SkipToMain />
				<AppSidebar />
				<div
					id="content"
					className={cn(
						'ml-auto w-full max-w-full',
						'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
						'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
						'sm:transition-[width] sm:duration-200 sm:ease-linear',
						'flex h-svh flex-col',
						'group-data-[scroll-locked=1]/body:h-full',
						'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh',
					)}
				>
					<Outlet />
				</div>
			</SidebarProvider>
		</SearchProvider>
	)
}
