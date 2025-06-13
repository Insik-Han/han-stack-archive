import { os } from '@orpc/server'

import {
	UserCreateArgsSchema,
	UserDeleteArgsSchema,
	UserFindManyArgsSchema,
	UserFindUniqueArgsSchema,
	UserSchema,
	UserUpdateArgsSchema,
} from '~/generated/zod'
import { db } from '~/server/prisma'

export const usersRouter = {
	list: os
		.input(UserFindManyArgsSchema)
		.output(UserSchema.array())
		.handler(async ({ input }) => db.user.findMany(input)),
	find: os
		.input(UserFindUniqueArgsSchema)
		.output(UserSchema.nullable())
		.handler(async ({ input }) => db.user.findUnique(input)),
	create: os
		.input(UserCreateArgsSchema)
		.output(UserSchema)
		.handler(async ({ input }) => db.user.create(input)),
	update: os
		.input(UserUpdateArgsSchema)
		.output(UserSchema)
		.handler(async ({ input }) => db.user.update(input)),
	delete: os
		.input(UserDeleteArgsSchema)
		.output(UserSchema)
		.handler(async ({ input }) => db.user.delete(input)),
}
