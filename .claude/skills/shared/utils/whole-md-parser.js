#!/usr/bin/env node

/**
 * Shared utilities for parsing Whole.md structure
 *
 * Used by validation scripts to avoid code duplication:
 * - validate-regroup.js
 * - bilingual-check.js
 * - validate-structure.js
 * - check-cross-refs.js
 */

const fs = require('fs');
const path = require('path');

// Constants
const MINIMUM_BULLET_POINTS = 4;
const MAX_ACCEPTABLE_ERROR_RATE = 0.5;

/**
 * ANSI color codes for terminal output
 */
const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

/**
 * Output colored log message
 * @param {string} color - Color from COLORS
 * @param {string} symbol - Symbol prefix
 * @param {string} message - Message text
 */
function log(color, symbol, message) {
  console.log(`${color}${symbol} ${message}${COLORS.reset}`);
}

/**
 * Escape special regex characters
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeRegex(str) {
  return str.toString().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Find Whole.md by searching up directory tree
 * @returns {string} Path to Whole.md
 * @throws {Error} If Whole.md not found
 */
function findWholemd() {
  let dir = process.cwd();
  while (dir !== path.parse(dir).root) {
    const candidate = path.join(dir, 'Whole.md');
    if (fs.existsSync(candidate)) return candidate;
    dir = path.dirname(dir);
  }
  // Final check at root
  const rootCandidate = path.join(dir, 'Whole.md');
  if (fs.existsSync(rootCandidate)) return rootCandidate;

  throw new Error('Whole.md not found in current or parent directories');
}

/**
 * Get Whole.md path (current directory)
 * @returns {string} Path to Whole.md
 */
function getWholemdPath() {
  return path.join(process.cwd(), 'Whole.md');
}

/**
 * Find function section by number
 * Supports both "CHỨC NĂNG" (with diacritics) and "CHUC NANG" (without)
 * @param {string} content - Full Whole.md content
 * @param {number|string} funcNum - Function number
 * @returns {object|null} Section object with startLine, endLine, lines, content
 */
function findFunctionSection(content, funcNum) {
  const safeNum = escapeRegex(funcNum.toString());

  // Try with diacritics first, then without
  const patterns = [
    new RegExp(`^## CHỨC NĂNG ${safeNum}:`, 'm'),
    new RegExp(`## CHUC NANG ${safeNum}:`, 'i')
  ];

  let startMatch = null;
  for (const pattern of patterns) {
    startMatch = content.match(pattern);
    if (startMatch) break;
  }

  if (!startMatch) return null;

  const startIndex = startMatch.index;

  // Find next function by searching in remaining content
  const remainingContent = content.slice(startIndex + startMatch[0].length);
  const nextPatterns = [
    /^## CHỨC NĂNG \d+:/m,
    /## CHUC NANG \d+:/i
  ];

  let relativeEndIndex = remainingContent.length;
  for (const pattern of nextPatterns) {
    const nextMatch = remainingContent.match(pattern);
    if (nextMatch && nextMatch.index < relativeEndIndex) {
      relativeEndIndex = nextMatch.index;
    }
  }

  const endIndex = startIndex + startMatch[0].length + relativeEndIndex;

  const sectionContent = content.slice(startIndex, endIndex);
  const lines = sectionContent.split('\n');

  // Calculate line numbers in original file
  const beforeSection = content.slice(0, startIndex);
  const startLine = beforeSection.split('\n').length - 1;

  return {
    startIndex,
    endIndex,
    startLine,
    endLine: startLine + lines.length,
    lines,
    content: sectionContent
  };
}

/**
 * Extract concepts from section
 * @param {string} section - Section content
 * @returns {Array} Array of concept objects
 */
function extractConcepts(section) {
  const conceptRegex = /^#### \*\*(\d+)\. (.+?)\*\*/gm;
  const concepts = [];
  let match;

  while ((match = conceptRegex.exec(section)) !== null) {
    concepts.push({
      number: parseInt(match[1], 10),
      name: match[2].trim(),
      position: match.index
    });
  }

  return concepts;
}

/**
 * Extract concept with content
 * @param {string} section - Section content
 * @returns {Array} Array of concept objects with content
 */
function extractConceptsWithContent(section) {
  const conceptPattern = /####\s*\*\*(\d+)\.\s*([^*]+)\*\*/g;
  const concepts = [];

  let match;
  while ((match = conceptPattern.exec(section)) !== null) {
    const startPos = match.index;

    // Find next concept or end of section
    const nextConceptPattern = /####\s*\*\*\d+\./g;
    nextConceptPattern.lastIndex = startPos + 1;
    const nextMatch = nextConceptPattern.exec(section);
    const endPos = nextMatch ? nextMatch.index : section.length;

    concepts.push({
      number: parseInt(match[1], 10),
      name: match[2].trim(),
      position: startPos,
      content: section.substring(startPos, endPos)
    });
  }

  return concepts;
}

/**
 * Validate bilingual format (has separator)
 * @param {string} text - Text to check
 * @returns {boolean} True if bilingual format detected
 */
function validateBilingualFormat(text) {
  return / - | \| /.test(text);
}

/**
 * Extract headers from section
 * @param {string} section - Section content
 * @returns {Array} Array of header objects
 */
function extractHeaders(section) {
  const headers = [];
  const headerPattern = /####\s*\*\*(\d+)\.\s*([^*]+)\*\*/g;

  let match;
  while ((match = headerPattern.exec(section)) !== null) {
    headers.push({
      number: parseInt(match[1], 10),
      text: match[2].trim(),
      position: match.index
    });
  }

  return headers;
}

module.exports = {
  // Constants
  MINIMUM_BULLET_POINTS,
  MAX_ACCEPTABLE_ERROR_RATE,
  COLORS,

  // Utility functions
  log,
  escapeRegex,
  findWholemd,
  getWholemdPath,

  // Parsing functions
  findFunctionSection,
  extractConcepts,
  extractConceptsWithContent,
  extractHeaders,
  validateBilingualFormat
};
