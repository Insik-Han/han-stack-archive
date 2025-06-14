import { serverOnly } from '@tanstack/react-start'
import { usersRouter } from './routes/users'

const createServerRouter = serverOnly(() => ({
	users: usersRouter,
}))

export const serverRouter = createServerRouter()

export type ServerRouter = typeof serverRouter
