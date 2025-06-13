import React from 'react'
import { CommandMenu } from '../components/CommandMenu'

interface SearchContextType {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchContext = React.createContext<SearchContextType | null>(null)

interface Props {
	children: React.ReactNode
}

export function SearchProvider({ children }: Props) {
	const [open, setOpen] = React.useState(false)

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}
		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])

	return (
		<SearchContext value={{ open, setOpen }}>
			{children}
			<CommandMenu />
		</SearchContext>
	)
}

export const useSearch = () => React.use(SearchContext)
