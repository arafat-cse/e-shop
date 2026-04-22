import "server-only";

import mysql, { type Pool } from "mysql2/promise";

declare global {
  var __eshopDbPool: Pool | undefined;
}

function createPool() {
  return mysql.createPool({
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "root",
    database: process.env.DB_NAME ?? "e-shop",
    waitForConnections: true,
    connectionLimit: 10
  });
}

export function getDbPool() {
  if (!global.__eshopDbPool) {
    global.__eshopDbPool = createPool();
  }

  return global.__eshopDbPool;
}
