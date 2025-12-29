#!/usr/bin/env node

/**
 * Validate Regrouped CHỨC NĂNG
 *
 * Checks:
 * 1. "Tổng Quan" section preserved
 * 2. All concepts still present (no deletions)
 * 3. Continuous concept numbering (1, 2, 3...)
 * 4. Numbered bilingual headings for groups (1, 2, 3...)
 * 5. Proper markdown format
 *
 * Usage:
 *   node validate-regroup.js [function-number]
 *   OR
 *   node validate-regroup.js [start-line] [end-line]
 */

const fs = require('fs');
const path = require('path');

// Import security utilities
const { escapeRegex, validateFunctionNumber } = require('../../../hooks/lib/ck-config-utils.cjs');

// Configuration
const WHOLE_MD_PATH = path.join(process.cwd(), 'Whole.md');

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
};

function log(color, symbol, message) {
  console.log(`${color}${symbol} ${message}${colors.reset}`);
}

/**
 * Show error with recovery guidance
 */
function showErrorWithRecovery(message, context) {
  console.error(`\n${colors.red}❌ ${message}${colors.reset}`);
  if (context) console.error(`   Context: ${context}`);
  console.error(`\n${colors.yellow}Recovery options:${colors.reset}`);
  console.error(`  1. Verify function number is between 1-50`);
  console.error(`  2. Confirm Whole.md exists: ls Whole.md`);
  console.error(`  3. Run from project root directory`);
  console.error(`\nUsage: node validate-regroup.js <function-number>`);
  console.error(`Example: node validate-regroup.js 5`);
}

/**
 * Find CHỨC NĂNG boundaries in Whole.md
 */
function findFunctionBoundaries(functionNumber) {
  const content = fs.readFileSync(WHOLE_MD_PATH, 'utf8');
  const lines = content.split('\n');

  let startLine = -1;
  let endLine = lines.length;

  // Use escapeRegex to prevent ReDoS attacks from malicious input
  const safeNum = escapeRegex(functionNumber.toString());
  const safeNextNum = escapeRegex((functionNumber + 1).toString());
  const functionRegex = new RegExp(`^## CHỨC NĂNG ${safeNum}:`);
  const nextFunctionRegex = new RegExp(`^## CHỨC NĂNG ${safeNextNum}:`);

  for (let i = 0; i < lines.length; i++) {
    if (functionRegex.test(lines[i])) {
      startLine = i;
    }
    if (startLine !== -1 && nextFunctionRegex.test(lines[i])) {
      endLine = i;
      break;
    }
  }

  if (startLine === -1) {
    throw new Error(`CHỨC NĂNG ${functionNumber} not found in Whole.md`);
  }

  return { startLine, endLine, lines: lines.slice(startLine, endLine) };
}

/**
 * Validation: Check if "Tổng Quan" section exists and is first group
 */
function validateTongQuan(lines) {
  const errors = [];
  let tongQuanFound = false;
  let tongQuanIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (/^### \*\*Tổng Quan\*\*/.test(lines[i])) {
      tongQuanFound = true;
      tongQuanIndex = i;
      break;
    }
  }

  if (!tongQuanFound) {
    errors.push('❌ "### **Tổng Quan**" section not found');
  } else {
    // Check if it's the first group (should come before other ### headings)
    for (let i = 1; i < tongQuanIndex; i++) {
      if (/^### \*\*/.test(lines[i]) && !/CHỨC NĂNG/.test(lines[i])) {
        errors.push(
          '❌ "Tổng Quan" is not the first group (other groups appear before it)'
        );
        break;
      }
    }
  }

  return { valid: errors.length === 0, errors, tongQuanIndex };
}

/**
 * Validation: Check concept numbering is continuous
 */
function validateNumbering(lines) {
  const errors = [];
  const conceptNumbers = [];

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^#### \*\*(\d+)\./);
    if (match) {
      conceptNumbers.push(parseInt(match[1], 10));
    }
  }

  if (conceptNumbers.length === 0) {
    errors.push('❌ No concepts found (no #### **[number].** headings)');
    return { valid: false, errors, conceptNumbers };
  }

  // Check continuous: 1, 2, 3, 4...
  for (let i = 0; i < conceptNumbers.length; i++) {
    const expected = i + 1;
    const actual = conceptNumbers[i];
    if (actual !== expected) {
      errors.push(
        `❌ Numbering gap: expected ${expected}, found ${actual} (after concept ${i})`
      );
    }
  }

  // Check duplicates
  const duplicates = conceptNumbers.filter(
    (num, index) => conceptNumbers.indexOf(num) !== index
  );
  if (duplicates.length > 0) {
    errors.push(`❌ Duplicate concept numbers: ${duplicates.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    conceptNumbers,
    count: conceptNumbers.length,
  };
}

/**
 * Validation: Check bilingual group headings with numbering (except Tổng Quan)
 */
function validateBilingualGroups(lines, tongQuanIndex) {
  const errors = [];
  const groups = [];
  let expectedGroupNumber = 1;

  for (let i = 0; i < lines.length; i++) {
    if (/^### \*\*/.test(lines[i]) && !/CHỨC NĂNG/.test(lines[i])) {
      const line = lines[i];

      // Skip Tổng Quan (it's Vietnamese-only by design, no number)
      if (/Tổng Quan/.test(line)) {
        groups.push({ line: i, name: 'Tổng Quan', bilingual: true, numbered: true });
        continue;
      }

      // Check for numbered bilingual format: ### **[số]. [English] - [Vietnamese]**
      const numberedBilingualMatch = line.match(/^### \*\*(\d+)\. (.+?) - (.+?)\*\*$/);
      if (!numberedBilingualMatch) {
        // Check if it's bilingual but missing number
        const bilingualOnlyMatch = line.match(/^### \*\*(.+?) - (.+?)\*\*$/);
        if (bilingualOnlyMatch) {
          errors.push(
            `❌ Line ${i + 1}: Group heading missing number: "${line.trim()}"`
          );
          errors.push(
            `   Expected format: ### **${expectedGroupNumber}. ${bilingualOnlyMatch[1]} - ${bilingualOnlyMatch[2]}**`
          );
        } else {
          errors.push(
            `❌ Line ${i + 1}: Group heading not bilingual/numbered: "${line.trim()}"`
          );
          errors.push(
            `   Expected format: ### **[số]. [English] - [Vietnamese]**`
          );
        }
        groups.push({ line: i, name: line, bilingual: false, numbered: false });
      } else {
        const actualNumber = parseInt(numberedBilingualMatch[1], 10);
        if (actualNumber !== expectedGroupNumber) {
          errors.push(
            `❌ Line ${i + 1}: Group number mismatch: expected ${expectedGroupNumber}, found ${actualNumber}`
          );
        }
        groups.push({
          line: i,
          number: actualNumber,
          name: `${numberedBilingualMatch[2]} - ${numberedBilingualMatch[3]}`,
          bilingual: true,
          numbered: true,
        });
        expectedGroupNumber++;
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    groups,
    count: groups.length,
  };
}

/**
 * Validation: Check markdown format (proper heading levels)
 */
function validateMarkdownFormat(lines) {
  const errors = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check CHỨC NĂNG heading (should be ##)
    if (/CHỨC NĂNG \d+:/.test(line) && !/^## CHỨC NĂNG/.test(line)) {
      errors.push(`❌ Line ${i + 1}: CHỨC NĂNG should use ## (not ${line.match(/^#+/)?.[0]})`);
    }

    // Check group headings (should be ###)
    if (/\*\*(.+?)\*\*/.test(line) && /^##/.test(line) && !/^###/.test(line) && !/CHỨC NĂNG/.test(line)) {
      errors.push(`❌ Line ${i + 1}: Group heading should use ### (not ${line.match(/^#+/)?.[0]})`);
    }

    // Check concept headings (should be ####)
    if (/\*\*\d+\./.test(line) && !/^####/.test(line)) {
      errors.push(`❌ Line ${i + 1}: Concept heading should use #### (not ${line.match(/^#+/)?.[0]})`);
    }

    // Check bold formatting for headings
    if (/^###/.test(line) && !/CHỨC NĂNG/.test(line) && !/\*\*/.test(line)) {
      errors.push(`❌ Line ${i + 1}: Group heading missing ** bold **: "${line.trim()}"`);
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Main validation function
 */
function validateFunction(functionNumber) {
  log(colors.blue, '🔍', `Validating CHỨC NĂNG ${functionNumber}...`);
  console.log('');

  try {
    const { startLine, endLine, lines } = findFunctionBoundaries(functionNumber);
    log(
      colors.blue,
      '📍',
      `Found at lines ${startLine + 1}-${endLine} (${lines.length} lines)`
    );
    console.log('');

    const results = {
      tongQuan: validateTongQuan(lines),
      numbering: validateNumbering(lines),
      bilingual: null, // Will be set after tongQuan validation
      format: validateMarkdownFormat(lines),
    };

    // Validate bilingual (needs tongQuanIndex from first validation)
    results.bilingual = validateBilingualGroups(
      lines,
      results.tongQuan.tongQuanIndex
    );

    // Display results
    console.log(`${colors.bold}╔═══════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.bold}║  VALIDATION RESULTS                           ║${colors.reset}`);
    console.log(`${colors.bold}╚═══════════════════════════════════════════════╝${colors.reset}`);
    console.log('');

    // 1. Tổng Quan
    if (results.tongQuan.valid) {
      log(colors.green, '✅', '"Tổng Quan" section: PASS');
    } else {
      log(colors.red, '❌', '"Tổng Quan" section: FAIL');
      results.tongQuan.errors.forEach((err) => console.log(`   ${err}`));
    }

    // 2. Numbering
    if (results.numbering.valid) {
      log(
        colors.green,
        '✅',
        `Concept numbering: PASS (${results.numbering.count} concepts, 1-${results.numbering.count})`
      );
    } else {
      log(colors.red, '❌', 'Concept numbering: FAIL');
      results.numbering.errors.forEach((err) => console.log(`   ${err}`));
    }

    // 3. Bilingual & numbered groups
    if (results.bilingual.valid) {
      log(
        colors.green,
        '✅',
        `Bilingual & numbered groups: PASS (${results.bilingual.count} groups)`
      );
    } else {
      log(colors.red, '❌', 'Bilingual & numbered groups: FAIL');
      results.bilingual.errors.forEach((err) => console.log(`   ${err}`));
    }

    // 4. Format
    if (results.format.valid) {
      log(colors.green, '✅', 'Markdown format: PASS');
    } else {
      log(colors.red, '❌', 'Markdown format: FAIL');
      results.format.errors.forEach((err) => console.log(`   ${err}`));
    }

    console.log('');

    // Overall result
    const allValid =
      results.tongQuan.valid &&
      results.numbering.valid &&
      results.bilingual.valid &&
      results.format.valid;

    if (allValid) {
      console.log(`${colors.green}${colors.bold}╔═══════════════════════════════════════════════╗${colors.reset}`);
      console.log(`${colors.green}${colors.bold}║  ✅ ALL CHECKS PASSED - READY TO COMMIT       ║${colors.reset}`);
      console.log(`${colors.green}${colors.bold}╚═══════════════════════════════════════════════╝${colors.reset}`);
      return 0; // Success exit code
    } else {
      console.log(`${colors.red}${colors.bold}╔═══════════════════════════════════════════════╗${colors.reset}`);
      console.log(`${colors.red}${colors.bold}║  ❌ VALIDATION FAILED - FIX ERRORS ABOVE       ║${colors.reset}`);
      console.log(`${colors.red}${colors.bold}╚═══════════════════════════════════════════════╝${colors.reset}`);
      return 1; // Error exit code
    }
  } catch (err) {
    log(colors.red, '❌', `Validation error: ${err.message}`);
    return 1;
  }
}

// CLI Entry Point
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    showErrorWithRecovery('No function number provided');
    process.exit(1);
  }

  // Validate input using security utility (prevents regex injection)
  const functionNumber = validateFunctionNumber(args[0], 1, 50);

  if (functionNumber === null) {
    showErrorWithRecovery(
      `Invalid function number: "${args[0]}"`,
      'Must be integer between 1-50'
    );
    process.exit(1);
  }

  const exitCode = validateFunction(functionNumber);
  process.exit(exitCode);
}

module.exports = { validateFunction };
