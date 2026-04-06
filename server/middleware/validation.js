import { sendError } from "../utils/response.js";

// Request validation middleware using Zod
export const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      const validated = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = validated.body || req.body;
      req.query = validated.query || req.query;
      req.params = validated.params || req.params;

      next();
    } catch (error) {
      const errors = error.errors.map((err) => ({
        field: err.path.slice(1).join("."),
        message: err.message,
      }));

      return sendError(res, "Validation failed", 400, { errors });
    }
  };
};

// Async error wrapper
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
