import { z } from 'zod'

export const fileSchema = (
	typeof window === 'undefined' ? z.any() : z.instanceof(FileList)
) as z.ZodType<FileList>
