# Han Stack - Modern SaaS Template

> This template is currently under development. Example code will be added soon, but it's ready for production use. (Depends on Tanstack start version)

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

## Tech Stack

### Frontend

- [React](https://react.dev) - UI Library
- [TanStack Router](https://tanstack.com/router/latest) - Type-safe routing
- [TanStack Query](https://tanstack.com/query/latest) - Data synchronization
- [Vite](https://vitejs.dev) - Build tool and dev server

### Backend & API

- [TanStack Start](https://tanstack.com/start/latest) - Full-stack framework
- [ORPC](https://orpc.unnoq.com) - Type-safe RPC
- [Prisma](https://www.prisma.io/)

### Development & Tooling

- [Zod](https://zod.dev) - Runtime type validation
- [Zod Prisma Types](https://github.com/chrishoermann/zod-prisma-types)

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm

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
   npm ci
   ```

4. Generate Prisma client

   ```bash
   npm run generate
   ```

5. Start the development server

   ```bash
   npm run dev
   ```

## Development

### Project Structure

```txt
src/
├── components/        # Reusable UI components
│   ├── ui/            # Atomic/molecular UI components
│   ├── layout/        # Layout-related components
│   ├── errors/        # Error handling components
│   └── ...            # Other shared components
├── constants/         # Application constants
├── features/          # Feature modules
│   ├── auth/          # Authentication features
│   ├── global-search/ # Global search features
│   ├── settings/      # Settings features
│   ├── tasks/         # Task management features
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
│   ├── routes/        # Server-side routes
│   ├── handler.ts     # Server handler
│   ├── prisma.ts      # Prisma instance
│   └── router.ts      # Server router
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
├── seed.ts            # Seed data script

Other key files:
- package.json         # Project metadata and dependencies
- tsconfig.json        # TypeScript configuration
- postcss.config.js    # PostCSS configuration
- wrangler.jsonc       # Cloudflare Workers configuration
- biome.jsonc          # Biome (formatter/linter) configuration
```

Refer to the code and comments for more details on each directory and file.

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run biome` - Run Biome
- `npm run tsc` - Run TypeScript type checking

## Deployment

### Cloudflare Workers

For deploying to Cloudflare Workers, follow the guide [here](https://github.com/backpine/tanstack-start-beta-on-cloudflare).

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
