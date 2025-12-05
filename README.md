# Yokai Monitor

Real-time anomaly monitoring dashboard for tracking spirits (yokai) across Tokyo.  
Built with **Next.js 14**, **Feature-Sliced Design**, **TanStack Query**, **Zod**, **SSE**, and **SCSS Modules**.  
Fully Dockerized.

---

# ⚡ Quick Start

```bash
git clone <your-repo-url>
npm install
npm run dev
```

Open in browser:

👉 http://localhost:3000/monitoring

## 🎯 Project Overview

This SPA monitors spiritual anomalies (yokai) across Tokyo in real time.

Operators use the dashboard to track threat levels, capture spirits, and react to sudden fluctuations of spiritual energy.

The app includes:

- Real-time updates via SSE
- Optimistic UI updates when capturing
- Strict Feature-Sliced Design architecture
- SCSS Modules + TypeScript
- Full Docker support
- Validated data via Zod

**Note:**  
Mock backend, in-memory state, and simplified SSE simulation are intentional — required by the assignment.  
Architecture follows production-grade principles.

## 🟣 How the app works (core behavior)

Every spirit has: **name, location, threat level, status**.

### ➤ Capture Logic

When clicking **Capture**:

- UI updates immediately (optimistic update)
- 30% chance of error ("Capture failed")
- On error → rollback
- On success → spirit becomes **Captured forever**

### ➤ Real-time Threat Updates

Even after capture:

- Threat level continues changing every 5 seconds
- UI receives updates via SSE automatically
- No reload needed

### ➤ Victory Modal

When all spirits are captured:

- A Victory Modal appears
- Confetti animation triggers
- After closing, app continues working normally

## 📡 Real-Time Engine (SSE)

The `/api/sse` endpoint pushes updates every 5 seconds:

- A random spirit gets a new threat level
- React Query automatically updates cached data
- UI reflects changes instantly

Captured spirits also receive threat updates (status does not change).

## 🔄 Data Persistence Note

The project stores anomaly data in `globalThis` memory.

This means:

- Data resets when the server restarts
- Capture results are not persistent
- This is expected and intentional for mock-based architecture

## 🧱 Architecture (Feature-Sliced Design)

```
src/
  app/        # Next.js App Router, pages, API routes
  widgets/    # Complex UI blocks
  features/   # Business actions / logic
  entities/   # Domain entities (Anomaly)
  shared/     # UI kit, utils, config, constants
```

### Import Rules (strict)

- `app` → can import everything
- `widgets` → features, entities, shared
- `features` → entities, shared
- `entities` → shared
- `shared` → only shared

No circular imports, no upward imports. Clean architecture guaranteed.

## 🚀 Installation & Scripts

### Install dependencies

```bash
npm install
```

### Development mode

```bash
npm run dev
```

### Production build

```bash
npm run build
npm start
```

Open:

👉 http://localhost:3000/monitoring

## 🐳 Docker Usage

### Build the image

```bash
docker-compose build --no-cache
```

### Start container

```bash
docker-compose up -d
```

### Stop

```bash
docker-compose down
```

Service runs at:

👉 http://localhost:3000/monitoring

## 🧪 API Simulation (Mocks)

### GET /api/anomalies

Return list of all spirits.

### POST /api/anomalies/[id]/capture

Attempts to capture the spirit.  
30% chance of failure.

### GET /api/sse

Streams threat updates every 5 seconds.

## 🧨 Technologies Used

- **Next.js 14** (App Router)
- **React 18**
- **TanStack Query**
- **Zod** (validation)
- **SCSS Modules**
- **SSE**
- **Docker**
- **Feature-Sliced Design**
- **canvas-confetti**
- **TypeScript**

## 📸 Screenshots

Coming soon...

## 📜 License

MIT
