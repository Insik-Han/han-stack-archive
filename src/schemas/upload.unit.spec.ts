import { describe, expect, it } from 'vitest'
import { fileSchema } from './upload'

describe('fileSchema', () => {
	// In Node.js environment (server-side), fileSchema uses z.any()
	// which accepts any value. These tests reflect that behavior.
	it('should accept any value in Node.js environment', () => {
		// Since we're in Node.js test environment, fileSchema is z.any()
		expect(fileSchema.safeParse('string').success).toBe(true)
		expect(fileSchema.safeParse(123).success).toBe(true)
		expect(fileSchema.safeParse(null).success).toBe(true)
		expect(fileSchema.safeParse(undefined).success).toBe(true)
		expect(fileSchema.safeParse({}).success).toBe(true)
		expect(fileSchema.safeParse([]).success).toBe(true)
		expect(fileSchema.safeParse(true).success).toBe(true)
	})

	it('should parse File instances in Node.js', () => {
		const file = new File(['content'], 'test.txt', { type: 'text/plain' })
		const result = fileSchema.safeParse(file)
		expect(result.success).toBe(true)
		if (result.success) {
			expect(result.data).toBe(file)
		}
	})

	it('should parse arrays with files in Node.js', () => {
		const file1 = new File(['content1'], 'test1.txt', { type: 'text/plain' })
		const file2 = new File(['content2'], 'test2.jpg', { type: 'image/jpeg' })
		const files = [file1, file2]
		const result = fileSchema.safeParse(files)
		expect(result.success).toBe(true)
		if (result.success) {
			expect(result.data).toBe(files)
		}
	})

	it('should handle different file types in Node.js', () => {
		const textFile = new File(['text'], 'doc.txt', { type: 'text/plain' })
		const imageFile = new File(['image'], 'pic.png', { type: 'image/png' })
		const pdfFile = new File(['pdf'], 'doc.pdf', { type: 'application/pdf' })
		const files = [textFile, imageFile, pdfFile]
		const result = fileSchema.safeParse(files)
		expect(result.success).toBe(true)
		if (result.success) {
			expect(result.data).toEqual(files)
		}
	})

	it('should handle large files in Node.js', () => {
		const largeContent = new Array(1024 * 1024).join('a') // 1MB
		const file = new File([largeContent], 'large.txt', { type: 'text/plain' })
		const result = fileSchema.safeParse(file)
		expect(result.success).toBe(true)
		if (result.success) {
			expect(result.data).toBe(file)
		}
	})

	it('should accept mock FileList-like objects in Node.js', () => {
		// Since FileList is not available in Node.js, we can only test
		// that the schema accepts objects that might represent FileList
		const mockFileList = {
			length: 2,
			item: (index: number) => (index === 0 ? 'file1' : 'file2'),
			0: 'file1',
			1: 'file2',
		}
		const result = fileSchema.safeParse(mockFileList)
		expect(result.success).toBe(true)
	})
})
