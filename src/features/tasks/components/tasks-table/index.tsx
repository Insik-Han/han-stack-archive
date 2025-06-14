import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '~/components/data-table/DataTable'
import { priorities, statuses } from '../../data/data'

interface TasksTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function TasksTable<TData, TValue>({
	columns,
	data,
}: TasksTableProps<TData, TValue>) {
	return (
		<DataTable
			columns={columns}
			data={data}
			config={{
				searchColumn: 'title',
				searchPlaceholder: 'Filter tasks...',
				facetedFilters: [
					{
						column: 'status',
						title: 'Status',
						options: statuses,
					},
					{
						column: 'priority',
						title: 'Priority',
						options: priorities,
					},
				],
			}}
		/>
	)
}
