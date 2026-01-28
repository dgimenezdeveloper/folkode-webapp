# 🚀 Folkode - Desarrollo de Software a Medida

<div align="center">

![Folkode Logo](public/images/logo-folkode.png)

**Sitio web y panel de administración para Folkode**

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

## 📁 Estructura del Proyecto

```
webapp-folkode/
├── frontend/   # Next.js, React, Tailwind, etc.
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   └── .env.example
├── backend/    # Express, Prisma, DB
│   ├── prisma/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   └── .env.example
├── .gitignore
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

```bash
npm install
```

### 3. Configurar PostgreSQL

Crear la base de datos y usuario:

```sql
-- Conectarse a PostgreSQL como superusuario
sudo -u postgres psql

-- Crear usuario y base de datos
CREATE USER folkode_admin WITH PASSWORD 'FolKode2025!Secure';
CREATE DATABASE folkode_db OWNER folkode_admin;
GRANT ALL PRIVILEGES ON DATABASE folkode_db TO folkode_admin;

-- Salir
\q
```

### 4. Configurar variables de entorno

Copiar el archivo de ejemplo y editar:

```bash
cp .env.example .env
```

Editar `.env` con las credenciales correctas:

```env
DATABASE_URL="postgresql://folkode_admin:FolKode2025!Secure@localhost:5432/folkode_db?schema=public"
AUTH_SECRET="tu-clave-secreta-aqui"
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

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## 🔐 Credenciales de Acceso

### Panel de Administración

| Campo | Valor |
|-------|-------|
| **URL** | http://localhost:3000/admin/login |
| **Email** | admin@folkode.com.ar |
| **Password** | admin123 |

### Base de Datos PostgreSQL

| Campo | Valor |
|-------|-------|
| **Host** | localhost |
| **Port** | 5432 |
| **Database** | folkode_db |
| **User** | folkode_admin |
| **Password** | FolKode2025!Secure |

---

## 📚 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo con Turbopack |
| `npm run build` | Compila para producción |
| `npm run start` | Inicia servidor de producción |
| `npm run lint` | Ejecuta ESLint |
| `npx prisma studio` | Abre Prisma Studio (GUI para la DB) |
| `npx prisma generate` | Regenera el cliente Prisma |
| `npx prisma db push` | Sincroniza schema con la DB |
| `npx prisma db seed` | Ejecuta el seed de datos |

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

## 🔧 Panel de Administración

### Módulos

1. **Dashboard**: Vista general con estadísticas
2. **Clientes**: CRUD completo de clientes
3. **Proyectos**: Gestión de portafolio
4. **Finanzas**: Control de ingresos y gastos

### Características

- ✅ Autenticación con Auth.js v5
- ✅ Middleware de protección de rutas
- ✅ Validación de roles (ADMIN, EDITOR, VIEWER)
- ✅ CRUD con validación de datos
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

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conectar repositorio en [vercel.com](https://vercel.com)
2. Configurar variables de entorno
3. Desplegar

### Docker (Alternativo)

```bash
# Construir imagen
docker build -t folkode .

# Ejecutar
docker run -p 3000:3000 folkode
```

---

## 🤝 Contribuir

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

# Folkode Frontend (Separado)

## Estructura
- `src/` — Código fuente Next.js
- `public/` — Archivos estáticos
- `next.config.ts`, `tsconfig.json`, etc. — Configuración

## Scripts útiles
- `npm run dev` — Inicia el servidor de desarrollo Next.js
- `npm run build` — Compila la app para producción
- `npm run start` — Inicia la app en modo producción

## Consumo de API
- Consumir la API del backend usando fetch/axios apuntando a la URL del backend (por ejemplo, `http://localhost:4000/api/projects`)

## Variables de entorno
- `.env` debe contener la URL del backend, por ejemplo:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:4000
  ```

## Despliegue
- Subir `/frontend` como servicio independiente en Render (Next.js)
- Configurar variables de entorno en Render

---
