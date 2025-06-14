import { createServerFileRoute } from '@tanstack/react-start/server'
import { RPC_PATH_PREFIX } from '~/constants/rpc'
import { serverHandler } from '~/server/handler'

async function handle({ request }: { request: Request }) {
	const { response } = await serverHandler.handle(request, {
		context: {
			headers: request.headers,
		}, // Provide initial context if needed
		prefix: RPC_PATH_PREFIX,
	})

	return response ?? new Response('Not Found', { status: 404 })
}

export const ServerRoute = createServerFileRoute(
	`${RPC_PATH_PREFIX}/$`,
).methods({
	DELETE: handle,
	GET: handle,
	HEAD: handle,
	PATCH: handle,
	POST: handle,
	PUT: handle,
})
