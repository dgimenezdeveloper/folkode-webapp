import express from "express";
import cors from "cors";
import { PrismaClient } from "./prisma/generated/prisma/index.js";
import bcrypt from "bcryptjs";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Endpoint de login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña requeridos" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // No devolver la contraseña
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en el servidor" });
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
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        client: true,
        images: { orderBy: { order: 'asc' } }
      },
      orderBy: { updatedAt: 'desc' }
    });
    res.json(projects);
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    res.status(500).json({ error: "Error al obtener proyectos" });
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
