import { page } from '@vitest/browser/context'
import { describe, expect, it } from 'vitest'
import { renderHook } from 'vitest-browser-react'
import { useIsMobile } from './use-mobile'

describe('useIsMobile', () => {
	describe('viewport detection', () => {
		it('should return true for mobile viewport', async () => {
			await page.viewport(375, 667)

			const { result } = renderHook(() => useIsMobile())
			expect(result.current).toBe(true)
		})

		it('should return false for desktop viewport', async () => {
			await page.viewport(1024, 768)

			const { result } = renderHook(() => useIsMobile())
			expect(result.current).toBe(false)
		})

		it('should return false for tablet at breakpoint', async () => {
			await page.viewport(768, 1024)

			const { result } = renderHook(() => useIsMobile())
			expect(result.current).toBe(false)
		})
	})

	describe('media query matching', () => {
		it('should use matchMedia with correct breakpoint', () => {
			const { result } = renderHook(() => useIsMobile())

			const mql = window.matchMedia('(max-width: 767px)')
			expect(result.current).toBe(mql.matches)
		})
	})

	describe('hook behavior', () => {
		it('should return boolean value', () => {
			const { result } = renderHook(() => useIsMobile())
			expect(typeof result.current).toBe('boolean')
		})

		it('should handle multiple instances', () => {
			const { result: result1 } = renderHook(() => useIsMobile())
			const { result: result2 } = renderHook(() => useIsMobile())

			expect(result1.current).toBe(result2.current)
		})
	})
})
