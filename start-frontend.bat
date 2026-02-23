@echo off
REM ============================================================
REM start-frontend.bat — Levanta el servidor de desarrollo del frontend
REM Uso: start-frontend.bat  (desde la raíz del proyecto)
REM Compatible con: Windows
REM Para Linux/macOS usar: start-frontend.sh
REM ============================================================

setlocal

set "ROOT_DIR=%~dp0"
set "FRONTEND_DIR=%ROOT_DIR%frontend"

echo.
echo ==========================================
echo   FolKode Frontend -- Servidor de Dev
echo ==========================================
echo.

cd /d "%FRONTEND_DIR%"

REM 1. Verificar .env
if not exist ".env" (
    if exist ".env.example" (
        echo [AVISO] No se encontro .env - copiando desde .env.example...
        copy ".env.example" ".env"
        echo [OK] .env creado.
        echo.
    ) else (
        echo [AVISO] No existe .env en /frontend. El proyecto puede funcionar sin el.
        echo.
    )
)

REM 2. Instalar dependencias si no están
if not exist "node_modules\" (
    echo [INFO] Instalando dependencias...
    npm install
    echo.
)

echo [OK] Todo listo. Iniciando frontend en http://localhost:3000
echo.
npm run dev
