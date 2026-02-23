#!/usr/bin/env node
/**
 * Script cross-platform para ejecutar `prisma generate`.
 * Funciona en Windows, Linux y macOS.
 * Si no existe DATABASE_URL en el entorno, usa una URL dummy
 * para que `prisma generate` no falle (solo genera el cliente, no conecta a la BD).
 */
import { execSync } from "child_process";
import { config } from "dotenv";
import { existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env");

// Cargar .env si existe
if (existsSync(envPath)) {
  config({ path: envPath });
}

// Si DATABASE_URL no está definida, usar valor dummy
// prisma generate no necesita conectarse, pero validará la variable
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "postgresql://user:pass@localhost:5432/db";
  console.log(
    "[generate] DATABASE_URL no encontrada, usando valor dummy para generación."
  );
}

try {
  execSync("npx prisma generate --schema=prisma/schema.prisma", {
    stdio: "inherit",
    env: process.env,
    cwd: resolve(__dirname, ".."),
  });
} catch (err) {
  console.error("[generate] Error al ejecutar prisma generate:", err.message);
  process.exit(1);
}
