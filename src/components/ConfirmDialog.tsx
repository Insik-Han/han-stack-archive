import type { ReactNode } from 'react'
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from './ui/alert-dialog'
import { Button } from './ui/button'

interface Props {
	open: boolean
	onOpenChange: (open: boolean) => void
	title: ReactNode
	disabled?: boolean
	desc: ReactNode
	cancelBtnText?: string
	confirmText?: ReactNode
	destructive?: boolean
	handleConfirm: () => void
	isLoading?: boolean
	className?: string
	children?: ReactNode
}

export function ConfirmDialog(props: Props) {
	const {
		title,
		desc,
		children,
		className,
		confirmText,
		cancelBtnText,
		destructive,
		isLoading,
		disabled = false,
		handleConfirm,
		...actions
	} = props
	return (
		<AlertDialog {...actions}>
			<AlertDialogContent className={className}>
				<AlertDialogHeader className="text-left">
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription asChild={true}>
						<div>{desc}</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				{children}
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoading}>
						{cancelBtnText ?? 'Cancel'}
					</AlertDialogCancel>
					<Button
						variant={destructive ? 'destructive' : 'default'}
						onClick={handleConfirm}
						disabled={disabled || isLoading}
					>
						{confirmText ?? 'Continue'}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
