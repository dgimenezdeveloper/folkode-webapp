# 🚀 webapp-folkode

<div align="center">

![Folkode Logo](/frontend/public/folkode-oscuro-no-bg.webp)

**Sitio web y panel de administración para Folkode**

---

## 🆕 Novedades y Migración 2026

- 🔄 **Separación total de frontend y backend**: Ahora existen dos carpetas independientes (`/frontend` y `/backend`), cada una con su propio `package.json`, dependencias y variables de entorno.
- 🚀 **Backend Express con API REST**: Implementados endpoints principales (`/api/auth/login`, `/api/stats`, `/api/projects`, `/api/health`). Prisma configurado para PostgreSQL.
- 🌐 **Frontend Next.js**: Adaptado para consumir la nueva API del backend. Eliminadas referencias a Prisma y rutas API internas antiguas.
- 🔑 **Autenticación**: El frontend ahora usa el endpoint `/api/auth/login` del backend. Variables de entorno separadas para cada entorno.
- 🗃️ **Estructura de carpetas y comandos**: Nuevos comandos de arranque y estructura clara para ambos entornos.
- 🧹 **Limpieza de código**: Eliminadas dependencias y archivos obsoletos en el frontend (`prisma.ts`, rutas API internas, etc.).
- 📦 **Despliegue preparado para Render y Vercel**: Instrucciones y variables de entorno listas para ambos entornos.

**Estado actual:**
- Backend funcionando y sirviendo API REST.
- Frontend parcialmente adaptado, consumiendo la nueva API.
- Próximos pasos: completar CRUDs en backend y adaptar páginas de admin en frontend.

---

[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 📋 Descripción

**Folkode** es una aplicación web full-stack que incluye:

- 🌐 **Landing Page**: Sitio público con información de la empresa, servicios, proyectos, equipo y testimonios
- 🔐 **Panel de Administración**: Dashboard privado para gestionar clientes, proyectos y finanzas
- 🔑 **Autenticación**: Sistema de login seguro con Auth.js v5
- 📊 **CRUD Completo**: Gestión de clientes, proyectos y transacciones financieras

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|------------|
| **Framework** | Next.js 16.1.4 (App Router + Turbopack) |
| **Frontend** | React 19.2, Tailwind CSS 4, Framer Motion |
| **Backend** | Next.js API Routes, Server Actions |
| **Base de Datos** | PostgreSQL 16 + Prisma 7 ORM |
| **Autenticación** | Auth.js v5 (NextAuth) |
| **Iconos** | React Icons, Lucide React |
| **Tipado** | TypeScript 5.x |

---


## 📁 Estructura del Proyecto (Actualizada)

```
webapp-folkode/
├── frontend/   # Next.js, React, Tailwind, etc.
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── .env
│   └── ...
├── backend/    # Express, Prisma, DB
│   ├── prisma/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── ...
├── notas-de-migracion.md
├── README.md
└── ...otros archivos
```

---

## ⚙️ Configuración e Instalación

### Prerrequisitos

- Node.js 18.x o superior
- PostgreSQL 14+ instalado y corriendo
- npm, yarn, pnpm o bun

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd webapp-folkode
```


### 2. Instalar dependencias

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3. Configurar PostgreSQL

Crear la base de datos y usuario:

```sql
-- Conectarse a PostgreSQL como superusuario
sudo -u postgres psql

-- Crear usuario y base de datos (EJEMPLO, usa tus propios valores seguros)
CREATE USER <usuario> WITH PASSWORD '<contraseña-segura>';
CREATE DATABASE <nombre_db> OWNER <usuario>;
GRANT ALL PRIVILEGES ON DATABASE <nombre_db> TO <usuario>;

-- Salir
\q
```

### 4. Configurar variables de entorno

Copiar el archivo de ejemplo y editar:

```bash
cp .env.example .env
```

Editar `.env` con las credenciales correctas (no compartas estos valores en el repositorio):

```env
DATABASE_URL="postgresql://<usuario>:<contraseña>@localhost:5432/<nombre_db>?schema=public"
AUTH_SECRET="<tu-clave-secreta>"
```

### 5. Generar cliente Prisma y migrar base de datos

```bash
# Generar cliente Prisma
npx prisma generate

# Aplicar migraciones
npx prisma db push

# Cargar datos de prueba
npx prisma db seed
```


### 6. Ejecutar en desarrollo

#### Backend
```bash
cd backend
node server.js
```
El backend estará disponible en: [http://localhost:4000](http://localhost:4000)

#### Frontend
```bash
cd frontend
npm run dev
```
El frontend estará disponible en: [http://localhost:3000](http://localhost:3000)

---


## 🔐 Acceso y manejo de credenciales

**Nunca compartas contraseñas, secrets o claves reales en el README ni en archivos públicos.**

- Usa archivos `.env` (que están en `.gitignore`) para variables sensibles.
- Proporciona un archivo `.env.example` con los nombres de las variables, pero sin valores reales.
- Comparte las claves reales solo por canales seguros (gestores de contraseñas, mensajería cifrada, etc.).

Ejemplo de variables de entorno:

```env
DATABASE_URL="postgresql://<usuario>:<contraseña>@localhost:5432/<nombre_db>?schema=public"
AUTH_SECRET="<tu-clave-secreta>"
```

Para acceso de desarrollo, solicita las credenciales a un responsable del equipo por un canal seguro.

---


## 📚 Scripts Disponibles (Actualizados)

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo (frontend o backend) |
| `npm run build` | Compila para producción (frontend) |
| `npm run start` | Inicia servidor de producción (frontend) |
| `npm run lint` | Ejecuta ESLint (frontend) |
| `npx prisma studio` | Abre Prisma Studio (backend) |
| `npx prisma generate` | Regenera el cliente Prisma (backend) |
| `npx prisma db push` | Sincroniza schema con la DB (backend) |
| `npx prisma db seed` | Ejecuta el seed de datos (backend) |

---

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| **Primary** | `#86A869` | Verde principal |
| **Secondary** | `#01454F` | Azul oscuro |
| **Accent** | `#D4A574` | Dorado/Tierra |
| **Background** | `#0a0a0a` | Fondo oscuro |
| **Text** | `#f5f5f5` | Texto claro |

---

## 📱 Secciones del Landing Page

1. **Hero**: Presentación principal con animación
2. **About Us**: Descripción de la empresa
3. **Services**: Servicios ofrecidos
4. **Projects**: Portafolio de proyectos
5. **Technologies**: Carrusel infinito de tecnologías
6. **Team**: Miembros del equipo
7. **Testimonials**: Testimonios de clientes
8. **Contact**: Formulario de contacto

---


## 🔧 Panel de Administración (Actualizado)

### Módulos

1. **Dashboard**: Vista general con estadísticas
2. **Clientes**: CRUD completo de clientes
3. **Proyectos**: Gestión de portafolio
4. **Finanzas**: Control de ingresos y gastos

### Características

- ✅ Autenticación con Auth.js v5 (adaptada a API REST)
- ✅ Middleware de protección de rutas
- ✅ Validación de roles (ADMIN, EDITOR, VIEWER)
- ✅ CRUD con validación de datos (en migración a API REST)
- ✅ Filtros y búsqueda
- ✅ Paginación
- ✅ Responsive design

---

## 🗄️ Modelos de Base de Datos

```
User              → Usuarios del sistema
Account           → Cuentas OAuth
Session           → Sesiones activas
VerificationToken → Tokens de verificación

Client            → Clientes
Project           → Proyectos
ProjectImage      → Imágenes de proyectos
ProjectSection    → Secciones de proyectos
ProjectSubsection → Subsecciones
Transaction       → Transacciones financieras
Testimonial       → Testimonios
ContactMessage    → Mensajes de contacto
TeamMember        → Miembros del equipo
```

---


## 🚀 Despliegue (Actualizado)


### Vercel (Frontend recomendado)

1. Conectar repositorio en [vercel.com](https://vercel.com)
2. Configurar variables de entorno
3. Desplegar


### Docker (Backend alternativo)

```bash
# Construir imagen
docker build -t folkode .

# Ejecutar
docker run -p 3000:3000 folkode
```

---


## 🤝 Contribuir (Recomendaciones)

1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

---

## 📄 Licencia

Este proyecto es propiedad de **Folkode**. Todos los derechos reservados.

---

## 📞 Contacto

- **Email**: contacto@folkode.com.ar
- **Web**: [folkode.com.ar](https://folkode.com.ar)
- **Instagram**: [@folkode](https://instagram.com/folkode)

---

<div align="center">

**Desarrollado con ❤️ por Folkode**

</div>


---
## ℹ️ Notas para desarrolladores

- Consulta el archivo `notas-de-migracion.md` para detalles técnicos de la migración y troubleshooting.
- El frontend y backend pueden evolucionar de forma independiente, pero deben mantener la compatibilidad en los endpoints definidos.
- Las variables de entorno son distintas para cada entorno, revisa los archivos `.env.example` en cada carpeta.
- Si encuentras errores relacionados con Prisma en el frontend, asegúrate de haber eliminado todas las referencias y archivos relacionados.

---
