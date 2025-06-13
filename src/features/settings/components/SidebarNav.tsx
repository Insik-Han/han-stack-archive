import {
	IconBrowserCheck,
	IconNotification,
	IconPalette,
	IconTool,
	IconUser,
} from '@tabler/icons-react'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import React from 'react'
import { buttonVariants } from '~/components/ui/button'
import { ScrollArea } from '~/components/ui/scroll-area'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select'
import { cn } from '~/lib/utils'

const sidebarNavItems = [
	{
		title: 'Profile',
		icon: <IconUser size={18} />,
		href: '/settings',
	},
	{
		title: 'Account',
		icon: <IconTool size={18} />,
		href: '/settings/account',
	},
	{
		title: 'Appearance',
		icon: <IconPalette size={18} />,
		href: '/settings/appearance',
	},
	{
		title: 'Notifications',
		icon: <IconNotification size={18} />,
		href: '/settings/notifications',
	},
	{
		title: 'Display',
		icon: <IconBrowserCheck size={18} />,
		href: '/settings/display',
	},
]

type Props = React.HTMLAttributes<HTMLElement>

export function SidebarNav({ className, ...props }: Props) {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const [val, setVal] = React.useState(pathname ?? '/settings')

	const handleSelect = (e: string) => {
		setVal(e)
		navigate({ to: e })
	}

	return (
		<>
			<div className="p-1 md:hidden">
				<Select value={val} onValueChange={handleSelect}>
					<SelectTrigger className="h-12 sm:w-48">
						<SelectValue placeholder="Theme" />
					</SelectTrigger>
					<SelectContent>
						{sidebarNavItems.map((item) => (
							<SelectItem key={item.href} value={item.href}>
								<div className="flex gap-x-4 px-2 py-1">
									<span className="scale-125">{item.icon}</span>
									<span className="text-md">{item.title}</span>
								</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<ScrollArea
				type="always"
				className="bg-background hidden w-full min-w-40 px-1 py-2 md:block"
			>
				<nav
					className={cn(
						'flex space-x-2 py-1 lg:flex-col lg:space-y-1 lg:space-x-0',
						className,
					)}
					{...props}
				>
					{sidebarNavItems.map((item) => (
						<Link
							key={item.href}
							to={item.href}
							className={cn(
								buttonVariants({ variant: 'ghost' }),
								pathname === item.href
									? 'bg-muted hover:bg-muted'
									: 'hover:bg-transparent hover:underline',
								'justify-start',
							)}
						>
							<span className="mr-2">{item.icon}</span>
							{item.title}
						</Link>
					))}
				</nav>
			</ScrollArea>
		</>
	)
}
