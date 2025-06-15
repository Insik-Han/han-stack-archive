import { describe, expect, it, vi, beforeEach } from 'vitest'
import { RPCHandler } from '@orpc/server/fetch'

// Mock the router to avoid circular dependencies
vi.mock('~/server/api/router', () => ({
	router: {
		auth: {},
		tasks: {},
		users: {},
	},
}))

// Mock RPCHandler
vi.mock('@orpc/server/fetch')

describe('RPC API Handler', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should handle RPC requests', async () => {
		const mockHandle = vi.fn().mockResolvedValue({
			response: new Response('{}', { status: 200 }),
			matched: true,
		})

		vi.mocked(RPCHandler).mockImplementation(() => ({
			handle: mockHandle,
		} as any))

		// Dynamic import to get fresh instance with mocks
		const { handler } = await import('~/routes/api/rpc.$')

		const mockRequest = new Request('http://localhost:3000/api/rpc/test')
		const result = await handler({ request: mockRequest })

		expect(result).toBeInstanceOf(Response)
		expect(result.status).toBe(200)
	})

	it('should return 404 when handler returns no response', async () => {
		const mockHandle = vi.fn().mockResolvedValue({
			response: undefined,
			matched: false,
		})

		vi.mocked(RPCHandler).mockImplementation(() => ({
			handle: mockHandle,
		} as any))

		const { handler } = await import('~/routes/api/rpc.$')

		const mockRequest = new Request('http://localhost:3000/api/rpc/unknown')
		const result = await handler({ request: mockRequest })

		expect(result.status).toBe(404)
		const text = await result.text()
		expect(text).toBe('Not found')
	})
})