<div align="center">
  <img src="frontend/public/folkode-oscuro-no-bg.webp" width="150" alt="Folkode Logo">
</div>

---

# ⚡ Folkode WebApp — Software Factory Portal & Management ERP

[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016.1%20%7C%20React%2019-black?logo=nextdotjs&logoColor=white)](#)
[![Backend](https://img.shields.io/badge/Backend-Express%204.18%20%7C%20Node.js%2020-lightgrey?logo=express&logoColor=black)](#)
[![ORM](https://img.shields.io/badge/ORM-Prisma%207%20%26%206-2D3748?logo=prisma&logoColor=white)](#)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%2016-336791?logo=postgresql&logoColor=white)](#)
[![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC?logo=tailwindcss&logoColor=white)](#)
[![Auth](https://img.shields.io/badge/Auth-Auth.js%20v5%20(NextAuth)-blueviolet?logo=auth0&logoColor=white)](#)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue?logo=githubactions&logoColor=white)](#)

> Full-Stack corporate platform for **Folkode**, a collaborative Argentine software factory. Integrates a high-conversion public web portal with an enterprise-grade administrative back-office (ERP) managing commercial projects, client CRM profiles, and real-time income/expense financial ledgers.
>
> 🌐 **Quick Navigation / Navegación Rápida:** [English Documentation](#-english-documentation) | [Documentación en Español](#-documentación-en-español)

---

## 🌐 English Documentation

### 1. Executive Summary & Product Scope
**Folkode WebApp** serves as the central digital hub and operational backbone for Folkode Group. It addresses two core operational requirements within a single, cohesive codebase:

1. **Public Brand Experience (Client Acquisition):**
   - High-performance, SEO-optimized landing page built with Next.js 16 App Router and Turbopack.
   - Dynamic portfolio showcase featuring categorized project galleries, modal detail views, and technology tags.
   - Interactive company history documenting Folkode's roots, the cultural symbolism of the *Cruz Pampa* logo, and team member profiles.
   - Direct lead intake through an asynchronous, validated contact form.

2. **Private Administrative Back-Office (Enterprise ERP):**
   - Centralized management dashboard accessible at `/admin` protected by Auth.js v5 session controls and role-based policies (`ADMIN`, `EDITOR`, `VIEWER`).
   - Project catalog administration: dynamic creation, category assignments, image gallery orchestration, and multi-section documentation.
   - Client Relationship Management (CRM): tracking company profiles, direct contact channels, and transaction histories.
   - Financial Ledger: double-entry bookkeeping tracking revenue and operational expenses per project and client, with real-time balance calculations.

---

### 2. Decoupled Architecture & Monorepo Topology

The repository implements a decoupled Full-Stack architecture that isolates client-side presentation from backend business logic and database migrations:

```
folkode-webapp/
├── .github/workflows/       # Automated CI and GitHub Projects v2 Kanban pipelines
├── backend/                 # Decoupled Node.js + Express REST API (Port 4000)
│   ├── middlewares/         # JWT Bearer auth, RBAC, Zod validation, error handler
│   ├── prisma/              # Prisma schema, SQL migrations, database seed scripts
│   ├── validations/         # Request schemas (Zod) for projects, clients, transactions
│   ├── server.js            # Express server entry point and controller endpoints
│   └── package.json         # Backend dependencies (Express, Prisma, bcryptjs, JWT)
├── frontend/                # Next.js 16 SPA & SSR App Router (Port 3000)
│   ├── public/              # Optimized WebP assets, project screenshots, team avatars
│   ├── src/
│   │   ├── app/             # App Router pages (public landing & /admin back-office)
│   │   ├── components/      # UI layout, sections (Hero, Projects, Services, Team)
│   │   ├── lib/             # Auth.js config, database types, utility formatters
│   │   └── services/        # Client API layer (project.service, client.service, transactions.service)
│   └── package.json         # Frontend dependencies (Next 16, React 19, Tailwind v4, Swiper)
├── start-backend.sh / .bat  # Cross-platform automated backend dev runners
└── start-frontend.sh / .bat # Cross-platform automated frontend dev runners
```

---

### 3. Relational Data Model (Prisma ORM)

The domain model enforces strict relational integrity across projects, clients, and monetary transactions:

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  password      String?
  role          Role      @default(VIEWER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
}

model Project {
  id           String           @id @default(cuid())
  title        String
  slug         String           @unique
  description  String
  shortDesc    String?
  category     ProjectCategory  // ECOMMERCE, LANDING_PAGE, CORPORATIVO, MULTIMEDIA, WEB, SOFTWARE
  status       ProjectStatus    @default(IN_DEVELOPMENT) // IN_DEVELOPMENT, COMPLETED, MAINTENANCE, PAUSED
  featured     Boolean          @default(false)
  demoUrl      String?
  liveUrl      String?
  githubUrl    String?
  technologies String           @default("[]")
  clientId     String?
  client       Client?          @relation(fields: [clientId], references: [id])
  images       ProjectImage[]
  sections     ProjectSection[]
  transactions Transaction[]
  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt
}

model Client {
  id           String        @id @default(cuid())
  name         String
  email        String?
  phone        String?
  company      String?
  website      String?
  avatar       String?
  notes        String?
  projects     Project[]
  transactions Transaction[]
  testimonials Testimonial[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model Transaction {
  id          String          @id @default(cuid())
  type        TransactionType // INCOME | EXPENSE
  amount      Float
  description String
  date        DateTime        @default(now())
  category    String?
  projectId   String?
  clientId    String?
  client      Client?         @relation(fields: [clientId], references: [id])
  project     Project?        @relation(fields: [projectId], references: [id])
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
}
```

---

### 4. Administrative Back-Office Capabilities

The `/admin` portal provides the team with full operational control through a unified dashboard:

- **Executive KPI Dashboard:** Real-time summary cards computing total active projects, client headcount, cumulative income, operating expenses, and net fiscal balance.
- **Dynamic Project Builder:** Create and edit software projects with auto-generated URL slugs, category tags, technology badges, multi-image upload galleries, and dynamic case-study content sections.
- **Client CRM:** Centralized index of active clients with contact methods, historical transactions, and direct links to active deliverables.
- **Financial Module:** Bookkeeping interface to log client payments (incomes) or cloud hosting/tool expenses (AWS, Vercel, Figma licenses), filtered by client and project.
- **Role-Based Permissions (RBAC):** Middleware checks verify user claims; `VIEWER` accounts are automatically redirected away from data-modifying actions.

---

### 5. Automated Agile Governance & CI/CD

#### GitHub Projects v2 Automation via GraphQL
The repository utilizes 6 dedicated GitHub Actions workflows to synchronize sprint tasks automatically with GitHub Projects v2:
- `issue-to-backlog.yml`: Adds newly opened issues directly to the Project Backlog.
- `issue-to-ready.yml`: Transitions issues to **Ready** when assigned to a developer.
- `branch-to-inprogress.yml`: Detects branch creations containing issue numbers and moves cards to **In Progress**.
- `pr-to-inreview.yml`: Transitions linked cards to **In Review** upon PR creation.
- `pr-changes-to-inprogress.yml`: Reverts cards to **In Progress** when reviewers request code changes.
- `pr-merged-to-done.yml`: Automatically moves tasks to **Done** upon merging to `main`.

#### Continuous Integration Pipeline (`ci.yml`)
Runs automated quality gates on every Pull Request:
- Lints code styles with ESLint 9 across frontend and backend.
- Validates cross-platform Prisma client generation (`prisma generate`).
- Executes compilation checks with Next.js Turbopack.
- Runs unit tests via Jest and React Testing Library.

---

### 6. Tech Stack Specification

| Tier / Domain | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | Next.js (App Router) | `16.1.4` | Server-Side Rendering, Turbopack, and routing |
| **UI Library** | React | `19.2.3` | Modern component tree and reactive hooks |
| **Styling Engine** | Tailwind CSS | `v4.1.18` | Next-generation utility-first styling |
| **Animations** | Motion (Framer Motion)| `12.29.0` | Scroll-driven reveals and fluid modal transitions |
| **Carousel / Sliders** | Swiper | `12.0.3` | Mobile-friendly image and testimonial carousels |
| **Client Auth** | Auth.js (NextAuth) | `5.0-beta.30` | Edge middleware protection and JWT session cookies |
| **Backend Framework** | Express | `4.18.2` | REST API routing and middleware pipeline |
| **Database ORM** | Prisma | `7.3.0` / `6.19`| Multi-platform schema mapping and type-safe queries |
| **Primary Database** | PostgreSQL | `16` | Relational data store for ERP transactions |
| **Data Validation** | Zod | `v4.3.6` | Strict runtime validation for API requests |
| **Password Hashing** | bcryptjs | `3.0.3` | Salted hashing for administrative passwords |
| **Testing** | Jest + RTL | `30.2.0` | Unit test validation on frontend and backend |

---

### 7. Quick Start & Local Development

#### Method 1: Automated Cross-Platform Runners (Recommended)
The repository includes automated shell and batch scripts that verify `.env` files, install dependencies, generate Prisma clients for your operating system, and launch servers.

**On Windows:**
```cmd
# Terminal 1: Launch Backend (http://localhost:4000)
start-backend.bat

# Terminal 2: Launch Frontend (http://localhost:3000)
start-frontend.bat
```

**On Linux / macOS:**
```bash
# Terminal 1: Launch Backend (http://localhost:4000)
chmod +x start-backend.sh start-frontend.sh
./start-backend.sh

# Terminal 2: Launch Frontend (http://localhost:3000)
./start-frontend.sh
```

#### Method 2: Manual Setup

1. **Backend Configuration:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your PostgreSQL credentials:
   # DATABASE_URL="postgresql://user:password@localhost:5432/folkode_db"
   # AUTH_SECRET="your-secure-jwt-secret"
   
   npm install
   npm run prisma:migrate
   npm run seed            # Seeds demo clients, projects, transactions, and admin user
   npm run dev             # Starts Express on http://localhost:4000
   ```

2. **Frontend Configuration:**
   ```bash
   cd ../frontend
   cp .env.example .env.local
   # Ensure NEXT_PUBLIC_API_URL="http://localhost:4000"
   
   npm install
   npm run dev             # Starts Next.js on http://localhost:3000
   ```

3. **Default Admin Credentials (from Database Seed):**
   - **Email:** `admin@folkode.com.ar`
   - **Password:** `admin123`

---

## 🇪🇸 Documentación en Español

### 1. Resumen Ejecutivo y Alcance del Producto
**Folkode WebApp** constituye el núcleo digital y operativo de Folkode Group. Resuelve dos necesidades centrales de la Software Factory en una única base de código:

1. **Portal Web Institucional (Captación y Marca):**
   - Landing page moderna, accesible y optimizada para motores de búsqueda con Next.js 16 App Router.
   - Catálogo interactivo de proyectos con galería de imágenes en alta resolución, filtros por categoría y modales explicativos.
   - Narrativa institucional: orígenes de la empresa, filosofía colaborativa, simbología del logo (Cruz Pampa) y equipo técnico.
   - Captura de clientes mediante formulario de contacto con validación en tiempo real vía Zod.

2. **Panel de Gestión Administrativa (ERP Interno):**
   - Back-office privado en `/admin` con autenticación mediante Auth.js v5 y control de acceso por roles (`ADMIN`, `EDITOR`, `VIEWER`).
   - Módulo de proyectos: creación, edición, subida de galerías y documentación por secciones.
   - Módulo CRM de clientes: libreta de contactos comerciales, empresas asociadas y vinculación a proyectos activos.
   - Módulo financiero: libro de ingresos y egresos categorizado, con cálculo automático de balances netos por cliente y proyecto.

---

### 2. Arquitectura Desacoplada y Estructura Monorepo

El repositorio implementa una arquitectura desacoplada que separa la interfaz de usuario de los servicios de base de datos y la API REST:
- **`backend/`:** Servidor Node.js con Express 4.18, validación con esquemas Zod, autenticación JWT Bearer, hashing con bcryptjs y ORM Prisma 7 conectado a PostgreSQL 16. Corre en el puerto `4000`.
- **`frontend/`:** Aplicación Next.js 16 (App Router + Turbopack), React 19, estilos con Tailwind CSS v4, animaciones con Framer Motion y carruseles Swiper. Corre en el puerto `3000`.
- **Scripts Automatizados:** Scripts `.sh` y `.bat` en la raíz para iniciar ambos entornos con un solo comando, gestionando automáticamente la creación del cliente Prisma según el sistema operativo.

---

### 3. Modelo de Datos Relacional y Dominios Principales

Gestionado a través de Prisma ORM sobre PostgreSQL 16:
- **`User` / `Account` / `Session`:** Gestión de usuarios administrativos y sesiones con Auth.js v5.
- **`Project` & `ProjectSection`:** Registro exhaustivo de desarrollos, enlaces en vivo, repositorio, tecnologías y desglose en secciones.
- **`Client`:** Base de datos de clientes corporativos y emprendedores.
- **`Transaction`:** Registro contable de flujos monetarios (`INCOME` / `EXPENSE`) asociados a un cliente o proyecto específico.
- **`ContactMessage`:** Bandeja de entrada de mensajes de clientes con estados (`PENDING`, `READ`, `REPLIED`, `ARCHIVED`).

---

### 4. Gobernanza Ágil Automatizada y CI/CD

- **Integración con GitHub Projects v2:** 6 flujos de trabajo en GitHub Actions mueven automáticamente las tarjetas entre columnas del tablero ágil (`Backlog` $\to$ `Ready` $\to$ `In Progress` $\to$ `In Review` $\to$ `Done`) según eventos de commits, ramas y pull requests.
- **Integración Continua (`ci.yml`):** En cada Pull Request se ejecutan pruebas automatizadas con Jest, validación de linting con ESLint y verificación de compilación con Turbopack.

---

### 5. Puesta en Marcha y Desarrollo Local

#### Ejecución Rápida con Scripts
- **En Windows:** Ejecutar `start-backend.bat` y `start-frontend.bat` en consolas separadas.
- **En Linux / macOS:** Ejecutar `./start-backend.sh` y `./start-frontend.sh`.

#### Credenciales Administrativas por Defecto (Seed):
- **Email:** `admin@folkode.com.ar`
- **Contraseña:** `admin123`

---

## 👥 Equipo Fundador / Founders & Core Team

- **Darío Giménez** — *Lead Developer, Co-Founder & Systems Architect*  
  [GitHub](https://github.com/dgimenezdeveloper) • [LinkedIn](https://www.linkedin.com/in/daseg/) • [Portfolio](https://portafolio-daseg.vercel.app/)
- **Equipo Folkode** — *Desarrolladores, Diseñadores UX/UI y Gestores de Proyectos*  
  [Folkode Group GitHub](https://github.com/FolkodeGroup) • [Sitio Oficial](https://folkode.com.ar)

---

## 📄 License
This project is proprietary and maintained by **Folkode Group**. All rights reserved.
