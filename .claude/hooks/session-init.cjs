#!/usr/bin/env node

/**
 * SessionStart Hook - Initializes session for Whole Knowledge Architecture
 *
 * Fires: Once per session (startup, resume, clear, compact)
 * Purpose:
 * - Detect current progress from .whole-progress.json
 * - Output context about current working section
 * - Persist state for cross-session continuity
 *
 * v1.1.0: Added idempotency guard to prevent hook loop
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

/**
 * Load progress tracking file
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
 * Get git branch name
 */
function getGitBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  } catch (e) {
    return null;
  }
}

/**
 * Build context summary for output
 */
function buildContextOutput(progress) {
  const lines = [];

  if (progress) {
    const totalFunctions = progress.totalFunctions || 50;
    // FIX: Use completedFunctions (array) not completed
    const completedArr = progress.completedFunctions || progress.completed || [];
    const completedCount = Array.isArray(completedArr) ? completedArr.length : 0;
    const percentage = Math.round((completedCount / totalFunctions) * 100);

    lines.push(`Progress: ${completedCount}/${totalFunctions} (${percentage}%)`);

    if (progress.nextSuggested) {
      lines.push(`Next: CF${progress.nextSuggested}`);
    }

    if (progress.lastUpdated) {
      const lastDate = new Date(progress.lastUpdated).toLocaleDateString('vi-VN');
      lines.push(`Last session: ${lastDate}`);
    }
  }

  const branch = getGitBranch();
  if (branch) lines.push(`Branch: ${branch}`);

  return lines.join(' | ');
}

async function main() {
  try {
    const stdin = fs.readFileSync(0, 'utf-8').trim();
    const data = stdin ? JSON.parse(stdin) : {};
    const source = data.source || 'unknown';
    const sessionId = data.session_id || process.ppid || 'default';

    // IDEMPOTENCY GUARD: Prevent hook loop on resume
    const sessionMarker = path.join(os.tmpdir(), `whole-session-${sessionId}`);
    if (source === 'resume' && fs.existsSync(sessionMarker)) {
      // Already initialized in this session, skip to avoid loop
      process.exit(0);
    }
    // Mark session as initialized
    try {
      fs.writeFileSync(sessionMarker, Date.now().toString());
    } catch (e) { /* ignore if temp write fails */ }

    const progress = loadProgress();
    const context = buildContextOutput(progress);

    // Output session info
    console.log(`Session ${source}. Whole Knowledge Architecture`);
    if (context) console.log(context);

    // Output key reminders
    console.log(`\nKey Rules:`);
    console.log(` 1. Only Add, Never Subtract`);
    console.log(` 2. Bilingual: Vietnamese primary, English secondary`);
    console.log(` 3. 4-Point Structure: Definition, Context, Application, Integration`);

    // Show available commands
    console.log(`\nAvailable: /edit, /analyze, /expand, /regroup, /status, /validate`);

    process.exit(0);
  } catch (error) {
    console.error(`SessionStart error: ${error.message}`);
    process.exit(0);
  }
}

main();
