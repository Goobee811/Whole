/**
 * Security utilities for input validation and sanitization
 *
 * Provides functions to prevent:
 * - Path traversal attacks
 * - ReDoS (regex denial of service)
 * - Invalid input injection
 */

/**
 * Sanitize session ID to prevent path traversal attacks
 * Only allows alphanumeric characters, dashes, and underscores
 * @param {*} id - Raw session ID
 * @returns {string} Sanitized session ID
 */
function sanitizeSessionId(id) {
  if (!id || typeof id !== 'string') {
    return process.ppid?.toString() || 'default';
  }
  // Remove any chars except alphanumeric, dash, underscore; limit length
  const sanitized = id.replace(/[^a-zA-Z0-9_-]/g, '').substring(0, 64);
  return sanitized || 'default';
}

/**
 * Validate and sanitize hook input JSON structure
 * @param {*} data - Raw parsed JSON from stdin
 * @returns {Object|null} Validated data object or null if invalid
 */
function validateHookInput(data) {
  if (!data || typeof data !== 'object') return null;

  return {
    source: typeof data.source === 'string' ? data.source : 'unknown',
    session_id: sanitizeSessionId(data.session_id),
    tool_name: typeof data.tool_name === 'string' ? data.tool_name : null,
    tool_parameters: (data.tool_parameters && typeof data.tool_parameters === 'object')
      ? data.tool_parameters
      : {},
    tool_input: (data.tool_input && typeof data.tool_input === 'object')
      ? data.tool_input
      : {},
    tool_result: typeof data.tool_result === 'string'
      ? data.tool_result.substring(0, 1000)
      : null
  };
}

/**
 * Validate function number from CLI args
 * @param {string} input - Raw function number string
 * @param {number} min - Minimum valid value (default 1)
 * @param {number} max - Maximum valid value (default 50)
 * @returns {number|null} Valid function number or null
 */
function validateFunctionNumber(input, min = 1, max = 50) {
  if (!input || typeof input !== 'string') return null;
  if (!/^\d+$/.test(input)) return null;

  const num = parseInt(input, 10);
  if (isNaN(num) || num < min || num > max) return null;

  return num;
}

/**
 * Escape special regex characters to prevent ReDoS
 * @param {string} str - String to escape
 * @returns {string} Escaped string safe for regex
 */
function escapeRegex(str) {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Standardized error handler
 * Logs to stderr only when DEBUG env is set
 * @param {string} context - Context name for identification
 * @param {Error} error - Error object
 * @param {boolean} exitOnError - Whether to exit process (default false)
 */
function handleError(context, error, exitOnError = false) {
  if (process.env.CLAUDE_HOOK_DEBUG) {
    console.error(`[${context}] ${error.message}`);
    if (process.env.CLAUDE_HOOK_DEBUG === 'verbose' && error.stack) {
      console.error(error.stack);
    }
  }
  if (exitOnError) {
    process.exit(0); // Exit 0 to prevent blocking Claude
  }
}

module.exports = {
  sanitizeSessionId,
  validateHookInput,
  validateFunctionNumber,
  escapeRegex,
  handleError
};
