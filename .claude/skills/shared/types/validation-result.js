/**
 * Standard validation result structure for validation scripts
 *
 * Provides consistent format for validation results across all scripts,
 * making it easier to aggregate, report, and process validation outcomes.
 */

/**
 * Create a validation result object
 *
 * @param {boolean} valid - Overall validation status
 * @param {string[]} errors - Critical errors that failed validation
 * @param {string[]} warnings - Non-critical warnings
 * @param {Object} stats - Statistics about validation
 * @param {number} stats.checked - Number of items checked
 * @param {number} stats.passed - Number of items that passed
 * @param {number} stats.failed - Number of items that failed
 * @returns {Object} Validation result object
 */
function createValidationResult(valid = true, errors = [], warnings = [], stats = {}) {
  return {
    valid,
    errors,
    warnings,
    stats: {
      checked: stats.checked || 0,
      passed: stats.passed || 0,
      failed: stats.failed || 0
    }
  };
}

/**
 * Merge multiple validation results into one
 *
 * @param {Object[]} results - Array of validation results
 * @returns {Object} Merged validation result
 */
function mergeValidationResults(results) {
  const merged = {
    valid: results.every(r => r.valid),
    errors: [],
    warnings: [],
    stats: {
      checked: 0,
      passed: 0,
      failed: 0
    }
  };

  for (const result of results) {
    merged.errors.push(...(result.errors || []));
    merged.warnings.push(...(result.warnings || []));
    merged.stats.checked += result.stats.checked || 0;
    merged.stats.passed += result.stats.passed || 0;
    merged.stats.failed += result.stats.failed || 0;
  }

  return merged;
}

module.exports = {
  createValidationResult,
  mergeValidationResults
};
