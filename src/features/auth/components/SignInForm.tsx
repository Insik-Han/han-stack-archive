import { zodResolver } from '@hookform/resolvers/zod'
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
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
import { cn } from '~/lib/utils'

type UserAuthFormProps = React.HTMLAttributes<HTMLFormElement>

const formSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Please enter your email' })
		.email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(1, {
			message: 'Please enter your password',
		})
		.min(7, {
			message: 'Password must be at least 7 characters long',
		}),
})

export function SignInForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onSubmit(_data: z.infer<typeof formSchema>) {
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
		}, 3000)
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
				<Button className="mt-2" disabled={isLoading}>
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
					<Button variant="outline" type="button" disabled={isLoading}>
						<IconBrandGithub className="h-4 w-4" /> GitHub
					</Button>
					<Button variant="outline" type="button" disabled={isLoading}>
						<IconBrandFacebook className="h-4 w-4" /> Facebook
					</Button>
				</div>
			</form>
		</Form>
	)
}
