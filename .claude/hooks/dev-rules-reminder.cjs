#!/usr/bin/env node

/**
 * UserPromptSubmit Hook - Injects contextual reminders
 *
 * Purpose: Remind Claude of key rules on every user prompt
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function loadProgress() {
  try {
    const progressPath = path.join(process.cwd(), '.whole-progress.json');
    if (fs.existsSync(progressPath)) {
      return JSON.parse(fs.readFileSync(progressPath, 'utf8'));
    }
  } catch (e) { /* ignore */ }
  return null;
}

function getGitBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  } catch (e) {
    return null;
  }
}

async function main() {
  try {
    const progress = loadProgress();
    const branch = getGitBranch();

    const output = [];

    output.push(`## Session Context`);
    output.push(`- DateTime: ${new Date().toLocaleString('vi-VN')}`);
    output.push(`- CWD: ${process.cwd()}`);
    if (branch) output.push(`- Branch: ${branch}`);

    output.push(`\n## Rules`);
    output.push(`- **Only Add, Never Subtract**: Preserve all existing content`);
    output.push(`- **Bilingual**: Vietnamese primary, English secondary`);
    output.push(`- **4-Point Structure**: Definition, Context, Application, Integration`);
    output.push(`- **File Handling**: Whole.md >1MB - use grep with offset/limit`);

    if (progress?.nextSuggested) {
      output.push(`\n## Current Work`);
      output.push(`- Next function: CF${progress.nextSuggested}`);
      if (progress.lastCompletedFunction) {
        output.push(`- Last completed: ${progress.lastCompletedFunction.functionName}`);
      }
    }

    console.log(output.join('\n'));
    process.exit(0);
  } catch (error) {
    console.error(`Hook error: ${error.message}`);
    process.exit(0);
  }
}

main();
