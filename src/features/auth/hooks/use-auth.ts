import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { authClient } from '~/lib/auth/client'

export function useSignOut() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async () => {
			await authClient.signOut()
		},
		onSuccess: () => {
			queryClient.clear()
			navigate({ to: '/sign-in' })
		},
	})
}
