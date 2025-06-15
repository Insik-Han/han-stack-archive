import { serverOnly } from '@tanstack/react-start'
import { usersRouter } from './routes/users'
import { tasksRouter } from './routes/tasks'

const createServerRouter = serverOnly(() => ({
	users: usersRouter,
	tasks: tasksRouter,
}))

export const serverRouter = createServerRouter()

export type ServerRouter = typeof serverRouter
