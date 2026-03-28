import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/AppError.js";

const prisma = new PrismaClient();

export async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return next(new AppError("No autorizado", 401, "UNAUTHORIZED"));
    }

    const payload = jwt.verify(token, process.env.AUTH_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      return next(new AppError("Usuario no encontrado", 401, "UNAUTHORIZED"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError("Token inválido o expirado", 401, "INVALID_TOKEN"));
  }
}