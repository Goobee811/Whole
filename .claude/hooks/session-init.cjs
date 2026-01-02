#!/usr/bin/env node

/**
 * SessionStart Hook - Unified session initializer for Whole Knowledge Architecture
 *
 * Merged from: session-init.cjs + regroup-session-init.cjs
 *
 * Fires: Once per session (startup, resume, clear, compact)
 * Purpose:
 * - Display progress from .whole-progress.json
 * - Show next suggested function
 * - Output key rules reminder
 * - Suggest available commands
 *
 * v2.0.0: Merged hooks, simplified output
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Import shared utilities (DRY + Security + Error Handling)
const { loadProgress, getGitBranch, validateHookInput, handleHookError } = require('./lib/ck-config-utils.cjs');

/**
 * Build progress line
 */
function buildProgressLine(progress) {
  if (!progress) return null;

  const totalFunctions = progress.totalFunctions || 50;
  const completedArr = progress.completedFunctions || [];
  const completedCount = Array.isArray(completedArr) ? completedArr.length : 0;
  const percentage = Math.round((completedCount / totalFunctions) * 100);

  const parts = [`Progress: ${completedCount}/${totalFunctions} (${percentage}%)`];

  if (progress.nextSuggested) {
    parts.push(`Next: CF${progress.nextSuggested}`);
  }

  if (progress.lastUpdated) {
    const lastDate = new Date(progress.lastUpdated).toLocaleDateString('vi-VN');
    parts.push(`Last session: ${lastDate}`);
  }

  const branch = getGitBranch();
  if (branch) parts.push(`Branch: ${branch}`);

  return parts.join(' | ');
}

async function main() {
  try {
    const stdin = fs.readFileSync(0, 'utf-8').trim();
    const rawData = stdin ? JSON.parse(stdin) : {};

    // Validate and sanitize input (Security hardening)
    const data = validateHookInput(rawData);
    if (!data) {
      process.exit(0); // Invalid input, exit gracefully
    }

    const { source, session_id: sessionId } = data;

    // Idempotency guard: Prevent hook loop on resume
    // session_id is now sanitized to prevent path traversal
    const sessionMarker = path.join(os.tmpdir(), `whole-session-${sessionId}`);
    if (source === 'resume') {
      try {
        // Atomic check-and-set with exclusive flag (fixes TOCTOU race condition)
        fs.writeFileSync(sessionMarker, Date.now().toString(), { flag: 'wx' });
      } catch (e) {
        if (e.code === 'EEXIST') {
          process.exit(0); // Already initialized in this session
        }
        // Other errors: ignore, proceed with initialization
      }
    } else {
      // Non-resume: just write marker
      try {
        fs.writeFileSync(sessionMarker, Date.now().toString());
      } catch (e) { /* ignore */ }
    }

    const progress = loadProgress();
    const progressLine = buildProgressLine(progress);

    // Output session info
    console.log(`Session ${source}. Whole Knowledge Architecture`);
    if (progressLine) console.log(progressLine);

    // Key rules
    console.log(`\nKey Rules:`);
    console.log(` 1. Only Add, Never Subtract`);
    console.log(` 2. Bilingual: Vietnamese primary, English secondary`);
    console.log(` 3. 4-Point Structure: Definition, Context, Application, Integration`);

    // Available commands
    console.log(`\nAvailable: /edit, /analyze, /expand, /regroup, /reconcile, /next, /status, /validate, /report`);

    process.exit(0);
  } catch (error) {
    handleHookError('session-init', error);
  }
}

main();
