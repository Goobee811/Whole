# Phase 2: DRY Refactoring

**Status:** Pending
**Priority:** High
**Estimated Effort:** 2-3 hours
**Prerequisites:** Phase 1 Complete

---

## Context

Significant code duplication exists in two areas:
1. **Validation scripts** - Same regex patterns and utility functions duplicated 4x
2. **Hooks** - loadProgress/getGitBranch reimplemented in 3 files despite existing in shared library

---

## Overview

| Date | Priority | Status |
|------|----------|--------|
| 2025-12-29 | High | Pending |

---

## Key Insights

- 4 validation scripts share ~100 lines of common code
- ck-config-utils.cjs exists but not used by all hooks
- 6 unused functions in ck-config-utils.cjs (dead code)

---

## Requirements

1. Extract shared parser utilities for validation scripts
2. Refactor hooks to use shared library
3. Remove dead code from ck-config-utils.cjs

---

## Related Code Files

**Scripts to refactor:**
- `.claude/skills/whole-regrouper/scripts/validate-regroup.js`
- `.claude/skills/whole-editor/scripts/bilingual-check.js`
- `.claude/skills/whole-editor/scripts/validate-structure.js`
- `.claude/skills/whole-editor/scripts/check-cross-refs.js`

**Hooks to refactor:**
- `.claude/hooks/session-init.cjs`
- `.claude/hooks/dev-rules-reminder.cjs`
- `.claude/hooks/lib/ck-config-utils.cjs`

---

## Implementation Steps

### Step 1: Create Shared Parser Module (45 min)

**Create:** `.claude/skills/shared/utils/whole-md-parser.js`

```javascript
/**
 * Shared utilities for parsing Whole.md structure
 */

const fs = require('fs');
const path = require('path');

// Constants
const MINIMUM_BULLET_POINTS = 4;
const MAX_ACCEPTABLE_ERROR_RATE = 0.5;

/**
 * Escape special regex characters
 */
function escapeRegex(str) {
  return str.toString().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Find Whole.md by searching up directory tree
 */
function findWholemd() {
  let dir = process.cwd();
  while (dir !== path.parse(dir).root) {
    const candidate = path.join(dir, 'Whole.md');
    if (fs.existsSync(candidate)) return candidate;
    dir = path.dirname(dir);
  }
  throw new Error('Whole.md not found in current or parent directories');
}

/**
 * Find function section by number
 */
function findFunctionSection(content, funcNum) {
  const safeNum = escapeRegex(funcNum);
  const startRegex = new RegExp(`^## CHỨC NĂNG ${safeNum}:`, 'm');
  const endRegex = /^## CHỨC NĂNG \d+:/m;

  const startMatch = content.match(startRegex);
  if (!startMatch) return null;

  const startIndex = startMatch.index;
  const afterStart = content.slice(startIndex + startMatch[0].length);
  const endMatch = afterStart.match(endRegex);
  const endIndex = endMatch ? startIndex + startMatch[0].length + endMatch.index : content.length;

  return content.slice(startIndex, endIndex);
}

/**
 * Extract concepts from section
 */
function extractConcepts(section) {
  const conceptRegex = /^#### \*\*(\d+)\. (.+?)\*\*/gm;
  const concepts = [];
  let match;

  while ((match = conceptRegex.exec(section)) !== null) {
    concepts.push({
      number: parseInt(match[1], 10),
      name: match[2],
      position: match.index
    });
  }

  return concepts;
}

/**
 * Validate bilingual format
 */
function validateBilingualFormat(text) {
  // Check for " - " or " | " separator
  const hasSeparator = / - | \| /.test(text);
  return hasSeparator;
}

module.exports = {
  MINIMUM_BULLET_POINTS,
  MAX_ACCEPTABLE_ERROR_RATE,
  escapeRegex,
  findWholemd,
  findFunctionSection,
  extractConcepts,
  validateBilingualFormat
};
```

### Step 2: Refactor validate-regroup.js (30 min)

**Before:**
```javascript
function findFunctionSection(content, funcNum) { /* 25 lines */ }
function extractConcepts(section) { /* 15 lines */ }
```

**After:**
```javascript
const { findWholemd, findFunctionSection, extractConcepts, escapeRegex } =
  require('../../shared/utils/whole-md-parser.js');
```

### Step 3: Refactor Other Scripts (30 min)

Apply same pattern to:
- `bilingual-check.js`
- `validate-structure.js`
- `check-cross-refs.js`

### Step 4: Refactor Hooks (30 min)

**session-init.cjs - Remove duplicate functions:**

```javascript
// Before (lines 26-45)
function loadProgress() { /* 10 lines - DUPLICATED */ }
function getGitBranch() { /* 8 lines - DUPLICATED */ }

// After
const { loadProgress, getGitBranch } = require('./lib/ck-config-utils.cjs');
```

**dev-rules-reminder.cjs - Same pattern:**
```javascript
const { loadProgress, getGitBranch } = require('./lib/ck-config-utils.cjs');
```

### Step 5: Clean Up ck-config-utils.cjs (15 min)

Remove unused functions or add @private JSDoc:

```javascript
// Option 1: Remove dead code
module.exports = {
  loadProgress,
  getGitBranch
};

// Option 2: Mark as reserved
/**
 * @private - Reserved for future progress saving feature
 */
function saveProgress(progress) { /* ... */ }
```

### Step 6: Test All Scripts (20 min)

```bash
# Test validation scripts
node .claude/skills/whole-regrouper/scripts/validate-regroup.js 1

# Test hooks
echo '{"source":"startup"}' | node .claude/hooks/session-init.cjs
echo '{}' | node .claude/hooks/dev-rules-reminder.cjs
```

---

## Todo List

- [ ] Create `.claude/skills/shared/utils/whole-md-parser.js`
- [ ] Refactor `validate-regroup.js` to use shared module
- [ ] Refactor `bilingual-check.js` to use shared module
- [ ] Refactor `validate-structure.js` to use shared module
- [ ] Refactor `check-cross-refs.js` to use shared module
- [ ] Refactor `session-init.cjs` to import from lib
- [ ] Refactor `dev-rules-reminder.cjs` to import from lib
- [ ] Clean up `ck-config-utils.cjs` dead code
- [ ] Test all scripts
- [ ] Commit changes

---

## Success Criteria

- [ ] No duplicated utility functions across scripts
- [ ] All hooks import from `ck-config-utils.cjs`
- [ ] `grep -n "function loadProgress" .claude/hooks/*.cjs` returns only lib file
- [ ] All validation scripts still pass
- [ ] All hooks still execute without error

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Break validation | Medium | High | Test each script after refactor |
| Path resolution issues | Medium | Medium | Use relative paths consistently |
| Hook fails silently | Low | Low | Hooks already exit(0) on error |

---

## Next Steps

After completing Phase 2:
- Proceed to [Phase 3: Security Hardening](./phase-03-security-hardening.md)
