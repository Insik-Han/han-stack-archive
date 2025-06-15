import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { ConfirmDialog } from './ConfirmDialog'

describe('ConfirmDialog Component', () => {
	const defaultProps = {
		open: true,
		onOpenChange: vi.fn(),
		title: 'Test Title',
		desc: 'Test Description',
		handleConfirm: vi.fn(),
	}

	it('renders without crashing', () => {
		const { container } = render(<ConfirmDialog {...defaultProps} />)
		expect(container).toBeDefined()
	})

	it('displays the correct title and description', () => {
		const { getByText } = render(<ConfirmDialog {...defaultProps} />)
		expect(getByText('Test Title')).toBeInTheDocument()
		expect(getByText('Test Description')).toBeInTheDocument()
	})

	it('renders with JSX description', () => {
		const { getByText } = render(
			<ConfirmDialog
				{...defaultProps}
				desc={<span>Custom JSX Description</span>}
			/>,
		)
		expect(getByText('Custom JSX Description')).toBeInTheDocument()
	})

	it('calls handleConfirm when confirm button is clicked', async () => {
		const { getByRole } = render(<ConfirmDialog {...defaultProps} />)
		await getByRole('button', { name: 'Continue' }).click()
		expect(defaultProps.handleConfirm).toHaveBeenCalledTimes(1)
	})

	it('calls onOpenChange when cancel button is clicked', async () => {
		const { getByRole } = render(<ConfirmDialog {...defaultProps} />)
		await getByRole('button', { name: 'Cancel' }).click()
		expect(defaultProps.onOpenChange).toHaveBeenCalled()
	})

	it('displays custom button text', () => {
		const { getByRole } = render(
			<ConfirmDialog
				{...defaultProps}
				confirmText="Delete"
				cancelBtnText="Dismiss"
			/>,
		)
		expect(getByRole('button', { name: 'Delete' })).toBeInTheDocument()
		expect(getByRole('button', { name: 'Dismiss' })).toBeInTheDocument()
	})

	it('renders destructive variant when destructive prop is true', () => {
		const { getByRole } = render(
			<ConfirmDialog {...defaultProps} destructive={true} />,
		)
		expect(getByRole('button', { name: 'Continue' })).toHaveClass(
			'bg-destructive',
		)
	})

	it('disables buttons when isLoading is true', () => {
		const { getByRole } = render(
			<ConfirmDialog {...defaultProps} isLoading={true} />,
		)
		expect(getByRole('button', { name: 'Continue' })).toBeDisabled()
		expect(getByRole('button', { name: 'Cancel' })).toBeDisabled()
	})

	it('disables confirm button when disabled prop is true', () => {
		const { getByRole } = render(
			<ConfirmDialog {...defaultProps} disabled={true} />,
		)
		expect(getByRole('button', { name: 'Continue' })).toBeDisabled()
		expect(getByRole('button', { name: 'Cancel' })).not.toBeDisabled()
	})

	it('renders children when provided', () => {
		const { getByText } = render(
			<ConfirmDialog {...defaultProps}>
				<div>Custom Content</div>
			</ConfirmDialog>,
		)
		expect(getByText('Custom Content')).toBeInTheDocument()
	})

	it('does not render when open is false', () => {
		const { container } = render(
			<ConfirmDialog {...defaultProps} open={false} />,
		)
		expect(container.textContent).not.toContain('Test Title')
	})

	it('renders with complex ReactNode as title', () => {
		const { getByText } = render(
			<ConfirmDialog
				{...defaultProps}
				title={<span className="custom-title">Complex Title</span>}
			/>,
		)
		expect(getByText('Complex Title')).toBeInTheDocument()
		expect(getByText('Complex Title')).toHaveClass('custom-title')
	})

	it('renders with ReactNode as confirmText', () => {
		const { getByRole } = render(
			<ConfirmDialog
				{...defaultProps}
				confirmText={<span>Confirm Action</span>}
			/>,
		)
		expect(getByRole('button', { name: 'Confirm Action' })).toBeInTheDocument()
	})
})
