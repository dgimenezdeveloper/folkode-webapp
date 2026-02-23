#!/usr/bin/env bash
# ============================================================
# start-frontend.sh — Levanta el servidor de desarrollo del frontend
# Uso: ./start-frontend.sh  (desde la raíz del proyecto)
# Compatible con: Linux, macOS
# Para Windows usar: start-frontend.bat
# ============================================================

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🚀  FolKode Frontend — Servidor de Dev  "
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$FRONTEND_DIR"

# 1. Verificar .env
if [ ! -f ".env" ]; then
  if [ -f ".env.example" ]; then
    echo "⚠️  No se encontró .env — copiando desde .env.example..."
    cp .env.example .env
    echo "✅  .env creado."
    echo ""
  else
    echo "⚠️  No existe .env en /frontend. El proyecto puede funcionar sin él."
    echo ""
  fi
fi

# 2. Instalar dependencias si no están
if [ ! -d "node_modules" ]; then
  echo "📦  Instalando dependencias (esto puede tardar unos minutos)..."
  npm install
  echo ""
fi

echo "✅  Todo listo. Iniciando frontend en http://localhost:3000"
echo ""
npm run dev
