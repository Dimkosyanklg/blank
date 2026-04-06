# React + Go BFF (Render)

Стартовый шаблон монорепозитория:

- `frontend` — React (Vite + TypeScript)
- `bff` — Go BFF (HTTP API)
- `render.yaml` — описание сервисов для Render Blueprint

## Локальный запуск

### 1) BFF (Go)

```bash
cd bff
go run ./cmd/server
```

Сервер поднимется на `http://localhost:8080`.

### 2) Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Фронт поднимется на `http://localhost:5173` и будет проксировать `/api/*` в BFF.

## API

- `GET /api/health` -> `{ "status": "ok" }`

## Deploy на Render

1. Подключи репозиторий в Render.
2. Создай сервисы через `render.yaml` (Blueprint).
3. Для `react-frontend` задай `VITE_API_BASE_URL`:
   - например: `https://go-bff.onrender.com/api`
4. Для `go-bff` задай `CORS_ALLOWED_ORIGIN`:
   - например: `https://react-frontend.onrender.com`

После этого фронтенд будет ходить в BFF на Render.
