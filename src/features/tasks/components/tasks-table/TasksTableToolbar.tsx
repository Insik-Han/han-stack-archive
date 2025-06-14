import { Cross2Icon } from '@radix-ui/react-icons'
import type { Table } from '@tanstack/react-table'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { priorities, statuses } from '../../data/data'
import { TasksTableFacetedFilter } from './TasksTableFacetedFilter'
import { TasksTableViewOptions } from './TasksTableViewOptions'

interface Props<TData> {
	table: Table<TData>
}

export function TasksTableToolbar<TData>({ table }: Props<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
				<Input
					placeholder="Filter tasks..."
					value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('title')?.setFilterValue(event.target.value)
					}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				<div className="flex gap-x-2">
					{table.getColumn('status') && (
						<TasksTableFacetedFilter
							column={table.getColumn('status')}
							title="Status"
							options={statuses}
						/>
					)}
					{table.getColumn('priority') && (
						<TasksTableFacetedFilter
							column={table.getColumn('priority')}
							title="Priority"
							options={priorities}
						/>
					)}
				</div>
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
			<TasksTableViewOptions table={table} />
		</div>
	)
}
