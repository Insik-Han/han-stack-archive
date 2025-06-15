import { describe, expect, it, vi, beforeEach } from 'vitest'
import { ORPCError } from '@orpc/server'
import { usersRouter } from './users'
import { prismaMock } from '../../__mocks__/db'
import type { User } from '@prisma/client'

vi.mock('../../db')

describe('Users Router', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('getAllUsers', () => {
		it('should return all users', async () => {
			const mockUsers: User[] = [
				{
					id: '1',
					name: 'John Doe',
					email: 'john@example.com',
					emailVerified: true,
					image: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: '2',
					name: 'Jane Doe',
					email: 'jane@example.com',
					emailVerified: false,
					image: 'https://example.com/avatar.jpg',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]

			prismaMock.user.findMany.mockResolvedValue(mockUsers)

			const result = await usersRouter.getAllUsers()

			expect(prismaMock.user.findMany).toHaveBeenCalledWith({
				orderBy: { createdAt: 'desc' },
			})
			expect(result).toEqual(mockUsers)
		})

		it('should handle database errors', async () => {
			const error = new Error('Database connection failed')
			prismaMock.user.findMany.mockRejectedValue(error)

			await expect(usersRouter.getAllUsers()).rejects.toThrow('Database connection failed')
		})
	})

	describe('getUserById', () => {
		it('should return user by id', async () => {
			const mockUser: User = {
				id: '1',
				name: 'John Doe',
				email: 'john@example.com',
				emailVerified: true,
				image: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			}

			prismaMock.user.findUnique.mockResolvedValue(mockUser)

			const result = await usersRouter.getUserById({ id: '1' })

			expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
				where: { id: '1' },
			})
			expect(result).toEqual(mockUser)
		})

		it('should throw error when user not found', async () => {
			prismaMock.user.findUnique.mockResolvedValue(null)

			await expect(usersRouter.getUserById({ id: 'non-existent' })).rejects.toThrow(ORPCError)
			await expect(usersRouter.getUserById({ id: 'non-existent' })).rejects.toMatchObject({
				code: 'NOT_FOUND',
				message: 'User not found',
			})
		})
	})

	describe('createUser', () => {
		it('should create a new user', async () => {
			const input = {
				name: 'New User',
				email: 'new@example.com',
				emailVerified: false,
				image: null,
			}

			const mockCreatedUser: User = {
				id: '1',
				...input,
				createdAt: new Date(),
				updatedAt: new Date(),
			}

			prismaMock.user.create.mockResolvedValue(mockCreatedUser)

			const result = await usersRouter.createUser(input)

			expect(prismaMock.user.create).toHaveBeenCalledWith({
				data: input,
			})
			expect(result).toEqual(mockCreatedUser)
		})

		it('should handle validation errors', async () => {
			const invalidInput = {
				name: 'Valid Name',
				email: 'invalid-email', // Invalid email format
				emailVerified: false,
			}

			await expect(usersRouter.createUser(invalidInput as any)).rejects.toThrow()
		})

		it('should handle unique constraint violations', async () => {
			const input = {
				name: 'Duplicate User',
				email: 'existing@example.com',
				emailVerified: false,
				image: null,
			}

			const prismaError = new Error('Unique constraint failed on the fields: email')
			Object.defineProperty(prismaError, 'code', { value: 'P2002' })

			prismaMock.user.create.mockRejectedValue(prismaError)

			await expect(usersRouter.createUser(input)).rejects.toThrow()
		})
	})

	describe('updateUser', () => {
		it('should update an existing user', async () => {
			const input = {
				id: '1',
				name: 'Updated User',
				email: 'updated@example.com',
				emailVerified: true,
				image: 'https://example.com/new-avatar.jpg',
			}

			const mockUpdatedUser: User = {
				...input,
				createdAt: new Date(),
				updatedAt: new Date(),
			}

			prismaMock.user.update.mockResolvedValue(mockUpdatedUser)

			const result = await usersRouter.updateUser(input)

			expect(prismaMock.user.update).toHaveBeenCalledWith({
				where: { id: '1' },
				data: {
					name: 'Updated User',
					email: 'updated@example.com',
					emailVerified: true,
					image: 'https://example.com/new-avatar.jpg',
				},
			})
			expect(result).toEqual(mockUpdatedUser)
		})

		it('should handle partial updates', async () => {
			const input = {
				id: '1',
				name: 'Only Name Updated',
			}

			const mockUpdatedUser: User = {
				id: '1',
				name: 'Only Name Updated',
				email: 'unchanged@example.com',
				emailVerified: true,
				image: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			}

			prismaMock.user.update.mockResolvedValue(mockUpdatedUser)

			const result = await usersRouter.updateUser(input)

			expect(prismaMock.user.update).toHaveBeenCalledWith({
				where: { id: '1' },
				data: {
					name: 'Only Name Updated',
				},
			})
			expect(result).toEqual(mockUpdatedUser)
		})

		it('should handle update errors', async () => {
			const input = {
				id: 'non-existent',
				name: 'Updated User',
			}

			const prismaError = new Error('Record to update not found')
			Object.defineProperty(prismaError, 'code', { value: 'P2025' })

			prismaMock.user.update.mockRejectedValue(prismaError)

			await expect(usersRouter.updateUser(input)).rejects.toThrow()
		})
	})

	describe('deleteUser', () => {
		it('should delete a user', async () => {
			const mockDeletedUser: User = {
				id: '1',
				name: 'Deleted User',
				email: 'deleted@example.com',
				emailVerified: false,
				image: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			}

			prismaMock.user.delete.mockResolvedValue(mockDeletedUser)

			const result = await usersRouter.deleteUser({ id: '1' })

			expect(prismaMock.user.delete).toHaveBeenCalledWith({
				where: { id: '1' },
			})
			expect(result).toEqual({ success: true })
		})

		it('should handle deletion errors', async () => {
			const prismaError = new Error('Record to delete not found')
			Object.defineProperty(prismaError, 'code', { value: 'P2025' })

			prismaMock.user.delete.mockRejectedValue(prismaError)

			await expect(usersRouter.deleteUser({ id: 'non-existent' })).rejects.toThrow()
		})
	})
})