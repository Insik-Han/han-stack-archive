import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function listUsers() {
	const users = await prisma.user.findMany({
		orderBy: { createdAt: 'desc' },
		take: 10,
	})

	const totalUsers = await prisma.user.count()
	const verifiedUsers = await prisma.user.count({
		where: { emailVerified: true },
	})
	const usersWithImages = await prisma.user.count({
		where: { image: { not: null } },
	})

	console.log('\n📊 User Statistics:')
	console.log(`- Total users: ${totalUsers}`)
	console.log(`- Verified users: ${verifiedUsers} (${Math.round((verifiedUsers / totalUsers) * 100)}%)`)
	console.log(`- Users with profile images: ${usersWithImages} (${Math.round((usersWithImages / totalUsers) * 100)}%)`)

	console.log('\n👥 Latest 10 users:')
	console.table(
		users.map((user) => ({
			Name: user.name,
			Email: user.email,
			Verified: user.emailVerified ? '✅' : '❌',
			Image: user.image ? '🖼️' : '-',
			Created: new Date(user.createdAt).toLocaleDateString(),
		})),
	)
}

listUsers()
	.catch(console.error)
	.finally(() => prisma.$disconnect())