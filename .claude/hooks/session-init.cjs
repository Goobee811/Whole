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

// Import shared utilities (DRY refactoring)
const { loadProgress, getGitBranch } = require('./lib/ck-config-utils.cjs');

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
    const data = stdin ? JSON.parse(stdin) : {};
    const source = data.source || 'unknown';
    const sessionId = data.session_id || process.ppid || 'default';

    // Idempotency guard: Prevent hook loop on resume
    const sessionMarker = path.join(os.tmpdir(), `whole-session-${sessionId}`);
    if (source === 'resume' && fs.existsSync(sessionMarker)) {
      process.exit(0);
    }
    try {
      fs.writeFileSync(sessionMarker, Date.now().toString());
    } catch (e) { /* ignore */ }

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
    console.log(`\nAvailable: /edit, /analyze, /expand, /regroup, /status, /validate`);

    process.exit(0);
  } catch (error) {
    console.error(`SessionStart error: ${error.message}`);
    process.exit(0);
  }
}

main();
