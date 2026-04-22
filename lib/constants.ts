export const APP_NAME = "e-shop";
export const APP_DESCRIPTION =
  "A Bangladesh-ready eCommerce storefront with Next.js, Strapi, MySQL, account login, orders, and tracking.";
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://127.0.0.1:1337/api";
export const STRAPI_BASE_URL =
  process.env.STRAPI_BASE_URL ?? "http://127.0.0.1:1337";
export const SHIPPING_FEE = 120;
export const AUTH_COOKIE_NAME = "eshop_jwt";
