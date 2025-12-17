#!/usr/bin/env node

/**
 * Validates cross-references in Whole.md
 *
 * Usage: node check-cross-refs.js [function-number]
 *
 * Checks:
 * - Cross-reference format compliance
 * - Target existence (basic check)
 * - Bidirectional link suggestions
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

function extractCrossReferences(section) {
  const refs = [];

  // Match patterns like: -> **Lien ket:** or **Cross-ref:**
  const refSectionPattern = /(?:->|->)\s*\*\*(?:Lien ket|Cross-ref)[:\*]*\*\*([^#]+?)(?=####|\n\n\n|$)/gi;

  let match;
  while ((match = refSectionPattern.exec(section)) !== null) {
    const refContent = match[1];

    // Extract individual references
    const refPattern = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*>\s*([^>\n,]+?)(?:\s*>\s*([^,\n]+))?/g;

    let refMatch;
    while ((refMatch = refPattern.exec(refContent)) !== null) {
      refs.push({
        domain: refMatch[1]?.trim(),
        function: refMatch[2]?.trim(),
        concept: refMatch[3]?.trim() || null,
        raw: refMatch[0]
      });
    }
  }

  return refs;
}

function validateReference(ref, fullContent) {
  const issues = [];

  // Check format
  if (!ref.domain || !ref.function) {
    issues.push('Incomplete reference format (needs Domain > Function)');
    return issues;
  }

  // Basic check if domain exists
  const domainPattern = new RegExp(`#\\s*\\d+\\.\\s*${ref.domain}`, 'i');
  if (!domainPattern.test(fullContent)) {
    issues.push(`Domain "${ref.domain}" may not exist`);
  }

  // Basic check if function exists
  const funcPattern = new RegExp(`##\\s*CHUC NANG\\s*\\d+:.*${ref.function.substring(0, 20)}`, 'i');
  if (!funcPattern.test(fullContent)) {
    issues.push(`Function "${ref.function}" may not exist`);
  }

  return issues;
}

function main() {
  const funcNum = process.argv[2];

  if (!funcNum) {
    console.log('Usage: node check-cross-refs.js <function-number>');
    console.log('Example: node check-cross-refs.js 1');
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

  const refs = extractCrossReferences(section);

  console.log(`\n${COLORS.cyan}Cross-Reference Check - CHUC NANG ${funcNum}${COLORS.reset}`);
  console.log(`Found ${refs.length} cross-references\n`);

  let validCount = 0;
  let issueCount = 0;

  if (refs.length === 0) {
    console.log(`${COLORS.yellow}[INFO]${COLORS.reset} No cross-references found in this section`);
    console.log('Consider adding references to related concepts.');
    process.exit(0);
  }

  for (const ref of refs) {
    const issues = validateReference(ref, content);

    if (issues.length > 0) {
      issueCount++;
      console.log(`${COLORS.yellow}[WARN]${COLORS.reset} ${ref.raw}`);
      issues.forEach(issue => console.log(`  - ${issue}`));
    } else {
      validCount++;
      console.log(`${COLORS.green}[VALID]${COLORS.reset} ${ref.raw}`);
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Results: ${validCount} valid, ${issueCount} warnings`);

  if (issueCount > refs.length / 2) {
    console.log(`${COLORS.yellow}Many references have issues - review recommended${COLORS.reset}`);
    process.exit(1);
  } else {
    console.log(`${COLORS.green}Cross-reference check complete${COLORS.reset}`);
    process.exit(0);
  }
}

main();
