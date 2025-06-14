import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
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
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '~/components/ui/input-otp'
import { cn } from '~/lib/utils'
import { showSubmittedData } from '~/utils/show-submitted-data'

type OtpFormProps = React.HTMLAttributes<HTMLFormElement>

const formSchema = z.object({
	otp: z.string().min(1, { message: 'Please enter your otp code.' }),
})

export function OtpForm({ className, ...props }: OtpFormProps) {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = React.useState(false)

	const form = useForm({
		defaultValues: { otp: '' },
		onSubmit: async ({ value }) => {
			setIsLoading(true)
			showSubmittedData(value)

			setTimeout(() => {
				setIsLoading(false)
				navigate({ to: '/' })
			}, 1000)
		},
		validators: {
			onChange: formSchema,
		},
	})

	return (
		<Form form={form} className={cn('grid gap-2', className)} {...props}>
			<FormField
				form={form}
				name="otp"
				// biome-ignore lint/correctness/noChildrenProp: TanStack Form requires children as a prop
				children={(field) => (
					<FormItem>
						<FormLabel className="sr-only">One-Time Password</FormLabel>
						<FormControl>
							<InputOTP
								maxLength={6}
								value={field.state.value}
								onChange={field.handleChange}
								onBlur={field.handleBlur}
								containerClassName='justify-between sm:[&>[data-slot="input-otp-group"]>div]:w-12'
							>
								<InputOTPGroup>
									<InputOTPSlot index={0} />
									<InputOTPSlot index={1} />
								</InputOTPGroup>
								<InputOTPSeparator />
								<InputOTPGroup>
									<InputOTPSlot index={2} />
									<InputOTPSlot index={3} />
								</InputOTPGroup>
								<InputOTPSeparator />
								<InputOTPGroup>
									<InputOTPSlot index={4} />
									<InputOTPSlot index={5} />
								</InputOTPGroup>
							</InputOTP>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<form.Field name="otp">
				{(field) => (
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						// biome-ignore lint/correctness/noChildrenProp: TanStack Form requires children as a prop
						children={([canSubmit, isSubmitting]) => (
							<Button
								type="submit"
								className="mt-2"
								disabled={
									field.state.value.length < 6 ||
									!canSubmit ||
									isSubmitting ||
									isLoading
								}
							>
								Verify
							</Button>
						)}
					/>
				)}
			</form.Field>
		</Form>
	)
}
