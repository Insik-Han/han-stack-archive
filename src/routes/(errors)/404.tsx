import { createFileRoute } from '@tanstack/react-router'

import { NotFoundError } from '~/components/errors/NotFoundError'

export const Route = createFileRoute('/(errors)/404')({
	component: NotFoundError,
})
