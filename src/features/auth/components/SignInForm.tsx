import { zodResolver } from '@hookform/resolvers/zod'
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { PasswordInput } from '~/components/PasswordInput'
import { Button } from '~/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { useSignIn } from '~/features/auth/hooks/use-auth'
import { loginSchema } from '~/schemas/auth'

export function SignInForm() {
	const { mutateAsync, isPending } = useSignIn()

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	async function onSubmit(data: z.infer<typeof loginSchema>) {
		try {
			await mutateAsync(data)
		} catch (_error) {
			// Handle error
			form.setError('root', {
				message: 'Invalid email or password',
			})
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="name@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="relative">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<PasswordInput placeholder="********" {...field} />
							</FormControl>
							<FormMessage />
							<Link
								to="/forgot-password"
								className="text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75"
							>
								Forgot password?
							</Link>
						</FormItem>
					)}
				/>
				<Button type="submit" className="mt-2" disabled={isPending}>
					Login
				</Button>

				<div className="relative my-2">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background text-muted-foreground px-2">
							Or continue with
						</span>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-2">
					<Button variant="outline" type="button" disabled={isPending}>
						<IconBrandGithub className="h-4 w-4" /> GitHub
					</Button>
					<Button variant="outline" type="button" disabled={isPending}>
						<IconBrandFacebook className="h-4 w-4" /> Facebook
					</Button>
				</div>
			</form>
		</Form>
	)
}
