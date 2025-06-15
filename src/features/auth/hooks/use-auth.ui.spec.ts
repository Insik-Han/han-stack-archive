import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import type { ReactNode } from 'react'
import { useAuth } from './use-auth'
import { authClient } from '~/lib/auth/client'

vi.mock('~/lib/auth/client', () => ({
	authClient: {
		useSession: vi.fn(),
		signIn: {
			email: vi.fn(),
		},
		signUp: {
			email: vi.fn(),
		},
		signOut: vi.fn(),
		forgetPassword: vi.fn(),
		resetPassword: vi.fn(),
		verifyEmail: vi.fn(),
	},
}))

describe('useAuth Hook', () => {
	let queryClient: QueryClient

	beforeEach(() => {
		vi.clearAllMocks()
		queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					retry: false,
				},
			},
		})
	})

	const wrapper = ({ children }: { children: ReactNode }) =>
		createElement(QueryClientProvider, { client: queryClient }, children)

	describe('useSession', () => {
		it('should return session data when authenticated', () => {
			const mockSession = {
				data: {
					user: {
						id: '1',
						email: 'test@example.com',
						name: 'Test User',
						emailVerified: true,
					},
					session: {
						id: 'session-1',
						userId: '1',
						expiresAt: new Date(Date.now() + 86400000),
					},
				},
				isPending: false,
				error: null,
			}

			vi.mocked(authClient.useSession).mockReturnValue(mockSession as any)

			const { result } = renderHook(() => useAuth(), { wrapper })

			expect(result.current.user).toEqual(mockSession.data.user)
			expect(result.current.session).toEqual(mockSession.data.session)
			expect(result.current.isAuthenticated).toBe(true)
			expect(result.current.isLoading).toBe(false)
		})

		it('should return null user when not authenticated', () => {
			const mockSession = {
				data: null,
				isPending: false,
				error: null,
			}

			vi.mocked(authClient.useSession).mockReturnValue(mockSession as any)

			const { result } = renderHook(() => useAuth(), { wrapper })

			expect(result.current.user).toBeNull()
			expect(result.current.session).toBeNull()
			expect(result.current.isAuthenticated).toBe(false)
			expect(result.current.isLoading).toBe(false)
		})

		it('should handle loading state', () => {
			const mockSession = {
				data: null,
				isPending: true,
				error: null,
			}

			vi.mocked(authClient.useSession).mockReturnValue(mockSession as any)

			const { result } = renderHook(() => useAuth(), { wrapper })

			expect(result.current.isLoading).toBe(true)
			expect(result.current.isAuthenticated).toBe(false)
		})
	})

	describe('signIn', () => {
		it('should call signIn.email with correct parameters', async () => {
			const mockSignIn = vi.fn().mockResolvedValue({
				data: { success: true },
				error: null,
			})
			vi.mocked(authClient.signIn.email).mockImplementation(mockSignIn)

			vi.mocked(authClient.useSession).mockReturnValue({
				data: null,
				isPending: false,
				error: null,
			} as any)

			const { result } = renderHook(() => useAuth(), { wrapper })

			await result.current.signIn({
				email: 'test@example.com',
				password: 'password123',
			})

			expect(mockSignIn).toHaveBeenCalledWith({
				email: 'test@example.com',
				password: 'password123',
			})
		})

		it('should handle signIn errors', async () => {
			const mockError = new Error('Invalid credentials')
			const mockSignIn = vi.fn().mockRejectedValue(mockError)
			vi.mocked(authClient.signIn.email).mockImplementation(mockSignIn)

			vi.mocked(authClient.useSession).mockReturnValue({
				data: null,
				isPending: false,
				error: null,
			} as any)

			const { result } = renderHook(() => useAuth(), { wrapper })

			await expect(
				result.current.signIn({
					email: 'test@example.com',
					password: 'wrong-password',
				})
			).rejects.toThrow('Invalid credentials')
		})
	})

	describe('signUp', () => {
		it('should call signUp.email with correct parameters', async () => {
			const mockSignUp = vi.fn().mockResolvedValue({
				data: { success: true },
				error: null,
			})
			vi.mocked(authClient.signUp.email).mockImplementation(mockSignUp)

			vi.mocked(authClient.useSession).mockReturnValue({
				data: null,
				isPending: false,
				error: null,
			} as any)

			const { result } = renderHook(() => useAuth(), { wrapper })

			await result.current.signUp({
				email: 'newuser@example.com',
				password: 'password123',
				name: 'New User',
			})

			expect(mockSignUp).toHaveBeenCalledWith({
				email: 'newuser@example.com',
				password: 'password123',
				name: 'New User',
			})
		})
	})

	describe('signOut', () => {
		it('should call signOut function', async () => {
			const mockSignOut = vi.fn().mockResolvedValue({ success: true })
			vi.mocked(authClient.signOut).mockImplementation(mockSignOut)

			vi.mocked(authClient.useSession).mockReturnValue({
				data: {
					user: { id: '1' },
					session: { id: 'session-1' },
				},
				isPending: false,
				error: null,
			} as any)

			const { result } = renderHook(() => useAuth(), { wrapper })

			await result.current.signOut()

			expect(mockSignOut).toHaveBeenCalled()
		})
	})

	describe('forgetPassword', () => {
		it('should call forgetPassword with email', async () => {
			const mockForgetPassword = vi.fn().mockResolvedValue({ success: true })
			vi.mocked(authClient.forgetPassword).mockImplementation(mockForgetPassword)

			vi.mocked(authClient.useSession).mockReturnValue({
				data: null,
				isPending: false,
				error: null,
			} as any)

			const { result } = renderHook(() => useAuth(), { wrapper })

			await result.current.forgetPassword({ email: 'forgot@example.com' })

			expect(mockForgetPassword).toHaveBeenCalledWith({
				email: 'forgot@example.com',
				redirectTo: '/auth/reset-password',
			})
		})
	})

	describe('resetPassword', () => {
		it('should call resetPassword with new password', async () => {
			const mockResetPassword = vi.fn().mockResolvedValue({ success: true })
			vi.mocked(authClient.resetPassword).mockImplementation(mockResetPassword)

			vi.mocked(authClient.useSession).mockReturnValue({
				data: null,
				isPending: false,
				error: null,
			} as any)

			const { result } = renderHook(() => useAuth(), { wrapper })

			await result.current.resetPassword({ newPassword: 'newpassword123' })

			expect(mockResetPassword).toHaveBeenCalledWith({
				newPassword: 'newpassword123',
			})
		})
	})

	describe('verifyEmail', () => {
		it('should call verifyEmail with token', async () => {
			const mockVerifyEmail = vi.fn().mockResolvedValue({ success: true })
			vi.mocked(authClient.verifyEmail).mockImplementation(mockVerifyEmail)

			vi.mocked(authClient.useSession).mockReturnValue({
				data: null,
				isPending: false,
				error: null,
			} as any)

			const { result } = renderHook(() => useAuth(), { wrapper })

			await result.current.verifyEmail({ token: 'verification-token-123' })

			expect(mockVerifyEmail).toHaveBeenCalledWith({
				token: 'verification-token-123',
			})
		})
	})
})