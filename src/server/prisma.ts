import { serverOnly } from '@tanstack/react-start'

import { PrismaClient } from '~/generated/prisma'

const createPrismaClient = serverOnly(
	() =>
		new PrismaClient({
			log:
				import.meta.env.NODE_ENV === 'development'
					? ['query', 'error', 'warn']
					: ['error'],
		}),
)

const prismaGlobal = globalThis as typeof globalThis & {
	prisma?: PrismaClient
}

export const db = createPrismaClient()

if (import.meta.env.NODE_ENV !== 'production') {
	prismaGlobal.prisma = db
}
