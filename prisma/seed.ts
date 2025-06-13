import { faker } from '@faker-js/faker'
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
			id: 1,
			name: faker.person.fullName(),
			email: faker.internet.email(),
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
