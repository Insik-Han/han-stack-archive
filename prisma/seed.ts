import { fakerJA as faker } from '@faker-js/faker'
import { PrismaClient, type User } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function seed() {
	console.time('🌱 Database has been seeded')

	// Create admin user
	const adminUser = await prisma.user.create({
		data: {
			id: faker.string.uuid(),
			name: 'Admin',
			email: 'admin@example.com',
			emailVerified: true,
			image: faker.image.avatar(),
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	})
	console.log(`✅ Created admin user: ${adminUser.email}`)

	// Create random users using faker
	const users: User[] = []
	for (let i = 0; i < 50; i++) {
		const firstName = faker.person.firstName()
		const lastName = faker.person.lastName()
		const name = `${firstName} ${lastName}`
		const email = faker.internet.email({ firstName, lastName }).toLowerCase()
		const shouldVerify = faker.datatype.boolean({ probability: 0.7 }) // 70% chance of being verified
		const shouldHaveImage = faker.datatype.boolean({ probability: 0.6 }) // 60% chance of having image
		const createdAt = faker.date.past({ years: 2 })
		const updatedAt = faker.date.between({ from: createdAt, to: new Date() })

		try {
			const user = await prisma.user.create({
				data: {
					id: faker.string.uuid(),
					name,
					email,
					emailVerified: shouldVerify,
					image: shouldHaveImage ? faker.image.avatar() : null,
					createdAt,
					updatedAt,
				},
			})
			users.push(user)
			console.log(`✅ Created user ${i + 1}/50: ${email}`)
		} catch (error) {
			console.error(`❌ Failed to create user ${email}:`, error)
		}
	}

	console.log('\n📊 Seeding Summary:')
	console.log('- Admin user created: admin@example.com')
	console.log(`- Random users created: ${users.length}`)
	console.log(`- Total users in database: ${users.length + 1}`)

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
