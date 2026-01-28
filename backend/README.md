# Folkode Backend

## Estructura
- `prisma/` — Esquema y migraciones de base de datos
- `prisma.config.ts` — Configuración de Prisma
- `seed.ts` — Script de seed de base de datos
- `server.js` — Servidor Express (API REST)
- `package.json` — Dependencias y scripts

## Scripts útiles
- `npm run dev` — Inicia el servidor Express
- `npm run prisma:migrate` — Ejecuta migraciones Prisma
- `npm run prisma:generate` — Genera el cliente Prisma
- `npm run prisma:studio` — Abre Prisma Studio
- `npm run seed` — Ejecuta el seed de la base de datos

## Variables de entorno
- `.env` debe estar en la raíz del proyecto (o copiar a `/backend` si se prefiere separar)

## Despliegue
- Subir `/backend` como servicio independiente en Render (Node.js)
- Configurar variables de entorno en Render

---

# Folkode Backend API

- `/api/projects` — Lista todos los proyectos
- `/api/health` — Endpoint de salud

Puedes agregar más endpoints según la lógica de negocio.
