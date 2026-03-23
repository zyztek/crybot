# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React 19)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   UI Layer  │  │   Store     │  │   Services  │             │
│  │ (Components)│  │  (Zustand)  │  │   (API)     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP/WebSocket
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend (Express.js)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Routes    │  │  Middleware │  │  Services   │             │
│  │  (REST API) │  │ (Auth/CORS) │  │  (Business) │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    Blockchain Services                      ││
│  │     Ethereum (Sepolia/Goerli) | Bitcoin | Solana            ││
│  └─────────────────────────────────────────────────────────────┘│
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Database (PostgreSQL)                        │
│                   Prisma ORM + Migrations                       │
└─────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite 7, Tailwind CSS 4, Zustand, Recharts |
| Backend | Express.js, TypeScript, Prisma |
| Database | PostgreSQL 16 |
| Auth | JWT with refresh tokens |
| Container | Docker, Docker Compose |

## Project Structure

### Frontend (`/src`)
```
src/
├── components/          # React components
│   ├── layout/         # Header, Footer, Navigation
│   ├── ui/             # Reusable UI components
│   └── *.tsx           # Feature components
├── store/              # Zustand state management
├── hooks/              # Custom React hooks
├── services/           # API communication
├── i18n/               # Translations
└── types/              # TypeScript definitions
```

### Backend (`/server`)
```
server/
├── src/
│   ├── routes/         # API endpoints
│   ├── middleware/     # Express middleware
│   ├── services/       # Business logic
│   ├── lib/            # Database client
│   └── config/         # Configuration
└── prisma/
    └── schema.prisma   # Database schema
```

## Security

- JWT access tokens with 7-day expiry
- Refresh tokens with 30-day expiry
- Rate limiting on all endpoints
- CORS configuration
- Helmet for security headers
- Input validation with Zod
- SQL injection prevention via Prisma

## Deployment

### Development
```bash
npm run dev          # Frontend
cd server && npm run dev  # Backend
```

### Docker
```bash
docker-compose up -d  # Full stack
```