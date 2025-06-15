import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { SkipToMain } from './SkipToMain'

describe('SkipToMain Component', () => {
	it('renders without crashing', () => {
		const { container } = render(<SkipToMain />)
		expect(container).toBeDefined()
	})

	it('renders as an anchor element', () => {
		const { container } = render(<SkipToMain />)
		const link = container.querySelector('a')
		expect(link).toBeDefined()
		expect(link?.tagName).toBe('A')
	})

	it('has correct href attribute pointing to main content', () => {
		const { container } = render(<SkipToMain />)
		expect(container.querySelector('a')).toHaveAttribute('href', '#content')
	})

	it('displays the correct text', () => {
		const { getByText } = render(<SkipToMain />)
		expect(getByText('Skip to Main')).toBeInTheDocument()
	})

	it('has accessibility-focused styling classes', () => {
		const { container } = render(<SkipToMain />)

		const link = container.querySelector('a')

		// Check for key accessibility classes
		expect(link).toHaveClass('fixed')
		expect(link).toHaveClass('z-999')
		expect(link).toHaveClass('-translate-y-52') // Hidden by default
		expect(link).toHaveClass('focus:translate-y-3') // Visible on focus
		expect(link).toHaveClass('focus:transform')
	})

	it('has proper visual styling', () => {
		const { container } = render(<SkipToMain />)
		const link = container.querySelector('a')

		// Check visual styling classes
		expect(link).toHaveClass('bg-primary')
		expect(link).toHaveClass('text-primary-foreground')
		expect(link).toHaveClass('hover:bg-primary/90')
		expect(link).toHaveClass('shadow-sm')
		expect(link).toHaveClass('px-4')
		expect(link).toHaveClass('py-2')
		expect(link).toHaveClass('text-sm')
		expect(link).toHaveClass('font-medium')
	})

	it('has focus ring styling', () => {
		const { container } = render(<SkipToMain />)
		const link = container.querySelector('a')

		expect(link).toHaveClass('focus-visible:ring-ring')
		expect(link).toHaveClass('focus-visible:ring-1')
	})

	it('is positioned correctly', () => {
		const { container } = render(<SkipToMain />)
		const link = container.querySelector('a')

		expect(link).toHaveClass('left-44')
		expect(link).toHaveClass('fixed')
	})

	it('has transition effect', () => {
		const { container } = render(<SkipToMain />)
		expect(container.querySelector('a')).toHaveClass('transition')
	})

	it('prevents text wrapping', () => {
		const { container } = render(<SkipToMain />)
		expect(container.querySelector('a')).toHaveClass('whitespace-nowrap')
	})

	it('has proper opacity', () => {
		const { container } = render(<SkipToMain />)
		expect(container.querySelector('a')).toHaveClass('opacity-95')
	})

	it('becomes visible when focused', () => {
		const { container } = render(<SkipToMain />)

		const link = container.querySelector('a') as HTMLAnchorElement

		// Initially hidden off-screen
		expect(link).toHaveClass('-translate-y-52')

		// Focus the element
		link.focus()

		// Should have focus styles that make it visible
		expect(link).toHaveClass('focus:translate-y-3')
		expect(document.activeElement).toBe(link)
	})
})
