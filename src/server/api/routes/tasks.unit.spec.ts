import { describe, expect, it, vi, beforeEach } from 'vitest'
import { ORPCError } from '@orpc/server'
import { tasksRouter } from './tasks'
import { prismaMock } from '../../__mocks__/db'
import type { Prisma, Task } from '@prisma/client'

vi.mock('../../db')

describe('Tasks Router', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('list', () => {
		it('should return all tasks', async () => {
			const mockTasks: Task[] = [
				{
					id: '1',
					title: 'Test Task 1',
					description: 'Description 1',
					completed: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: '2',
					title: 'Test Task 2',
					description: 'Description 2',
					completed: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]

			prismaMock.task.findMany.mockResolvedValue(mockTasks)

			const result = await tasksRouter.list({ orderBy: { createdAt: 'desc' } })

			expect(prismaMock.task.findMany).toHaveBeenCalledWith({
				orderBy: { createdAt: 'desc' },
			})
			expect(result).toEqual(mockTasks)
		})

		it('should handle database errors', async () => {
			const error = new Error('Database connection failed')
			prismaMock.task.findMany.mockRejectedValue(error)

			await expect(tasksRouter.list({})).rejects.toThrow('Database connection failed')
		})
	})

	describe('find', () => {
		it('should return task by id', async () => {
			const mockTask: Task = {
				id: '1',
				title: 'Test Task',
				description: 'Description',
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			}

			prismaMock.task.findUnique.mockResolvedValue(mockTask)

			const result = await tasksRouter.find({ where: { id: '1' } })

			expect(prismaMock.task.findUnique).toHaveBeenCalledWith({
				where: { id: '1' },
			})
			expect(result).toEqual(mockTask)
		})

		it('should return null when task not found', async () => {
			prismaMock.task.findUnique.mockResolvedValue(null)

			const result = await tasksRouter.find({ where: { id: 'non-existent' } })
			expect(result).toBeNull()
		})
	})

	describe('create', () => {
		it('should create a new task', async () => {
			const input = {
				data: {
					title: 'New Task',
					description: 'New Description',
					completed: false,
				}
			}

			const mockCreatedTask: Task = {
				id: '1',
				...input.data,
				createdAt: new Date(),
				updatedAt: new Date(),
			}

			prismaMock.task.create.mockResolvedValue(mockCreatedTask)

			const result = await tasksRouter.create(input)

			expect(prismaMock.task.create).toHaveBeenCalledWith(input)
			expect(result).toEqual(mockCreatedTask)
		})

		it('should handle validation errors', async () => {
			const invalidInput = {
				title: '', // Empty title should fail validation
				completed: false,
			}

			await expect(tasksRouter.createTask(invalidInput as any)).rejects.toThrow()
		})
	})

	describe('updateTask', () => {
		it('should update an existing task', async () => {
			const input = {
				id: '1',
				title: 'Updated Task',
				description: 'Updated Description',
				completed: true,
			}

			const mockUpdatedTask: Task = {
				...input,
				createdAt: new Date(),
				updatedAt: new Date(),
			}

			prismaMock.task.update.mockResolvedValue(mockUpdatedTask)

			const result = await tasksRouter.updateTask(input)

			expect(prismaMock.task.update).toHaveBeenCalledWith({
				where: { id: '1' },
				data: {
					title: 'Updated Task',
					description: 'Updated Description',
					completed: true,
				},
			})
			expect(result).toEqual(mockUpdatedTask)
		})

		it('should handle update errors', async () => {
			const input = {
				id: 'non-existent',
				title: 'Updated Task',
				completed: false,
			}

			const prismaError = new Error('Record to update not found')
			Object.defineProperty(prismaError, 'code', { value: 'P2025' })

			prismaMock.task.update.mockRejectedValue(prismaError)

			await expect(tasksRouter.updateTask(input)).rejects.toThrow()
		})
	})

	describe('deleteTask', () => {
		it('should delete a task', async () => {
			const mockDeletedTask: Task = {
				id: '1',
				title: 'Deleted Task',
				description: 'To be deleted',
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			}

			prismaMock.task.delete.mockResolvedValue(mockDeletedTask)

			const result = await tasksRouter.deleteTask({ id: '1' })

			expect(prismaMock.task.delete).toHaveBeenCalledWith({
				where: { id: '1' },
			})
			expect(result).toEqual({ success: true })
		})

		it('should handle deletion errors', async () => {
			const prismaError = new Error('Record to delete not found')
			Object.defineProperty(prismaError, 'code', { value: 'P2025' })

			prismaMock.task.delete.mockRejectedValue(prismaError)

			await expect(tasksRouter.deleteTask({ id: 'non-existent' })).rejects.toThrow()
		})
	})
})