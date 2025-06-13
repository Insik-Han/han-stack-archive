import { IconArrowRightDashed, IconMoon, IconSun } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'
import React from 'react'
import { sidebarData } from '~/components/layout/data/sidebar-data'
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '~/components/ui/command'
import { ScrollArea } from '~/components/ui/scroll-area'
import { useSearch } from '~/features/global-search/contexts/search-context'
import { useTheme } from '~/features/theme/contexts/theme-context'

export function CommandMenu() {
	const navigate = useNavigate()
	const themeContext = useTheme()
	const searchContext = useSearch()

	const runCommand = React.useCallback(
		(command: () => unknown) => {
			searchContext?.setOpen(false)
			command()
		},
		[searchContext],
	)

	return (
		<CommandDialog
			modal={true}
			open={searchContext?.open}
			onOpenChange={searchContext?.setOpen}
		>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<ScrollArea type="hover" className="h-72 pr-1">
					<CommandEmpty>No results found.</CommandEmpty>
					{sidebarData.navGroups.map((group) => (
						<CommandGroup key={group.title} heading={group.title}>
							{group.items.map((navItem, i) => {
								if (navItem.url)
									return (
										<CommandItem
											key={`${navItem.url}-${i}`}
											value={navItem.title}
											onSelect={() => {
												runCommand(() => navigate({ to: navItem.url }))
											}}
										>
											<div className="mr-2 flex h-4 w-4 items-center justify-center">
												<IconArrowRightDashed className="text-muted-foreground/80 size-2" />
											</div>
											{navItem.title}
										</CommandItem>
									)

								return navItem.items?.map((subItem, i) => (
									<CommandItem
										key={`${subItem.url}-${i}`}
										value={subItem.title}
										onSelect={() => {
											runCommand(() => navigate({ to: subItem.url }))
										}}
									>
										<div className="mr-2 flex h-4 w-4 items-center justify-center">
											<IconArrowRightDashed className="text-muted-foreground/80 size-2" />
										</div>
										{subItem.title}
									</CommandItem>
								))
							})}
						</CommandGroup>
					))}
					<CommandSeparator />
					<CommandGroup heading="Theme">
						<CommandItem
							onSelect={() => runCommand(() => themeContext?.setTheme('light'))}
						>
							<IconSun /> <span>Light</span>
						</CommandItem>
						<CommandItem
							onSelect={() => runCommand(() => themeContext?.setTheme('dark'))}
						>
							<IconMoon className="scale-90" />
							<span>Dark</span>
						</CommandItem>
					</CommandGroup>
				</ScrollArea>
			</CommandList>
		</CommandDialog>
	)
}
