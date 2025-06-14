import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '~/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { fileSchema } from '~/utils/schema'
import { showSubmittedData } from '~/utils/show-submitted-data'

const formSchema = z.object({
	file: fileSchema
		.refine((files) => files.length > 0, {
			message: 'Please upload a file',
		})
		.refine(
			(files) => ['text/csv'].includes(files?.[0]?.type),
			'Please upload csv format.',
		),
})

interface Props {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function TasksImportDialog({ open, onOpenChange }: Props) {
	const form = useForm({
		defaultValues: { file: undefined as FileList | undefined },
		onSubmit: ({ value }) => {
			const file = value.file

			if (file?.[0]) {
				const fileDetails = {
					name: file[0].name,
					size: file[0].size,
					type: file[0].type,
				}
				showSubmittedData(fileDetails, 'You have imported the following file:')
			}
			onOpenChange(false)
		},
		validators: {
			onChange: formSchema,
		},
	})

	return (
		<Dialog
			open={open}
			onOpenChange={(val) => {
				onOpenChange(val)
				form.reset()
			}}
		>
			<DialogContent className="gap-2 sm:max-w-sm">
				<DialogHeader className="text-left">
					<DialogTitle>Import Tasks</DialogTitle>
					<DialogDescription>
						Import tasks quickly from a CSV file.
					</DialogDescription>
				</DialogHeader>
				<Form form={form} id="task-import-form">
					<FormField
						form={form}
						name="file"
						// biome-ignore lint/correctness/noChildrenProp: TanStack Form requires children as a prop
						children={(field) => (
							<FormItem className="mb-2 space-y-1">
								<FormLabel>File</FormLabel>
								<FormControl>
									<Input
										type="file"
										className="h-8"
										onChange={(e) => {
											const files = e.target.files
											field.handleChange(files || undefined)
										}}
										onBlur={field.handleBlur}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</Form>
				<DialogFooter className="gap-2">
					<DialogClose asChild={true}>
						<Button variant="outline">Close</Button>
					</DialogClose>
					<Button type="submit" form="task-import-form">
						Import
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
