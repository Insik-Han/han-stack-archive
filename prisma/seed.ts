import { faker } from '@faker-js/faker'
import { PrismaClient, type User } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function seed() {
	console.time('🌱 Database has been seeded')

	// Create users
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

	// Create tasks
	console.log('\n🔧 Creating tasks...')
	const statuses = ['todo', 'in progress', 'done', 'canceled', 'backlog']
	const labels = ['bug', 'feature', 'documentation']
	const priorities = ['low', 'medium', 'high']

	// Sample task titles
	const taskTitles = [
		"You can't compress the program without quantifying the open-source SSD pixel!",
		'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
		'We need to bypass the neural TCP card!',
		'The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!',
		"I'll parse the wireless SSL protocol, that should driver the API panel!",
		'Use the digital TLS panel, then you can transmit the haptic system!',
		'The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!',
		"Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
		'We need to program the back-end THX pixel!',
		"Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
		"Generating the driver won't do anything, we need to index the online SSL application!",
		"I'll transmit the wireless JBOD capacitor, that should hard drive the SSD feed!",
		'We need to override the online UDP bus!',
		"I'll reboot the 1080p FTP panel, that should matrix the HEX hard drive!",
		'We need to generate the virtual HEX alarm!',
		"Backing up the pixel won't do anything, we need to transmit the primary IB array!",
		'The CSS feed is down, index the bluetooth transmitter so we can compress the CLI protocol!',
		'Use the redundant SCSI application, then you can hack the optical alarm!',
		'We need to compress the auxiliary VGA driver!',
		"Transmitting the transmitter won't do anything, we need to compress the virtual HDD sensor!",
	]

	let taskCount = 0
	for (let i = 0; i < 100; i++) {
		const createdAt = faker.date.past({ years: 1 })
		const updatedAt = faker.date.between({ from: createdAt, to: new Date() })
		const randomUser =
			users.length > 0 ? faker.helpers.arrayElement(users) : null

		try {
			await prisma.task.create({
				data: {
					id: `TASK-${faker.number.int({ min: 1000, max: 9999 })}`,
					title: faker.helpers.arrayElement(taskTitles),
					status: faker.helpers.arrayElement(statuses),
					label: faker.helpers.arrayElement(labels),
					priority: faker.helpers.arrayElement(priorities),
					userId: randomUser ? randomUser.id : null,
					createdAt,
					updatedAt,
				},
			})
			taskCount++
		} catch (error) {
			// Ignore duplicate ID errors
			if (
				error instanceof Error &&
				!error.message.includes('Unique constraint')
			) {
				console.error('❌ Failed to create task:', error)
			}
		}
	}
	console.log(`✅ Created ${taskCount} tasks`)

	console.log('\n📊 Seeding Summary:')
	console.log(`- Total users created: ${users.length}`)
	console.log(`- Total tasks created: ${taskCount}`)

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
