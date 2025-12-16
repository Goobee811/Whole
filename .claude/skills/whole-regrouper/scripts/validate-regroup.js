#!/usr/bin/env node

/**
 * Validate Regrouped CHỨC NĂNG
 *
 * Checks:
 * 1. "Tổng Quan" section preserved
 * 2. All concepts still present (no deletions)
 * 3. Continuous numbering (1, 2, 3...)
 * 4. Bilingual headings for groups
 * 5. Proper markdown format
 *
 * Usage:
 *   node validate-regroup.js [function-number]
 *   OR
 *   node validate-regroup.js [start-line] [end-line]
 */

const fs = require('fs');
const path = require('path');

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
 * Find CHỨC NĂNG boundaries in Whole.md
 */
function findFunctionBoundaries(functionNumber) {
  const content = fs.readFileSync(WHOLE_MD_PATH, 'utf8');
  const lines = content.split('\n');

  let startLine = -1;
  let endLine = lines.length;

  const functionRegex = new RegExp(`^## CHỨC NĂNG ${functionNumber}:`);
  const nextFunctionRegex = new RegExp(`^## CHỨC NĂNG ${functionNumber + 1}:`);

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
 * Validation: Check bilingual group headings (except Tổng Quan)
 */
function validateBilingualGroups(lines, tongQuanIndex) {
  const errors = [];
  const groups = [];

  for (let i = 0; i < lines.length; i++) {
    if (/^### \*\*/.test(lines[i]) && !/CHỨC NĂNG/.test(lines[i])) {
      const line = lines[i];

      // Skip Tổng Quan (it's Vietnamese-only by design)
      if (/Tổng Quan/.test(line)) {
        groups.push({ line: i, name: 'Tổng Quan', bilingual: true });
        continue;
      }

      // Check for bilingual format: ### **[English] - [Vietnamese]**
      const bilingualMatch = line.match(/^### \*\*(.+?) - (.+?)\*\*$/);
      if (!bilingualMatch) {
        errors.push(
          `❌ Line ${i + 1}: Group heading not bilingual: "${line.trim()}"`
        );
        errors.push(
          `   Expected format: ### **[English] - [Vietnamese]**`
        );
        groups.push({ line: i, name: line, bilingual: false });
      } else {
        groups.push({
          line: i,
          name: `${bilingualMatch[1]} - ${bilingualMatch[2]}`,
          bilingual: true,
        });
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

    // 3. Bilingual groups
    if (results.bilingual.valid) {
      log(
        colors.green,
        '✅',
        `Bilingual groups: PASS (${results.bilingual.count} groups)`
      );
    } else {
      log(colors.red, '❌', 'Bilingual groups: FAIL');
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
    console.error(`${colors.red}Usage: node validate-regroup.js [function-number]${colors.reset}`);
    console.error(`Example: node validate-regroup.js 5`);
    process.exit(1);
  }

  const functionNumber = parseInt(args[0], 10);

  if (isNaN(functionNumber)) {
    console.error(`${colors.red}Error: Invalid function number "${args[0]}"${colors.reset}`);
    process.exit(1);
  }

  const exitCode = validateFunction(functionNumber);
  process.exit(exitCode);
}

module.exports = { validateFunction };
