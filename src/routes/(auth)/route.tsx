import { Outlet, createFileRoute } from '@tanstack/react-router'
import AuthLayout from '~/features/auth/components/AuthLayout'

export const Route = createFileRoute('/(auth)')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	)
}
