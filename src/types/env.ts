import type { D1Database } from '@cloudflare/workers-types'

export interface Env {
	DB: D1Database
	BETTER_AUTH_SECRET: string
	[key: string]: unknown
}
