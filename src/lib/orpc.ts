import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { createORPCReactQueryUtils } from '@orpc/react-query'
import { createRouterClient } from '@orpc/server'
import type { RouterClient } from '@orpc/server'
import { createIsomorphicFn } from '@tanstack/react-start'
import { getHeaders } from '@tanstack/react-start/server'
import { RPC_PATH_PREFIX } from '~/constants/rpc'
import { serverRouter } from '~/server/router'

const getORPCClient = createIsomorphicFn()
	.server(() =>
		createRouterClient(serverRouter, {
			/**
			 * Provide initial context if needed.
			 *
			 * Because this client instance is shared across all requests,
			 * only include context that's safe to reuse globally.
			 * For per-request context, use middleware context or pass a function as the initial context.
			 */
			context: async () => ({
				headers: getHeaders(),
			}),
		}),
	)
	.client((): RouterClient<typeof serverRouter> => {
		const link = new RPCLink({
			url: new URL(RPC_PATH_PREFIX, window.location.href),
		})

		return createORPCClient(link)
	})

export const client: RouterClient<typeof serverRouter> = getORPCClient()

export const orpc = createORPCReactQueryUtils(client)
