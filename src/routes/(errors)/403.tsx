import { createFileRoute } from '@tanstack/react-router'

import { ForbiddenError } from '~/components/errors/ForbiddenError'

export const Route = createFileRoute('/(errors)/403')({
	component: ForbiddenError,
})
