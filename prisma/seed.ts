import { PrismaClient } from '~/generated/prisma'

const prisma = new PrismaClient()

async function seed() {
	console.time('🌱 Database has been seeded')

	const findUser = await prisma.user.findFirst()

	if (findUser) {
		return
	}

	// Create a test user
	await prisma.user.create({
		data: {
			id: '1',
			email: 'example@example.com',
			emailVerified: true,
			name: 'example',
			createdAt: '2025-05-05',
			updatedAt: '2025-05-05',
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
