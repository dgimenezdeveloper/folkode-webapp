# Folkode Backend


## ⚙️ Setup inicial (todos los SO: Windows, Linux, macOS)

> **Importante:** La carpeta `prisma/generated/` **no está en el repositorio** porque los binarios de Prisma son específicos del sistema operativo. Cada desarrollador debe generarlos localmente.

### Pasos para levantar el backend

1. **Configura tus variables de entorno antes de instalar dependencias:**
   - Copia el archivo `.env.example` a `.env` en la carpeta `backend/` y edítalo con tus datos reales.
   ```bash
   cd backend
   cp .env.example .env
   # Edita .env con tus credenciales
   ```

2. **Instala dependencias** (esto también genera automáticamente el cliente Prisma):
   ```bash
   npm install
   ```
   > El script `postinstall` ejecuta `prisma generate` automáticamente. El cliente se genera para tu SO. Si no tienes `.env`, se usará una variable dummy solo para generación, pero no funcionará para migraciones ni uso real.

3. **Ejecutar migraciones:**
   ```bash
   npm run prisma:migrate
   ```

4. **Iniciar el servidor:**
   ```bash
   npm run dev
   ```

---

## Estructura
- `prisma/` — Esquema y migraciones de base de datos
- `prisma.config.ts` — Configuración de Prisma
- `seed.ts` — Script de seed de base de datos
- `server.js` — Servidor Express (API REST)
- `package.json` — Dependencias y scripts

## Scripts útiles
| Script | Descripción |
|---|---|
| `npm install` | Instala dependencias **y genera el cliente Prisma** automáticamente |
| `npm run dev` | Inicia el servidor Express |
| `npm run setup` | Genera el cliente y ejecuta migraciones |
| `npm run prisma:migrate` | Ejecuta migraciones Prisma |
| `npm run prisma:generate` | Regenera el cliente Prisma manualmente |
| `npm run prisma:studio` | Abre Prisma Studio |
| `npm run seed` | Ejecuta el seed de la base de datos |

## Variables de entorno
- Crear `.env` dentro de `/backend` con la variable `DATABASE_URL`

## Despliegue
- Subir `/backend` como servicio independiente en Render (Node.js)
- Configurar variables de entorno en Render

---

## API Endpoints

- `GET /api/projects` — Lista todos los proyectos
- `GET /api/health` — Endpoint de salud
