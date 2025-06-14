import { useForm } from '@tanstack/react-form'
import React from 'react'
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

	const form = useForm({
		defaultValues: { email: '' },
		onSubmit: async () => {
			setIsLoading(true)

			// TODO: Implement password reset logic with authClient
			setTimeout(() => {
				setIsLoading(false)
			}, 3000)
		},
		validators: {
			onChange: formSchema,
		},
	})

	return (
		<Form form={form} className={cn('grid gap-2', className)} {...props}>
			<FormField
				form={form}
				name="email"
				// biome-ignore lint/correctness/noChildrenProp: TanStack Form requires children as a prop
				children={(field) => (
					<FormItem className="space-y-1">
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
			<form.Subscribe
				selector={(state) => [state.canSubmit, state.isSubmitting]}
				// biome-ignore lint/correctness/noChildrenProp: TanStack Form requires children as a prop
				children={([canSubmit, isSubmitting]) => (
					<Button
						type="submit"
						className="mt-2"
						disabled={!canSubmit || isSubmitting || isLoading}
					>
						Continue
					</Button>
				)}
			/>
		</Form>
	)
}
