@echo off
REM ============================================================
REM start-backend.bat — Levanta el servidor de desarrollo del backend
REM Uso: start-backend.bat  (desde la raíz del proyecto)
REM Compatible con: Windows
REM Para Linux/macOS usar: start-backend.sh
REM ============================================================

setlocal

set "ROOT_DIR=%~dp0"
set "BACKEND_DIR=%ROOT_DIR%backend"

echo.
echo ==========================================
echo   FolKode Backend -- Servidor de Dev
echo ==========================================
echo.

cd /d "%BACKEND_DIR%"

REM 1. Verificar .env
if not exist ".env" (
    if exist ".env.example" (
        echo [AVISO] No se encontro .env - copiando desde .env.example...
        copy ".env.example" ".env"
        echo [OK] .env creado. Editalo con tus credenciales reales antes de continuar.
        echo.
    ) else (
        echo [ERROR] No existe .env ni .env.example en /backend.
        echo         Crea el archivo .env con la variable DATABASE_URL.
        pause
        exit /b 1
    )
)

REM 2. Instalar dependencias si no están (también corre prisma generate via postinstall)
if not exist "node_modules\" (
    echo [INFO] Instalando dependencias...
    npm install
    echo.
)

REM 3. Verificar que el cliente Prisma fue generado
if not exist "node_modules\.prisma\client\" (
    echo [INFO] Generando cliente Prisma para Windows...
    npm run prisma:generate
    echo.
)

echo [OK] Todo listo. Iniciando backend en http://localhost:4000
echo.
npm run dev
