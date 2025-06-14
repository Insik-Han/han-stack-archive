import {
	type ErrorComponentProps,
	Outlet,
	ErrorComponent as TanstackErrorComponent,
	createFileRoute,
	redirect,
} from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import type { FC } from 'react'
import { SkipToMain } from '~/components/SkipToMain'
import { UnauthorizedError } from '~/components/errors/UnauthorizedError'
import { AppSidebar } from '~/components/layout/AppSidebar'
import { SIDEBAR_COOKIE_NAME, SidebarProvider } from '~/components/ui/sidebar'
import { SearchProvider } from '~/features/global-search/contexts/search-context'
import { authClient } from '~/lib/auth/client'
import { cn } from '~/lib/utils'

const ErrorComponent: FC<ErrorComponentProps> = ({ error }) => {
	if ('code' in error && error.code === 'UNAUTHORIZED') {
		return <UnauthorizedError />
	}
	return <TanstackErrorComponent error={error} />
}

const getSidebarCookie = createServerFn().handler(() => {
	const cookie = getCookie(SIDEBAR_COOKIE_NAME)
	return cookie ? (JSON.parse(cookie) as boolean) : false
})

export const Route = createFileRoute('/_admin-console')({
	component: RouteComponent,
	errorComponent: ErrorComponent,
	beforeLoad: async () => {
		const session = await authClient.getSession()

		if (!session) {
			throw redirect({
				to: '/sign-in',
				replace: true,
				statusCode: 303,
			})
		}
	},
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
