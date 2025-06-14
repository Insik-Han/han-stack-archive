import { z } from 'zod'

export const loginSchema = z.object({
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

export const registerSchema = z
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
