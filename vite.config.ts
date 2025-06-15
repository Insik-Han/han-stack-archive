/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		tsConfigPaths({
			projects: ['./tsconfig.json'],
		}),
		tanstackStart(),
		tailwindcss(),
	],
	test: {
		coverage: {
			all: true,
			include: ['src/**/*.{ts,tsx}'],
			exclude: [
				'src/**/*.spec.{ts,tsx}',
				'src/generated/**/*',
				'src/routeTree.gen.ts',
				'src/components/ui/**/*',
			],
			reporter: ['text', 'json-summary', 'json'],
			reportOnFailure: true,
		},
		projects: [
			{
				extends: true,
				test: {
					name: 'unit',
					include: ['src/**/*.unit.spec.{ts,tsx}'],
				},
			},
			{
				extends: true,
				test: {
					name: 'ui',
					include: ['src/**/*.ui.spec.{ts,tsx}'],
					browser: {
						enabled: true,
						provider: 'playwright',
						instances: [{ browser: 'chromium' }],
						headless: true,
					},
				},
			},
		],
	},
	build: {
		rollupOptions: {
			onwarn: (warning, warn) => {
				// Prevent 'use client' warnings
				if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
				warn(warning)
			},
		},
	},
	resolve: {
		alias: {
			// https://github.com/tabler/tabler-icons/issues/1233
			'@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
		},
	},
})
