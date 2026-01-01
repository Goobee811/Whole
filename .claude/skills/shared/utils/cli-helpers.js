/**
 * Shared CLI helpers for validation scripts
 *
 * Provides common initialization logic for scripts that validate
 * specific functions in Whole.md. Reduces code duplication across
 * validation scripts.
 */

const fs = require('fs');
const { validateFunctionNumber } = require('./security');
const { findWholemd, findFunctionSection } = require('./whole-md-parser');

/**
 * Initialize a validation script with common setup
 * Handles argument parsing, validation, file reading, and section extraction
 *
 * @param {string} scriptName - Name of the script for usage message
 * @returns {Object} Initialized context with funcNum, content, section
 */
function initValidationScript(scriptName) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`Usage: node ${scriptName} <function-number>`);
    console.log(`Example: node ${scriptName} 1`);
    process.exit(1);
  }

  const funcNum = validateFunctionNumber(args[0], 1, 50);
  if (!funcNum) {
    console.error('Invalid function number. Must be 1-50.');
    process.exit(1);
  }

  let wholePath;
  try {
    wholePath = findWholemd();
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }

  const content = fs.readFileSync(wholePath, 'utf8');
  const section = findFunctionSection(content, funcNum);

  if (!section) {
    console.error(`Function ${funcNum} not found`);
    process.exit(1);
  }

  return { funcNum, content, section };
}

module.exports = {
  initValidationScript
};
