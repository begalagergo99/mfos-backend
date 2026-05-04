# MFOS Backend

**MFOS** — Mini Food Ordering System

A NestJS-based REST API backend for a mini food ordering platform. It supports restaurant browsing, menu management, order placement, and user authentication.

## Tech Stack

- **Framework:** NestJS (TypeScript)
- **Database:** PostgreSQL with TypeORM
- **Auth:** JWT (JSON Web Tokens)
- **API Docs:** Swagger / OpenAPI
- **Package Manager:** pnpm

## Project Setup

```bash
pnpm install
```

## Running the App

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Database Migrations

```bash
# run migrations
pnpm run migration:run

# revert last migration
pnpm run migration:revert
```

## Seed Data

```bash
pnpm run seed
```

## API Documentation

Swagger UI is available at `http://localhost:3000/api` when the app is running.

To regenerate the `swagger.json` file:

```bash
pnpm run swagger:generate
```

## Tests

```bash
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```

## Docker

A Docker Compose setup tartalmazza a PostgreSQL adatbázist és a backend szolgáltatást.
Indítás előtt hozz létre egy `.env` fájlt a projekt gyökerében (lásd `.env.example` alapján).

```bash
# Háttérben futtatva
docker-compose up -d

# Logok követése
docker-compose logs -f backend

# Leállítás
docker-compose down

# Leállítás + adatok törlése
docker-compose down -v
```

A backend induláskor automatikusan:
1. Megvárja, amíg a PostgreSQL elérhetővé válik
2. Lefuttatja az adatbázis migrációkat (`RUN_MIGRATIONS=true`)
3. Feltölti az alap seed adatokat (`RUN_SEED=true`)
4. Elindítja az alkalmazást

## License

MIT
