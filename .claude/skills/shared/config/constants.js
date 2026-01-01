/**
 * Shared constants for Whole Knowledge Architecture validation and processing
 *
 * Centralizes magic numbers and configuration values to:
 * - Improve maintainability (single source of truth)
 * - Enable easy configuration changes
 * - Document the meaning of each value
 */

module.exports = {
  // ============================================
  // Structure Requirements
  // ============================================

  /** Minimum bullet points per concept (4-point structure) */
  MINIMUM_BULLET_POINTS: 4,

  /** Total number of CHỨC NĂNGs in Whole.md */
  TOTAL_FUNCTIONS: 50,

  /** Total number of domains */
  TOTAL_DOMAINS: 10,

  /** Functions per domain */
  FUNCTIONS_PER_DOMAIN: 5,

  // ============================================
  // Display Limits
  // ============================================

  /** Maximum display length for truncated strings */
  MAX_DISPLAY_LENGTH: 30,

  /** Maximum path display length */
  MAX_PATH_DISPLAY: 50,

  // ============================================
  // Validation Thresholds
  // ============================================

  /** Maximum acceptable error rate before failing validation */
  MAX_ACCEPTABLE_ERROR_RATE: 0.5,

  /** Ideal minimum concepts per group */
  IDEAL_GROUP_SIZE_MIN: 3,

  /** Ideal maximum concepts per group */
  IDEAL_GROUP_SIZE_MAX: 8,

  // ============================================
  // Language Patterns
  // ============================================

  /** Vietnamese diacritics for validation */
  VIETNAMESE_CHARS_REGEX: /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i,

  // ============================================
  // Session & Security
  // ============================================

  /** Maximum length for sanitized session IDs */
  MAX_SESSION_ID_LENGTH: 64,

  /** Valid function number range */
  FUNCTION_NUMBER_MIN: 1,
  FUNCTION_NUMBER_MAX: 50,

  // ============================================
  // File Paths (relative to project root)
  // ============================================

  /** Main knowledge document */
  WHOLE_MD_PATH: 'Whole.md',

  /** Progress tracking file */
  PROGRESS_FILE: '.whole-progress.json'
};
