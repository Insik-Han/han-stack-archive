import type React from 'react'
import { cn } from '~/lib/utils'

interface MainProps extends React.HTMLAttributes<HTMLElement> {
	fixed?: boolean
}

export function Main({ fixed, ...props }: MainProps) {
	return (
		<main
			className={cn(
				'peer-[.header-fixed]/header:mt-16',
				'px-4 py-6',
				fixed && 'fixed-main flex grow flex-col overflow-hidden',
			)}
			{...props}
		/>
	)
}
