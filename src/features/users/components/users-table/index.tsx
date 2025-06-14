import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '~/components/data-table/DataTable'

interface UsersTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function UsersTable<TData, TValue>({
	columns,
	data,
}: UsersTableProps<TData, TValue>) {
	const verificationStatuses = [
		{ label: 'Verified', value: true },
		{ label: 'Unverified', value: false },
	]

	return (
		<DataTable
			columns={columns}
			data={data}
			config={{
				searchColumn: 'user',
				searchPlaceholder: 'Search users...',
				facetedFilters: [
					{
						column: 'emailVerified',
						title: 'Status',
						options: verificationStatuses,
					},
				],
			}}
		/>
	)
}
