#!/usr/bin/env node

/**
 * Validates bilingual compliance in Whole.md
 *
 * Usage: node bilingual-check.js [function-number]
 *
 * Checks:
 * - Bilingual headers (English - Vietnamese format)
 * - Both languages present in concept descriptions
 * - Consistent separator usage
 */

const fs = require('fs');

// Import from shared utilities (single source of truth)
const {
  COLORS,
  findWholemd,
  findFunctionSection,
  extractHeaders,
  validateBilingualFormat,
  validateFunctionNumber
} = require('../../shared');

/**
 * Validate bilingual header content
 */
function validateBilingualHeader(header) {
  const issues = [];
  const text = header.text;

  // Check for separator using shared validation
  if (!validateBilingualFormat(text)) {
    issues.push('Missing bilingual separator (- or |)');
    return issues;
  }

  const hasDash = text.includes(' - ');
  const separator = hasDash ? ' - ' : ' | ';
  const parts = text.split(separator);

  if (parts.length < 2) {
    issues.push('Header should have two parts: English - Vietnamese');
    return issues;
  }

  const [english, vietnamese] = parts;

  // Basic check for English (starts with capital, ASCII characters)
  const englishCheck = /^[A-Z][a-zA-Z\s]+$/.test(english.trim());
  if (!englishCheck && !/[A-Za-z]/.test(english)) {
    issues.push('First part may not be English');
  }

  // Basic check for Vietnamese (has Vietnamese characters or is valid text)
  const vietnameseChars = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
  if (!vietnameseChars.test(vietnamese) && vietnamese.length > 3) {
    issues.push('Second part may not contain Vietnamese text');
  }

  return issues;
}

function main() {
  const rawFuncNum = process.argv[2];

  if (!rawFuncNum) {
    console.log('Usage: node bilingual-check.js <function-number>');
    console.log('Example: node bilingual-check.js 1');
    process.exit(1);
  }

  // Validate input (security)
  const funcNum = validateFunctionNumber(rawFuncNum, 1, 50);
  if (!funcNum) {
    console.error('Invalid function number. Must be 1-50.');
    process.exit(1);
  }

  let wholePath;
  try {
    wholePath = findWholemd();
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }

  const content = fs.readFileSync(wholePath, 'utf8');
  const section = findFunctionSection(content, funcNum);

  if (!section) {
    console.error(`Function ${funcNum} not found`);
    process.exit(1);
  }

  const headers = extractHeaders(section.content);

  console.log(`\n${COLORS.cyan}Bilingual Check - CHỨC NĂNG ${funcNum}${COLORS.reset}`);
  console.log(`Found ${headers.length} concept headers\n`);

  let passCount = 0;
  let failCount = 0;

  for (const header of headers) {
    const issues = validateBilingualHeader(header);

    if (issues.length > 0) {
      failCount++;
      const displayText = header.text.length > 50 ? header.text.substring(0, 50) + '...' : header.text;
      console.log(`${COLORS.red}[FAIL]${COLORS.reset} ${header.number}. ${displayText}`);
      issues.forEach(issue => console.log(`  - ${issue}`));
    } else {
      passCount++;
      const displayText = header.text.length > 50 ? header.text.substring(0, 50) + '...' : header.text;
      console.log(`${COLORS.green}[PASS]${COLORS.reset} ${header.number}. ${displayText}`);
    }
  }

  // Summary
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Results: ${passCount} passed, ${failCount} failed`);

  // Statistics
  const dashCount = headers.filter(h => h.text.includes(' - ')).length;
  const pipeCount = headers.filter(h => h.text.includes(' | ')).length;

  console.log(`\nSeparator usage:`);
  console.log(`  - Dash (-): ${dashCount} headers`);
  console.log(`  - Pipe (|): ${pipeCount} headers`);

  if (dashCount > 0 && pipeCount > 0) {
    console.log(`${COLORS.yellow}[NOTE] Mixed separator usage detected - consider standardizing${COLORS.reset}`);
  }

  if (failCount > 0) {
    console.log(`\n${COLORS.red}Bilingual check FAILED${COLORS.reset}`);
    process.exit(1);
  } else {
    console.log(`\n${COLORS.green}Bilingual check PASSED${COLORS.reset}`);
    process.exit(0);
  }
}

main();
