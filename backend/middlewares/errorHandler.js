export function errorHandler(err, req, res, next) {
  console.error("🔥 Error capturado:", err);

  const status = err.status || 500;
  const code = err.code || "INTERNAL_ERROR";
  const message = err.message || "Error interno del servidor";

  const response = {
    error: message,
    code,
    status,
  };

  if (err.details) {
    response.details = err.details;
  }

  return res.status(status).json(response);
}