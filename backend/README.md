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

# Folkode Backend API

- `/api/health` — Endpoint de salud

La API requiere autenticación para todas las operaciones sobre `/api/projects`.

### 📁 Proyectos (`server.js`)
- **`GET /api/projects`**: Lista todos los proyectos. Soporta paginación (`?page=1&limit=10`) y filtros (`?status=COMPLETED&search=texto`). Requiere Bearer Token (Admin).
- **`GET /api/projects/:id`**: Obtiene el detalle de un proyecto, incluyendo sus secciones, subsecciones e imágenes ordenadas. Requiere Bearer Token (Admin).
- **`POST /api/projects`**: Crea un proyecto nuevo. Valida campos obligatorios y la unicidad del `slug`. Los campos `category` y `status` deben coincidir estrictamente con los Enums definidos en la base de datos. Requiere Bearer Token (Admin).
- **`PUT /api/projects/:id`**: Edita un proyecto existente. Reemplaza por completo el array de imágenes si se detectan cambios en la galería. Requiere Bearer Token (Admin).

### 👥 Clientes (`server.js`)
- **`GET /api/clients`**: Devuelve una lista plana con el ID y nombre de todos los clientes activos, ordenados de la A a la Z. Útil para rellenar Selects. Requiere Bearer Token (Admin).

---

## Integración con Frontend

En el proyecto **Frontend**, hemos preparado dos archivos vitales para poder consumir esta API sin repetir código en cada componente React:

1. **`src/services/api.ts`**: Un _wrapper_ de `fetch` llamado `fetchApi()`.
   - ¿Para qué sirve?: Es un embudo donde pasan TODAS las peticiones hacia el backend.
   - ¿Cómo funciona?: Se encarga automáticamente de agregar la URL base (`http://localhost:4000`), sumar el token de autorización (si lo hubiera configurado) y de atrapar los errores del backend (por ejemplo, devolver el texto "El slug ya existe" en vez de romper la página con error 500).

2. **`src/services/project.service.ts`**: El controlador de los proyectos en frontend.
   - ¿Para qué sirve?: Expone funciones limpias y tipadas (como `getProjects()`, `createProject(data)`, etc.)
   - ¿Cómo funciona?: Recibe los parámetros requeridos desde una vista de React, formatea la URL (por ejemplo los SearchParams de paginación) y utiliza a `fetchApi()` para comunicarse con tu servidor en `server.js`.
## API Endpoints

- `GET /api/projects` — Lista todos los proyectos
- `GET /api/health` — Endpoint de salud
