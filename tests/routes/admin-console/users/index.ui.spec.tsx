import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/start'
import UsersPage from '~/routes/_admin-console/users/index'
import type { User } from '@prisma/client'

// Mock ORPC client
vi.mock('~/lib/orpc', () => ({
	orpc: {
		users: {
			getAllUsers: {
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
const mockGetUsers = vi.fn()
vi.mock('@tanstack/start', () => ({
	createServerFn: vi.fn(() => mockGetUsers),
}))

// Mock UsersTable component
vi.mock('~/features/users/components/users-table', () => ({
	UsersTable: ({ data }: { data: User[] }) => (
		<div data-testid="users-table">
			{data.map((user) => (
				<div key={user.id} data-testid={`user-${user.id}`}>
					{user.name} - {user.email}
				</div>
			))}
		</div>
	),
}))

describe('Users Page', () => {
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
				<UsersPage />
			</QueryClientProvider>
		)
	}

	it('should render loading state initially', async () => {
		mockGetUsers.mockImplementation(() => new Promise(() => {})) // Never resolves

		renderComponent()

		expect(screen.getByText('Loading users...')).toBeInTheDocument()
	})

	it('should render users when data is loaded', async () => {
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
				name: 'Jane Smith',
				email: 'jane@example.com',
				emailVerified: false,
				image: 'https://example.com/avatar.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]

		mockGetUsers.mockResolvedValue(mockUsers)

		renderComponent()

		await waitFor(() => {
			expect(screen.getByTestId('users-table')).toBeInTheDocument()
		})

		expect(screen.getByTestId('user-1')).toHaveTextContent('John Doe - john@example.com')
		expect(screen.getByTestId('user-2')).toHaveTextContent('Jane Smith - jane@example.com')
	})

	it('should render error state when query fails', async () => {
		mockGetUsers.mockRejectedValue(new Error('Failed to load users'))

		renderComponent()

		await waitFor(() => {
			expect(screen.getByText('Failed to load users')).toBeInTheDocument()
		})
	})

	it('should render empty state when no users', async () => {
		mockGetUsers.mockResolvedValue([])

		renderComponent()

		await waitFor(() => {
			expect(screen.getByTestId('users-table')).toBeInTheDocument()
		})

		expect(screen.queryByTestId(/user-/)).not.toBeInTheDocument()
	})

	it('should have correct page title and structure', async () => {
		mockGetUsers.mockResolvedValue([])

		renderComponent()

		expect(screen.getByRole('heading', { name: 'ユーザー管理' })).toBeInTheDocument()
		expect(screen.getByText('登録されているユーザーの一覧を表示・管理します')).toBeInTheDocument()
	})

	it('should render navigation breadcrumbs', async () => {
		mockGetUsers.mockResolvedValue([])

		renderComponent()

		const dashboardLink = screen.getByRole('link', { name: 'ダッシュボード' })
		expect(dashboardLink).toBeInTheDocument()
		expect(dashboardLink).toHaveAttribute('href', '/')

		expect(screen.getByText('ユーザー')).toBeInTheDocument()
	})
})