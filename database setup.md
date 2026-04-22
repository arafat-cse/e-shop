# Strapi SQL Database Setup

This project now includes a Strapi backend inside `/var/www/html/e-shop/server`.

Strapi version:
- `5.42.1`

Recommended SQL database:
- `PostgreSQL`

Official references used:
- `https://docs.strapi.io/cms/installation/cli`
- `https://docs.strapi.io/cms/configurations/database`

## Current backend defaults

The backend is configured through:
- `server/.env`
- `server/config/database.ts`

Current default connection values:

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5433
DATABASE_NAME=eshop_strapi
DATABASE_USERNAME=eshop_user
DATABASE_PASSWORD=change_me
DATABASE_SCHEMA=public
DATABASE_SSL=false
```

## PostgreSQL setup

If PostgreSQL is already installed and running, create the database and user first.

Example SQL:

```sql
CREATE ROLE eshop_user WITH LOGIN PASSWORD 'change_me';
CREATE DATABASE eshop_strapi OWNER eshop_user;
GRANT ALL PRIVILEGES ON DATABASE eshop_strapi TO eshop_user;
```

If your local PostgreSQL runs on port `5432` instead of `5433`, update `server/.env`.

## Run Strapi backend

From project root:

```bash
npm run server:dev
```

Or directly from the backend folder:

```bash
cd /var/www/html/e-shop/server
npm run dev
```

Admin panel URL:

```text
http://localhost:1337/admin
```

## Important note

I could scaffold the Strapi backend and prepare the PostgreSQL config, but I could not auto-create the PostgreSQL user/database from this shell because local PostgreSQL authentication for this user is restricted. If needed, create the database manually with a PostgreSQL superuser and then start Strapi.
