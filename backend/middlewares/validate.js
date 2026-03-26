import { AppError } from "../utils/AppError.js";

export function validate(schema, pick) {
  return (req, res, next) => {
    const parsed = schema.safeParse(pick(req));

    if (!parsed.success) {
      const details = parsed.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      }));

      return next(
        new AppError(
          "Error de validación",
          400,
          "VALIDATION_ERROR",
          details
        )
      );
    }

    req.validated = { ...(req.validated || {}), ...parsed.data };
    next();
  };
}