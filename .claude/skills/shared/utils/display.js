/**
 * Display utilities for terminal output
 *
 * Centralized ANSI colors and formatting functions.
 * Single source of truth - all other files import from here.
 */

/**
 * ANSI color codes for terminal output
 */
const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  bright: '\x1b[1m',  // Alias for bold
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

/**
 * Output colored text string
 * @param {string} text - Text to colorize
 * @param {string} color - Color name from COLORS
 * @returns {string} Colored text with reset
 */
function colorize(text, color) {
  return `${COLORS[color] || ''}${text}${COLORS.reset}`;
}

/**
 * Log colored message to console
 * @param {string} color - Color from COLORS object
 * @param {string} symbol - Symbol prefix (e.g., '✅', '❌')
 * @param {string} message - Message text
 */
function log(color, symbol, message) {
  console.log(`${color}${symbol} ${message}${COLORS.reset}`);
}

/**
 * Truncate string for display
 * @param {string} str - String to truncate
 * @param {number} maxLen - Maximum length (default 50)
 * @returns {string} Truncated string with ellipsis if needed
 */
function truncate(str, maxLen = 50) {
  if (!str || str.length <= maxLen) return str;
  return str.substring(0, maxLen) + '...';
}

module.exports = {
  COLORS,
  colorize,
  log,
  truncate
};
