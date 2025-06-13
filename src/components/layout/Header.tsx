import React from 'react'
import { Search } from '~/features/global-search/components/SearchButton'
import { ThemeSwitch } from '~/features/theme/components/ThemeSwitch'
import { cn } from '~/lib/utils'
import { ProfileDropdown } from '../ProfileDropdown'
import { Separator } from '../ui/separator'
import { SidebarTrigger } from '../ui/sidebar'
import { TopNav } from './TopNav'

interface HeaderProps {
	fixed?: boolean
	topNavLinks?: React.ComponentProps<typeof TopNav>['links']
}

export function Header({ topNavLinks, fixed }: HeaderProps) {
	return (
		<HeaderWrapper fixed={fixed}>
			{topNavLinks?.length ? (
				<>
					<TopNav links={topNavLinks} />
					<div className="ml-auto flex items-center space-x-4">
						<Search />
						<ThemeSwitch />
						<ProfileDropdown />
					</div>
				</>
			) : (
				<>
					<Search />
					<div className="ml-auto flex items-center space-x-4">
						<ThemeSwitch />
						<ProfileDropdown />
					</div>
				</>
			)}
		</HeaderWrapper>
	)
}

interface HeaderWrapperProps extends React.HTMLAttributes<HTMLElement> {
	fixed?: boolean
}

function HeaderWrapper({
	className,
	fixed,
	children,
	...props
}: HeaderWrapperProps) {
	const [offset, setOffset] = React.useState(0)

	React.useEffect(() => {
		const onScroll = () => {
			setOffset(document.body.scrollTop || document.documentElement.scrollTop)
		}

		// Add scroll listener to the body
		document.addEventListener('scroll', onScroll, { passive: true })

		// Clean up the event listener on unmount
		return () => document.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<header
			className={cn(
				'bg-background flex h-16 items-center gap-3 p-4 sm:gap-4',
				fixed && 'header-fixed peer/header fixed z-50 w-[inherit] rounded-md',
				offset > 10 && fixed ? 'shadow-sm' : 'shadow-none',
				className,
			)}
			{...props}
		>
			<SidebarTrigger variant="outline" className="scale-125 sm:scale-100" />
			<Separator orientation="vertical" className="h-6" />
			{children}
		</header>
	)
}
