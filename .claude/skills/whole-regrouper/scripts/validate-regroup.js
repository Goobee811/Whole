#!/usr/bin/env node

/**
 * Validate Regrouped CHUC NANG
 *
 * Checks:
 * 1. "Tong Quan" section preserved
 * 2. All concepts still present (no deletions)
 * 3. Continuous concept numbering (1, 2, 3...)
 * 4. Numbered bilingual headings for groups (1, 2, 3...)
 * 5. Proper markdown format
 *
 * Usage:
 *   node validate-regroup.js [function-number]
 */

const fs = require('fs');
const path = require('path');

// Import from shared utilities (single source of truth)
const {
  COLORS,
  log,
  escapeRegex,
  validateFunctionNumber,
  findFunctionSection,
  getWholemdPath
} = require('../../shared');

/**
 * Show error with recovery guidance
 */
function showErrorWithRecovery(message, context) {
  console.error(`\n${COLORS.red}[ERROR] ${message}${COLORS.reset}`);
  if (context) console.error(`   Context: ${context}`);
  console.error(`\n${COLORS.yellow}Recovery options:${COLORS.reset}`);
  console.error(`  1. Verify function number is between 1-50`);
  console.error(`  2. Confirm Whole.md exists: ls Whole.md`);
  console.error(`  3. Run from project root directory`);
  console.error(`\nUsage: node validate-regroup.js <function-number>`);
  console.error(`Example: node validate-regroup.js 5`);
}

/**
 * Find CHUC NANG boundaries in Whole.md
 * Uses shared findFunctionSection but returns lines array format
 */
function findFunctionBoundaries(functionNumber) {
  const wholePath = getWholemdPath();
  const content = fs.readFileSync(wholePath, 'utf8');

  const section = findFunctionSection(content, functionNumber);
  if (!section) {
    throw new Error(`CHUC NANG ${functionNumber} not found in Whole.md`);
  }

  return {
    startLine: section.startLine,
    endLine: section.endLine,
    lines: section.lines
  };
}

/**
 * Validation: Check if "Tong Quan" section exists and is first group
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
    errors.push('[ERROR] "### **Tong Quan**" section not found');
  } else {
    // Check if it's the first group (should come before other ### headings)
    for (let i = 1; i < tongQuanIndex; i++) {
      if (/^### \*\*/.test(lines[i]) && !/CHỨC NĂNG/.test(lines[i])) {
        errors.push(
          '[ERROR] "Tong Quan" is not the first group (other groups appear before it)'
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
    errors.push('[ERROR] No concepts found (no #### **[number].** headings)');
    return { valid: false, errors, conceptNumbers };
  }

  // Check continuous: 1, 2, 3, 4...
  for (let i = 0; i < conceptNumbers.length; i++) {
    const expected = i + 1;
    const actual = conceptNumbers[i];
    if (actual !== expected) {
      errors.push(
        `[ERROR] Numbering gap: expected ${expected}, found ${actual} (after concept ${i})`
      );
    }
  }

  // Check duplicates
  const duplicates = conceptNumbers.filter(
    (num, index) => conceptNumbers.indexOf(num) !== index
  );
  if (duplicates.length > 0) {
    errors.push(`[ERROR] Duplicate concept numbers: ${duplicates.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    conceptNumbers,
    count: conceptNumbers.length,
  };
}

/**
 * Validation: Check bilingual group headings with numbering (except Tong Quan)
 */
function validateBilingualGroups(lines, tongQuanIndex) {
  const errors = [];
  const groups = [];
  let expectedGroupNumber = 1;

  for (let i = 0; i < lines.length; i++) {
    if (/^### \*\*/.test(lines[i]) && !/CHỨC NĂNG/.test(lines[i])) {
      const line = lines[i];

      // Skip Tong Quan (it's Vietnamese-only by design, no number)
      if (/Tổng Quan/.test(line)) {
        groups.push({ line: i, name: 'Tong Quan', bilingual: true, numbered: true });
        continue;
      }

      // Check for numbered bilingual format: ### **[so]. [English] - [Vietnamese]**
      const numberedBilingualMatch = line.match(/^### \*\*(\d+)\. (.+?) - (.+?)\*\*$/);
      if (!numberedBilingualMatch) {
        // Check if it's bilingual but missing number
        const bilingualOnlyMatch = line.match(/^### \*\*(.+?) - (.+?)\*\*$/);
        if (bilingualOnlyMatch) {
          errors.push(
            `[ERROR] Line ${i + 1}: Group heading missing number: "${line.trim()}"`
          );
          errors.push(
            `   Expected format: ### **${expectedGroupNumber}. ${bilingualOnlyMatch[1]} - ${bilingualOnlyMatch[2]}**`
          );
        } else {
          errors.push(
            `[ERROR] Line ${i + 1}: Group heading not bilingual/numbered: "${line.trim()}"`
          );
          errors.push(
            `   Expected format: ### **[so]. [English] - [Vietnamese]**`
          );
        }
        groups.push({ line: i, name: line, bilingual: false, numbered: false });
      } else {
        const actualNumber = parseInt(numberedBilingualMatch[1], 10);
        if (actualNumber !== expectedGroupNumber) {
          errors.push(
            `[ERROR] Line ${i + 1}: Group number mismatch: expected ${expectedGroupNumber}, found ${actualNumber}`
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

    // Check CHUC NANG heading (should be ##)
    if (/CHỨC NĂNG \d+:/.test(line) && !/^## CHỨC NĂNG/.test(line)) {
      errors.push(`[ERROR] Line ${i + 1}: CHUC NANG should use ## (not ${line.match(/^#+/)?.[0]})`);
    }

    // Check group headings (should be ###)
    if (/\*\*(.+?)\*\*/.test(line) && /^##/.test(line) && !/^###/.test(line) && !/CHỨC NĂNG/.test(line)) {
      errors.push(`[ERROR] Line ${i + 1}: Group heading should use ### (not ${line.match(/^#+/)?.[0]})`);
    }

    // Check concept headings (should be ####)
    if (/\*\*\d+\./.test(line) && !/^####/.test(line)) {
      errors.push(`[ERROR] Line ${i + 1}: Concept heading should use #### (not ${line.match(/^#+/)?.[0]})`);
    }

    // Check bold formatting for headings
    if (/^###/.test(line) && !/CHỨC NĂNG/.test(line) && !/\*\*/.test(line)) {
      errors.push(`[ERROR] Line ${i + 1}: Group heading missing ** bold **: "${line.trim()}"`);
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Main validation function
 */
function validateFunction(functionNumber) {
  log(COLORS.blue, '[INFO]', `Validating CHUC NANG ${functionNumber}...`);
  console.log('');

  try {
    const { startLine, endLine, lines } = findFunctionBoundaries(functionNumber);
    log(
      COLORS.blue,
      '[INFO]',
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
    console.log(`${COLORS.bold}+-----------------------------------------------+${COLORS.reset}`);
    console.log(`${COLORS.bold}|  VALIDATION RESULTS                           |${COLORS.reset}`);
    console.log(`${COLORS.bold}+-----------------------------------------------+${COLORS.reset}`);
    console.log('');

    // 1. Tong Quan
    if (results.tongQuan.valid) {
      log(COLORS.green, '[PASS]', '"Tong Quan" section: OK');
    } else {
      log(COLORS.red, '[FAIL]', '"Tong Quan" section: FAILED');
      results.tongQuan.errors.forEach((err) => console.log(`   ${err}`));
    }

    // 2. Numbering
    if (results.numbering.valid) {
      log(
        COLORS.green,
        '[PASS]',
        `Concept numbering: OK (${results.numbering.count} concepts, 1-${results.numbering.count})`
      );
    } else {
      log(COLORS.red, '[FAIL]', 'Concept numbering: FAILED');
      results.numbering.errors.forEach((err) => console.log(`   ${err}`));
    }

    // 3. Bilingual & numbered groups
    if (results.bilingual.valid) {
      log(
        COLORS.green,
        '[PASS]',
        `Bilingual & numbered groups: OK (${results.bilingual.count} groups)`
      );
    } else {
      log(COLORS.red, '[FAIL]', 'Bilingual & numbered groups: FAILED');
      results.bilingual.errors.forEach((err) => console.log(`   ${err}`));
    }

    // 4. Format
    if (results.format.valid) {
      log(COLORS.green, '[PASS]', 'Markdown format: OK');
    } else {
      log(COLORS.red, '[FAIL]', 'Markdown format: FAILED');
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
      console.log(`${COLORS.green}${COLORS.bold}+-----------------------------------------------+${COLORS.reset}`);
      console.log(`${COLORS.green}${COLORS.bold}|  [OK] ALL CHECKS PASSED - READY TO COMMIT    |${COLORS.reset}`);
      console.log(`${COLORS.green}${COLORS.bold}+-----------------------------------------------+${COLORS.reset}`);
      return 0; // Success exit code
    } else {
      console.log(`${COLORS.red}${COLORS.bold}+-----------------------------------------------+${COLORS.reset}`);
      console.log(`${COLORS.red}${COLORS.bold}|  [FAIL] VALIDATION FAILED - FIX ERRORS ABOVE |${COLORS.reset}`);
      console.log(`${COLORS.red}${COLORS.bold}+-----------------------------------------------+${COLORS.reset}`);
      return 1; // Error exit code
    }
  } catch (err) {
    log(COLORS.red, '[ERROR]', `Validation error: ${err.message}`);
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

  // Validate input using shared security utility
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
