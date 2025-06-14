import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { SelectDropdown } from '~/components/SelectDropdown'
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
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '~/components/ui/sheet'
import { showSubmittedData } from '~/utils/show-submitted-data'
import type { Task } from '../../schema/tasks'

interface Props {
	open: boolean
	onOpenChange: (open: boolean) => void
	currentRow?: Task
}

const formSchema = z.object({
	title: z.string().min(1, 'Title is required.'),
	status: z.string().min(1, 'Please select a status.'),
	label: z.string().min(1, 'Please select a label.'),
	priority: z.string().min(1, 'Please choose a priority.'),
})

export function TasksMutateDrawer({ open, onOpenChange, currentRow }: Props) {
	const isUpdate = !!currentRow

	const form = useForm({
		defaultValues: currentRow ?? {
			title: '',
			status: '',
			label: '',
			priority: '',
		},
		onSubmit: ({ value }) => {
			// do something with the form data
			onOpenChange(false)
			form.reset()
			showSubmittedData(value)
		},
		validators: {
			onChange: formSchema,
		},
	})

	return (
		<Sheet
			open={open}
			onOpenChange={(v) => {
				onOpenChange(v)
				form.reset()
			}}
		>
			<SheetContent className="flex flex-col">
				<SheetHeader className="text-left">
					<SheetTitle>{isUpdate ? 'Update' : 'Create'} Task</SheetTitle>
					<SheetDescription>
						{isUpdate
							? 'Update the task by providing necessary info.'
							: 'Add a new task by providing necessary info.'}
						Click save when you&apos;re done.
					</SheetDescription>
				</SheetHeader>
				<Form form={form} id="tasks-form" className="flex-1 space-y-5 px-4">
					<FormField
						form={form}
						name="title"
						// biome-ignore lint/correctness/noChildrenProp: TanStack Form requires children as a prop
						children={(field) => (
							<FormItem className="space-y-1">
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="Enter a title"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						form={form}
						name="status"
						// biome-ignore lint/correctness/noChildrenProp: TanStack Form requires children as a prop
						children={(field) => (
							<FormItem className="space-y-1">
								<FormLabel>Status</FormLabel>
								<SelectDropdown
									defaultValue={field.state.value}
									onValueChange={field.handleChange}
									placeholder="Select dropdown"
									isControlled={true}
									items={[
										{ label: 'In Progress', value: 'in progress' },
										{ label: 'Backlog', value: 'backlog' },
										{ label: 'Todo', value: 'todo' },
										{ label: 'Canceled', value: 'canceled' },
										{ label: 'Done', value: 'done' },
									]}
								/>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						form={form}
						name="label"
						// biome-ignore lint/correctness/noChildrenProp: TanStack Form requires children as a prop
						children={(field) => (
							<FormItem className="relative space-y-3">
								<FormLabel>Label</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.handleChange}
										value={field.state.value}
										className="flex flex-col space-y-1"
									>
										<FormItem className="flex items-center space-y-0 space-x-3">
											<FormControl>
												<RadioGroupItem value="documentation" />
											</FormControl>
											<FormLabel className="font-normal">
												Documentation
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-y-0 space-x-3">
											<FormControl>
												<RadioGroupItem value="feature" />
											</FormControl>
											<FormLabel className="font-normal">Feature</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-y-0 space-x-3">
											<FormControl>
												<RadioGroupItem value="bug" />
											</FormControl>
											<FormLabel className="font-normal">Bug</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						form={form}
						name="priority"
						// biome-ignore lint/correctness/noChildrenProp: TanStack Form requires children as a prop
						children={(field) => (
							<FormItem className="relative space-y-3">
								<FormLabel>Priority</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.handleChange}
										value={field.state.value}
										className="flex flex-col space-y-1"
									>
										<FormItem className="flex items-center space-y-0 space-x-3">
											<FormControl>
												<RadioGroupItem value="high" />
											</FormControl>
											<FormLabel className="font-normal">High</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-y-0 space-x-3">
											<FormControl>
												<RadioGroupItem value="medium" />
											</FormControl>
											<FormLabel className="font-normal">Medium</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-y-0 space-x-3">
											<FormControl>
												<RadioGroupItem value="low" />
											</FormControl>
											<FormLabel className="font-normal">Low</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</Form>
				<SheetFooter className="gap-2">
					<SheetClose asChild={true}>
						<Button variant="outline">Close</Button>
					</SheetClose>
					<Button form="tasks-form" type="submit">
						Save changes
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
