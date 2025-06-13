import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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

type ForgotFormProps = React.HTMLAttributes<HTMLFormElement>

const formSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Please enter your email' })
		.email({ message: 'Invalid email address' }),
})

export function ForgotPasswordForm({ className, ...props }: ForgotFormProps) {
	const [isLoading, setIsLoading] = React.useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { email: '' },
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
				className={cn('grid gap-2', className)}
				{...props}
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="space-y-1">
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="name@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="mt-2" disabled={isLoading}>
					Continue
				</Button>
			</form>
		</Form>
	)
}
