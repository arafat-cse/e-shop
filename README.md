# e-shop

`e-shop` is a full-stack eCommerce starter project with:

- Frontend: `Next.js 15`
- Backend: `Strapi 5`
- Database: `MySQL`

## Project URLs

When you run the project locally:

- Frontend: `http://localhost:3000`
- Strapi Admin: `http://localhost:1337/admin`
- Strapi Server: `http://localhost:1337`

## How To Run

### 1. Install dependencies

From project root:

```bash
npm install
```

Backend dependencies:

```bash
cd server
npm install
```

### 2. Database setup

This project is currently configured for MySQL with:

```text
Host: 127.0.0.1
Port: 3306
Database: e-shop
Username: root
Password: root
```

If needed, update:

- `server/.env`
- `.env.local` for frontend DB access

You can create frontend local env from:

```bash
cp .env.local.example .env.local
```

### 3. Run frontend + backend together

From root:

```bash
npm run dev
```

This command starts:

- Next.js frontend
- Strapi backend

It will also print these links in terminal:

- `http://localhost:3000`
- `http://localhost:1337/admin`

You can click the links directly from terminal/IDE output if your terminal supports clickable URLs.

If port `3000` is already busy, Next.js will automatically use the next free port such as `3001`.

## Separate Run Commands

Frontend only:

```bash
npm run frontend:dev
```

Backend only:

```bash
npm run server:dev
```

## Build Commands

Frontend build:

```bash
npm run build
```

Backend build:

```bash
npm run server:build
```

## How It Works

### Backend

The backend lives inside:

```text
/var/www/html/e-shop/server
```

It uses Strapi as the CMS/admin panel.

Current product content type:

- `Product`

Product data is stored in MySQL table:

```text
products
```

Strapi seeds initial demo products automatically from:

- `server/src/index.ts`

Product schema is defined in:

- `server/src/api/product/content-types/product/schema.json`

### Frontend

The frontend lives in the root app using Next.js App Router.

Important pages:

- `app/page.tsx` for homepage
- `app/shop/page.tsx` for shop page
- `app/product/[id]/page.tsx` for product details

Frontend product data layer:

- `lib/api/products.ts`
- `lib/db.ts`

The frontend reads product data from the same MySQL database used by Strapi, so when product data changes in backend/admin, frontend can show updated content.

## Data Flow

Current flow:

1. Strapi manages product data in MySQL
2. Product records are stored in `e-shop.products`
3. Next.js reads those product rows
4. Homepage, shop page, and product details page render dynamic product data

## Admin Use

Open:

```text
http://localhost:1337/admin
```

From there you can:

- manage products
- update product details
- change title, description, price, category, image

After backend data changes, frontend pages will use that database content.

## Useful Files

- `package.json` root scripts
- `server/package.json` backend scripts
- `server/.env` Strapi backend env
- `server/.env.example` backend env example
- `.env.local.example` frontend DB env example
- `database setup.md` database notes

## Notes

- Root `npm run dev` now starts both frontend and backend together
- Frontend default URL is `http://localhost:3000`
- Backend admin URL is `http://localhost:1337/admin`
- MySQL database name is `e-shop`

## Current Stack

- `Next.js 15`
- `React 19`
- `TypeScript`
- `Tailwind CSS`
- `Strapi 5`
- `MySQL`
- `Zustand`
