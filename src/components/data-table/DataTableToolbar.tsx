import { Cross2Icon } from '@radix-ui/react-icons'
import type { Table } from '@tanstack/react-table'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import type { DataTableConfig } from './DataTable'
import { DataTableFacetedFilter } from './DataTableFacetedFilter'
import { DataTableViewOptions } from './DataTableViewOptions'

interface DataTableToolbarProps<TData> {
	table: Table<TData>
	config: DataTableConfig
}

export function DataTableToolbar<TData>({
	table,
	config,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				{config.searchColumn && (
					<Input
						placeholder={config.searchPlaceholder || 'Search...'}
						value={
							(table
								.getColumn(config.searchColumn)
								?.getFilterValue() as string) ?? ''
						}
						onChange={(event) => {
							if (config.searchColumn) {
								table
									.getColumn(config.searchColumn)
									?.setFilterValue(event.target.value)
							}
						}}
						className="h-8 w-[150px] lg:w-[250px]"
					/>
				)}
				{config.facetedFilters?.map((filter) => {
					const column = table.getColumn(filter.column)
					return column ? (
						<DataTableFacetedFilter
							key={filter.column}
							column={column}
							title={filter.title}
							options={filter.options}
						/>
					) : null
				})}
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<Cross2Icon className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	)
}
