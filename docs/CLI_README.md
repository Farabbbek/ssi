# CLI Tool Developer Guide

## 📍 Где работать

**CLI находится здесь:**
```
<project-root>/cli/
```

## 🏗️ Структура проекта

```
cli/
├── main.go              ← Entry point (твоя работа здесь!)
├── go.mod               ← Dependencies
├── go.sum
│
├── cmd/                 ← CLI Commands (создать)
│   ├── init.go
│   ├── clone.go
│   ├── push.go
│   └── config.go
│
├── internal/            ← Internal packages (создать)
│   ├── git/             ← Git operations
│   ├── config/          ← Config management
│   ├── auth/            ← Authentication
│   └── api/             ← API client
│
└── pkg/                 ← Public packages (создать)
    └── utils/
```

## 🛠️ Технологии

- **Language:** Go 1.21+
- **Build:** Go toolchain
- **Config:** YAML/JSON files
- **Storage:** `~/.sithubconfig`

## 🎯 Что должен делать CLI

### Команды для реализации

```bash
# Инициализация
sithub init

# Клонирование репозитория
sithub clone <repo-name>

# Push изменений
sithub push

# Управление конфигом
sithub config set <key> <value>
sithub config get <key>

# Аутентификация
sithub login
sithub logout

# Информация
sithub status
sithub version
```

## 🚀 Как запустить

### 1. Установить зависимости
```bash
cd cli
go mod download
```

### 2. Запустить в dev режиме
```bash
go run main.go
```

### 3. Собрать binary
```bash
go build -o sithub main.go
```

### 4. Установить глобально
```bash
# macOS/Linux
sudo mv sithub /usr/local/bin/

# Проверить
sithub version
```

## 📝 Пример структуры main.go

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    if len(os.Args) < 2 {
        fmt.Println("Usage: sithub <command>")
        os.Exit(1)
    }

    command := os.Args[1]

    switch command {
    case "init":
        initCommand()
    case "clone":
        cloneCommand()
    case "push":
        pushCommand()
    case "version":
        fmt.Println("sithub v1.0.0")
    default:
        fmt.Printf("Unknown command: %s\n", command)
    }
}

func initCommand() {
    fmt.Println("Initializing SitHub repository...")
}

func cloneCommand() {
    if len(os.Args) < 3 {
        fmt.Println("Usage: sithub clone <repo-name>")
        return
    }
    repoName := os.Args[2]
    fmt.Printf("Cloning repository: %s\n", repoName)
}

func pushCommand() {
    fmt.Println("Pushing changes...")
}
```

## 📦 Рекомендуемые библиотеки

```bash
# CLI framework
go get github.com/spf13/cobra

# Config management
go get github.com/spf13/viper

# HTTP client
go get github.com/go-resty/resty/v2

# Git operations
go get github.com/go-git/go-git/v5
```

## 🔧 Config файл (~/.sithubconfig)

```yaml
server:
  url: http://localhost:3000
  
auth:
  token: ""
  username: ""
  
git:
  default_branch: main
  
user:
  email: ""
  name: ""
```

## 📡 Интеграция с Backend API

```go
package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

type LoginRequest struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}

type LoginResponse struct {
    Success bool `json:"success"`
    Data    struct {
        Token string `json:"token"`
    } `json:"data"`
}

func login(email, password string) (string, error) {
    reqBody := LoginRequest{
        Email:    email,
        Password: password,
    }
    
    jsonData, _ := json.Marshal(reqBody)
    
    resp, err := http.Post(
        "http://localhost:3000/api/auth/login",
        "application/json",
        bytes.NewBuffer(jsonData),
    )
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()
    
    var result LoginResponse
    json.NewDecoder(resp.Body).Decode(&result)
    
    return result.Data.Token, nil
}
```

## 🛠️ Команды для разработки

```bash
# Запустить
go run main.go

# Собрать
go build -o sithub

# Тестировать
go test ./...

# Установить зависимости
go mod download

# Обновить зависимости
go mod tidy

# Format код
go fmt ./...
```

## 📋 Workflow разработки

### Phase 1: Basic CLI
- [ ] Создать структуру команд
- [ ] Добавить cobra framework
- [ ] Реализовать `init`, `version`

### Phase 2: Config
- [ ] Создать config файл
- [ ] Читать/записывать настройки
- [ ] Добавить `config set/get`

### Phase 3: Authentication
- [ ] Реализовать `login`
- [ ] Сохранять JWT token
- [ ] Реализовать `logout`

### Phase 4: Git Operations
- [ ] Реализовать `clone`
- [ ] Реализовать `push`
- [ ] Интеграция с go-git

### Phase 5: API Integration
- [ ] HTTP client для backend API
- [ ] Обработка ошибок
- [ ] Retry logic

## ⚠️ Важно

**CLI не использует database напрямую!**
- CLI делает HTTP запросы к backend API
- Backend отвечает за database
- CLI только хранит config и JWT token локально

## 📊 Схема работы

```
User
  ↓
CLI Command (sithub clone repo)
  ↓
HTTP Request → Backend API (/api/projects)
  ↓
Backend проверяет JWT token
  ↓
Backend возвращает данные
  ↓
CLI выполняет git операции локально
```

## 🎯 Пример использования

```bash
# Установка
brew install sithub  # (когда будет готов)

# Вход
sithub login
# Enter email: admin@sithub.local
# Enter password: ********

# Клонирование
sithub clone my-project
# Cloning repository 'my-project'...
# Done!

# Push
cd my-project
git add .
git commit -m "changes"
sithub push
# Pushing to SitHub...
# Done!
```

## 🔐 Безопасность

- Хранить JWT token в `~/.sithubconfig`
- Не логировать пароли
- Использовать HTTPS для production
- Валидировать input
