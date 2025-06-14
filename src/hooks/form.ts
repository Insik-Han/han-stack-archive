import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

// Export contexts for use in custom components
export const { fieldContext, formContext, useFieldContext } =
	createFormHookContexts()

// Define our base form hook with common configurations
export const { useAppForm, withForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {},
	formComponents: {},
})

// Re-export commonly used types
export type { FieldApi, FormApi, ValidationError } from '@tanstack/react-form'
