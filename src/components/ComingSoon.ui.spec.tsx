import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { ComingSoon } from './ComingSoon'

describe('ComingSoon Component', () => {
	it('renders without crashing', () => {
		const { container } = render(<ComingSoon />)
		expect(container).toBeDefined()
	})

	it('displays the correct title', () => {
		const { getByText } = render(<ComingSoon />)
		expect(getByText('Coming Soon 👀')).toBeInTheDocument()
	})

	it('displays the correct message', () => {
		const { getByText } = render(<ComingSoon />)
		expect(getByText('This page has not been created yet.')).toBeInTheDocument()
		expect(getByText('Stay tuned though!')).toBeInTheDocument()
	})

	it('renders the planet icon', () => {
		const { container } = render(<ComingSoon />)
		const svg = container.querySelector('svg')
		expect(svg).toBeInTheDocument()
		expect(svg).toHaveAttribute('width', '72')
		expect(svg).toHaveAttribute('height', '72')
	})

	it('applies correct CSS classes for layout', () => {
		const { container } = render(<ComingSoon />)
		const wrapper = container.firstChild
		expect(wrapper).toHaveClass('h-svh')

		const innerDiv = wrapper?.firstChild
		expect(innerDiv).toHaveClass(
			'm-auto',
			'flex',
			'h-full',
			'w-full',
			'flex-col',
			'items-center',
			'justify-center',
			'gap-2',
		)
	})

	it('applies correct CSS classes for typography', () => {
		const { getByText, container } = render(<ComingSoon />)
		const title = getByText('Coming Soon 👀')
		expect(title).toHaveClass('text-4xl', 'leading-tight', 'font-bold')

		const paragraph = container.querySelector('p')
		expect(paragraph).toHaveClass('text-muted-foreground', 'text-center')
	})

	it('has accessible structure', () => {
		const { getByRole } = render(<ComingSoon />)
		const heading = getByRole('heading', { level: 1 })
		expect(heading).toBeInTheDocument()
		expect(heading).toHaveTextContent('Coming Soon 👀')
	})
})
