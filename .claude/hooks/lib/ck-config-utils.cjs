#!/usr/bin/env node

/**
 * Hook-specific utilities for Whole Claude hooks
 *
 * This file contains ONLY hook-specific functions:
 * - Progress tracking (load/save)
 * - Git operations (branch, status)
 *
 * All other utilities are imported from skills/shared/ (single source of truth):
 * - Display: COLORS, colorize
 * - Security: sanitizeSessionId, validateHookInput, validateFunctionNumber, escapeRegex
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import from shared utilities (single source of truth)
// Re-export for backward compatibility with existing hooks
const shared = require('../../skills/shared');

// ============================================
// Hook-Specific Functions
// ============================================

/**
 * Load progress tracking file
 * @returns {Object|null} Progress data or null if not found
 */
function loadProgress() {
  try {
    const progressPath = path.join(process.cwd(), '.whole-progress.json');
    if (fs.existsSync(progressPath)) {
      return JSON.parse(fs.readFileSync(progressPath, 'utf8'));
    }
  } catch (e) { /* ignore */ }
  return null;
}

/**
 * Save progress tracking file
 * @param {Object} progress - Progress data to save
 */
function saveProgress(progress) {
  try {
    const progressPath = path.join(process.cwd(), '.whole-progress.json');
    progress.lastUpdated = new Date().toISOString();
    fs.writeFileSync(progressPath, JSON.stringify(progress, null, 2));
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get current git branch name
 * @returns {string|null} Branch name or null
 */
function getGitBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  } catch (e) {
    return null;
  }
}

/**
 * Get git status summary
 * @returns {Object} Status object with staged, unstaged, untracked counts
 */
function getGitStatus() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    const lines = status.split('\n').filter(l => l.trim());
    return {
      staged: lines.filter(l => l[0] !== ' ' && l[0] !== '?').length,
      unstaged: lines.filter(l => l[1] === 'M').length,
      untracked: lines.filter(l => l.startsWith('??')).length,
      total: lines.length
    };
  } catch (e) {
    return { staged: 0, unstaged: 0, untracked: 0, total: 0 };
  }
}

/**
 * Calculate completion percentage
 * @param {number} completed - Number completed
 * @param {number} total - Total number
 * @returns {string} Formatted percentage
 */
function calcPercentage(completed, total) {
  if (!total) return '0%';
  return `${Math.round((completed / total) * 100)}%`;
}

/**
 * Format date for Vietnamese locale
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDateVN(date) {
  try {
    return new Date(date).toLocaleDateString('vi-VN');
  } catch (e) {
    return 'N/A';
  }
}

/**
 * Check if Whole.md exists in current directory
 * @returns {boolean} True if Whole.md exists
 */
function wholeExists() {
  return fs.existsSync(path.join(process.cwd(), 'Whole.md'));
}

/**
 * Standardized error handler for hooks
 * Logs to stderr only when CLAUDE_HOOK_DEBUG is set
 * @param {string} hookName - Name of the hook for identification
 * @param {Error} error - Error object
 */
function handleHookError(hookName, error) {
  if (process.env.CLAUDE_HOOK_DEBUG) {
    console.error(`[${hookName}] ${error.message}`);
    if (process.env.CLAUDE_HOOK_DEBUG === 'verbose' && error.stack) {
      console.error(error.stack);
    }
  }
  // Always exit 0 to prevent blocking Claude
  process.exit(0);
}

module.exports = {
  // Hook-specific functions
  loadProgress,
  saveProgress,
  getGitBranch,
  getGitStatus,
  calcPercentage,
  formatDateVN,
  wholeExists,
  handleHookError,

  // Re-export from shared for backward compatibility
  COLORS: shared.COLORS,
  colorize: shared.colorize,
  sanitizeSessionId: shared.sanitizeSessionId,
  validateHookInput: shared.validateHookInput,
  validateFunctionNumber: shared.validateFunctionNumber,
  escapeRegex: shared.escapeRegex
};
