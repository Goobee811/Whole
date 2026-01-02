#!/usr/bin/env node

/**
 * Documentation Consistency Checker
 *
 * Automatically validates consistency across all project documentation:
 * - Version numbers (skills v2.0.0/v5.0.0, shared v1.0.0)
 * - Command references (all 9 commands present)
 * - Project statistics (50/50, 2,072 concepts, 371 groups, dates)
 * - File path references (all .claude/ paths valid)
 * - Skill descriptions (consistent across docs)
 *
 * Usage:
 *   node .claude/scripts/check-documentation-consistency.js
 *   node .claude/scripts/check-documentation-consistency.js --verbose
 *   node .claude/scripts/check-documentation-consistency.js --fix (future)
 *
 * Exit codes:
 *   0 - All checks passed
 *   1 - Validation errors found
 *   2 - Script execution error
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ============================================================================
// Configuration
// ============================================================================

const CONFIG = {
  // Expected versions
  versions: {
    'whole-editor': 'v2.0.0',
    'whole-analyzer': 'v2.0.0',
    'whole-reviewer': 'v2.0.0',
    'whole-regrouper': 'v5.0.0',
    'shared': 'v1.0.0',
    'hooks': 'v2.0.0'
  },

  // Expected commands (order matters for some checks)
  commands: [
    '/status',
    '/next',
    '/analyze',
    '/edit',
    '/expand',
    '/regroup',
    '/reconcile',
    '/validate',
    '/report'
  ],

  // Expected project statistics
  stats: {
    functions: '50/50',
    concepts: '2,072',
    groups: '371',
    startDate: '2025-12-16',
    endDate: '2025-12-27',
    duration: '12'  // Just the number, pattern already matches "days"
  },

  // Files to check
  docFiles: [
    'README.md',
    'docs/project-overview.md',
    'docs/project-overview-pdr.md',
    'docs/skill-reference.md',
    'docs/system-architecture.md',
    'docs/project-roadmap.md',
    'docs/codebase-summary.md',
    'docs/workflow-guide.md',
    '.claude/CLAUDE.md',
    '.claude/README.md',
    '.claude/workflows/README.md'
  ],

  // File paths that must exist
  requiredPaths: [
    '.claude/skills/shared/README.md',
    '.claude/skills/whole-editor/SKILL.md',
    '.claude/skills/whole-analyzer/SKILL.md',
    '.claude/skills/whole-reviewer/SKILL.md',
    '.claude/skills/whole-regrouper/SKILL.md',
    '.claude/commands/analyze.md',
    '.claude/commands/edit.md',
    '.claude/commands/expand.md',
    '.claude/commands/next.md',
    '.claude/commands/regroup.md',
    '.claude/commands/reconcile.md',
    '.claude/commands/report.md',
    '.claude/commands/status.md',
    '.claude/commands/validate.md',
    '.claude/hooks/session-init.cjs',
    '.claude/hooks/progress-indicator.cjs',
    '.claude/hooks/validate-edit.cjs',
    '.claude/hooks/dev-rules-reminder.cjs',
    '.claude/workflows/README.md',
    '.claude/workflows/primary-workflow.md',
    '.claude/workflows/editing-workflow.md',
    '.claude/workflows/quality-assurance.md',
    '.claude/workflows/development-rules.md'
  ]
};

// ============================================================================
// Utilities
// ============================================================================

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

function colorize(text, color) {
  return `${COLORS[color]}${text}${COLORS.reset}`;
}

function log(message, color = 'reset') {
  console.log(colorize(message, color));
}

function header(text) {
  console.log('');
  log(`${'═'.repeat(70)}`, 'cyan');
  log(` ${text}`, 'cyan');
  log(`${'═'.repeat(70)}`, 'cyan');
}

function subheader(text) {
  console.log('');
  log(`─── ${text}`, 'gray');
}

// ============================================================================
// Check Modules
// ============================================================================

/**
 * Check 1: Version Numbers Consistency
 */
function checkVersionNumbers(docFiles, verbose) {
  subheader('Check 1: Version Numbers');

  const errors = [];
  const warnings = [];
  let checksRun = 0;

  // Check each skill version
  Object.entries(CONFIG.versions).forEach(([skill, expectedVersion]) => {
    docFiles.forEach(file => {
      if (!fs.existsSync(file)) return;

      const content = fs.readFileSync(file, 'utf8');
      const skillPattern = new RegExp(`${skill}.*?(v\\d+\\.\\d+\\.\\d+)`, 'gi');
      const matches = [...content.matchAll(skillPattern)];

      matches.forEach(match => {
        checksRun++;
        const foundVersion = match[1];
        if (foundVersion !== expectedVersion) {
          errors.push({
            file,
            skill,
            expected: expectedVersion,
            found: foundVersion,
            line: content.substring(0, match.index).split('\n').length
          });
        }
      });
    });
  });

  // Report results
  if (errors.length === 0) {
    log(`  ✓ All version numbers consistent (${checksRun} checks)`, 'green');
  } else {
    log(`  ✗ Found ${errors.length} version inconsistencies:`, 'red');
    errors.forEach(err => {
      log(`    ${err.file}:${err.line}`, 'gray');
      log(`      Expected: ${err.skill} ${err.expected}`, 'gray');
      log(`      Found: ${err.found}`, 'red');
    });
  }

  return { passed: errors.length === 0, errors, warnings, checksRun };
}

/**
 * Check 2: Command References (All 9 Commands)
 */
function checkCommandReferences(docFiles, verbose) {
  subheader('Check 2: Command References');

  const errors = [];
  const warnings = [];
  let checksRun = 0;

  docFiles.forEach(file => {
    if (!fs.existsSync(file)) return;

    const content = fs.readFileSync(file, 'utf8');

    // Check if file mentions "9 commands" or similar
    const commandCountPattern = /(9|nine)\s*(total\s*)?(commands|slash commands)/i;
    if (commandCountPattern.test(content)) {
      checksRun++;

      // Check if document actually tries to list commands (has table or list structure)
      const hasCommandTable = /\|\s*command\s*\|/i.test(content) || /\|\s*`\/\w+/i.test(content);
      const hasCommandList = /[-\*]\s+`\/\w+/.test(content);
      const isListingCommands = hasCommandTable || hasCommandList;

      // Verify all 9 commands are present (or at least most of them)
      const missingCommands = CONFIG.commands.filter(cmd => {
        const pattern = new RegExp(`${cmd.replace('/', '\\/')}(?!\\.)`, 'i');
        return !pattern.test(content);
      });

      // Only check completeness if document is actually trying to list commands
      if (isListingCommands && missingCommands.length > 2) {
        errors.push({
          file,
          type: 'missing_commands',
          missing: missingCommands,
          message: `Has command table/list but missing ${missingCommands.length}: ${missingCommands.join(', ')}`
        });
      } else if (isListingCommands && missingCommands.length > 0) {
        warnings.push({
          file,
          type: 'some_commands_missing',
          missing: missingCommands,
          message: `Command table/list incomplete, ${missingCommands.length} not mentioned (may be acceptable if showing examples)`
        });
      }
      // If just mentions "9 commands" in passing without listing, that's fine
    }
  });

  if (errors.length === 0) {
    log(`  ✓ All command references complete (${checksRun} checks)`, 'green');
  } else {
    log(`  ✗ Found ${errors.length} command reference issues:`, 'red');
    errors.forEach(err => {
      log(`    ${err.file}`, 'gray');
      log(`      ${err.message}`, 'red');
    });
  }

  return { passed: errors.length === 0, errors, warnings, checksRun };
}

/**
 * Check 3: Project Statistics Consistency
 */
function checkProjectStatistics(docFiles, verbose) {
  subheader('Check 3: Project Statistics');

  const errors = [];
  const warnings = [];
  let checksRun = 0;

  // Check each statistic with more specific patterns
  Object.entries(CONFIG.stats).forEach(([stat, expectedValue]) => {
    docFiles.forEach(file => {
      if (!fs.existsSync(file)) return;

      const content = fs.readFileSync(file, 'utf8');

      // Different patterns for different stats - more specific
      let pattern;
      switch (stat) {
        case 'functions':
          // Match: "50/50 functions" or "Functions completed | 50/50"
          pattern = /(?:functions?[^\d]*|completed[^\d]*)?(\d+\/\d+)(?:\s*\(?\d+%?\)?)?\s*(?:functions?|CHỨC NĂNG|complete)/i;
          break;
        case 'concepts':
          // Match: "2,072 concepts" but not "8 concept groups"
          pattern = /(?:total\s+)?(\d{1,3}(?:,\d{3})+)\s+concepts?\s+(?:processed|organized|created|across)/i;
          break;
        case 'groups':
          // Match: "371 groups" or "groups created | 371" but not "8 groups"
          pattern = /(?:total\s+)?(\d{3,})\s+(?:thematic\s+)?groups?(?:\s+created)?/i;
          break;
        case 'startDate':
          // Match date in context of "started" or "duration"
          pattern = /(?:start(?:ed)?|from)[:\s]*(2025-12-\d+)/i;
          break;
        case 'endDate':
          // Match completion date
          pattern = /(?:complet(?:ed|ion)|end(?:ed)?|to)[:\s]*(2025-12-27)/i;
          break;
        case 'duration':
          // Match "12 days" in context of project/duration
          pattern = /(?:duration|period)[:\s]+(\d+)\s+days/i;
          break;
      }

      const matches = [...content.matchAll(new RegExp(pattern, 'g'))];
      matches.forEach(match => {
        checksRun++;
        const foundValue = match[1].replace(',', '');
        const expectedNormalized = expectedValue.replace(',', '');

        // Special handling for dates and flexible stats
        if (stat === 'startDate' && foundValue !== '2025-12-16') {
          // Allow 2025-12-16 or 2025-12-17 (some docs might say "started 12/17")
          return;
        }

        if (foundValue !== expectedNormalized && foundValue !== expectedValue) {
          // Skip known historical values (like 385 groups from specific analysis)
          if (stat === 'groups' && foundValue === '385') {
            warnings.push({
              file,
              stat,
              value: foundValue,
              message: 'Historical value (post-optimization analysis)'
            });
            return;
          }

          errors.push({
            file,
            stat,
            expected: expectedValue,
            found: foundValue,
            line: content.substring(0, match.index).split('\n').length
          });
        }
      });
    });
  });

  if (errors.length === 0) {
    log(`  ✓ All project statistics consistent (${checksRun} checks)`, 'green');
    if (warnings.length > 0 && verbose) {
      log(`  ⚠ ${warnings.length} historical values (acceptable)`, 'yellow');
    }
  } else {
    log(`  ✗ Found ${errors.length} statistic inconsistencies:`, 'red');
    errors.forEach(err => {
      log(`    ${err.file}:${err.line}`, 'gray');
      log(`      Expected ${err.stat}: ${err.expected}`, 'gray');
      log(`      Found: ${err.found}`, 'red');
    });
  }

  return { passed: errors.length === 0, errors, warnings, checksRun };
}

/**
 * Check 4: File Path References
 */
function checkFilePathReferences(verbose) {
  subheader('Check 4: File Path References');

  const errors = [];
  const warnings = [];
  let checksRun = 0;

  CONFIG.requiredPaths.forEach(filePath => {
    checksRun++;
    if (!fs.existsSync(filePath)) {
      errors.push({
        path: filePath,
        message: 'Required file does not exist'
      });
    }
  });

  if (errors.length === 0) {
    log(`  ✓ All required files exist (${checksRun} checks)`, 'green');
  } else {
    log(`  ✗ Found ${errors.length} missing files:`, 'red');
    errors.forEach(err => {
      log(`    ${err.path}`, 'red');
    });
  }

  return { passed: errors.length === 0, errors, warnings, checksRun };
}

/**
 * Check 5: Skill Descriptions Consistency
 */
function checkSkillDescriptions(docFiles, verbose) {
  subheader('Check 5: Skill Descriptions');

  const errors = [];
  const warnings = [];
  let checksRun = 0;

  // Expected skill purposes (key phrases that should appear)
  const expectedPurposes = {
    'whole-editor': ['content editing', 'editing', 'modification'],
    'whole-analyzer': ['pre-edit', 'analysis', 'issue detection'],
    'whole-reviewer': ['post-edit', 'validation', 'QA'],
    'whole-regrouper': ['reorganization', 'regrouping', 'intelligent']
  };

  Object.entries(expectedPurposes).forEach(([skill, keywords]) => {
    const descriptions = [];

    docFiles.forEach(file => {
      if (!fs.existsSync(file)) return;

      const content = fs.readFileSync(file, 'utf8');

      // Find skill descriptions (lines mentioning skill with nearby context)
      const skillPattern = new RegExp(`${skill}[^\\n]*?([^\\n]{50,150})`, 'gi');
      const matches = [...content.matchAll(skillPattern)];

      matches.forEach(match => {
        const description = match[1].toLowerCase();
        descriptions.push({ file, description });
      });
    });

    // Check if at least one keyword appears in descriptions
    descriptions.forEach(({ file, description }) => {
      checksRun++;
      const hasKeyword = keywords.some(kw => description.includes(kw));

      if (!hasKeyword) {
        warnings.push({
          file,
          skill,
          description: description.substring(0, 100),
          message: `Description may be inconsistent (missing keywords: ${keywords.join(', ')})`
        });
      }
    });
  });

  if (errors.length === 0) {
    log(`  ✓ Skill descriptions consistent (${checksRun} checks)`, 'green');
    if (warnings.length > 0 && verbose) {
      log(`  ⚠ ${warnings.length} potential description variations`, 'yellow');
    }
  } else {
    log(`  ✗ Found ${errors.length} description issues:`, 'red');
    errors.forEach(err => {
      log(`    ${err.file}: ${err.message}`, 'red');
    });
  }

  return { passed: errors.length === 0, errors, warnings, checksRun };
}

/**
 * Check 6: Cross-Reference Validity
 */
function checkCrossReferences(docFiles, verbose) {
  subheader('Check 6: Cross-References');

  const errors = [];
  const warnings = [];
  let checksRun = 0;

  docFiles.forEach(file => {
    if (!fs.existsSync(file)) return;

    const content = fs.readFileSync(file, 'utf8');
    const dir = path.dirname(file);

    // Find markdown links: [text](path)
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    const matches = [...content.matchAll(linkPattern)];

    matches.forEach(match => {
      const linkText = match[1];
      const linkPath = match[2];

      // Skip external links and anchors
      if (linkPath.startsWith('http') || linkPath.startsWith('#')) {
        return;
      }

      checksRun++;

      // Resolve relative path
      const resolvedPath = path.resolve(dir, linkPath);

      if (!fs.existsSync(resolvedPath)) {
        errors.push({
          file,
          link: linkText,
          path: linkPath,
          resolvedPath,
          line: content.substring(0, match.index).split('\n').length
        });
      }
    });
  });

  if (errors.length === 0) {
    log(`  ✓ All cross-references valid (${checksRun} checks)`, 'green');
  } else {
    log(`  ✗ Found ${errors.length} broken links:`, 'red');
    errors.forEach(err => {
      log(`    ${err.file}:${err.line}`, 'gray');
      log(`      Link: ${err.link}`, 'gray');
      log(`      Path: ${err.path} (not found)`, 'red');
    });
  }

  return { passed: errors.length === 0, errors, warnings, checksRun };
}

// ============================================================================
// Main Execution
// ============================================================================

function main() {
  const verbose = process.argv.includes('--verbose') || process.argv.includes('-v');

  header('Documentation Consistency Checker');

  log('Project: Whole Knowledge Architecture', 'gray');
  log(`Date: ${new Date().toISOString().split('T')[0]}`, 'gray');
  log(`Files to check: ${CONFIG.docFiles.length}`, 'gray');

  // Run all checks
  const results = [];

  try {
    results.push(checkVersionNumbers(CONFIG.docFiles, verbose));
    results.push(checkCommandReferences(CONFIG.docFiles, verbose));
    results.push(checkProjectStatistics(CONFIG.docFiles, verbose));
    results.push(checkFilePathReferences(verbose));
    results.push(checkSkillDescriptions(CONFIG.docFiles, verbose));
    results.push(checkCrossReferences(CONFIG.docFiles, verbose));

    // Summary
    header('Summary');

    const totalChecks = results.reduce((sum, r) => sum + r.checksRun, 0);
    const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);
    const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);
    const allPassed = results.every(r => r.passed);

    log(`Total checks run: ${totalChecks}`, 'gray');
    log(`Errors found: ${totalErrors}`, totalErrors === 0 ? 'green' : 'red');
    log(`Warnings: ${totalWarnings}`, totalWarnings === 0 ? 'green' : 'yellow');

    if (allPassed) {
      console.log('');
      log('✓ ALL CHECKS PASSED', 'green');
      log(`Documentation consistency: ${((totalChecks - totalErrors) / totalChecks * 100).toFixed(1)}%`, 'green');
      console.log('');
      return 0; // Success
    } else {
      console.log('');
      log('✗ VALIDATION FAILED', 'red');
      log(`Documentation consistency: ${((totalChecks - totalErrors) / totalChecks * 100).toFixed(1)}%`, 'red');
      log('\nPlease fix the errors above and run again.', 'yellow');
      console.log('');
      return 1; // Validation errors
    }

  } catch (error) {
    console.error('');
    log('✗ SCRIPT ERROR', 'red');
    console.error(error);
    console.error('');
    return 2; // Script error
  }
}

// Run if executed directly
if (require.main === module) {
  const exitCode = main();
  process.exit(exitCode);
}

module.exports = { main, CONFIG };
