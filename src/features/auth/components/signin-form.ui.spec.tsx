import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { SignInForm } from './signin-form'
import { useAuth } from '../hooks/use-auth'
import { useNavigate } from '@tanstack/react-router'

vi.mock('../hooks/use-auth', () => ({
	useAuth: vi.fn(),
}))

vi.mock('@tanstack/react-router', () => ({
	useNavigate: vi.fn(),
	Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

vi.mock('~/components/ui/icons', () => ({
	Icons: {
		spinner: () => <div data-testid="spinner">Loading...</div>,
	},
}))

describe('SignInForm', () => {
	const mockSignIn = vi.fn()
	const mockNavigate = vi.fn()

	beforeEach(() => {
		vi.clearAllMocks()
		vi.mocked(useAuth).mockReturnValue({
			signIn: mockSignIn,
			signUp: vi.fn(),
			signOut: vi.fn(),
			forgetPassword: vi.fn(),
			resetPassword: vi.fn(),
			verifyEmail: vi.fn(),
			user: null,
			session: null,
			isAuthenticated: false,
			isLoading: false,
		})
		vi.mocked(useNavigate).mockReturnValue(mockNavigate)
	})

	it('should render sign in form with all fields', () => {
		render(<SignInForm />)

		expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument()
		expect(screen.getByText('Enter your email below to sign in to your account')).toBeInTheDocument()
		expect(screen.getByLabelText('Email')).toBeInTheDocument()
		expect(screen.getByLabelText('Password')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
		expect(screen.getByRole('link', { name: 'Forgot password?' })).toBeInTheDocument()
		expect(screen.getByRole('link', { name: 'Sign up' })).toBeInTheDocument()
	})

	it('should handle form submission with valid data', async () => {
		const user = userEvent.setup()
		mockSignIn.mockResolvedValue({ success: true })

		render(<SignInForm />)

		const emailInput = screen.getByLabelText('Email')
		const passwordInput = screen.getByLabelText('Password')
		const submitButton = screen.getByRole('button', { name: 'Sign In' })

		await user.type(emailInput, 'test@example.com')
		await user.type(passwordInput, 'password123')
		await user.click(submitButton)

		await waitFor(() => {
			expect(mockSignIn).toHaveBeenCalledWith({
				email: 'test@example.com',
				password: 'password123',
			})
			expect(mockNavigate).toHaveBeenCalledWith({ to: '/' })
		})
	})

	it('should show validation errors for invalid input', async () => {
		const user = userEvent.setup()

		render(<SignInForm />)

		const submitButton = screen.getByRole('button', { name: 'Sign In' })
		await user.click(submitButton)

		await waitFor(() => {
			expect(screen.getByText('Email is required')).toBeInTheDocument()
			expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument()
		})

		expect(mockSignIn).not.toHaveBeenCalled()
	})

	it('should display error message on sign in failure', async () => {
		const user = userEvent.setup()
		mockSignIn.mockRejectedValue(new Error('Invalid credentials'))

		render(<SignInForm />)

		const emailInput = screen.getByLabelText('Email')
		const passwordInput = screen.getByLabelText('Password')
		const submitButton = screen.getByRole('button', { name: 'Sign In' })

		await user.type(emailInput, 'test@example.com')
		await user.type(passwordInput, 'wrongpassword')
		await user.click(submitButton)

		await waitFor(() => {
			expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
		})

		expect(mockNavigate).not.toHaveBeenCalled()
	})

	it('should show loading state during submission', async () => {
		const user = userEvent.setup()
		mockSignIn.mockImplementation(() => new Promise(() => {})) // Never resolves

		render(<SignInForm />)

		const emailInput = screen.getByLabelText('Email')
		const passwordInput = screen.getByLabelText('Password')
		const submitButton = screen.getByRole('button', { name: 'Sign In' })

		await user.type(emailInput, 'test@example.com')
		await user.type(passwordInput, 'password123')
		await user.click(submitButton)

		await waitFor(() => {
			expect(screen.getByTestId('spinner')).toBeInTheDocument()
			expect(submitButton).toBeDisabled()
		})
	})

	it('should validate email format', async () => {
		const user = userEvent.setup()

		render(<SignInForm />)

		const emailInput = screen.getByLabelText('Email')
		const passwordInput = screen.getByLabelText('Password')
		const submitButton = screen.getByRole('button', { name: 'Sign In' })

		await user.type(emailInput, 'invalid-email')
		await user.type(passwordInput, 'password123')
		await user.click(submitButton)

		await waitFor(() => {
			expect(screen.getByText('Invalid email address')).toBeInTheDocument()
		})

		expect(mockSignIn).not.toHaveBeenCalled()
	})

	it('should have correct links', () => {
		render(<SignInForm />)

		const forgotPasswordLink = screen.getByRole('link', { name: 'Forgot password?' })
		const signUpLink = screen.getByRole('link', { name: 'Sign up' })

		expect(forgotPasswordLink).toHaveAttribute('href', '/auth/forgot-password')
		expect(signUpLink).toHaveAttribute('href', '/auth/signup')
	})
})