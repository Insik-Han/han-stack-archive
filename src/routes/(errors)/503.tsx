import { createFileRoute } from '@tanstack/react-router'

import { MaintenanceError } from '~/components/errors/MaintenanceError'

export const Route = createFileRoute('/(errors)/503')({
	component: MaintenanceError,
})
