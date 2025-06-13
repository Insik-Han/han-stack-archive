import { createFileRoute } from '@tanstack/react-router'
import { InternalServerError } from '~/components/errors/InternalServerError'

export const Route = createFileRoute('/(errors)/500')({
	component: InternalServerError,
})
