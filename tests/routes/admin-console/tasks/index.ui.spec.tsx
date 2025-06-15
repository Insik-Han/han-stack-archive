import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/start'
import TasksPage from '~/routes/_admin-console/tasks/index'
import type { Task } from '@prisma/client'

// Mock ORPC client
vi.mock('~/lib/orpc', () => ({
	orpc: {
		tasks: {
			getAllTasks: {
				query: vi.fn(),
			},
		},
	},
}))

// Mock the route utilities
vi.mock('@tanstack/react-router', () => ({
	Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

// Mock createServerFn to return a mock function
const mockGetTasks = vi.fn()
vi.mock('@tanstack/start', () => ({
	createServerFn: vi.fn(() => mockGetTasks),
}))

// Mock TasksTable component
vi.mock('~/features/tasks/components/tasks-table', () => ({
	TasksTable: ({ data }: { data: Task[] }) => (
		<div data-testid="tasks-table">
			{data.map((task) => (
				<div key={task.id} data-testid={`task-${task.id}`}>
					{task.title}
				</div>
			))}
		</div>
	),
}))

describe('Tasks Page', () => {
	let queryClient: QueryClient

	beforeEach(() => {
		queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					retry: false,
				},
			},
		})
	})

	afterEach(() => {
		cleanup()
		vi.clearAllMocks()
	})

	const renderComponent = () => {
		return render(
			<QueryClientProvider client={queryClient}>
				<TasksPage />
			</QueryClientProvider>
		)
	}

	it('should render loading state initially', async () => {
		mockGetTasks.mockImplementation(() => new Promise(() => {})) // Never resolves

		renderComponent()

		expect(screen.getByText('Loading tasks...')).toBeInTheDocument()
	})

	it('should render tasks when data is loaded', async () => {
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

		mockGetTasks.mockResolvedValue(mockTasks)

		renderComponent()

		await waitFor(() => {
			expect(screen.getByTestId('tasks-table')).toBeInTheDocument()
		})

		expect(screen.getByTestId('task-1')).toHaveTextContent('Test Task 1')
		expect(screen.getByTestId('task-2')).toHaveTextContent('Test Task 2')
	})

	it('should render error state when query fails', async () => {
		mockGetTasks.mockRejectedValue(new Error('Failed to load tasks'))

		renderComponent()

		await waitFor(() => {
			expect(screen.getByText('Failed to load tasks')).toBeInTheDocument()
		})
	})

	it('should render empty state when no tasks', async () => {
		mockGetTasks.mockResolvedValue([])

		renderComponent()

		await waitFor(() => {
			expect(screen.getByTestId('tasks-table')).toBeInTheDocument()
		})

		expect(screen.queryByTestId(/task-/)).not.toBeInTheDocument()
	})

	it('should have correct page title and structure', async () => {
		mockGetTasks.mockResolvedValue([])

		renderComponent()

		expect(screen.getByRole('heading', { name: 'タスク管理' })).toBeInTheDocument()
		expect(screen.getByText('タスクの作成、編集、削除、ステータスの更新ができます')).toBeInTheDocument()
	})

	it('should render navigation breadcrumbs', async () => {
		mockGetTasks.mockResolvedValue([])

		renderComponent()

		const dashboardLink = screen.getByRole('link', { name: 'ダッシュボード' })
		expect(dashboardLink).toBeInTheDocument()
		expect(dashboardLink).toHaveAttribute('href', '/')

		expect(screen.getByText('タスク')).toBeInTheDocument()
	})
})