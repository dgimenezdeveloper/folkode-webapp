import jwt from "jsonwebtoken";

import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { validate } from "./middlewares/validate.js";
import {
  projectIdParamSchema,
  projectsQuerySchema,
  projectCreateSchema,
  projectUpdateSchema,
} from "./validations/project.validation.js";
import { AppError } from "./utils/AppError.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { requireRole } from "./middlewares/roleMiddleware.js";


const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

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
app.get(
  "/api/projects",
  authMiddleware,
requireRole("ADMIN"),
  validate(projectsQuerySchema, (req) => req.query),
  async (req, res, next) => {
    try {
      const page = Number.parseInt(req.query.page, 10) || 1;
      const limit = Number.parseInt(req.query.limit, 10) || 10;

      const safePage = page < 1 ? 1 : page;
      const safeLimit = limit < 1 ? 10 : Math.min(limit, 100);
      const skip = (safePage - 1) * safeLimit;

      const status = req.query.status ? String(req.query.status) : undefined;
      const search = req.query.search ? String(req.query.search) : undefined;
      const category = req.query.category ? String(req.query.category) : undefined;

      const where = {};

      if (status) where.status = status;
      if (category) where.category = category;

      if (search) {
        where.OR = [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            client: {
              is: {
                OR: [
                  {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    email: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            },
          },
        ];
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
      return next(
        new AppError(
          "Error interno al obtener proyectos",
          500,
          "PROJECT_FETCH_ERROR"
        )
      );
    }
  }
);
// POST /api/projects - Crear nuevo proyecto
app.post(
  "/api/projects",
  authMiddleware,
requireRole("ADMIN"),
  validate(projectCreateSchema, (req) => req.body),
  async (req, res, next) => {
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
        images,
        sections,
      } = req.body;

      const existing = await prisma.project.findUnique({ where: { slug } });
      if (existing) {
        return next(new AppError("El slug ya existe", 409, "PROJECT_SLUG_EXISTS"));
      }

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
          technologies: Array.isArray(technologies)
            ? JSON.stringify(technologies)
            : (technologies ?? "[]"),
          images: Array.isArray(images) && images.length > 0
            ? {
                create: images.map((img) => ({
                  url: img.url,
                  alt: img.alt || title,
                  order: img.order || 0,
                })),
              }
            : undefined,
          sections: Array.isArray(sections) && sections.length > 0
            ? {
                create: sections.map((sec, idx) => ({
                  key: sec.key || `sec_${idx}`,
                  title: sec.title,
                  description: sec.description,
                  order: sec.order || idx,
                  images: Array.isArray(sec.images)
                    ? JSON.stringify(sec.images)
                    : (sec.images || "[]"),
                })),
              }
            : undefined,
        },
        include: {
          client: true,
          images: { orderBy: { order: "asc" } },
          sections: { orderBy: { order: "asc" } },
        },
      });

      return res.status(201).json(created);
    } catch (error) {
      return next(
        new AppError("Error al crear el proyecto", 500, "PROJECT_CREATE_ERROR")
      );
    }
  }
);
// DELETE /api/projects/:id - Eliminar proyecto
app.delete(
  "/api/projects/:id",
  authMiddleware,
requireRole("ADMIN"),
  validate(projectIdParamSchema, (req) => req.params),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const existingProject = await prisma.project.findUnique({
        where: { id },
      });

      if (!existingProject) {
        return next(new AppError("Proyecto no encontrado", 404, "PROJECT_NOT_FOUND"));
      }

      await prisma.project.delete({
        where: { id },
      });

      return res.json({
        message: "Proyecto eliminado correctamente",
        id,
      });
    } catch (error) {
      return next(
        new AppError("Error al eliminar el proyecto", 500, "PROJECT_DELETE_ERROR")
      );
    }
  }
);
// GET /api/projects/:id - Obtener un proyecto por ID (detalle)
app.get(
  "/api/projects/:id",
  authMiddleware,
requireRole("ADMIN"),
  validate(projectIdParamSchema, (req) => req.params),
  async (req, res, next) => {
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
        return next(
          new AppError("Proyecto no encontrado", 404, "PROJECT_NOT_FOUND")
        );
      }

      return res.json(project);
    } catch (error) {
      return next(
        new AppError("Error al obtener el proyecto", 500, "PROJECT_GET_ERROR")
      );
    }
  }
);
// PUT /api/projects/:id - Actualizar proyecto
app.put(
  "/api/projects/:id",
  authMiddleware,
requireRole("ADMIN"),
  validate(projectIdParamSchema, (req) => req.params),
  validate(projectUpdateSchema, (req) => req.body),
  async (req, res, next) => {
    try {
      const { id } = req.params;

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
        images,
        sections,
      } = req.body;

      const existingProject = await prisma.project.findUnique({ where: { id } });

      if (!existingProject) {
        return next(new AppError("Proyecto no encontrado", 404, "PROJECT_NOT_FOUND"));
      }

      if (slug !== existingProject.slug) {
        const slugExists = await prisma.project.findUnique({ where: { slug } });

        if (slugExists) {
          return next(new AppError("El slug ya existe", 409, "PROJECT_SLUG_EXISTS"));
        }
      }

      const updated = await prisma.project.update({
        where: { id },
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
          technologies: Array.isArray(technologies)
            ? JSON.stringify(technologies)
            : (technologies ?? "[]"),
          images: Array.isArray(images)
            ? {
                deleteMany: {},
                create: images.map((img) => ({
                  url: img.url,
                  alt: img.alt || title,
                  order: img.order || 0,
                })),
              }
            : undefined,
          sections: Array.isArray(sections)
            ? {
                deleteMany: {},
                create: sections.map((sec, idx) => ({
                  key: sec.key || `sec_${idx}`,
                  title: sec.title,
                  description: sec.description,
                  order: sec.order || idx,
                  images: Array.isArray(sec.images)
                    ? JSON.stringify(sec.images)
                    : (sec.images || "[]"),
                })),
              }
            : undefined,
        },
        include: {
          client: true,
          images: { orderBy: { order: "asc" } },
          sections: { orderBy: { order: "asc" } },
        },
      });

      return res.json(updated);
    } catch (error) {
      return next(
        new AppError("Error al actualizar el proyecto", 500, "PROJECT_UPDATE_ERROR")
      );
    }
  }
);
// GET /api/clients - Obtener lista de clientes
app.get("/api/clients", authMiddleware,
requireRole("ADMIN"), async (req, res) => {
  try {
    const search = req.query.search ? String(req.query.search) : undefined;
    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ];
    }
    const clients = await prisma.client.findMany({
      where,
      orderBy: { name: "asc" },
      include: {
        projects: true,
        transactions: true,
      }
    });
    return res.json(clients);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return res.status(500).json({ error: "Error al obtener clientes" });
  }
});

// GET /api/clients/:id - Obtener un cliente por ID
app.get("/api/clients/:id", authMiddleware,
requireRole("ADMIN"), async (req, res) => {
  try {
    const { id } = req.params;
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        projects: true,
        transactions: true,
      }
    });

    if (!client) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    return res.json(client);
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    return res.status(500).json({ error: "Error al obtener el cliente" });
  }
});

// POST /api/clients - Crear un nuevo cliente
app.post("/api/clients", authMiddleware,
requireRole("ADMIN"), async (req, res) => {
  try {
    const { name, email, phone, company, website, avatar, notes } = req.body;
    if (!name) {
      return res.status(400).json({ error: "El nombre es requerido" });
    }

    const created = await prisma.client.create({
      data: { name, email, phone, company, website, avatar, notes }
    });
    return res.status(201).json(created);
  } catch (error) {
    console.error("Error al crear cliente:", error);
    return res.status(500).json({ error: "Error al crear el cliente" });
  }
});

// PUT /api/clients/:id - Actualizar un cliente
app.put("/api/clients/:id", authMiddleware,
requireRole("ADMIN"), validate(projectIdParamSchema, (req) => req.params), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, company, website, avatar, notes } = req.body;

    if (!name) {
      return res.status(400).json({ error: "El nombre es requerido" });
    }

    const updated = await prisma.client.update({
      where: { id },
      data: { name, email, phone, company, website, avatar, notes }
    });
    return res.json(updated);
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    return res.status(500).json({ error: "Error al actualizar el cliente" });
  }
});

// DELETE /api/clients/:id - Eliminar un cliente
app.delete("/api/clients/:id", authMiddleware,
requireRole("ADMIN"), validate(projectIdParamSchema, (req) => req.params), async (req, res) => {
  try {
    const { id } = req.params;
    // Comprobar si existe
    const existing = await prisma.client.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    await prisma.client.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    return res.status(500).json({ error: "Error al eliminar el cliente" });
  }
});

// ============================================================================
// TRANSACTIONS
// ============================================================================

// GET /api/transactions - Obtener lista de transacciones
app.get("/api/transactions", authMiddleware,
requireRole("ADMIN"), async (req, res) => {
  try {
    const clientId = req.query.clientId ? String(req.query.clientId) : undefined;
    const projectId = req.query.projectId ? String(req.query.projectId) : undefined;

    const where = {};
    if (clientId) where.clientId = clientId;
    if (projectId) where.projectId = projectId;

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: { date: "desc" },
      include: {
        client: true,
        project: true,
      }
    });

    return res.json(transactions);
  } catch (error) {
    console.error("Error al obtener transacciones:", error);
    return res.status(500).json({ error: "Error al obtener transacciones" });
  }
});

// GET /api/transactions/:id - Obtener una transacción por ID
app.get("/api/transactions/:id", authMiddleware,
requireRole("ADMIN"), async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        client: true,
        project: true,
      }
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transacción no encontrada" });
    }
    return res.json(transaction);
  } catch (error) {
    console.error("Error al obtener transacción:", error);
    return res.status(500).json({ error: "Error al obtener la transacción" });
  }
});

// POST /api/transactions - Crear una nueva transacción
app.post("/api/transactions", authMiddleware,
requireRole("ADMIN"), async (req, res) => {
  try {
    const { type, amount, description, date, category, projectId, clientId } = req.body;

    if (!type || amount === undefined || !description) {
      return res.status(400).json({ error: "Campos requeridos: type, amount, description" });
    }

    const created = await prisma.transaction.create({
      data: {
        type,
        amount: parseFloat(amount),
        description,
        date: date ? new Date(date) : undefined,
        category,
        projectId: projectId || null,
        clientId: clientId || null,
      },
      include: { client: true, project: true }
    });
    return res.status(201).json(created);
  } catch (error) {
    console.error("Error al crear transacción:", error);
    return res.status(500).json({ error: "Error al crear la transacción" });
  }
});

// PUT /api/transactions/:id - Actualizar una transacción
app.put("/api/transactions/:id", authMiddleware,
requireRole("ADMIN"), async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, description, date, category, projectId, clientId } = req.body;

    if (!type || amount === undefined || !description) {
      return res.status(400).json({ error: "Campos requeridos: type, amount, description" });
    }

    const updated = await prisma.transaction.update({
      where: { id },
      data: {
        type,
        amount: parseFloat(amount),
        description,
        date: date ? new Date(date) : undefined,
        category,
        projectId: projectId || null,
        clientId: clientId || null,
      },
      include: { client: true, project: true }
    });
    return res.json(updated);
  } catch (error) {
    console.error("Error al actualizar transacción:", error);
    return res.status(500).json({ error: "Error al actualizar la transacción" });
  }
});

// DELETE /api/transactions/:id - Eliminar una transacción
app.delete("/api/transactions/:id", authMiddleware,
requireRole("ADMIN"), async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.transaction.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Transacción no encontrada" });
    }

    await prisma.transaction.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar transacción:", error);
    return res.status(500).json({ error: "Error al eliminar la transacción" });
  }
});

// Endpoint de prueba
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
