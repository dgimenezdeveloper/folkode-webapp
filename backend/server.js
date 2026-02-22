import jwt from "jsonwebtoken";

import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";



const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
async function requireAdmin(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const payload = jwt.verify(token, process.env.AUTH_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) return res.status(401).json({ error: "No autorizado" });

    if (user.role !== "ADMIN") {
      return res.status(403).json({ error: "Solo ADMIN" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}


// Endpoint de login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Validación básica
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña requeridos" });
    }

    // 2) Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 3) Si no existe o no tiene password guardada -> credenciales inválidas
    if (!user || !user.password) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // 4) Comparar password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // 5) Quitar password del objeto antes de devolver
    const { password: _, ...userWithoutPassword } = user;

    // 6) Crear token JWT (Bearer Token)
    if (!process.env.AUTH_SECRET) {
      return res.status(500).json({ error: "AUTH_SECRET no configurado" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role }, // role se usa después para ADMIN
      process.env.AUTH_SECRET,
      { expiresIn: "7d" }
    );

    // 7) Respuesta final
    return res.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
});

// Endpoint de estadísticas para el dashboard
app.get("/api/stats", async (req, res) => {
  try {
    const [
      totalProjects,
      activeProjects,
      totalClients,
      totalTransactions,
      pendingMessages,
      recentTransactions,
      recentProjects
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: 'IN_DEVELOPMENT' } }),
      prisma.client.count(),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'INCOME' }
      }),
      prisma.contactMessage.count({ where: { status: 'PENDING' } }),
      prisma.transaction.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { client: true, project: true }
      }),
      prisma.project.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        include: { client: true }
      })
    ]);

    const totalExpenses = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: 'EXPENSE' }
    });

    res.json({
      totalProjects,
      activeProjects,
      totalClients,
      totalIncome: totalTransactions._sum.amount || 0,
      totalExpenses: totalExpenses._sum.amount || 0,
      pendingMessages,
      recentTransactions,
      recentProjects
    });
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
});

// Ejemplo de endpoint: obtener proyectos
  app.get("/api/projects", requireAdmin, async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page, 10) || 1;
    const limit = Number.parseInt(req.query.limit, 10) || 10;

    const safePage = page < 1 ? 1 : page;
    const safeLimit = limit < 1 ? 10 : Math.min(limit, 100);
    const skip = (safePage - 1) * safeLimit;

    // filtros opcionales
    const status = req.query.status ? String(req.query.status) : undefined;
    const search = req.query.search ? String(req.query.search) : undefined;

    const where = {};

    if (status) where.status = status;

    if (search) {
      // asume que existe Project.title (si no existe, lo ajustamos)
      where.title = { contains: search, mode: "insensitive" };
    }

    const [total, projects] = await Promise.all([
      prisma.project.count({ where }),
      prisma.project.findMany({
        where,
        skip,
        take: safeLimit,
        include: {
          client: true,
          images: { orderBy: { order: "asc" } },
        },
        orderBy: { updatedAt: "desc" },
      }),
    ]);

    return res.json({
      data: projects,
      pagination: {
        total,
        page: safePage,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
      },
    });
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    return res.status(500).json({ error: "Error al obtener proyectos" });
  }
});
// GET /api/projects/:id - Obtener un proyecto por ID (detalle)
app.get("/api/projects/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        client: true,
        images: { orderBy: { order: "asc" } },
        sections: {
          orderBy: { order: "asc" },
          include: {
            subsections: { orderBy: { order: "asc" } },
          },
        },
        transactions: { orderBy: { date: "desc" } },
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    return res.json(project);
  } catch (error) {
    console.error("Error al obtener proyecto por ID:", error);
    return res.status(500).json({ error: "Error al obtener el proyecto" });
  }
});


// Endpoint de prueba
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
// POST /api/projects - Crear nuevo proyecto
app.post("/api/projects", requireAdmin, async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      shortDesc,
      category,
      status,
      featured,
      clientId,
      demoUrl,
      liveUrl,
      githubUrl,
      technologies,
    } = req.body;

    // 1) Validación required (evita error Prisma por campos faltantes)
    if (!title || !slug || !description || !category || !status) {
      return res.status(400).json({
        error: "Campos requeridos: title, slug, description, category, status",
      });
    }

    // 2) Validación enums (evita error Prisma por valores inválidos)
    const allowedCategories = [
      "ECOMMERCE",
      "LANDING_PAGE",
      "CORPORATIVO",
      "MULTIMEDIA",
      "WEB",
      "SOFTWARE",
    ];
    const allowedStatuses = ["IN_DEVELOPMENT", "COMPLETED", "MAINTENANCE", "PAUSED"];

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ error: "category inválido", allowed: allowedCategories });
    }
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "status inválido", allowed: allowedStatuses });
    }

    // 3) Unicidad de slug
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) {
      return res.status(409).json({ error: "El slug ya existe" });
    }

    // 4) Crear
    const created = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        shortDesc: shortDesc ?? null,
        category,
        status,
        featured: featured ?? false,
        clientId: clientId ?? null,
        demoUrl: demoUrl ?? null,
        liveUrl: liveUrl ?? null,
        githubUrl: githubUrl ?? null,
        technologies: technologies ?? "[]",
      },
      include: {
        client: true,
        images: { orderBy: { order: "asc" } },
      },
    });

    return res.status(201).json(created);
  } catch (error) {
    console.error("Error al crear proyecto:", error);
    return res.status(500).json({ error: "Error al crear el proyecto" });
  }
});
