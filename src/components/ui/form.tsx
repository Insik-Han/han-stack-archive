import { Label as LabelPrimitive, Slot as SlotPrimitive } from 'radix-ui'
import React from 'react'
import { cn } from '~/lib/utils'
import { Label } from './label'

// biome-ignore lint/suspicious/noExplicitAny: TanStack Form requires many type parameters
type FormInstance = any

// Form context to hold the form instance
type FormContextValue = {
	form: FormInstance
}

const FormContext = React.createContext<FormContextValue | null>(null)

// Form component that provides the form instance to children
export function Form({
	form,
	children,
	...props
}: React.ComponentPropsWithoutRef<'form'> & {
	form: FormInstance
}) {
	return (
		<FormContext.Provider value={{ form }}>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					form.handleSubmit()
				}}
				{...props}
			>
				{children}
			</form>
		</FormContext.Provider>
	)
}

// Field context to hold field information
type FormFieldContextValue = {
	// biome-ignore lint/suspicious/noExplicitAny: TanStack Form field type
	field: any
	name: string
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

// FormField component that wraps TanStack Form's field
interface FormFieldProps {
	form: FormInstance
	name: string
	// biome-ignore lint/suspicious/noExplicitAny: TanStack Form field type
	children: (field: any) => React.ReactNode
}

export function FormField({ form, name, children }: FormFieldProps) {
	const FieldComponent = form.Field

	return (
		<FieldComponent name={name}>
			{(field: FormFieldContextValue['field']) => (
				<FormFieldContext.Provider value={{ field, name }}>
					{children(field)}
				</FormFieldContext.Provider>
			)}
		</FieldComponent>
	)
}

// Hook to access form field context
export const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext)
	const itemContext = React.useContext(FormItemContext)

	if (!fieldContext) {
		throw new Error('useFormField should be used within <FormField>')
	}

	const { id } = itemContext || { id: '' }
	const { field } = fieldContext
	const state = field.state

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		// Map TanStack Form state to React Hook Form-like structure
		error:
			state.meta.errors.length > 0
				? { message: state.meta.errors.join(', ') }
				: undefined,
		isDirty: state.meta.isDirty,
		isTouched: state.meta.isTouched,
		invalid: !state.meta.isValid,
		// Include the field API for direct access
		field,
	}
}

// FormItem context and component
type FormItemContextValue = {
	id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue,
)

export function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
	const id = React.useId()

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				data-slot="form-item"
				className={cn('grid gap-2', className)}
				{...props}
			/>
		</FormItemContext.Provider>
	)
}

// FormLabel component
export function FormLabel({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
	const { error, formItemId } = useFormField()

	return (
		<Label
			data-slot="form-label"
			data-error={!!error}
			className={cn('data-[error=true]:text-destructive', className)}
			htmlFor={formItemId}
			{...props}
		/>
	)
}

// FormControl component
export function FormControl({
	...props
}: React.ComponentProps<typeof SlotPrimitive.Slot>) {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

	return (
		<SlotPrimitive.Slot
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	)
}

// FormDescription component
export function FormDescription({
	className,
	...props
}: React.ComponentProps<'p'>) {
	const { formDescriptionId } = useFormField()

	return (
		<p
			data-slot="form-description"
			id={formDescriptionId}
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	)
}

// FormMessage component
export function FormMessage({
	className,
	...props
}: React.ComponentProps<'p'>) {
	const { error, formMessageId } = useFormField()
	const body = error ? String(error?.message ?? '') : props.children

	if (!body) {
		return null
	}

	return (
		<p
			data-slot="form-message"
			id={formMessageId}
			className={cn('text-destructive text-sm', className)}
			{...props}
		>
			{body}
		</p>
	)
}

// Helper component for submit button state
export function FormSubmit({
	children,
	className,
	...props
}: React.ComponentPropsWithoutRef<'button'>) {
	const context = React.useContext(FormContext)
	if (!context) {
		throw new Error('FormSubmit must be used within Form')
	}

	const { form } = context
	const SubscribeComponent = form.Subscribe

	return (
		<SubscribeComponent
			// biome-ignore lint/suspicious/noExplicitAny: TanStack Form state type
			selector={(state: any) => [state.canSubmit, state.isSubmitting]}
		>
			{([canSubmit, isSubmitting]: [boolean, boolean]) => (
				<button
					type="submit"
					disabled={!canSubmit || isSubmitting}
					className={className}
					{...props}
				>
					{typeof children === 'function'
						? (
								children as (props: {
									canSubmit: boolean
									isSubmitting: boolean
								}) => React.ReactNode
							)({ canSubmit, isSubmitting })
						: children}
				</button>
			)}
		</SubscribeComponent>
	)
}
