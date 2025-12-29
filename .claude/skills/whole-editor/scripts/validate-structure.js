#!/usr/bin/env node

/**
 * Validates 4-point structure compliance for concepts in Whole.md
 *
 * Usage: node validate-structure.js [function-number]
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_POINTS = [
  'Definition',     // or Vietnamese equivalent
  'Context',        // Ngu canh
  'Application',    // Ung dung
  'Integration'     // Tich hop
];

const VIETNAMESE_POINTS = [
  'dinh nghia',
  'ngu canh',
  'ung dung',
  'tich hop'
];

const COLORS = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
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

function extractConcepts(section) {
  const concepts = [];
  const conceptPattern = /####\s*\*\*(\d+)\.\s*([^*]+)\*\*/g;

  let match;
  while ((match = conceptPattern.exec(section)) !== null) {
    concepts.push({
      number: parseInt(match[1]),
      name: match[2].trim(),
      position: match.index,
      content: extractConceptContent(section, match.index)
    });
  }

  return concepts;
}

function extractConceptContent(section, startPos) {
  const nextConceptPattern = /####\s*\*\*\d+\./g;
  nextConceptPattern.lastIndex = startPos + 1;
  const nextMatch = nextConceptPattern.exec(section);
  const endPos = nextMatch ? nextMatch.index : section.length;

  return section.substring(startPos, endPos);
}

function validateConcept(concept) {
  const issues = [];
  const contentLower = concept.content.toLowerCase();

  // Check for required structure points
  let pointsFound = 0;

  for (const point of REQUIRED_POINTS) {
    if (contentLower.includes(point.toLowerCase())) {
      pointsFound++;
    }
  }

  // Also check Vietnamese equivalents
  for (const point of VIETNAMESE_POINTS) {
    if (contentLower.includes(point)) {
      pointsFound++;
    }
  }

  // Check minimum bullet points (4-point structure)
  const bulletPoints = (concept.content.match(/^-\s+\*\*/gm) || []).length;
  if (bulletPoints < 4) {
    issues.push(`Only ${bulletPoints} bullet points (minimum 4 required)`);
  }

  // Check bilingual format in name
  if (!concept.name.includes('|') && !concept.name.includes('-')) {
    issues.push('Missing bilingual format (use - or | separator)');
  }

  // Check for cross-reference section
  if (!concept.content.includes('Lien ket') && !concept.content.includes('Cross-ref')) {
    issues.push('Missing cross-reference section');
  }

  return issues;
}

function main() {
  const funcNum = process.argv[2];

  if (!funcNum) {
    console.log('Usage: node validate-structure.js <function-number>');
    console.log('Example: node validate-structure.js 1');
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

  const concepts = extractConcepts(section);
  let hasErrors = false;
  let passCount = 0;
  let failCount = 0;

  console.log(`\n${COLORS.yellow}Validating CHỨC NĂNG ${funcNum}${COLORS.reset}`);
  console.log(`Found ${concepts.length} concepts\n`);

  for (const concept of concepts) {
    const issues = validateConcept(concept);

    if (issues.length > 0) {
      hasErrors = true;
      failCount++;
      console.log(`${COLORS.red}[FAIL]${COLORS.reset} Concept ${concept.number}: ${concept.name.substring(0, 40)}...`);
      issues.forEach(issue => console.log(`  - ${issue}`));
    } else {
      passCount++;
      console.log(`${COLORS.green}[PASS]${COLORS.reset} Concept ${concept.number}: ${concept.name.substring(0, 40)}...`);
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Results: ${passCount} passed, ${failCount} failed`);

  if (hasErrors) {
    console.log(`${COLORS.red}Validation FAILED${COLORS.reset}`);
    process.exit(1);
  } else {
    console.log(`${COLORS.green}Validation PASSED${COLORS.reset}`);
    process.exit(0);
  }
}

main();
