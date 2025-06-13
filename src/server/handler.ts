'server only'

import { RPCHandler } from '@orpc/server/fetch'
import { CORSPlugin } from '@orpc/server/plugins'

import { serverRouter } from './router'

export const serverHandler = new RPCHandler(serverRouter, {
	plugins: [new CORSPlugin()],
})
