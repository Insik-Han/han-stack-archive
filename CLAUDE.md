# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start dev server on port 3000
npm run build        # Production build with Vite
npm run preview      # Preview with Wrangler (Cloudflare Workers)
```

### Database
```bash
npm run generate     # Generate Prisma client and Zod types - run after schema changes
npm run prisma:studio # Open Prisma Studio GUI
npm run db:seed      # Seed database with test data
npm run db:reset     # Reset database and migrations
npm run migrate:dev  # Run Prisma migrations in dev
npm run migrate      # Deploy migrations to production
```

### Code Quality
```bash
npm run biome        # Format and lint code with Biome (replaces ESLint/Prettier)
npm run tsc          # TypeScript type checking
```

## Architecture

### Tech Stack
- **Frontend**: React 19.1, TanStack Router/Query/Start, Vite, Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui components in `src/components/ui/`
- **Backend**: ORPC for type-safe RPC, Prisma ORM with SQLite/Cloudflare D1
- **Authentication**: Better Auth with Cloudflare D1 integration
- **Deployment**: Cloudflare Workers (configured in wrangler.jsonc)

### Key Patterns

#### File-Based Routing
Routes are in `src/routes/` using TanStack Router conventions:
- `(auth)/` - Auth pages (login, signup, etc.)
- `(errors)/` - Error pages (401, 404, 500, etc.)
- `_admin-console/` - Protected admin routes
- `api/rpc.$` - All API calls go through this single endpoint
- `api/auth/[...all]` - Better Auth API endpoints

#### Feature-Based Organization
Each feature in `src/features/` contains:
- `components/` - Feature-specific components
- `contexts/` - React contexts for state
- `schema/` - Zod schemas for validation
- `data/` - Mock data or constants

#### Server Architecture
- All server code in `src/server/` is marked with 'server only'
- ORPC router defines type-safe procedures in `src/server/router.ts`
- Add new API routes in `src/server/routes/`
- Prisma operations use the singleton from `src/server/prisma.ts`

#### Authentication Architecture
- Better Auth configuration in `src/server/auth.ts`
- Client-side auth in `src/lib/auth-client.ts`
- Email/password authentication enabled
- Cloudflare D1 adapter for production
- Session data includes geolocation info via Cloudflare

#### State Management
- Server state: TanStack Query
- Client state: React Context (theme, global search)
- Forms: React Hook Form + Zod validation

#### Component Patterns
- UI components use CVA (class-variance-authority) for variants
- Follow existing patterns in `src/components/ui/`
- Dark mode support via theme context

## Important Notes

### OSS Documentation
When retrieving information about OSS libraries and frameworks, always use Context7 (configured in .mcp.json) to access up-to-date documentation.

### React Best Practices
Avoid `useEffect` when possible. Use ref callbacks, event handlers with `flushSync`, CSS, `useSyncExternalStore`, etc. instead.

### Path Aliases
TypeScript and Vite are configured with `~/*` mapping to `./src/*`

### Styling
- Tailwind CSS v4 with CSS variables
- Tab indentation
- Single quotes
- No semicolons (as configured in Biome)

### Database
- Local: SQLite via Prisma
- Production: Cloudflare D1 via Prisma adapter
- Schema changes require running `npm run generate`

### Environment
Copy `.env.example` to `.env` for local development

Required environment variables:
- `DATABASE_URL` - SQLite database path for local development
- `BETTER_AUTH_SECRET` - Secret key for Better Auth (generate a strong random string)

### Git Workflow

#### Language Requirements
- **All GitHub issues, pull requests, and commit messages MUST be written in English**
- **All source code, comments, and documentation MUST be written in English**
- **Use clear, descriptive English for better international collaboration**

#### Development Flow
Follow these steps for all code changes:

1. **Update local branch**
   ```bash
   git pull origin dev
   ```

2. **Create GitHub issue**
   ```bash
   gh issue create --title "Task description" --body "Detailed requirements"
   ```
   Note the issue number for branch naming

3. **Create feature branch**
   ```bash
   git checkout -b {prefix}/{issueNumber}
   ```
   Branch prefixes:
   - `feat/` - New features
   - `fix/` - Bug fixes
   - `chore/` - Maintenance tasks
   - `docs/` - Documentation updates
   - `refactor/` - Code refactoring

4. **Make changes and verify**
   ```bash
   npm run biome    # Format and lint
   npm run tsc      # Type checking
   ```

5. **Create Pull Request**
   ```bash
   gh pr create --base dev --assignee @me --title "PR title" --body "Closes #issueNumber"
   ```
   - Always assign to yourself (`@me`)
   - Link the issue with `Closes #issueNumber`
   - Add review comments explaining changes

#### PR Guidelines
- Default branch is `dev`
- All code changes to `dev` must be done via Pull Request
- Run quality checks before creating PR
- Use conventional commit messages
