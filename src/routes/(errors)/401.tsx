import { createFileRoute } from '@tanstack/react-router'

import { UnauthorizedError } from '~/components/errors/UnauthorizedError'

export const Route = createFileRoute('/(errors)/401')({
	component: UnauthorizedError,
})
