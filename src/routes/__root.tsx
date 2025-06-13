import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { ReactElement, ReactNode } from 'react'
import { NotFoundError } from '~/components/errors/NotFoundError'
import { ThemeProvider } from '~/features/theme/contexts/theme-context'
import appCss from '~/styles/global.css?url'

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient
}>()({
	component: RootComponent,
	notFoundComponent: NotFoundError,
	head: () => ({
		links: [
			{
				rel: 'stylesheet',
				href: appCss,
			},
			{
				href: '/favicon.ico',
				rel: 'icon',
			},
		],
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				content: 'width=device-width, initial-scale=1',
				name: 'viewport',
			},
			{
				title: 'HanStack',
			},
		],
	}),
})

function RootComponent(): ReactElement {
	return (
		<RootDocument>
			<ThemeProvider attribute="class">
				<Outlet />
			</ThemeProvider>
		</RootDocument>
	)
}

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				{import.meta.env.MODE === 'development' && (
					<>
						<ReactQueryDevtools buttonPosition="bottom-left" />
						<TanStackRouterDevtools position="bottom-right" />
					</>
				)}
				<Scripts />
			</body>
		</html>
	)
}
