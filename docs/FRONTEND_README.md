# Frontend Developer Guide

## 📍 Где работать

**Frontend находится здесь:**
```
<project-root>/web/src/app/
```

## 🏗️ Структура проекта

```
web/
├── src/
│   ├── app/                  ← Pages & Layouts (твоя работа здесь!)
│   │   ├── page.tsx          ← Landing page
│   │   ├── layout.tsx        ← Root layout
│   │   ├── globals.css       ← Global styles
│   │   ├── dashboard/        ← Dashboard pages
│   │   ├── projects/         ← Projects pages
│   │   └── ...
│   │
│   ├── components/           ← UI Components
│   │   └── ui/
│   │       ├── glass-card.tsx
│   │       ├── glass-button.tsx
│   │       └── ...
│   │
│   └── lib/                  ← Utilities (можешь использовать)
│       └── utils/
│
├── public/                   ← Static files
├── tailwind.config.ts        ← Design system config
└── package.json
```

## 🛠️ Технологии

- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Design System:** Glassmorphism (navy + neon)
- **Components:** GlassCard, GlassButton

## 🚀 Как запустить

### 1. Установить зависимости
```bash
cd web
npm install
```

### 2. Запустить dev server
```bash
npm run dev
```

Frontend будет на: `http://localhost:3000`

## 🎨 Design System

### Colors
- **Navy:** `navy-900`, `navy-800`, `navy-700`
- **Glass:** `glass-dark`, `glass-darker`, `glass-border`
- **Neon:** `purple-neon`, `indigo-neon`

### Components

#### GlassCard
```tsx
import { GlassCard } from '@/components/ui';

<GlassCard variant="default">
  Content here
</GlassCard>

// Variants: default, dark, gradient
// Interactive: interactive={true}
```

#### GlassButton
```tsx
import { GlassButton } from '@/components/ui';

<GlassButton variant="primary" size="md">
  Click me
</GlassButton>

// Variants: primary, secondary, outlined
// Sizes: sm, md, lg
// Loading state: loading={true}
```

### Tailwind Classes
```css
bg-glass-dark          /* Glassmorphism background */
backdrop-blur-lg       /* Blur effect */
border-glass-border    /* Glass border */
shadow-glass           /* Glass shadow */
text-purple-neon       /* Neon purple text */
```

## 📡 API Integration

### Authentication
```typescript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const { data } = await response.json();
localStorage.setItem('token', data.token);
```

### Protected Requests
```typescript
const token = localStorage.getItem('token');

const response = await fetch('/api/projects', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const { data } = await response.json();
```

## 📝 Что уже готово

### Pages
- ✅ Landing page (`/`)
- ✅ Design system showcase (`/design-system`)

### Components
- ✅ GlassCard (3 variants)
- ✅ GlassButton (3 variants, 3 sizes)

### Styles
- ✅ Global CSS (glassmorphism theme)
- ✅ Tailwind config (40+ design tokens)
- ✅ Custom scrollbar
- ✅ Gradient backgrounds

## 🎯 Нужно добавить

### Pages (TODO)
- [ ] `/login` - Login page
- [ ] `/register` - Register page
- [ ] `/dashboard` - User dashboard
- [ ] `/projects` - Projects list
- [ ] `/projects/[id]` - Project details

### Components (TODO)
- [ ] Input fields
- [ ] Forms
- [ ] Modal dialogs
- [ ] Navigation menu
- [ ] User profile dropdown

## 📋 Создание новой страницы

### 1. Создать файл
```
/src/app/dashboard/page.tsx
```

### 2. Написать код
```tsx
'use client';

import { GlassCard, GlassButton } from '@/components/ui';

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8">
      <GlassCard>
        <h1 className="text-3xl font-bold text-purple-neon">
          Dashboard
        </h1>
        <GlassButton variant="primary">
          Action
        </GlassButton>
      </GlassCard>
    </div>
  );
}
```

### 3. Готово!
Page доступна на `http://localhost:3000/dashboard`

## 🧩 Создание компонента

### 1. Создать файл
```
/src/components/ui/input.tsx
```

### 2. Написать код
```tsx
interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Input({ value, onChange, placeholder }: InputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2 bg-glass-dark border border-glass-border 
                 rounded-lg backdrop-blur-lg focus:border-purple-neon 
                 transition-colors"
    />
  );
}
```

### 3. Экспортировать
```typescript
// /src/components/ui/index.ts
export { Input } from './input';
```

## 🛠️ Полезные команды

```bash
# Запустить dev server
npm run dev

# Build для production
npm run build

# Запустить production server
npm start

# Lint код
npm run lint
```

## 🎨 Design System Demo

Открой `http://localhost:3000/design-system` чтобы увидеть:
- Все цвета
- Все компоненты
- Все варианты
- Интерактивные примеры

## 📚 Полезные ссылки

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **TypeScript:** https://typescriptlang.org
