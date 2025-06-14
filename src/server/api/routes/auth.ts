import { os } from '@orpc/server'
import { getWebRequest } from '@tanstack/react-start/server'
import { APIError } from 'better-auth/api'
import { auth } from '~/lib/auth/server'
import { loginSchema, registerSchema } from '~/schemas/auth'

export const authRouter = {
	signIn: os.input(loginSchema).handler(async ({ input }) => {
		try {
			const result = await auth.api.signInEmail({
				body: {
					email: input.email,
					password: input.password,
				},
			})

			return {
				user: result.user,
				token: result.token,
			}
		} catch (error) {
			if (error instanceof APIError) {
				console.error('API Error:', error)
				throw error.message
			}
		}
	}),
	signUp: os.input(registerSchema).handler(async ({ input }) => {
		try {
			const result = await auth.api.signUpEmail({
				body: {
					name: input.name,
					email: input.email,
					password: input.password,
				},
			})

			return {
				user: result.user,
				token: result.token,
			}
		} catch (error) {
			if (error instanceof APIError) {
				console.error('API Error:', error)
				throw error.message
			}
		}
	}),
	signOut: os.handler(async () => {
		try {
			const { headers } = getWebRequest()
			const result = await auth.api.signOut({
				headers,
			})
			return result
		} catch (error) {
			if (error instanceof APIError) {
				console.error('API Error:', error)
				throw error.message
			}
		}
	}),
	getSession: os.handler(async () => {
		try {
			const { headers } = getWebRequest()
			const session = await auth.api.getSession({
				headers,
			})
			return session
		} catch (error) {
			if (error instanceof APIError) {
				console.error('API Error:', error)
				throw error.message
			}
		}
	}),
}
