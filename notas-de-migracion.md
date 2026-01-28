# 📝 Notas de Migración: Frontend/Backend Separados

## ✅ Cambios Realizados

### 1. Estructura del Proyecto
- ✅ Separado el frontend y backend en carpetas independientes: `/frontend` y `/backend`
- ✅ Cada uno tiene su propio `package.json` y dependencias
- ✅ Variables de entorno separadas en cada carpeta

### 2. Backend (`/backend`)
- ✅ Servidor Express con API REST
- ✅ Prisma configurado para PostgreSQL
- ✅ Endpoints implementados:
  - `POST /api/auth/login` - Autenticación de usuarios
  - `GET /api/stats` - Estadísticas para el dashboard
  - `GET /api/projects` - Lista de proyectos
  - `GET /api/health` - Health check

**Archivos modificados:**
- `backend/server.js` - Servidor Express con todos los endpoints
- `backend/prisma/schema.prisma` - Configurado con `prisma-client-js` y URL de database
- `backend/package.json` - Agregado `bcryptjs` para autenticación
- `backend/.env` - Variables de entorno del backend

**Comandos importantes:**
```bash
cd backend
npm install
npx prisma generate --schema=prisma/schema.prisma
node server.js
```

### 3. Frontend (`/frontend`)
- ✅ Next.js configurado para consumir API del backend
- ✅ Eliminadas todas las referencias a Prisma
- ✅ Eliminadas rutas API internas que usaban Prisma directamente
- ✅ Autenticación adaptada para llamar al backend

**Archivos modificados:**
- `frontend/src/lib/auth/auth.ts` - Adaptado para llamar a `/api/auth/login` del backend
- `frontend/src/app/admin/page.tsx` - Consume `/api/stats` del backend
- `frontend/.env` - Agregado `NEXT_PUBLIC_API_URL` y `AUTH_SECRET`

**Archivos eliminados:**
- `frontend/src/lib/db/prisma.ts`
- `frontend/src/app/api/projects/`
- `frontend/src/app/api/clients/`
- `frontend/src/app/api/transactions/`

**Comandos importantes:**
```bash
cd frontend
npm install
npm run dev
```

### 4. Variables de Entorno

**Backend** (`/backend/.env`):
```env
DATABASE_URL="postgresql://folkode_admin:FolKode2025!Secure@localhost:5432/folkode_db?schema=public"
AUTH_SECRET="7t9fi+v8iS7oxRovmtcEXm4/LruCiasmOGgifYnC3yw="
AUTH_URL="http://localhost:3000"
```

**Frontend** (`/frontend/.env`):
```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Folkode"
NEXT_PUBLIC_API_URL="http://localhost:4000"
AUTH_SECRET="7t9fi+v8iS7oxRovmtcEXm4/LruCiasmOGgifYnC3yw="
```

## 🚀 Cómo Ejecutar el Proyecto

### Desarrollo Local

1. **Iniciar el Backend** (en una terminal):
```bash
cd backend
node server.js
```
El backend estará disponible en: `http://localhost:4000`

2. **Iniciar el Frontend** (en otra terminal):
```bash
cd frontend
npm run dev
```
El frontend estará disponible en: `http://localhost:3000`

### Verificar que todo funciona

1. Abrir `http://localhost:4000/api/health` - Debería devolver `{"status":"ok"}`
2. Abrir `http://localhost:3000` - Debería cargar el sitio web
3. Ir a `http://localhost:3000/admin/login` - Debería mostrar el login

## 📋 Próximos Pasos Pendientes

### Backend
- [ ] Implementar endpoints completos para:
  - CRUD de proyectos (`/api/projects`, `/api/projects/:id`)
  - CRUD de clientes (`/api/clients`, `/api/clients/:id`)
  - CRUD de transacciones (`/api/transactions`, `/api/transactions/:id`)
  - Mensajes de contacto (`/api/contact`)
- [ ] Agregar middleware de autenticación JWT
- [ ] Implementar validación de datos con Zod
- [ ] Agregar manejo de errores centralizado

### Frontend
- [ ] Adaptar páginas del admin para consumir la nueva API:
  - `/admin/proyectos`
  - `/admin/clientes`
  - `/admin/finanzas`
- [ ] Implementar loading states y error handling
- [ ] Agregar revalidación de datos
- [ ] Actualizar componentes para usar datos de la API

## 🔧 Troubleshooting

### Error: "Module not found: Can't resolve '../../../prisma/generated/prisma/client'"
- **Solución:** Asegurarse de que `frontend/src/lib/db/prisma.ts` fue eliminado
- Buscar referencias a `@/lib/db/prisma` en el frontend y eliminarlas

### Error: "@prisma/client did not initialize yet"
- **Solución:** Ejecutar `npx prisma generate --schema=prisma/schema.prisma` en `/backend`

### Error: "MissingSecret"
- **Solución:** Asegurarse de que `AUTH_SECRET` esté en `/frontend/.env`

### Backend no se conecta a la base de datos
- **Solución:** Verificar que `DATABASE_URL` en `/backend/.env` sea correcta
- Verificar que PostgreSQL esté corriendo

## 📦 Despliegue en Render

### Backend
1. Crear un nuevo Web Service en Render
2. Conectar el repositorio
3. Configurar:
   - **Build Command:** `cd backend && npm install && npx prisma generate --schema=prisma/schema.prisma`
   - **Start Command:** `cd backend && node server.js`
   - **Environment Variables:** Agregar `DATABASE_URL` y otras variables
4. Agregar una base de datos PostgreSQL en Render

### Frontend
1. Crear un nuevo Static Site o Web Service en Render
2. Conectar el repositorio
3. Configurar:
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Start Command:** `cd frontend && npm start`
   - **Environment Variables:** Agregar `NEXT_PUBLIC_API_URL` (apuntando al backend en Render), `AUTH_SECRET`, etc.

---

**Fecha de migración:** 28 de enero de 2026  
**Estado:** ✅ Backend funcionando | ⚠️ Frontend parcialmente adaptado
