/**
 * Central export for all shared utilities
 *
 * Import from here for clean, consistent access:
 *   const { COLORS, escapeRegex, findFunctionSection } = require('../shared');
 *
 * Modules:
 * - display.js: Terminal colors and formatting
 * - security.js: Input validation and sanitization
 * - constants.js: Configuration values
 * - whole-md-parser.js: Whole.md parsing utilities
 */

// Display utilities
const display = require('./utils/display.js');

// Security utilities
const security = require('./utils/security.js');

// Configuration constants
const constants = require('./config/constants.js');

// Whole.md parsing utilities
const parser = require('./utils/whole-md-parser.js');

module.exports = {
  // Display
  COLORS: display.COLORS,
  colorize: display.colorize,
  log: display.log,
  truncate: display.truncate,

  // Security
  sanitizeSessionId: security.sanitizeSessionId,
  validateHookInput: security.validateHookInput,
  validateFunctionNumber: security.validateFunctionNumber,
  escapeRegex: security.escapeRegex,
  handleError: security.handleError,

  // Constants
  MINIMUM_BULLET_POINTS: constants.MINIMUM_BULLET_POINTS,
  TOTAL_FUNCTIONS: constants.TOTAL_FUNCTIONS,
  TOTAL_DOMAINS: constants.TOTAL_DOMAINS,
  FUNCTIONS_PER_DOMAIN: constants.FUNCTIONS_PER_DOMAIN,
  MAX_DISPLAY_LENGTH: constants.MAX_DISPLAY_LENGTH,
  MAX_PATH_DISPLAY: constants.MAX_PATH_DISPLAY,
  MAX_ACCEPTABLE_ERROR_RATE: constants.MAX_ACCEPTABLE_ERROR_RATE,
  IDEAL_GROUP_SIZE_MIN: constants.IDEAL_GROUP_SIZE_MIN,
  IDEAL_GROUP_SIZE_MAX: constants.IDEAL_GROUP_SIZE_MAX,
  MAX_SESSION_ID_LENGTH: constants.MAX_SESSION_ID_LENGTH,
  FUNCTION_NUMBER_MIN: constants.FUNCTION_NUMBER_MIN,
  FUNCTION_NUMBER_MAX: constants.FUNCTION_NUMBER_MAX,
  WHOLE_MD_PATH: constants.WHOLE_MD_PATH,
  PROGRESS_FILE: constants.PROGRESS_FILE,

  // Parsing
  findWholemd: parser.findWholemd,
  getWholemdPath: parser.getWholemdPath,
  findFunctionSection: parser.findFunctionSection,
  extractConcepts: parser.extractConcepts,
  extractConceptsWithContent: parser.extractConceptsWithContent,
  extractHeaders: parser.extractHeaders,
  validateBilingualFormat: parser.validateBilingualFormat,

  // Module references (for advanced usage)
  display,
  security,
  constants,
  parser
};
