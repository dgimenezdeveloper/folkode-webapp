#!/usr/bin/env bash
# ============================================================
# start-backend.sh — Levanta el servidor de desarrollo del backend
# Uso: ./start-backend.sh  (desde la raíz del proyecto)
# Compatible con: Linux, macOS
# Para Windows usar: start-backend.bat
# ============================================================

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🚀  FolKode Backend — Servidor de Dev  "
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$BACKEND_DIR"

# 1. Verificar .env
if [ ! -f ".env" ]; then
  if [ -f ".env.example" ]; then
    echo "⚠️  No se encontró .env — copiando desde .env.example..."
    cp .env.example .env
    echo "✅  .env creado. Editalo con tus credenciales reales antes de continuar."
    echo ""
  else
    echo "❌  ERROR: No existe .env ni .env.example en /backend."
    echo "    Creá el archivo .env con la variable DATABASE_URL."
    exit 1
  fi
fi

# 2. Instalar dependencias si no están (también corre prisma generate via postinstall)
if [ ! -d "node_modules" ]; then
  echo "📦  Instalando dependencias (esto puede tardar unos minutos)..."
  npm install
  echo ""
fi

# 3. Verificar que el cliente Prisma fue generado
if [ ! -d "node_modules/.prisma/client" ]; then
  echo "🔧  Generando cliente Prisma para este sistema operativo..."
  npm run prisma:generate
  echo ""
fi

echo "✅  Todo listo. Iniciando backend en http://localhost:4000"
echo ""
npm run dev
