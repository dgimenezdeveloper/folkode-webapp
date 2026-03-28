import { AppError } from "../utils/AppError.js";

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("No autenticado", 401, "UNAUTHORIZED"));
    }

    if (req.user.role !== role) {
      return next(new AppError("No tiene permisos", 403, "FORBIDDEN"));
    }

    next();
  };
}