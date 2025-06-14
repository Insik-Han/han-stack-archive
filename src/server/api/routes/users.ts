import { os, ORPCError } from '@orpc/server'
import {
	UserCreateArgsSchema,
	UserDeleteArgsSchema,
	UserFindManyArgsSchema,
	UserFindUniqueArgsSchema,
	UserSchema,
	UserUpdateArgsSchema,
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

export const usersRouter = {
	list: base
		.input(UserFindManyArgsSchema)
		.output(UserSchema.array())
		.handler(async ({ input }) => db.user.findMany(input)),
	find: base
		.input(UserFindUniqueArgsSchema)
		.output(UserSchema.nullable())
		.handler(async ({ input }) => db.user.findUnique(input)),
	create: base
		.input(UserCreateArgsSchema)
		.output(UserSchema)
		.handler(async ({ input }) => db.user.create(input)),
	update: base
		.input(UserUpdateArgsSchema)
		.output(UserSchema)
		.handler(async ({ input }) => db.user.update(input)),
	delete: base
		.input(UserDeleteArgsSchema)
		.output(UserSchema)
		.handler(async ({ input }) => db.user.delete(input)),
}
