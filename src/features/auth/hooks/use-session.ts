import { useQuery } from '@tanstack/react-query'
import { orpc } from '~/lib/orpc'

export function useSession() {
	return useQuery(
		orpc.auth.getSession.queryOptions({
			staleTime: 5 * 60 * 1000, // 5 minutes
		}),
	)
}
