import { expect, test } from '@playwright/test'

test('Go to sign-in', async ({ page }) => {
	await page.goto('/sign-in')

	// Check that the login card title is visible
	await expect(page.locator('[data-slot="card-title"]')).toHaveText('Login')

	// Check that the login button is visible
	await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()

	// Check that the email input field is visible
	await expect(page.getByLabel('Email')).toBeVisible()

	// Check that the password input field is visible
	await expect(page.getByLabel('Password')).toBeVisible()
})
