# e-shop

`e-shop` is a full-stack eCommerce starter project with:

- Frontend: `Next.js 15`
- Backend: `Strapi 5`
- Database: `MySQL`
- Auth: `Strapi Users & Permissions`
- Orders: `MySQL + Strapi-managed order model`

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
- `Order`

Product data is stored in MySQL table:

```text
products
```

Order data is stored in:

```text
orders
```

Strapi seeds initial demo products automatically from:

- `server/src/index.ts`

Product schema is defined in:

- `server/src/api/product/content-types/product/schema.json`
- `server/src/api/order/content-types/order/schema.json`

### Frontend

The frontend lives in the root app using Next.js App Router.

Important pages:

- `app/page.tsx` for homepage
- `app/shop/page.tsx` for shop page
- `app/product/[id]/page.tsx` for product details

Frontend product data layer:

- `lib/api/products.ts`
- `lib/db.ts`
- `lib/orders.ts`
- `lib/auth.ts`

The frontend reads product data from the same MySQL database used by Strapi, so when product data changes in backend/admin, frontend can show updated content.

Auth and order API routes:

- `app/api/auth/login/route.ts`
- `app/api/auth/register/route.ts`
- `app/api/auth/me/route.ts`
- `app/api/auth/logout/route.ts`
- `app/api/orders/route.ts`
- `app/api/orders/[trackingToken]/route.ts`

## Data Flow

Current flow:

1. Strapi manages product data in MySQL
2. Product records are stored in `e-shop.products`
3. Users can register and login from frontend
4. Guest users must login before adding products to cart
5. Next.js reads product rows and renders dynamic pages
6. Checkout creates a database order and reduces stock
7. Every order gets a public tracking link
8. Logged-in user can view order history from `/account/orders`
9. Anyone with tracking link can view delivery status from `/track/[token]`

## Admin Use

Open:

```text
http://localhost:1337/admin
```

From there you can:

- manage products
- update product details
- change title, description, price, category, image
- update stock quantity
- set compare/discount price
- manage order status from backend data model

After backend data changes, frontend pages will use that database content.

## Useful Files

- `package.json` root scripts
- `server/package.json` backend scripts
- `server/.env` Strapi backend env
- `server/.env.example` backend env example
- `.env.local.example` frontend DB env example
- `database setup.md` database notes
- `store/use-auth-store.ts` auth state
- `store/use-cart-store.ts` cart state
- `components/orders/*` order tracking UI

## Notes

- Root `npm run dev` now starts both frontend and backend together
- Frontend default URL is `http://localhost:3000`
- Backend admin URL is `http://localhost:1337/admin`
- MySQL database name is `e-shop`
- If port `3000` is busy, Next.js uses the next free port automatically
- Order tracking page works with or without login if tracking link is known

## Current Stack

- `Next.js 15`
- `React 19`
- `TypeScript`
- `Tailwind CSS`
- `Strapi 5`
- `MySQL`
- `Zustand`
