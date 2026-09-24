/**
 * Standardized API response helper.
 * Ensures every endpoint returns a consistent JSON shape.
 */

/**
 * Send a success response.
 * @param {import('express').Response} res
 * @param {number} statusCode  HTTP status code (default 200)
 * @param {*} data             Payload to return
 * @param {string} [message]   Optional human-readable message
 */
function sendSuccess(res, statusCode = 200, data = null, message) {
  const payload = { success: true };
  if (data !== null && data !== undefined) payload.data = data;
  if (message) payload.message = message;
  return res.status(statusCode).json(payload);
}

/**
 * Send a paginated success response.
 * @param {import('express').Response} res
 * @param {Array} data          Array of documents
 * @param {number} page         Current page number
 * @param {number} limit        Items per page
 * @param {number} totalDocs    Total count of matching documents
 */
function sendPaginated(res, data, page, limit, totalDocs) {
  return res.status(200).json({
    success: true,
    data,
    pagination: {
      page,
      limit,
      totalDocs,
      totalPages: Math.ceil(totalDocs / limit),
      hasNextPage: page * limit < totalDocs,
      hasPrevPage: page > 1,
    },
  });
}

/**
 * Send an error response.
 * @param {import('express').Response} res
 * @param {number} statusCode  HTTP status code (default 500)
 * @param {string} message     Error message
 * @param {*} [errors]         Optional validation error details
 */
function sendError(res, statusCode = 500, message = 'Internal Server Error', errors) {
  const payload = { success: false, message };
  if (errors) payload.errors = errors;
  return res.status(statusCode).json(payload);
}

module.exports = { sendSuccess, sendPaginated, sendError };
