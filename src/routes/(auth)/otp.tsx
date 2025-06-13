import { Link, createFileRoute } from '@tanstack/react-router'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/components/ui/card'
import { OtpForm } from '~/features/auth/components/OtpForm'

export const Route = createFileRoute('/(auth)/otp')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Card className="gap-4">
			<CardHeader>
				<CardTitle className="text-base tracking-tight">
					Two-factor Authentication
				</CardTitle>
				<CardDescription>
					Please enter the authentication code. <br /> We have sent the
					authentication code to your email.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<OtpForm />
			</CardContent>
			<CardFooter>
				<p className="text-muted-foreground px-8 text-center text-sm">
					Haven&apos;t received it?&nbsp;
					<Link
						to="/sign-in"
						className="hover:text-primary underline underline-offset-4"
					>
						Resend a new code.
					</Link>
					.
				</p>
			</CardFooter>
		</Card>
	)
}
