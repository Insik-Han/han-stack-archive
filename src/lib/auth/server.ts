import { serverOnly } from '@tanstack/react-start'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { reactStartCookies } from 'better-auth/react-start'
import { db } from '~/server/db'
import { authConfig } from './config'

const createAuth = serverOnly(() =>
	betterAuth({
		...authConfig,
		database: prismaAdapter(db, {
			provider: 'sqlite',
		}),
		plugins: [reactStartCookies()],
	}),
)

export const auth = createAuth()

export type AuthSession = typeof auth.$Infer.Session.session
export type AuthUser = typeof auth.$Infer.Session.user
