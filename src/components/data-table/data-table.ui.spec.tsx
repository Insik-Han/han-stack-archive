import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { DataTable } from './index'
import type { ColumnDef } from '@tanstack/react-table'

interface TestData {
	id: string
	name: string
	status: 'active' | 'inactive'
	priority: 'low' | 'medium' | 'high'
}

const testData: TestData[] = [
	{ id: '1', name: 'Item 1', status: 'active', priority: 'high' },
	{ id: '2', name: 'Item 2', status: 'inactive', priority: 'low' },
	{ id: '3', name: 'Item 3', status: 'active', priority: 'medium' },
	{ id: '4', name: 'Item 4', status: 'inactive', priority: 'high' },
	{ id: '5', name: 'Item 5', status: 'active', priority: 'low' },
]

const columns: ColumnDef<TestData>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		accessorKey: 'priority',
		header: 'Priority',
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
]

describe('DataTable', () => {
	it('should render table with data', () => {
		render(<DataTable columns={columns} data={testData} />)

		// Check headers
		expect(screen.getByText('ID')).toBeInTheDocument()
		expect(screen.getByText('Name')).toBeInTheDocument()
		expect(screen.getByText('Status')).toBeInTheDocument()
		expect(screen.getByText('Priority')).toBeInTheDocument()

		// Check data rows
		expect(screen.getByText('Item 1')).toBeInTheDocument()
		expect(screen.getByText('Item 2')).toBeInTheDocument()
		expect(screen.getByText('Item 3')).toBeInTheDocument()
	})

	it('should render empty state when no data', () => {
		render(<DataTable columns={columns} data={[]} />)

		expect(screen.getByText('No results.')).toBeInTheDocument()
	})

	it('should handle search functionality', async () => {
		const user = userEvent.setup()

		render(
			<DataTable
				columns={columns}
				data={testData}
				config={{
					searchColumn: 'name',
					searchPlaceholder: 'Search items...',
				}}
			/>
		)

		const searchInput = screen.getByPlaceholderText('Search items...')
		await user.type(searchInput, 'Item 1')

		await waitFor(() => {
			expect(screen.getByText('Item 1')).toBeInTheDocument()
			expect(screen.queryByText('Item 2')).not.toBeInTheDocument()
			expect(screen.queryByText('Item 3')).not.toBeInTheDocument()
		})
	})

	it('should handle faceted filters', async () => {
		const user = userEvent.setup()

		const statusOptions = [
			{ label: 'Active', value: 'active' },
			{ label: 'Inactive', value: 'inactive' },
		]

		render(
			<DataTable
				columns={columns}
				data={testData}
				config={{
					facetedFilters: [
						{
							column: 'status',
							title: 'Status',
							options: statusOptions,
						},
					],
				}}
			/>
		)

		// Click on filter button
		const filterButton = screen.getByRole('button', { name: /Status/i })
		await user.click(filterButton)

		// Select 'Active' option
		const activeOption = screen.getByRole('checkbox', { name: 'Active' })
		await user.click(activeOption)

		await waitFor(() => {
			// Should show only active items
			expect(screen.getByText('Item 1')).toBeInTheDocument()
			expect(screen.getByText('Item 3')).toBeInTheDocument()
			expect(screen.getByText('Item 5')).toBeInTheDocument()
			// Should not show inactive items
			expect(screen.queryByText('Item 2')).not.toBeInTheDocument()
			expect(screen.queryByText('Item 4')).not.toBeInTheDocument()
		})
	})

	it('should handle pagination', async () => {
		const user = userEvent.setup()

		// Create more data for pagination
		const manyItems = Array.from({ length: 25 }, (_, i) => ({
			id: `${i + 1}`,
			name: `Item ${i + 1}`,
			status: 'active' as const,
			priority: 'low' as const,
		}))

		render(<DataTable columns={columns} data={manyItems} />)

		// Check initial page
		expect(screen.getByText('Item 1')).toBeInTheDocument()
		expect(screen.queryByText('Item 15')).not.toBeInTheDocument()

		// Navigate to next page
		const nextButton = screen.getByRole('button', { name: 'Go to next page' })
		await user.click(nextButton)

		await waitFor(() => {
			expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
			expect(screen.getByText('Item 11')).toBeInTheDocument()
		})
	})

	it('should handle column visibility toggle', async () => {
		const user = userEvent.setup()

		render(<DataTable columns={columns} data={testData} />)

		// Open column visibility dropdown
		const columnsButton = screen.getByRole('button', { name: /Columns/i })
		await user.click(columnsButton)

		// Toggle off 'Priority' column
		const priorityCheckbox = screen.getByRole('checkbox', { name: 'Priority' })
		await user.click(priorityCheckbox)

		await waitFor(() => {
			// Priority column should be hidden
			expect(screen.queryByText('Priority')).not.toBeInTheDocument()
			// But other columns should still be visible
			expect(screen.getByText('Name')).toBeInTheDocument()
			expect(screen.getByText('Status')).toBeInTheDocument()
		})
	})

	it('should handle sorting', async () => {
		const user = userEvent.setup()

		render(<DataTable columns={columns} data={testData} />)

		// Click on 'Name' header to sort
		const nameHeader = screen.getByText('Name')
		await user.click(nameHeader)

		await waitFor(() => {
			const rows = screen.getAllByRole('row')
			// Skip header row and check first data row
			expect(rows[1]).toHaveTextContent('Item 1')
		})

		// Click again to reverse sort
		await user.click(nameHeader)

		await waitFor(() => {
			const rows = screen.getAllByRole('row')
			// Skip header row and check first data row
			expect(rows[1]).toHaveTextContent('Item 5')
		})
	})

	it('should handle row selection when enabled', async () => {
		const user = userEvent.setup()

		const columnsWithSelection: ColumnDef<TestData>[] = [
			{
				id: 'select',
				header: ({ table }) => (
					<input
						type="checkbox"
						checked={table.getIsAllPageRowsSelected()}
						onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
					/>
				),
				cell: ({ row }) => (
					<input
						type="checkbox"
						checked={row.getIsSelected()}
						onChange={(e) => row.toggleSelected(e.target.checked)}
					/>
				),
			},
			...columns,
		]

		render(<DataTable columns={columnsWithSelection} data={testData} />)

		// Select first row
		const firstRowCheckbox = screen.getAllByRole('checkbox')[1] // Skip header checkbox
		await user.click(firstRowCheckbox)

		expect(firstRowCheckbox).toBeChecked()

		// Select all rows
		const selectAllCheckbox = screen.getAllByRole('checkbox')[0]
		await user.click(selectAllCheckbox)

		const allCheckboxes = screen.getAllByRole('checkbox')
		allCheckboxes.forEach((checkbox) => {
			expect(checkbox).toBeChecked()
		})
	})
})