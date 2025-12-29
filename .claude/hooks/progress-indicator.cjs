#!/usr/bin/env node
/**
 * PostToolUse Progress Indicator
 *
 * Outputs brief progress message after each tool completes.
 * This provides user visibility during long operations.
 *
 * Exit Codes:
 *   0 - Always (non-blocking)
 */
'use strict';

const fs = require('fs');
const path = require('path');

// Import shared utilities
const { validateHookInput, handleHookError } = require('./lib/ck-config-utils.cjs');

/**
 * Truncate string with ellipsis
 */
function truncate(str, maxLength = 30) {
  if (!str) return '';
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
}

/**
 * Extract filename from path
 */
function basename(filePath) {
  if (!filePath) return 'file';
  return path.basename(filePath);
}

/**
 * Build progress message based on tool type
 */
function buildMessage(tool, params, result) {
  switch (tool) {
    case 'Read': {
      const file = basename(params.file_path);
      const offset = params.offset ? ` (offset ${params.offset})` : '';
      return `✓ Read: ${file}${offset}`;
    }

    case 'Edit': {
      const file = basename(params.file_path);
      return `✓ Edit: ${file}`;
    }

    case 'Write': {
      const file = basename(params.file_path);
      return `✓ Write: ${file}`;
    }

    case 'Bash': {
      const cmd = truncate(params.command, 25);
      return `✓ Bash: ${cmd}`;
    }

    case 'Grep': {
      const pattern = truncate(params.pattern, 20);
      return `✓ Grep: ${pattern}`;
    }

    case 'Glob': {
      const pattern = truncate(params.pattern, 20);
      return `✓ Glob: ${pattern}`;
    }

    case 'Task': {
      const type = params.subagent_type || 'agent';
      return `✓ Task: ${type}`;
    }

    default:
      return `✓ ${tool}`;
  }
}

async function main() {
  try {
    const stdin = fs.readFileSync(0, 'utf-8').trim();
    if (!stdin) {
      process.exit(0);
    }

    const rawData = JSON.parse(stdin);

    // Validate and sanitize input (Security hardening)
    const data = validateHookInput(rawData);
    if (!data) {
      process.exit(0);
    }

    const tool = data.tool_name || 'unknown';
    const params = data.tool_parameters || {};
    const result = rawData.tool_result || {}; // tool_result not in validateHookInput

    // Skip these tools to reduce noise
    const skipTools = ['TodoWrite', 'Skill', 'SlashCommand'];
    if (skipTools.includes(tool)) {
      process.exit(0);
    }

    const message = buildMessage(tool, params, result);

    // Output to conversation - this shows to user
    console.log(message);

  } catch (error) {
    handleHookError('progress-indicator', error);
  }

  process.exit(0);
}

main();
