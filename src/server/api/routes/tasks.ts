import { os, ORPCError } from '@orpc/server'
import {
	TaskCreateArgsSchema,
	TaskDeleteArgsSchema,
	TaskFindManyArgsSchema,
	TaskFindUniqueArgsSchema,
	TaskSchema,
	TaskUpdateArgsSchema,
} from '~/generated/zod'
import { auth } from '~/lib/auth/server'
import { db } from '~/server/db'

const authMiddleware = os
	.$context<{ headers: Headers }>()
	.middleware(async ({ context, next }) => {
		const session = await auth.api.getSession({
			headers: context.headers,
		})

		if (!session) {
			throw new ORPCError('UNAUTHORIZED', {
				message: 'Authentication required',
			})
		}

		return next({ context: { ...context, session } })
	})

const base = os.$context<{ headers: Headers }>().use(authMiddleware)

export const tasksRouter = {
	list: base
		.input(TaskFindManyArgsSchema)
		.output(TaskSchema.array())
		.handler(async ({ input }) => db.task.findMany(input)),
	find: base
		.input(TaskFindUniqueArgsSchema)
		.output(TaskSchema.nullable())
		.handler(async ({ input }) => db.task.findUnique(input)),
	create: base
		.input(TaskCreateArgsSchema)
		.output(TaskSchema)
		.handler(async ({ input }) => db.task.create(input)),
	update: base
		.input(TaskUpdateArgsSchema)
		.output(TaskSchema)
		.handler(async ({ input }) => db.task.update(input)),
	delete: base
		.input(TaskDeleteArgsSchema)
		.output(TaskSchema)
		.handler(async ({ input }) => db.task.delete(input)),
}
