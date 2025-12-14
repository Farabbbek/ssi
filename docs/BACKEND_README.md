# Backend Developer Guide

## 📍 Где работать

**Backend находится здесь:**
```
<project-root>/web/src/app/api/
```

## 🏗️ Структура проекта

```
web/
├── src/
│   ├── app/api/              ← API Endpoints (твоя работа здесь!)
│   │   ├── auth/
│   │   │   ├── register/route.ts
│   │   │   └── login/route.ts
│   │   ├── users/
│   │   ├── projects/
│   │   └── ...
│   │
│   └── lib/                  ← Utilities & Services
│       ├── auth/             ← JWT, password, middleware
│       ├── db/               ← Prisma, services
│       └── utils/            ← Helpers
│
├── prisma/
│   └── schema.prisma         ← Database schema
│
└── package.json
```

## 🛠️ Технологии

- **Framework:** Next.js 14 (API Routes)
- **Language:** TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** JWT + bcryptjs
- **Runtime:** Node.js

## 🚀 Как запустить

### 1. Установить зависимости
```bash
cd web
npm install
```

### 2. Настроить .env
```env
DATABASE_URL="postgresql://sithub:sithub_password@localhost:5432/sithub"
JWT_SECRET="your-secret-key"
```

### 3. Запустить сервер
```bash
npm run dev
```

Backend будет на: `http://localhost:3000/api/*`

## 📝 Что уже готово

### Utilities
- ✅ JWT токены (`/lib/auth/jwt.ts`)
- ✅ Password hashing (`/lib/auth/password.ts`)
- ✅ Auth middleware (`/lib/auth/middleware.ts`)
- ✅ Response formatter (`/lib/utils/response.ts`)

### Services
- ✅ User service (`/lib/db/services/userService.ts`)
- ✅ Project service (`/lib/db/services/projectService.ts`)

### Endpoints
- ✅ `POST /api/auth/register`
- ✅ `POST /api/auth/login`
- ✅ `GET /api/users/profile`
- ✅ `GET /api/projects`
- ✅ `POST /api/projects`
- ✅ `GET /api/projects/[id]`
- ✅ `PUT /api/projects/[id]`
- ✅ `DELETE /api/projects/[id]`

## 🧪 Тестирование

```bash
# Регистрация
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"password123"}'

# Вход
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'

# Получить проекты (нужен JWT token)
curl -X GET http://localhost:3000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📋 Как добавить новый endpoint

### 1. Создать файл
```
/src/app/api/branches/route.ts
```

### 2. Написать код
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
import { prisma } from '@/lib/db/prisma';
import { successResponse } from '@/lib/utils/response';

const getHandler = withAuth(async (req: NextRequest) => {
  const user = (req as any).user;
  
  const branches = await prisma.branch.findMany({
    where: { /* your filter */ }
  });
  
  return NextResponse.json(successResponse(branches));
});

export { getHandler as GET };
```

### 3. Готово!
Endpoint доступен на `GET /api/branches`

## 💾 Работа с базой данных

```typescript
import { prisma } from '@/lib/db/prisma';

// Create
await prisma.user.create({ data: {...} });

// Read
await prisma.user.findUnique({ where: { id: '...' } });

// Update
await prisma.user.update({ where: { id: '...' }, data: {...} });

// Delete
await prisma.user.delete({ where: { id: '...' } });
```

## 🔐 Защищённые endpoints

Используй `withAuth()` wrapper:

```typescript
const getHandler = withAuth(async (req: NextRequest) => {
  const user = (req as any).user; // userId, email, role
  // your code
});
```

## 🛠️ Полезные команды

```bash
# Запустить dev server
npm run dev

# Prisma Studio (visual DB)
npm run prisma:studio

# Create migration
npm run prisma:migrate

# Generate Prisma client
npm run prisma:generate
```

## 📚 Модели базы данных

- User
- Project
- ProjectMember
- Branch
- PullRequest
- TrivyScan
- AuditLog

Все модели в `prisma/schema.prisma`
