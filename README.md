# Yokai Monitor

Real-time anomaly monitoring dashboard built with Next.js (App Router), Feature Sliced Design, TanStack Query, and SCSS Modules.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18+**
- **TypeScript** (strict mode)
- **TanStack Query** (React Query)
- **Zod** (validation)
- **SCSS Modules**
- **Feature Sliced Design** (FSD architecture)

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Build for production

```bash
npm run build
npm start
```

### Docker

```bash
docker-compose up
```

## Project Structure

```
src/
├─ app/              # Next.js App Router
├─ shared/           # Shared utilities, UI components
├─ entities/         # Business entities
├─ features/         # Business features
└─ widgets/          # Composite UI blocks
```

## Features

- Real-time anomaly monitoring
- Optimistic updates for capture actions
- Server-Sent Events (SSE) for live updates
- Error handling with rollback
- Type-safe API with Zod validation

