import { IconEye, IconEyeOff } from '@tabler/icons-react'
import React from 'react'
import { cn } from '~/lib/utils'
import { Button } from './ui/button'

type Props = Omit<React.ComponentPropsWithRef<'input'>, 'type'>

export function PasswordInput({ className, disabled, ...props }: Props) {
	const [showPassword, setShowPassword] = React.useState(false)
	return (
		<div className={cn('relative rounded-md', className)}>
			<input
				type={showPassword ? 'text' : 'password'}
				className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
				disabled={disabled}
				{...props}
			/>
			<Button
				type="button"
				size="icon"
				variant="ghost"
				disabled={disabled}
				className="text-muted-foreground absolute top-1/2 right-1 h-6 w-6 -translate-y-1/2 rounded-md"
				onClick={() => setShowPassword((prev) => !prev)}
			>
				{showPassword ? <IconEye size={18} /> : <IconEyeOff size={18} />}
			</Button>
		</div>
	)
}
