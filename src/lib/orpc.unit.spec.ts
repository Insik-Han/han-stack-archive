import { describe, expect, it, vi } from 'vitest'

// Mock the constants
vi.mock('~/constants/rpc', () => ({
	RPC_PATH_PREFIX: '/api/rpc',
}))

// Mock TanStack Start server functions
vi.mock('@tanstack/react-start', () => ({
	createIsomorphicFn: vi.fn(() => ({
		server: vi.fn(() => ({})),
		client: vi.fn(() => ({})),
	})),
}))

vi.mock('@tanstack/react-start/server', () => ({
	getWebRequest: vi.fn(),
}))

// Mock the server router
vi.mock('~/server/api/router', () => ({
	serverRouter: {},
}))

// Mock ORPC packages
vi.mock('@orpc/client', () => ({
	createORPCClient: vi.fn(() => ({})),
}))

vi.mock('@orpc/client/fetch', () => ({
	RPCLink: vi.fn(),
}))

// Import after mocks are set up
const { orpc } = await import('./orpc')

import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'

describe('ORPC Client Configuration', () => {
	it('should create ORPC client with correct configuration', () => {
		const mockCreateORPCClient = vi.mocked(createORPCClient)
		const mockRPCLink = vi.mocked(RPCLink)

		expect(mockRPCLink).toHaveBeenCalled()
		expect(mockCreateORPCClient).toHaveBeenCalled()
	})

	it('should export orpc client instance', () => {
		expect(orpc).toBeDefined()
	})
})