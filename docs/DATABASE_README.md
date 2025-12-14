# Database Setup Guide

## 📍 База данных

**PostgreSQL 16** на `localhost:5432`

- **Database:** sithub
- **User:** sithub
- **Password:** sithub_password

## 🚀 Установка PostgreSQL

### Вариант 1: Docker (Рекомендуется)

**Используем docker-compose для быстрого старта:**

```bash
# Запустить PostgreSQL в Docker
docker-compose up -d

# Проверить что контейнер запущен
docker ps | grep sithub-postgres

# Логи контейнера
docker logs sithub-postgres
```

**Конфигурация из docker-compose.yml:**
- **Image:** postgres:16-alpine
- **Container:** sithub-postgres
- **Port:** 5432
- **User:** sithub
- **Password:** securepassword
- **Database:** sithub

**Полезные команды:**
```bash
# Остановить
docker-compose down

# Остановить и удалить данные
docker-compose down -v

# Перезапустить
docker-compose restart

# Войти в контейнер
docker exec -it sithub-postgres psql -U sithub -d sithub
```

### Вариант 2: Локальная установка

#### macOS (Homebrew)
```bash
# Установить PostgreSQL 16
brew install postgresql@16

# Добавить в PATH
export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"

# Запустить сервис
brew services start postgresql@16
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql-16
sudo systemctl start postgresql
```

## 🔧 Настройка базы данных

### Если используешь Docker (docker-compose)

**База уже настроена автоматически!** 🎉

```bash
# Просто запусти
docker-compose up -d

# Проверь подключение
docker exec -it sithub-postgres psql -U sithub -d sithub -c "SELECT version();"
```

**⚠️ Важно:** В `.env` файле используй пароль из `docker-compose.yml`:
```env
DATABASE_URL="postgresql://sithub:securepassword@localhost:5432/sithub?schema=public"
```

### Если используешь локальную установку

#### 1. Создать user и database

```bash
# Войти в PostgreSQL
psql postgres

# Создать user
CREATE USER sithub WITH PASSWORD 'sithub_password';

# Создать database
CREATE DATABASE sithub OWNER sithub;

# Дать права
GRANT ALL PRIVILEGES ON DATABASE sithub TO sithub;

# Выйти
\q
```

#### 2. Проверить подключение

```bash
psql -U sithub -d sithub -c "SELECT version();"
```

В `.env` файле:
```env
DATABASE_URL="postgresql://sithub:sithub_password@localhost:5432/sithub?schema=public"
```

## 📦 Prisma Setup

### 1. Установить зависимости
```bash
cd web
npm install
```

### 2. Проверить .env файл
```env
DATABASE_URL="postgresql://sithub:sithub_password@localhost:5432/sithub?schema=public"
```

### 3. Применить schema
```bash
npx prisma db push
```

### 4. Загрузить тестовые данные
```bash
npx prisma db seed
```

## 📜 Prisma Migrations (кратко)

- Начальная миграция (для командной работы/CI):
   ```bash
   cd web
   # Убедись, что в .env задан DATABASE_URL
   # Если у пользователя нет права CREATEDB, создай отдельную shadow DB:
   docker exec -it sithub-postgres psql -U sithub -c "CREATE DATABASE sithub_shadow;"
   # И добавь в .env:
   # SHADOW_DATABASE_URL="postgresql://sithub:securepassword@localhost:5432/sithub_shadow?schema=public"
   npx prisma migrate dev --name init_schema
   ```

- Новая миграция после изменения схемы:
   ```bash
   cd web
   npx prisma migrate dev --name <change_name>
   ```

- Деплой миграций (staging/prod):
   ```bash
   cd web
   npx prisma migrate deploy
   ```

- Если нет прав на создание shadow DB (ошибка P3014) — обходной путь (baseline):
   ```bash
   cd web
   mkdir -p prisma/migrations/0001_init
   npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0001_init/migration.sql
   npx prisma migrate resolve --applied 0001_init
   npx prisma migrate status
   ```

## 🗂️ Database Schema

### Models (7 таблиц)

1. **User** - Пользователи
   - id, username, email, password_hash, role
   
2. **Project** - Проекты (репозитории)
   - id, name, description, repo_path, is_private
   
3. **ProjectMember** - Члены проекта
   - id, project_id, user_id, role
   
4. **Branch** - Ветки
   - id, project_id, name, is_default, protected
   
5. **PullRequest** - Pull requests
   - id, project_id, title, source_branch, target_branch, status
   
6. **TrivyScan** - Security scans
   - id, project_id, commit_hash, scan_results, status
   
7. **AuditLog** - Логи действий
   - id, action, details, user_id, project_id

## 🛠️ Полезные команды

### Docker

```bash
# Запустить контейнер
docker-compose up -d

# Остановить
docker-compose down

# Перезапустить
docker-compose restart

# Логи
docker logs sithub-postgres

# Войти в контейнер
docker exec -it sithub-postgres bash

# Подключиться к БД
docker exec -it sithub-postgres psql -U sithub -d sithub

# Список таблиц
docker exec -it sithub-postgres psql -U sithub -d sithub -c "\dt"
```

### PostgreSQL (если локально)

```bash
# Запустить
brew services start postgresql@16

# Остановить
brew services stop postgresql@16

# Перезапустить
brew services restart postgresql@16

# Войти в database
psql -U sithub -d sithub

# Список tables
\dt

# Описание table
\d "User"

# SQL query
SELECT * FROM "User";
```

### Prisma

```bash
# Применить изменения schema
npx prisma db push

# Создать migration
npx prisma migrate dev --name <name>

# Загрузить seed данные
npx prisma db seed

# Открыть Prisma Studio
npx prisma studio

# Сгенерировать client
npx prisma generate

# Сбросить database
npx prisma migrate reset
```

## 👁️ Prisma Studio (Visual Database)

### Запустить
```bash
cd web
npx prisma studio
```

Откроется на `http://localhost:5555`

### Что можно делать
- ✅ Просматривать все таблицы
- ✅ Редактировать записи
- ✅ Создавать новые записи
- ✅ Удалять записи
- ✅ Фильтровать данные
- ✅ Видеть relationships

## 📊 Тестовые данные

После `npx prisma db seed` будут созданы:

### Users (2)
- **admin@sithub.local** / password123 (ADMIN)
- **dev@sithub.local** / dev123456 (DEVELOPER)

### Projects (1)
- Sample Repository

### Branches (2)
- main (default)
- develop

### Pull Request (1)
- "Feature: Add login page"

## 🔍 Проверка данных

```bash
# Подключиться к database
psql -U sithub -d sithub

# Посмотреть пользователей
SELECT username, email, role FROM "User";

# Посмотреть проекты
SELECT name, repo_path FROM "Project";

# Посмотреть ветки
SELECT name, is_default FROM "Branch";

# Выйти
\q
```

## ⚠️ Решение проблем

### Docker

#### "Cannot connect to database"
```bash
# Проверить что контейнер запущен
docker ps | grep sithub-postgres

# Если не запущен, запустить
docker-compose up -d

# Проверить логи
docker logs sithub-postgres
```

#### "Port 5432 already in use"
```bash
# Остановить локальный PostgreSQL
brew services stop postgresql@16

# Или изменить порт в docker-compose.yml
ports:
  - "5433:5432"  # Внешний порт 5433
```

#### "Container exits immediately"
```bash
# Посмотреть логи
docker logs sithub-postgres

# Удалить старый volume и пересоздать
docker-compose down -v
docker-compose up -d
```

### Локальная установка

#### "Connection refused"
```bash
# Проверить что PostgreSQL запущен
brew services list | grep postgresql

# Запустить если не запущен
brew services start postgresql@16
```

#### "Role does not exist"
```bash
# Создать user заново
psql postgres -c "CREATE USER sithub WITH PASSWORD 'sithub_password';"
```

#### "Database does not exist"
```bash
# Создать database заново
psql postgres -c "CREATE DATABASE sithub OWNER sithub;"
```

#### "Permission denied"
```bash
# Дать права
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE sithub TO sithub;"
```

## 🔐 Security (Production)

Для production измени:

```env
# Сильный пароль
DATABASE_URL="postgresql://sithub:STRONG_PASSWORD_HERE@localhost:5432/sithub"

# Или используй managed database
DATABASE_URL="postgresql://user:pass@aws-rds-endpoint:5432/dbname"
```

## 📋 Database Backup

### Создать backup
```bash
pg_dump -U sithub -d sithub -F c -f backup.dump
```

### Восстановить backup
```bash
pg_restore -U sithub -d sithub backup.dump
```

## 🛡️ Рекомендации

1. **Development:** Используй локальный PostgreSQL
2. **Production:** Используй managed service (AWS RDS, Heroku Postgres, etc.)
3. **Backup:** Делай регулярные бэкапы
4. **Monitoring:** Включи логирование запросов
5. **Security:** Используй сильные пароли

## ✅ Checklist

### Docker setup
- [ ] Docker и Docker Compose установлены
- [ ] Запущен `docker-compose up -d`
- [ ] Контейнер `sithub-postgres` работает
- [ ] `.env` файл использует `securepassword`
- [ ] Connection работает: `docker exec -it sithub-postgres psql -U sithub -d sithub`
- [ ] `npx prisma db push` выполнен
- [ ] `npx prisma db seed` выполнен
- [ ] Prisma Studio открывается
- [ ] Тестовые данные видны в таблицах

### Локальная установка
- [ ] PostgreSQL 16 установлен
- [ ] User `sithub` создан
- [ ] Database `sithub` создана
- [ ] Connection работает
- [ ] `.env` файл настроен с правильным паролем
- [ ] `npx prisma db push` выполнен
- [ ] `npx prisma db seed` выполнен
- [ ] Prisma Studio открывается
- [ ] Тестовые данные видны в таблицах

Всё готово! 🚀
