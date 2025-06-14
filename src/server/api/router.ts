import { serverOnly } from '@tanstack/react-start'
import { authRouter } from './routes/auth'
import { usersRouter } from './routes/users'

const createServerRouter = serverOnly(() => ({
	auth: authRouter,
	users: usersRouter,
}))

export const serverRouter = createServerRouter()

export type ServerRouter = typeof serverRouter
