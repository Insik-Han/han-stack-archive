import { createFileRoute } from '@tanstack/react-router'
import { Header } from '~/components/layout/Header'
import { Main } from '~/components/layout/Main'

export const Route = createFileRoute('/_admin-console/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<Header topNavLinks={topNavLinks} />

			<Main>Dashboard</Main>
		</>
	)
}

const topNavLinks = [
	{
		title: 'Overview',
		href: 'dashboard/overview',
		isActive: true,
		disabled: false,
	},
	{
		title: 'Customers',
		href: 'dashboard/customers',
		isActive: false,
		disabled: true,
	},
	{
		title: 'Products',
		href: 'dashboard/products',
		isActive: false,
		disabled: true,
	},
	{
		title: 'Settings',
		href: 'dashboard/settings',
		isActive: false,
		disabled: true,
	},
]
