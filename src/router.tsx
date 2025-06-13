import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import { routeTree } from './routeTree.gen'

export function createRouter() {
	const queryClient = new QueryClient()

	const router = createTanStackRouter({
		context: { queryClient },
		routeTree,
		scrollRestoration: true,
	})

	return routerWithQueryClient(router, queryClient)
}

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof createRouter>
	}
}
