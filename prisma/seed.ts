import { PrismaClient } from '../src/generated/prisma'
import { auth } from '../src/lib/auth/server'

const prisma = new PrismaClient()

async function seed() {
	console.time('🌱 Database has been seeded')

	const findUser = await prisma.user.findFirst()

	if (findUser) {
		return
	}

	await auth.api.signUpEmail({
		body: {
			name: 'Admin',
			email: 'admin@example.com',
			password: 'admin123',
		},
	})

	console.timeEnd('🌱 Database has been seeded')
}

seed()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
