# Han Stack - Modern SaaS Template

[![ja](https://img.shields.io/badge/lang-ja-red.svg)](https://github.com/Insik-Han/han-stack/blob/dev/README.ja.md)
[![ko](https://img.shields.io/badge/lang-ko-blue.svg)](https://github.com/Insik-Han/han-stack/blob/dev/README.ko.md)

> **⚠️ Note**: This template is currently under active development. The underlying framework (TanStack Start) is experiencing issues that may affect stability. Example code and documentation improvements are in progress.

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

- bun

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
   bun install
   ```

4. Generate Prisma client

   ```bash
   bun run generate
   ```

5. Start the development server

   ```bash
   bun run dev
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

- `bun run dev` - Start development server on port 3000
- `bun run build` - Build for production
- `bun run start` - Start production server

#### Database

- `bun run generate` - Generate Prisma client and Zod types
- `bun run prisma:studio` - Open Prisma Studio GUI
- `bun run db:seed` - Seed database with test data
- `bun run db:reset` - Reset database and migrations
- `bun run migrate:dev` - Run Prisma migrations in development
- `bun run migrate` - Deploy migrations to production

#### Code Quality

- `bun run biome` - Format and lint code with Biome
- `bun run tsc` - Run TypeScript type checking

## Deployment

The application can be deployed to any Node.js hosting platform. After building the project with `bun run build`, you can start the production server with `bun run start`.

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
