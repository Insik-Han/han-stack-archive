import { createFileRoute } from '@tanstack/react-router'
import { ComingSoon } from '~/components/ComingSoon'

export const Route = createFileRoute('/_admin-console/help-center/')({
	component: ComingSoon,
})
