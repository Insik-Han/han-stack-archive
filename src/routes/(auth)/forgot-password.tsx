import { Link, createFileRoute } from '@tanstack/react-router'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/components/ui/card'
import { ForgotPasswordForm } from '~/features/auth/components/ForgotPasswordForm'

export const Route = createFileRoute('/(auth)/forgot-password')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Card className="gap-4">
			<CardHeader>
				<CardTitle className="text-lg tracking-tight">
					Forgot Password
				</CardTitle>
				<CardDescription>
					Enter your registered email and <br /> we will send you a link to
					reset your password.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ForgotPasswordForm />
			</CardContent>
			<CardFooter>
				<p className="text-muted-foreground px-8 text-center text-sm">
					Don&apos;t have an account?&nbsp;
					<Link
						to="/sign-up"
						className="hover:text-primary underline underline-offset-4"
					>
						Sign up
					</Link>
					.
				</p>
			</CardFooter>
		</Card>
	)
}
