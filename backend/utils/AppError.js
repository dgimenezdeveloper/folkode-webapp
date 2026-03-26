export class AppError extends Error {
  constructor(message, status = 500, code = "INTERNAL_ERROR", details = null) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}