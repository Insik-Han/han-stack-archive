import { os } from '@orpc/server'
import { APIError } from 'better-auth/api'
import { loginSchema, registerSchema } from '~/schemas/auth'
import { auth } from '../auth'

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
}
