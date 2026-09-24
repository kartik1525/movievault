/**
 * Enhanced error handler middleware.
 * Parses Mongoose-specific errors into user-friendly responses.
 */
function errorHandler(err, req, res, _next) {
  console.error('[API Error]:', err.stack || err.message);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = undefined;

  // ── Mongoose Validation Error ──
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // ── Mongoose CastError (invalid ObjectId, etc.) ──
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid value for ${err.path}: ${err.value}`;
  }

  // ── MongoDB Duplicate Key Error ──
  if (err.code === 11000) {
    statusCode = 409;
    const duplicateField = Object.keys(err.keyValue || {}).join(', ');
    message = `Duplicate entry${duplicateField ? ` for: ${duplicateField}` : ''}. This record already exists.`;
  }

  // ── JWT / Firebase Auth Errors ──
  if (err.code === 'auth/id-token-expired') {
    statusCode = 401;
    message = 'Authentication token has expired. Please log in again.';
  }

  if (err.code === 'auth/argument-error') {
    statusCode = 401;
    message = 'Invalid authentication token format.';
  }

  // ── CORS Error ──
  if (err.message && err.message.includes('not allowed by CORS')) {
    statusCode = 403;
    message = 'Cross-origin request blocked.';
  }

  // Don't leak stack traces in production
  const response = {
    success: false,
    message,
  };

  if (errors) response.errors = errors;

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

module.exports = errorHandler;
