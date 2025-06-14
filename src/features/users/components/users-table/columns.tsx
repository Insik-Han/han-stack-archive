import type { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '~/components/data-table/DataTableColumnHeader'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Checkbox } from '~/components/ui/checkbox'
import type { User } from '~/generated/zod'
import { UsersTableRowActions } from './UsersTableRowActions'

export const userColumns: ColumnDef<User>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: 'user',
		accessorFn: (row) => ({
			name: row.name,
			email: row.email,
			image: row.image,
		}),
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="User" />
		),
		cell: ({ row }) => {
			const user = row.original
			const initials = user.name
				.split(' ')
				.map((n) => n[0])
				.join('')
				.toUpperCase()
				.slice(0, 2)

			return (
				<div className="flex items-center gap-3">
					<Avatar className="h-8 w-8">
						{user.image && <AvatarImage src={user.image} alt={user.name} />}
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<span className="font-medium">{user.name}</span>
						<span className="text-sm text-muted-foreground">{user.email}</span>
					</div>
				</div>
			)
		},
		filterFn: (row, _id, value) => {
			const user = row.original
			return (
				user.name.toLowerCase().includes(value.toLowerCase()) ||
				user.email.toLowerCase().includes(value.toLowerCase())
			)
		},
	},
	{
		accessorKey: 'emailVerified',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const verified = row.getValue('emailVerified') as boolean
			return (
				<Badge variant={verified ? 'default' : 'secondary'}>
					{verified ? 'Verified' : 'Unverified'}
				</Badge>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Created" />
		),
		cell: ({ row }) => {
			const date = new Date(row.getValue('createdAt'))
			return <div>{date.toLocaleDateString()}</div>
		},
	},
	{
		accessorKey: 'updatedAt',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Last Updated" />
		),
		cell: ({ row }) => {
			const date = new Date(row.getValue('updatedAt'))
			return (
				<div className="text-sm text-muted-foreground">
					{date.toLocaleDateString()}
				</div>
			)
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <UsersTableRowActions row={row} />,
	},
]
