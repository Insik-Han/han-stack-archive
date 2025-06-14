import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import React from 'react'
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

	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		onSubmit: async ({ value }) => {
			setIsLoading(true)

			try {
				const response = await authClient.signUp.email({
					name: value.name,
					email: value.email,
					password: value.password,
				})

				if (response.data) {
					// Navigate to sign in page or dashboard after successful signup
					navigate({ to: '/sign-in' })
				}
			} catch (_error) {
				// Handle error - show error on email field
				form.setFieldMeta('email', (prev) => ({
					...prev,
					errors: ['Failed to create account. Please try again.'],
				}))
			} finally {
				setIsLoading(false)
			}
		},
		validators: {
			onChange: formSchema,
		},
	})

	return (
		<Form form={form} className={cn('grid gap-3', className)} {...props}>
			<FormField
				form={form}
				name="name"
				// biome-ignore lint/correctness/noChildrenProp: TanStack Form requires children as a prop
				children={(field) => (
					<FormItem>
						<FormLabel>Name</FormLabel>
						<FormControl>
							<Input
								placeholder="John Doe"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				form={form}
				name="email"
				// biome-ignore lint/correctness/noChildrenProp: TanStack Form requires children as a prop
				children={(field) => (
					<FormItem>
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input
								placeholder="name@example.com"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				form={form}
				name="password"
				// biome-ignore lint/correctness/noChildrenProp: TanStack Form requires children as a prop
				children={(field) => (
					<FormItem>
						<FormLabel>Password</FormLabel>
						<FormControl>
							<PasswordInput
								placeholder="********"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				form={form}
				name="confirmPassword"
				// biome-ignore lint/correctness/noChildrenProp: TanStack Form requires children as a prop
				children={(field) => (
					<FormItem>
						<FormLabel>Confirm Password</FormLabel>
						<FormControl>
							<PasswordInput
								placeholder="********"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<form.Subscribe
				selector={(state) => [state.canSubmit, state.isSubmitting]}
				// biome-ignore lint/correctness/noChildrenProp: TanStack Form requires children as a prop
				children={([canSubmit, isSubmitting]) => (
					<Button
						type="submit"
						className="mt-2"
						disabled={!canSubmit || isSubmitting || isLoading}
					>
						Create Account
					</Button>
				)}
			/>

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
		</Form>
	)
}
