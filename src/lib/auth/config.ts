import type { BetterAuthOptions } from 'better-auth'

export const authConfig = {
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
	},
	emailVerification: {},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // 5 minutes
		},
	},
} satisfies Partial<BetterAuthOptions>
