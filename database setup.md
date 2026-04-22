# Strapi SQL Database Setup

This project now includes a Strapi backend inside `/var/www/html/e-shop/server`.

Strapi version:
- `5.42.1`

Recommended SQL database:
- `MySQL`

Official references used:
- `https://docs.strapi.io/cms/installation/cli`
- `https://docs.strapi.io/cms/configurations/database`

## Current backend defaults

The backend is configured through:
- `server/.env`
- `server/config/database.ts`

Current default connection values:

```env
DATABASE_CLIENT=mysql
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=e-shop
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
DATABASE_SSL=false
```

## MySQL setup

The backend is configured to use the existing MySQL database:
- Database: `e-shop`
- Username: `root`
- Password: `root`

If you ever need to create it manually, use:

```sql
CREATE DATABASE `e-shop`;
```

If your MySQL server runs on a different port or uses different credentials, update `server/.env`.

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

The backend has been switched from PostgreSQL to MySQL because your local phpMyAdmin/MySQL credentials are available and the `e-shop` database already exists.
