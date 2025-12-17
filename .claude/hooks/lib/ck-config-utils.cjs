#!/usr/bin/env node

/**
 * Shared utilities for Whole Claude hooks
 *
 * Common functions used across multiple hooks for:
 * - Progress tracking
 * - Git operations
 * - File operations
 * - Output formatting
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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
 * ANSI color codes for terminal output
 */
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

/**
 * Output colored text
 * @param {string} text - Text to output
 * @param {string} color - Color name from COLORS
 * @returns {string} Colored text string
 */
function colorize(text, color) {
  return `${COLORS[color] || ''}${text}${COLORS.reset}`;
}

module.exports = {
  loadProgress,
  saveProgress,
  getGitBranch,
  getGitStatus,
  calcPercentage,
  formatDateVN,
  wholeExists,
  COLORS,
  colorize
};
