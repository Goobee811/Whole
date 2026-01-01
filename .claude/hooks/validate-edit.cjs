#!/usr/bin/env node

/**
 * PostToolUse Hook - Validates edits to Whole.md
 *
 * Fires: After Edit or Write tool on Whole.md
 * Purpose:
 * - Check for content deletion warnings
 * - Validate structure integrity
 * - Ensure bilingual format
 */

const fs = require('fs');
const path = require('path');

// Import shared utilities
const { validateHookInput, handleHookError } = require('./lib/ck-config-utils.cjs');

/**
 * Check if the edit affected Whole.md
 */
function isWholeEdit(toolInput) {
  if (!toolInput || !toolInput.file_path) return false;
  return path.basename(toolInput.file_path) === 'Whole.md';
}

/**
 * Quick validation checks
 */
function validateEdit(toolInput) {
  const warnings = [];

  // Check for potential deletion (old_string exists but new_string is empty)
  if (toolInput.old_string && !toolInput.new_string) {
    warnings.push('CRITICAL: Potential content deletion detected');
  }

  // Check for structure markers in edit
  if (toolInput.new_string) {
    const content = toolInput.new_string;

    // Check bilingual headers
    if (content.includes('####') && !content.includes('|') && !content.includes('-')) {
      warnings.push('WARNING: Heading may be missing bilingual format (use | or -)');
    }
  }

  return warnings;
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

    const toolName = data.tool_name;
    const toolInput = data.tool_input || {};

    // Only process Edit/Write on Whole.md
    if (!['Edit', 'Write'].includes(toolName)) {
      process.exit(0);
    }

    if (!isWholeEdit(toolInput)) {
      process.exit(0);
    }

    const warnings = validateEdit(toolInput);

    if (warnings.length > 0) {
      console.log('\n=== Post-Edit Validation ===');
      warnings.forEach(w => console.log(`- ${w}`));
      console.log('===========================\n');
    }

    process.exit(0);
  } catch (error) {
    handleHookError('validate-edit', error);
  }
}

main();
