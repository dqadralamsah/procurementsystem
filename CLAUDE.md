@AGENTS.md

# 🤖 Claude AI Assistant Rules - Enterprise Procurement System

## 🏗️ Tech Stack

- **Framework:** Next.js 15 (App Router strictly enforced)
- **Language:** TypeScript (Strict Mode)
- **Database ORM:** Prisma
- **Database Engine:** PostgreSQL (Supabase)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI, Radix UI

## 🛑 STRICT BOUNDARIES (CRITICAL)

1. **DATABASE & PRISMA ARE OFF-LIMITS:** Do not write, modify, or suggest changes to `prisma/schema.prisma` or database architectures. The database design is strictly handled by the human developer. Your job is ONLY to query it using the existing Prisma Client.
2. **NO `any` TYPE:** The use of `any` in TypeScript is strictly forbidden. Always use proper interfaces, types, or generics. If a type is unknown, use `unknown` and narrow it down.

## 📂 Folder Structure Convention (`src/`)

- `app/`: Exclusively for Next.js App Router (pages, layouts, route handlers, auth/dashboard routes).
- `features/`: Domain-specific logic and components (e.g., `features/inventory`, `features/items`). Do NOT use `components/features/`.
- `components/`: Only for global/shared UI.
  - `components/ui/`: Pure Shadcn UI components.
  - `components/shared/`: Generic reusable components (e.g., Pagination, SearchBar).
- `actions/`: Next.js Server Actions (mutations).
- `services/`: Backend business logic and Prisma queries (data fetching).
- `schemas/`: Zod validation schemas for forms and APIs.
- `types/`: Global TypeScript definitions.

## 🏛️ Architectural Principles

1. **Separation of Concerns:** - `page.tsx` is only for routing and calling Services.
   - UI components should be "dumb". Do not put Prisma queries directly inside React components.
2. **Server-Side Rendering (SSR) First:** - Maximize Server Components.
   - Use `'use client'` ONLY when interactivity is required (onClick, useState).
3. **Defense in Depth:** - Validate all server inputs (e.g., enforce `Math.max` and `Math.min` on Pagination parameters).
4. **Pagination & Filtering:** - Must be handled at the Database level via Prisma and URL Search Params (`?page=1&search=xyz`), NOT via client-side JavaScript `.filter()`.

## 🛡️ Error Handling & Server Actions

- **No `any` Type:** Dilarang keras menggunakan tipe data `any` di TypeScript. Gunakan *interface* atau tipe yang jelas.
- **Server Actions Pattern:** All mutation functions in `actions/` must use `"use server"`.
- **Standardized Response:** Server Actions must return a consistent object: `{ success: boolean, message: string, data?: T }`.
- **Graceful Error:** Use `try-catch` in Services/Actions. Never leak raw database errors to the frontend.
