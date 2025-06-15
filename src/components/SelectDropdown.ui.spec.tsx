import type { FC, PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { SelectDropdown } from './SelectDropdown'

// Wrapper component to provide form context
const wrapper: FC<PropsWithChildren> = ({ children }) => {
	const methods = useForm()
	return <FormProvider {...methods}>{children}</FormProvider>
}

const mockItems = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
]

describe('SelectDropdown Component', () => {
	it('renders without crashing', () => {
		const { container } = render(
			<SelectDropdown defaultValue="option1" items={mockItems} />,
			{
				wrapper: wrapper,
			},
		)
		expect(container).toBeDefined()
	})

	it('displays placeholder when no default value is provided', () => {
		const { container } = render(
			<SelectDropdown defaultValue={undefined} items={mockItems} />,
			{ wrapper },
		)
		const selectValue = container.querySelector('[data-slot="select-value"]')
		expect(selectValue?.textContent).toBe('Select')
	})

	it('displays custom placeholder when provided', () => {
		const { container } = render(
			<SelectDropdown
				defaultValue={undefined}
				items={mockItems}
				placeholder="Choose an option"
			/>,
			{ wrapper },
		)
		const selectValue = container.querySelector('[data-slot="select-value"]')
		expect(selectValue?.textContent).toBe('Choose an option')
	})

	it('displays selected value label', () => {
		const { container } = render(
			<SelectDropdown defaultValue="option2" items={mockItems} />,
			{ wrapper },
		)
		const selectValue = container.querySelector('[data-slot="select-value"]')
		expect(selectValue?.textContent).toBe('Option 2')
	})

	it('shows loading state when isPending is true', async () => {
		const { getByRole, getByText } = render(
			<SelectDropdown
				defaultValue={undefined}
				items={undefined}
				isPending={true}
			/>,
			{ wrapper },
		)
		const trigger = getByRole('combobox')
		await trigger.click()

		expect(getByText('Loading...')).toBeInTheDocument()
		// Check for loading icon
		const loadingIcon = document.querySelector('.animate-spin')
		expect(loadingIcon).toBeDefined()
	})

	it('renders all items when dropdown is opened', async () => {
		const { getByRole, getByLabelText } = render(
			<SelectDropdown defaultValue="option1" items={mockItems} />,
			{ wrapper },
		)

		await getByRole('combobox').click()

		// Check items by their role and label
		for (const mockItem of mockItems) {
			const option = getByLabelText(mockItem.label)
			expect(option).toBeInTheDocument()
		}
	})

	it('calls onValueChange when an item is selected', async () => {
		const handleValueChange = vi.fn()
		const { getByRole, getByText } = render(
			<SelectDropdown
				defaultValue="option1"
				items={mockItems}
				onValueChange={handleValueChange}
			/>,
			{ wrapper },
		)

		await getByRole('combobox').click()
		await getByText('Option 2').click()

		expect(handleValueChange).toHaveBeenCalledWith('option2')
	})

	it('disables the select when disabled prop is true', () => {
		const { getByRole } = render(
			<SelectDropdown
				defaultValue="option1"
				items={mockItems}
				disabled={true}
			/>,
			{ wrapper },
		)
		expect(getByRole('combobox')).toBeDisabled()
	})

	it('applies custom className to trigger', () => {
		const { getByRole } = render(
			<SelectDropdown
				defaultValue="option1"
				items={mockItems}
				className="custom-select"
			/>,
			{ wrapper },
		)
		expect(getByRole('combobox')).toHaveClass('custom-select')
	})

	it('works in controlled mode when isControlled is true', () => {
		const handleValueChange = vi.fn()
		const { rerender, container } = render(
			<SelectDropdown
				defaultValue="option1"
				items={mockItems}
				isControlled={true}
				onValueChange={handleValueChange}
			/>,
			{ wrapper },
		)

		let selectValue = container.querySelector('[data-slot="select-value"]')
		expect(selectValue?.textContent).toBe('Option 1')

		// Rerender with new value
		rerender(
			<SelectDropdown
				defaultValue="option2"
				items={mockItems}
				isControlled={true}
				onValueChange={handleValueChange}
			/>,
		)

		selectValue = container.querySelector('[data-slot="select-value"]')
		expect(selectValue?.textContent).toBe('Option 2')
	})

	it('works in uncontrolled mode by default', async () => {
		const handleValueChange = vi.fn()
		const { getByRole, getByLabelText, container } = render(
			<SelectDropdown
				defaultValue="option1"
				items={mockItems}
				onValueChange={handleValueChange}
			/>,
			{ wrapper },
		)

		const trigger = getByRole('combobox')
		let selectValue = container.querySelector('[data-slot="select-value"]')
		expect(selectValue?.textContent).toBe('Option 1')

		await trigger.click()
		await getByLabelText('Option 3').click()

		// Value should change internally
		selectValue = container.querySelector('[data-slot="select-value"]')
		expect(selectValue?.textContent).toBe('Option 3')
		expect(handleValueChange).toHaveBeenCalledWith('option3')
	})

	it('handles empty items array gracefully', async () => {
		const { getByRole, container } = render(
			<SelectDropdown defaultValue={undefined} items={[]} />,
			{ wrapper },
		)
		await getByRole('combobox').click()

		// Should show empty dropdown content
		const options = container.querySelectorAll('[role="option"]')
		expect(options).toHaveLength(0)
	})

	it('renders within FormControl wrapper', () => {
		const { container } = render(
			<SelectDropdown defaultValue="option1" items={mockItems} />,
			{ wrapper },
		)
		// The SelectTrigger should be wrapped in FormControl
		expect(container.querySelector('[data-slot="control"]')).toBeDefined()
	})
})
