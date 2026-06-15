@AGENTS.md

# 🤖 Claude AI Assistant Rules - Enterprise Procurement System

## 🏗️ Tech Stack

- **Framework:** Next.js 15 (App Router strictly enforced)
- **Language:** TypeScript (Strict Mode)
- **Database ORM:** Prisma ORM
- **Database Engine:** PostgreSQL (Supabase)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI, Radix UI

## 📚 Core Context Hierarchy

Before initiating any code generation or architecture discussion, you MUST read and synthesize the context from these two foundational documents:

1. `/docs/PRD.md` → The absolute Source of Truth for business rules, procurement lifecycles, and operational boundaries.
<!-- 2. `/docs/schema.prisma` → The structural database blueprint defined by the developer. -->

_Rule:_ Your code implementations must perfectly bridge the business logic in `PRD.md` with the technical database constraints in `schema.prisma`.

## 🛑 STRICT BOUNDARIES (CRITICAL)

1. **DATABASE & PRISMA ARE OFF-LIMITS:** Do not write, modify, or suggest changes to `prisma/schema.prisma` or database architectures. The database design is handled exclusively by the human developer. Your job is ONLY to query it using the existing Prisma Client.
2. **NO `any` TYPE:** The use of `any` in TypeScript is strictly forbidden. Always use proper interfaces, types, or generics. If a type is unknown, use `unknown` and narrow it down via type guards.

## 📂 Folder Structure Convention (`src/`)

All code must reside strictly within these designated directories:

- `app/`: Next.js App Router (routing, pages, layouts, route handlers, middleware).
- `features/`: Domain-specific components, custom hooks, and layout sub-features (e.g., `features/inventory`, `features/items`). Do NOT use `components/features/`.
- `components/`: Global shared UI components only.
  - `components/ui/`: Pure Shadcn UI primitives.
  - `components/shared/`: Generic reusable layout elements (e.g., `Pagination`, `SearchBar`, `DataTable`).
- `actions/`: Next.js Server Actions exclusively for data mutations (`"use server"`).
- `services/`: Backend business logic, internal validation handlers, and Prisma query building (data fetching).
- `schemas/`: Zod validation schemas for forms, runtime processing, and server inputs.
- `types/`: Global TypeScript type definitions and core UI interfaces.

## 🏛️ Architectural Principles

1. **Separation of Concerns:** `page.tsx` handles routing, metadata, and service invocation. Keep UI components "dumb"; do not execute Prisma queries directly inside React UI components.
2. **Server-Side Rendering (SSR) Context:** Maximize Next.js Server Components for initial layouts and data fetching. Use `'use client'` strictly for client-side interactivity requirements (e.g., state, effects, sheet toggles).
3. **Defense in Depth:** Always validate all server-bound inputs. Enforce sanity constraints like `Math.max` and `Math.min` on incoming pagination params or query sizes.
4. **Database-Level Operations:** Sorting, global filtering, and pagination must be handled at the Database level via Prisma using URL Search Params (`?page=1&search=xyz`). Do NOT fetch large datasets and use client-side JavaScript `.filter()` or `.slice()`.

## 🛡️ Error Handling & Server Actions Pattern

- **Standardized Response:** All mutation functions inside `actions/` must return a consistent structure: `{ success: boolean, message: string, data?: T }`.
- **Graceful Fault Isolation:** Wrap database interactions in `try-catch` blocks inside Services or Actions. Mask low-level engine exceptions; never leak raw database stack traces to the client interface.
