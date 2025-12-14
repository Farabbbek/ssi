# SitHub

Self-hosted corporate code repository with integrated security scanning.

## 🚀 Quick Start (Для нового разработчика)

### Шаг 1: Установить зависимости
```bash
# Нужны: Node.js 18+, PostgreSQL 16, Docker (опционально)
node --version 
```

### Шаг 2: Склонировать и установить пакеты
```bash
git clone <repo-url>
cd ss/web
# Включить Corepack и активировать pnpm (рекомендуется)
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
```

### Шаг 3: Запустить базу данных

**Вариант A: Docker**
```bash
cd ..  # вернись в корень проекта
docker-compose up -d
```

### Шаг 4: Настроить .env
```bash
cd web
# Для Docker:
echo 'DATABASE_URL="postgresql://sithub:securepassword@localhost:5432/sithub?schema=public"' > .env


### Шаг 5: Применить схему и загрузить данные
```bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
```

### Шаг 6: Запустить сервер
```bash
pnpm dev
# Открой http://localhost:3000
```

### Шаг 7: Залогиниться
- Перейди: `http://localhost:3000/login`
- Логин: `admin@sithub.local` / `password123`
- Или: `dev@sithub.local` / `dev123456`

---

## 🎯 Features

- Git repository hosting
- Pull request management
- Integrated Trivy security scanning
- User and project management
- Role-based access control (RBAC)
- Web interface and CLI tool

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Node.js (Next.js API Routes), PostgreSQL, Prisma ORM
- **CLI Tool:** Go
- **Database:** PostgreSQL 16
- **Security:** JWT authentication, bcryptjs password hashing
- **Design:** Glassmorphism UI

## 📁 Project Structure

```
sithub/
├── web/                    # Next.js (Frontend + Backend API)
│   ├── src/
│   │   ├── app/           # Frontend pages
│   │   ├── api/           # Backend endpoints
│   │   ├── components/    # UI components
│   │   └── lib/           # Utilities
│   └── prisma/            # Database schema
│
├── cli/                   # CLI Tool (Go)
│   └── main.go
│
├── docs/                  # Documentation
│   ├── BACKEND_README.md
│   ├── FRONTEND_README.md
│   ├── CLI_README.md
│   └── DATABASE_README.md
│
└── README.md              # This file
```

## 🚀 Quick Start

### 1. Database Setup
```bash
# См. docs/DATABASE_README.md
brew install postgresql@16
brew services start postgresql@16
```

### 2. Backend + Frontend
```bash
cd web
npm install
npm run dev
# http://localhost:3000
```

### 3. CLI Tool
```bash
cd cli
go build -o sithub
./sithub version
```

## 📚 Documentation

### Для разработчиков

- **[Backend Guide](docs/BACKEND_README.md)** - API разработка (Node.js)
- **[Frontend Guide](docs/FRONTEND_README.md)** - UI разработка (React)
- **[CLI Guide](docs/CLI_README.md)** - CLI tool разработка (Go)
- **[Database Guide](docs/DATABASE_README.md)** - PostgreSQL setup

### Кто где работает

| Role | Location | Tech |
|------|----------|------|
| Backend Developer | `/web/src/app/api/` | Node.js + TypeScript |
| Frontend Developer | `/web/src/app/` | React + TypeScript |
| CLI Developer | `/cli/` | Go |
| Database Admin | PostgreSQL | Prisma |

## ✅ Current Status

### Ready ✅
- PostgreSQL database with 7 models
- Backend API (10+ endpoints)
- Frontend design system (GlassCard, GlassButton)
- Authentication (JWT + bcryptjs)
- User & Project services
- Prisma ORM integration
- Test data seeded

### In Progress ⏳
- Additional frontend pages
- CLI tool implementation
- Security scanning integration
- Git operations

## 🔐 Default Credentials

**Admin:**
- Email: admin@sithub.local
- Password: password123

**Developer:**
- Email: dev@sithub.local  
- Password: dev123456

## 📦 Ports

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3000/api/*
- **Prisma Studio:** http://localhost:5555
- **PostgreSQL:** localhost:5432

## 🛠️ Development

```bash
# Запустить сервер (frontend + backend)
cd web && pnpm dev

# Открыть GUI для базы данных
cd web && pnpm prisma studio

# Пересоздать Prisma клиент после изменений схемы
cd web && pnpm prisma generate

# Применить схему без миграций (быстро, для разработки)
cd web && pnpm prisma db push

# Создать миграцию (для продакшена)
cd web && pnpm prisma migrate dev --name <change_name>

# Загрузить тестовые данные
cd web && pnpm tsx prisma/seed.ts

# Docker команды
docker-compose up -d              # Запустить PostgreSQL
docker-compose down               # Остановить
docker logs sithub-postgres       # Логи
```

## 🔧 Troubleshooting

**Порт 3000 занят:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Ошибка подключения к БД:**
```bash
# Проверь DATABASE_URL в web/.env
# Docker: postgresql://sithub:securepassword@localhost:5432/sithub
```

**Prisma ошибки (красные типы):**
```bash
cd web
npx prisma generate
# Перезапусти TypeScript сервер: Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

**Dashboard не показывается после логина:**
```bash
# Открой консоль браузера (F12) и проверь ошибки
# Токен должен сохраниться в localStorage как "sithub_token"
```

## 📄 License

MIT
