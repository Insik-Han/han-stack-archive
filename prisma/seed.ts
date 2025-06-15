import { faker } from '@faker-js/faker'
import { PrismaClient, type User } from '../src/generated/prisma'

const prisma = new PrismaClient()

// Constants
const USER_COUNT = 50
const TASK_COUNT = 100
const TASK_STATUSES = [
	'todo',
	'in progress',
	'done',
	'canceled',
	'backlog',
] as const
const TASK_LABELS = ['bug', 'feature', 'documentation'] as const
const TASK_PRIORITIES = ['low', 'medium', 'high'] as const

const TASK_TITLES = [
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

// User generation functions
const generateUserData = () => {
	const firstName = faker.person.firstName()
	const lastName = faker.person.lastName()
	const name = `${firstName} ${lastName}`
	const email = faker.internet.email({ firstName, lastName }).toLowerCase()
	const shouldVerify = faker.datatype.boolean({ probability: 0.7 })
	const shouldHaveImage = faker.datatype.boolean({ probability: 0.6 })
	const createdAt = faker.date.past({ years: 2 })
	const updatedAt = faker.date.between({ from: createdAt, to: new Date() })

	return {
		id: faker.string.uuid(),
		name,
		email,
		emailVerified: shouldVerify,
		image: shouldHaveImage ? faker.image.avatar() : null,
		createdAt,
		updatedAt,
	}
}

const createUser = async (index: number) => {
	const userData = generateUserData()

	try {
		const user = await prisma.user.create({ data: userData })
		console.log(`✅ Created user ${index + 1}/${USER_COUNT}: ${userData.email}`)
		return user
	} catch (error) {
		console.error(`❌ Failed to create user ${userData.email}:`, error)
		return null
	}
}

const generateUsers = async (): Promise<User[]> => {
	const users: User[] = []

	for (let i = 0; i < USER_COUNT; i++) {
		const user = await createUser(i)
		if (user) {
			users.push(user)
		}
	}

	return users
}

// Task generation functions
const generateTaskData = (users: User[]) => {
	const createdAt = faker.date.past({ years: 1 })
	const updatedAt = faker.date.between({ from: createdAt, to: new Date() })
	const randomUser = users.length > 0 ? faker.helpers.arrayElement(users) : null

	return {
		id: `TASK-${faker.number.int({ min: 1000, max: 9999 })}`,
		title: faker.helpers.arrayElement(TASK_TITLES),
		status: faker.helpers.arrayElement(TASK_STATUSES),
		label: faker.helpers.arrayElement(TASK_LABELS),
		priority: faker.helpers.arrayElement(TASK_PRIORITIES),
		userId: randomUser ? randomUser.id : null,
		createdAt,
		updatedAt,
	}
}

const createTask = async (users: User[]) => {
	const taskData = generateTaskData(users)

	try {
		await prisma.task.create({ data: taskData })
		return true
	} catch (error) {
		if (
			error instanceof Error &&
			!error.message.includes('Unique constraint')
		) {
			console.error('❌ Failed to create task:', error)
		}
		return false
	}
}

const generateTasks = async (users: User[]): Promise<number> => {
	console.log('\n🔧 Creating tasks...')
	let taskCount = 0

	for (let i = 0; i < TASK_COUNT; i++) {
		const success = await createTask(users)
		if (success) {
			taskCount++
		}
	}

	console.log(`✅ Created ${taskCount} tasks`)
	return taskCount
}

// Summary function
const printSummary = (userCount: number, taskCount: number) => {
	console.log('\n📊 Seeding Summary:')
	console.log(`- Total users created: ${userCount}`)
	console.log(`- Total tasks created: ${taskCount}`)
}

// Main seed function
async function seed() {
	console.time('🌱 Database has been seeded')

	const users = await generateUsers()
	const taskCount = await generateTasks(users)

	printSummary(users.length, taskCount)

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
