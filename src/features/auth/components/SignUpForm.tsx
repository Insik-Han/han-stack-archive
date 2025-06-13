import { zodResolver } from '@hookform/resolvers/zod'
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { authClient } from '~/lib/auth-client'
import { cn } from '~/lib/utils'

type SignUpFormProps = React.HTMLAttributes<HTMLFormElement>

const formSchema = z
	.object({
		name: z.string().min(1, { message: 'Please enter your name' }),
		email: z
			.string()
			.min(1, { message: 'Please enter your email' })
			.email({ message: 'Invalid email address' }),
		password: z
			.string()
			.min(1, {
				message: 'Please enter your password',
			})
			.min(8, {
				message: 'Password must be at least 8 characters long',
			}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match.",
		path: ['confirmPassword'],
	})

export function SignUpForm({ className, ...props }: SignUpFormProps) {
	const [isLoading, setIsLoading] = React.useState(false)
	const navigate = useNavigate()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	async function onSubmit(data: z.infer<typeof formSchema>) {
		setIsLoading(true)

		try {
			const response = await authClient.signUp.email({
				name: data.name,
				email: data.email,
				password: data.password,
			})

			if (response.data) {
				// Navigate to sign in page or dashboard after successful signup
				navigate({ to: '/sign-in' })
			}
		} catch (_error) {
			// Handle error
			form.setError('root', {
				message: 'Failed to create account. Please try again.',
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn('grid gap-3', className)}
				{...props}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<PasswordInput placeholder="********" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<PasswordInput placeholder="********" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="mt-2" disabled={isLoading}>
					Create Account
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
					<Button
						variant="outline"
						className="w-full"
						type="button"
						disabled={isLoading}
					>
						<IconBrandGithub className="h-4 w-4" /> GitHub
					</Button>
					<Button
						variant="outline"
						className="w-full"
						type="button"
						disabled={isLoading}
					>
						<IconBrandFacebook className="h-4 w-4" /> Facebook
					</Button>
				</div>
			</form>
		</Form>
	)
}
