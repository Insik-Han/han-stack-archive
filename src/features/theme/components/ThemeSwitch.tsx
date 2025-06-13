import { IconCheck, IconMoon, IconSun } from '@tabler/icons-react'
import { Button } from '~/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { cn } from '~/lib/utils'

import { useTheme } from '../contexts/theme-context'

export function ThemeSwitch() {
	const { theme, setTheme } = useTheme()

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild={true}>
				<Button variant="ghost" size="icon" className="scale-95 rounded-full">
					<IconSun className="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<IconMoon className="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{themeOptions.map(({ value, label }) => (
					<DropdownMenuItem key={value} onClick={() => setTheme(value)}>
						{label}
						<IconCheck
							size={14}
							className={cn('ml-auto', theme !== value && 'hidden')}
						/>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

const themeOptions = [
	{ value: 'light', label: 'Light' },
	{ value: 'dark', label: 'Dark' },
	{ value: 'system', label: 'System' },
]
