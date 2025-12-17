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
const path = require('path');

const COLORS = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

function findFunctionSection(content, funcNum) {
  const pattern = new RegExp(`## CHUC NANG ${funcNum}:`, 'i');
  const match = content.match(pattern);

  if (!match) return null;

  const startIdx = match.index;
  const nextFuncPattern = /## CHUC NANG \d+:/gi;
  nextFuncPattern.lastIndex = startIdx + 1;
  const nextMatch = nextFuncPattern.exec(content);
  const endIdx = nextMatch ? nextMatch.index : content.length;

  return content.substring(startIdx, endIdx);
}

function extractHeaders(section) {
  const headers = [];

  // Match concept headers: #### **1. Name - Ten**
  const headerPattern = /####\s*\*\*(\d+)\.\s*([^*]+)\*\*/g;

  let match;
  while ((match = headerPattern.exec(section)) !== null) {
    headers.push({
      number: parseInt(match[1]),
      text: match[2].trim(),
      position: match.index
    });
  }

  return headers;
}

function validateBilingualHeader(header) {
  const issues = [];
  const text = header.text;

  // Check for separator
  const hasDash = text.includes(' - ');
  const hasPipe = text.includes(' | ');

  if (!hasDash && !hasPipe) {
    issues.push('Missing bilingual separator (- or |)');
    return issues;
  }

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
  const funcNum = process.argv[2];

  if (!funcNum) {
    console.log('Usage: node bilingual-check.js <function-number>');
    console.log('Example: node bilingual-check.js 1');
    process.exit(1);
  }

  const wholePath = path.join(process.cwd(), 'Whole.md');
  if (!fs.existsSync(wholePath)) {
    console.error('Whole.md not found in current directory');
    process.exit(1);
  }

  const content = fs.readFileSync(wholePath, 'utf8');
  const section = findFunctionSection(content, funcNum);

  if (!section) {
    console.error(`Function ${funcNum} not found`);
    process.exit(1);
  }

  const headers = extractHeaders(section);

  console.log(`\n${COLORS.cyan}Bilingual Check - CHUC NANG ${funcNum}${COLORS.reset}`);
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
