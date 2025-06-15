# Han Stack - Modern SaaS Template

[![ja](https://img.shields.io/badge/lang-ja-red.svg)](https://github.com/Insik-Han/han-stack/blob/dev/README.ja.md)
[![ko](https://img.shields.io/badge/lang-ko-blue.svg)](https://github.com/Insik-Han/han-stack/blob/dev/README.ko.md)

A powerful, full-stack SaaS starter template built with modern technologies. This template provides a solid foundation for building scalable SaaS applications with best practices and industry-standard tools.

## Features

- 🚀 **Full-Stack TypeScript** - End-to-end type safety
- ⚡ **High Performance** - Built with performance in mind using Vite
- 🔄 **Modern Data Fetching** - Powered by TanStack Query
- 🛣️ **Type-Safe Routing** - Using TanStack Router
- 🔒 **Type-Safe RPC** - End-to-end type safety with ORPC
- ✨ **Best Practices** - Following modern development standards
- 🎨 **Component Architecture** - Well-organized and scalable component structure
- 🛠️ **Developer Experience** - Enhanced with Biome configurations
- 📊 **Reusable Data Tables** - Common DataTable component with sorting, filtering, and pagination
- 👥 **User Management** - Built-in user administration features

## Tech Stack

### Frontend

- [React](https://react.dev) - UI Library (v19.1)
- [TanStack Router](https://tanstack.com/router/latest) - Type-safe routing
- [TanStack Query](https://tanstack.com/query/latest) - Data synchronization
- [Tailwind CSS v4](https://tailwindcss.com) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com) - Headless UI components
- [shadcn/ui](https://ui.shadcn.com) - Re-usable components built on Radix UI
- [Vite](https://vitejs.dev) - Build tool and dev server

### Backend & API

- [TanStack Start](https://tanstack.com/start/latest) - Full-stack framework (Beta)
- [ORPC](https://orpc.unnoq.com) - Type-safe RPC for end-to-end type safety
- [Prisma](https://www.prisma.io/) - Modern database ORM
- [Better Auth](https://better-auth.com) - Authentication framework

### Development & Tooling

- [TypeScript](https://www.typescriptlang.org) - Type safety throughout
- [Biome](https://biomejs.dev) - Fast formatter and linter
- [Zod](https://zod.dev) - Runtime type validation
- [Zod Prisma Types](https://github.com/chrishoermann/zod-prisma-types) - Auto-generated Zod schemas
- [React Hook Form](https://react-hook-form.com) - Performant forms with validation

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Installation

1. Clone the repository

```bash
git clone https://github.com/Insik-Han/han-stack.git
cd han-stack
```

2. Create .env

```bash
cp .env.example .env
```

3. Install dependencies

```bash
pnpm install
```

4. Setup development environment

```bash
pnpm run setup
```

5. Start the development server

```bash
pnpm run dev
```

## Development

### Project Structure

```txt
src/
├── components/        # Reusable UI components
│   ├── ui/            # Atomic/molecular UI components
│   ├── layout/        # Layout-related components
│   ├── errors/        # Error handling components
│   ├── data-table/    # Reusable data table components
│   └── ...            # Other shared components
├── constants/         # Application constants
├── features/          # Feature modules
│   ├── auth/          # Authentication features
│   ├── global-search/ # Global search features
│   ├── settings/      # Settings features
│   ├── tasks/         # Task management features
│   ├── users/         # User management features
│   └── theme/         # Theme features
├── hooks/             # Custom React hooks
├── lib/               # Shared libraries and helpers
├── routes/            # Application routes and pages
│   ├── _admin-console/ # Admin console routes
│   ├── api/           # API routes
│   ├── (auth)/        # Auth-related routes
│   ├── (errors)/      # Error pages
│   └── __root.tsx     # Root route entry
├── server/            # Backend/server logic
│   ├── api/           # API endpoints
│   │   ├── routes/    # API route handlers
│   │   └── router.ts  # API router
│   ├── handler.ts     # RPC handler
│   └── db.ts          # Database connection
├── styles/            # Global and component styles
├── utils/             # Utility functions
├── router.tsx         # Client router
├── routeTree.gen.ts   # Auto-generated route tree
└── ...
public/                # Static files (images, favicon, etc.)
├── assets/            # Static assets (e.g., logo)
├── favicon.ico        # Favicon
prisma/                # Prisma schema and seed data
├── schema.prisma      # Prisma DB schema
├── seed.ts            # Seed data script (uses faker.js for test data)

Other key files:
- package.json         # Project metadata and dependencies
- tsconfig.json        # TypeScript configuration
- postcss.config.js    # PostCSS configuration
- biome.jsonc          # Biome (formatter/linter) configuration
- CLAUDE.md            # Guidelines for Claude AI assistant
```

Refer to the code and comments for more details on each directory and file.

### Scripts

#### Development

- `pnpm run dev` - Start development server on port 3000
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server

#### Database

- `pnpm run generate` - Generate Prisma client and Zod types
- `pnpm run prisma:studio` - Open Prisma Studio GUI
- `pnpm run db:seed` - Seed database with test data
- `pnpm run db:reset` - Reset database and migrations
- `pnpm run migrate:dev` - Run Prisma migrations in development
- `pnpm run migrate` - Deploy migrations to production

#### Code Quality

- `pnpm run biome` - Format and lint code with Biome
- `pnpm run tsc` - Run TypeScript type checking

#### Testing

- `pnpm run test` - Run all tests
- `pnpm run test:unit` - Run unit tests
- `pnpm run test:ui` - Run UI tests
- `pnpm run test:e2e` - Run E2E tests with Playwright
- `pnpm run test:e2e:ui` - Run E2E tests with Playwright UI mode
- `pnpm run coverage` - Run tests with coverage report

## Testing

The project uses different testing approaches based on the testing scope:

- **Unit Tests** (`*.unit.spec.ts`) - Fast, isolated tests running in Node.js environment
- **UI Tests** (`*.ui.spec.ts`) - Component tests running in a real browser environment
- **E2E Tests** (`*.test.ts`) - End-to-end tests using Playwright

### Test Configuration

#### Vitest Configuration

The project uses Vitest with two separate test projects configured in `vite.config.ts`:

```typescript
test: {
  projects: [
    {
      test: {
        name: 'unit',
        include: ['src/**/*.unit.spec.{ts,tsx}'],
      },
    },
    {
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
}
```

#### Playwright Configuration

E2E tests are configured in `playwright.config.ts` with:

- Test directory: `./tests/e2e`
- Base URL: `http://localhost:3000`
- Browsers: Chromium and WebKit
- Automatic dev server startup

### Running Tests

#### Unit Tests

```bash
# Run all unit tests
pnpm run test:unit

# Run tests in watch mode
pnpm run test:unit --watch

# Run specific test file
pnpm run test src/schemas/upload.unit.spec.ts
```

#### UI Tests

```bash
# Run all UI tests
pnpm run test:ui

# Run in watch mode
pnpm run test:ui --watch
```

#### E2E Tests

```bash
# Run all E2E tests
pnpm run test:e2e

# Run specific test
pnpm exec playwright test tests/e2e/example.test.ts

# Run with UI mode for debugging
pnpm run test:e2e:ui
```

### Writing Tests

#### Unit Tests

Unit tests are for testing pure logic, utilities, and server-side code:

```typescript
// src/schemas/upload.unit.spec.ts
import { describe, expect, it } from "vitest";
import { fileSchema } from "./upload";

describe("fileSchema", () => {
  it("should accept any value in Node.js environment", () => {
    expect(fileSchema.safeParse("string").success).toBe(true);
  });
});
```

#### UI Tests

UI tests are for testing React components with DOM interactions:

```typescript
// src/hooks/use-mobile.ui.spec.ts
import { renderHook } from "@testing-library/react";
import { expect, test } from "vitest";
import { useMobile } from "./use-mobile";

test("should detect mobile viewport", () => {
  const { result } = renderHook(() => useMobile());
  expect(result.current).toBe(false);
});
```

#### E2E Tests

E2E tests simulate real user interactions:

```typescript
// tests/e2e/example.test.ts
import { expect, test } from "@playwright/test";

test("Go to sign-in", async ({ page }) => {
  await page.goto("/sign-in");

  await expect(page.locator('[data-slot="card-title"]')).toHaveText("Login");
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
```

### CI/CD Integration

The project uses GitHub Actions for continuous integration with optimized workflows using reusable actions:

#### Reusable Actions

Located in `.github/actions/`:

- **setup-pnpm** - Installs pnpm and project dependencies
- **setup-database** - Sets up test database with migrations

#### CI Workflow

The CI workflow (`.github/workflows/ci.yml`) runs on pull requests and includes:

1. **Biome** - Code formatting and linting
2. **TypeScript** - Type checking
3. **Vitest** - Unit and UI tests with coverage reporting
4. **Playwright** - E2E tests with artifact uploads

### Best Practices

#### Test Organization

- Place unit tests next to the code they test (e.g., `schema.ts` → `schema.unit.spec.ts`)
- Keep UI tests close to components they test
- Group E2E tests by feature or user flow

#### Test Naming

- Use descriptive test names that explain what is being tested
- Follow the pattern: "should [expected behavior] when [condition]"
- Group related tests using `describe` blocks

#### Test Data

- Use factories or builders for complex test data
- Keep test data minimal but realistic
- Clean up test data after tests when necessary

#### Assertions

- Use specific assertions rather than generic ones
- Test both positive and negative cases
- Include edge cases in your tests

### Environment Considerations

#### Server-Side vs Client-Side

Be aware of environment differences when writing tests:

- Server-side tests run in Node.js (no DOM, no browser APIs)
- Client-side tests need browser environment for DOM manipulation
- Some schemas/utilities may behave differently based on environment

Example from `upload.ts`:

```typescript
export const fileSchema = (
  typeof window === "undefined" ? z.any() : z.instanceof(FileList)
) as z.ZodType<FileList>;
```

#### Test Database

- Tests use SQLite database (configured via `.env.example`)
- Database is reset between test runs if needed
- Use `pnpm run db:seed` to populate test data

### Debugging Tests

#### Vitest

- Use `console.log` for quick debugging
- Use VS Code's debugger with breakpoints
- Run tests in UI mode: `pnpm exec vitest --ui`

#### Playwright

- Use `--debug` flag: `pnpm exec playwright test --debug`
- Use `page.pause()` to pause execution
- View traces: `pnpm exec playwright show-trace`
- Take screenshots: `await page.screenshot({ path: 'debug.png' })`

### Coverage

The project aims for good test coverage. View coverage reports:

```bash
# Generate coverage report
pnpm run coverage

# Coverage is also reported in PR comments via GitHub Actions
```

### Troubleshooting

#### Common Issues

1. **"DataTransfer is not defined"** - This API is not available in Node.js. Use UI tests for browser-specific APIs.

2. **"Element not found"** - Check selectors, ensure the page has loaded, use `page.waitForSelector()`.

3. **Type errors in tests** - Ensure proper TypeScript configuration and that test types are installed.

#### Tips

- Run tests locally before pushing
- Check CI logs for detailed error messages
- Use appropriate test type for what you're testing
- Keep tests fast and focused

### Resources

- [Vitest Documentation](https://vitest.dev)
- [Playwright Documentation](https://playwright.dev)
- [Testing Library](https://testing-library.com)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Deployment

The application can be deployed to any Node.js hosting platform. After building the project with `pnpm run build`, you can start the production server with `pnpm run start`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you find this template helpful, please consider giving it a star ⭐️

## Inspiration

This project draws inspiration from the following amazing repositories:

- [shadcn-admin](https://github.com/satnaing/shadcn-admin)
- [create-better-t-stack](https://github.com/AmanVarshney01/create-better-t-stack)

---

Built with ❤️ by Insik-Han
