import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { orpc } from '~/lib/orpc'

export function useSignIn() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation(
		orpc.auth.signIn.mutationOptions({
			onSuccess: (data) => {
				queryClient.invalidateQueries({ queryKey: orpc.auth.getSession.key() })

				if (data?.token) {
					navigate({ to: '/' })
				}
			},
		}),
	)
}

export function useSignUp() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation(
		orpc.auth.signUp.mutationOptions({
			onSuccess: (data) => {
				queryClient.invalidateQueries({ queryKey: orpc.auth.getSession.key() })

				if (data?.token) {
					navigate({ to: '/' })
				}
			},
		}),
	)
}

export function useSignOut() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation(
		orpc.auth.signOut.mutationOptions({
			onSuccess: () => {
				queryClient.clear()
				navigate({ to: '/sign-in' })
			},
		}),
	)
}
