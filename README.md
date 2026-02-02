# Blogging Platform API

This repository includes a Docker-ready MySQL-backed API that syncs models on startup and exposes post-related endpoints.

## Project inspiration

- Roadmap.sh project: https://roadmap.sh/projects/blogging-platform-api

## Tech stack

- TypeScript
- Express ([`expressLoader`](src/app.ts))
- Sequelize / MySQL ([`sequelize`](src/config/database.ts))
- Docker / Docker Compose ([docker-compose.yml](docker-compose.yml))
- Request limiting middleware ([`limiter`](src/middlewares/request-limiter.ts))

## Key files

- Entry point: [src/server.ts](src/server.ts) — starts the server and initializes [`ProcessSupervisor`](src/config/process-supervisor.ts)
- App setup: [src/app.ts](src/app.ts) — exports [`expressLoader`](src/app.ts)
- Database: [src/config/database.ts](src/config/database.ts) — exports [`sequelize`](src/config/database.ts)
- Supervisor: [src/config/process-supervisor.ts](src/config/process-supervisor.ts) — [`ProcessSupervisor`](src/config/process-supervisor.ts)
- Routes: [src/routes/posts.route.ts](src/routes/posts.route.ts) — posts routing (`postRoutes`)
- Controllers: [src/controllers/post-controller.ts](src/controllers/post-controller.ts)
- Services: [src/services/postService.ts](src/services/postService.ts)
- Repositories: [src/repositories/post.repository.ts](src/repositories/post.repository.ts)
- Models: [src/models/post.ts](src/models/post.ts)
- Middleware: [src/middlewares/request-limiter.ts](src/middlewares/request-limiter.ts) — [`limiter`](src/middlewares/request-limiter.ts)
- Utils: [src/utils/response.ts](src/utils/response.ts)
- Tests: [tests/validatePost.test.ts](tests/validatePost.test.ts)
- Environment example: [.env.example](.env.example)
- Docker compose: [docker-compose.yml](docker-compose.yml)
- Package metadata: [package.json](package.json)

## Getting started

1. Copy environment example:
   cp .env.example .env.local
   Edit `.env.local` and provide database and PORT values.

2. Recommended (Docker):
   docker-compose up --build

   The `app` service depends on the MySQL service defined in [docker-compose.yml](docker-compose.yml).

3. Alternative (local Node):
   - Install dependencies (pnpm / npm)
   - Start with your project scripts (the primary entry point is [src/server.ts](src/server.ts) which uses [`expressLoader`](src/app.ts) and syncs [`sequelize`](src/config/database.ts) on startup).

## API snapshot

- Health: GET /api/v1/health (defined in [src/app.ts](src/app.ts))
- Posts: mounted under `/api/v1` via [src/routes/posts.route.ts](src/routes/posts.route.ts)

## Notes

- On startup, models are synced via Sequelize ([`sequelize.sync({ alter: true })`](src/server.ts)), so ensure the DB credentials in [.env.local](.env.example) are correct.
- Rate limiting is applied via [`limiter`](src/middlewares/request-limiter.ts).

## Tests

- See [tests/validatePost.test.ts](tests/validatePost.test.ts)

## Contributing

PRs welcome. I will pity yall 😂. Follow existing code structure in [src/](src/) and ensure env values are set in `.env.local` before running.

## License

No License 😋

