import { serverOnly } from '@tanstack/react-start'
import { tasksRouter } from './routes/tasks'
import { usersRouter } from './routes/users'

const createServerRouter = serverOnly(() => ({
	users: usersRouter,
	tasks: tasksRouter,
}))

export const serverRouter = createServerRouter()

export type ServerRouter = typeof serverRouter
