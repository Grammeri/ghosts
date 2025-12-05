# Yokai Monitor

Real-time anomaly monitoring dashboard for tracking spirits (yokai) across Tokyo. Built with Next.js 14, Feature-Sliced Design architecture, TanStack Query, and SCSS Modules.

## 🎯 Project Overview

This is a SPA built on Next.js 14 for monitoring yokai (spirits). The application provides real-time updates through Server-Sent Events (SSE), optimistic UI updates when capturing spirits, and follows a strict Feature-Sliced Design (FSD) architecture. The project uses SCSS Modules for styling, Zod for validation, TanStack Query for data management, and includes full Docker support.

The organization is dedicated to tracking spirits in Tokyo. Operators use this dashboard to capture anomalies in real-time, monitoring threat levels and managing the status of each spirit across different locations in the city.

## 🟣 How the app works (important behavior)

Each spirit has the following parameters: **name, location, threat level, and status**.

When clicking the **Capture** button:

- The interface updates instantly (optimistic update)
- There is a 30% chance of receiving an error
- If an error occurs, the UI rolls back to the previous state

If a spirit becomes **captured**, it remains captured **forever**.

However, the **threat level continues to change every 5 seconds — even though the spirit is already captured**.  
This simulates ongoing environmental spiritual energy fluctuations.

When **all spirits become captured**, a **Victory Modal** appears with confetti animation.

After closing the modal, the application continues operating normally — threat levels still update in real time.

## 📡 Real-Time Engine (SSE)

The application uses Server-Sent Events (SSE) through the `/api/sse` endpoint:

- Every 5 seconds, a random spirit's threat level is updated
- Updates apply **even to captured spirits**
- UI reacts instantly via React Query cache invalidation and subscription
- No page reload is needed

## 🧱 Architecture (FSD)

The project follows Feature-Sliced Design (FSD) architecture with strict slicing rules.

```
src/
  app/        # Next.js App Router (routes, API handlers)
  widgets/    # Composite UI blocks
  features/   # Business logic units
  entities/   # Domain entities
  shared/     # Shared utilities, UI components, constants
```

### Import Rules (strict)

- `app` → can import everything
- `widgets` → features, entities, shared
- `features` → entities, shared
- `entities` → shared
- `shared` → only shared

No upward imports allowed.  
This keeps the project maintainable and predictable.

## 🚀 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Visit:

```
http://localhost:3000/monitoring
```

### Production build

```bash
npm run build
npm start
```

## 🐳 Docker Usage

### Build image

```bash
docker-compose build --no-cache
```

### Run container

```bash
docker-compose up -d
```

### Access the app

👉 **http://localhost:3000/monitoring**

### Stop container

```bash
docker-compose down
```

## 🧪 API Simulation (Mocks)

Mock API handlers simulate backend behavior.

### GET /api/anomalies

Returns all anomalies.

### POST /api/anomalies/[id]/capture

Attempts to capture the anomaly.  
30% chance of failure.

### GET /api/sse

Streams threat-level updates every 5 seconds.

## 🧨 Technologies

- **Next.js 14** (App Router)
- **React 18**
- **TanStack Query** (async state)
- **Zod** (schema validation)
- **SCSS Modules** (styling)
- **SSE** (real time)
- **Docker**
- **Feature-Sliced Design**
- **canvas-confetti**
- **TypeScript**

## 📸 Screenshots

Coming soon...

## 📜 License

MIT
