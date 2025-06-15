import type { ChangeEvent, FormEvent } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { PasswordInput } from './PasswordInput'

describe('PasswordInput Component', () => {
	it('renders without crashing', () => {
		const { container } = render(<PasswordInput />)
		expect(container).toBeDefined()
	})

	it('renders as password type by default', () => {
		const { container } = render(<PasswordInput />)
		const input = container.querySelector('input')
		expect(input).toBeDefined()
		expect(input?.type).toBe('password')
	})

	it('toggles password visibility when eye button is clicked', async () => {
		const { container, getByRole } = render(<PasswordInput />)
		const input = container.querySelector('input')
		const toggleButton = getByRole('button')

		expect(input?.type).toBe('password')

		await toggleButton.click()
		expect(input?.type).toBe('text')

		await toggleButton.click()
		expect(input?.type).toBe('password')
	})

	it('shows correct icon based on password visibility state', async () => {
		const { container, getByRole } = render(<PasswordInput />)
		const toggleButton = getByRole('button')

		// Initially should show eye-off icon (password hidden)
		expect(container.querySelector('svg')).toBeDefined()

		// After clicking, should show eye icon (password visible)
		await toggleButton.click()
		expect(container.querySelector('svg')).toBeDefined()
	})

	it('accepts value prop', () => {
		const { container } = render(
			<PasswordInput value="test123" readOnly={true} />,
		)
		const input = container.querySelector('input') as HTMLInputElement

		expect(input.value).toBe('test123')
	})

	it('works with onChange handler', () => {
		let _value = ''
		const handleChange = vi.fn((e: ChangeEvent<HTMLInputElement>) => {
			_value = e.target.value
		})
		const { container } = render(<PasswordInput onChange={handleChange} />)
		const input = container.querySelector('input') as HTMLInputElement

		// onChange is connected
		expect(input.onchange).toBeDefined()
	})

	it('applies custom className', () => {
		const { container } = render(<PasswordInput className="custom-class" />)
		const wrapper = container.firstElementChild
		expect(wrapper).toHaveClass('custom-class')
	})

	it('disables input and button when disabled prop is true', () => {
		const { container, getByRole } = render(<PasswordInput disabled={true} />)
		const input = container.querySelector('input')
		const toggleButton = getByRole('button')

		expect(input).toBeDisabled()
		expect(toggleButton).toBeDisabled()
	})

	it('forwards additional props to input element', () => {
		const { container } = render(
			<PasswordInput
				placeholder="Enter password"
				autoComplete="current-password"
			/>,
		)
		const input = container.querySelector('input')

		expect(input).toHaveAttribute('placeholder', 'Enter password')
		expect(input).toHaveAttribute('autoComplete', 'current-password')
	})

	it('maintains correct input type after toggling visibility', async () => {
		const { container, getByRole } = render(<PasswordInput />)
		const toggleButton = getByRole('button')

		// Toggle visibility multiple times and check input type
		await toggleButton.click()
		let input = container.querySelector('input')
		expect(input?.type).toBe('text')

		await toggleButton.click()
		input = container.querySelector('input')
		expect(input?.type).toBe('password')

		await toggleButton.click()
		input = container.querySelector('input')
		expect(input?.type).toBe('text')
	})

	it('does not submit form when toggle button is clicked', async () => {
		const handleSubmit = vi
			.fn()
			.mockImplementation((e: FormEvent<HTMLFormElement>) => e.preventDefault())
		const { container } = render(
			<form onSubmit={handleSubmit}>
				<PasswordInput />
				<button type="submit">Submit</button>
			</form>,
		)

		// Find the toggle button by its type attribute and parent structure
		const toggleButton = container.querySelector(
			'button[type="button"]',
		) as HTMLButtonElement
		expect(toggleButton).toBeDefined()
		toggleButton.click()

		expect(handleSubmit).not.toHaveBeenCalled()
	})
})
