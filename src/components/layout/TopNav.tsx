import { IconMenu } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import type { ComponentProps } from 'react'
import { cn } from '~/lib/utils'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface Props extends ComponentProps<'nav'> {
	links: {
		title: string
		href: string
		isActive: boolean
		disabled?: boolean
	}[]
}

export function TopNav({ className, links, ...props }: Props) {
	return (
		<>
			<div className="md:hidden">
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild={true}>
						<Button size="icon" variant="outline">
							<IconMenu />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent side="bottom" align="start">
						{links.map(({ title, href, isActive, disabled }) => (
							<DropdownMenuItem key={`${title}-${href}`} asChild={true}>
								<Link
									to={href}
									className={isActive ? '' : 'text-muted-foreground'}
									disabled={disabled}
								>
									{title}
								</Link>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<nav
				className={cn(
					'hidden items-center space-x-4 md:flex lg:space-x-6',
					className,
				)}
				{...props}
			>
				{links.map(({ title, href, isActive, disabled }) => (
					<Link
						key={`${title}-${href}`}
						to={href}
						disabled={disabled}
						className={`hover:text-primary text-sm font-medium transition-colors ${isActive ? '' : 'text-muted-foreground'}`}
					>
						{title}
					</Link>
				))}
			</nav>
		</>
	)
}
