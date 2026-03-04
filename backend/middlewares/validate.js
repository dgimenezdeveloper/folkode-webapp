export function validate(schema, pick) {
  return (req, res, next) => {
    const parsed = schema.safeParse(pick(req));

    if (!parsed.success) {
      const details = parsed.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      }));

      return res.status(400).json({
        error: "Error de validación",
        details,
      });
    }

    req.validated = { ...(req.validated || {}), ...parsed.data };
    next();
  };
}