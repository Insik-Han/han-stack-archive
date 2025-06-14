'server only'

import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { reactStartCookies } from 'better-auth/react-start'
import { PrismaClient } from '~/generated/prisma'

const prisma = new PrismaClient()

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
	},
	emailVerification: {},
	database: prismaAdapter(prisma, {
		provider: 'sqlite',
	}),
	plugins: [reactStartCookies()],
})
