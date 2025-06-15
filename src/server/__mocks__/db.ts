import type { PrismaClient } from '@prisma/client'
import { beforeEach } from 'vitest'
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended'

export const prismaMock = mockDeep<PrismaClient>() as DeepMockProxy<PrismaClient>

beforeEach(() => {
	mockReset(prismaMock)
})

export const db = prismaMock