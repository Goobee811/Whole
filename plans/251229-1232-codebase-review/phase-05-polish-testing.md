# Phase 5: Polish & Testing

**Status:** Complete
**Priority:** Low
**Estimated Effort:** 2-3 hours
**Prerequisites:** Phases 1-4 Complete

---

## Context

Low priority improvements that enhance maintainability and developer experience but aren't blocking.

---

## Overview

| Date | Priority | Status |
|------|----------|--------|
| 2025-12-29 | Low | Pending |

---

## Key Insights

- No unit tests exist for validation scripts
- Race condition in session marker (TOCTOU)
- Inconsistent error handling patterns
- Magic numbers without constants
- Vietnamese diacritic inconsistencies

---

## Requirements

1. Fix race condition in session marker
2. Standardize error handling with debug mode
3. Extract magic numbers to constants
4. Add basic unit tests for validation scripts
5. Standardize Vietnamese diacritics

---

## Implementation Steps

### Step 1: Fix Race Condition (15 min)

**File:** `.claude/hooks/session-init.cjs`

**Before (TOCTOU vulnerable):**
```javascript
if (source === 'resume' && fs.existsSync(sessionMarker)) {
  process.exit(0);
}
try {
  fs.writeFileSync(sessionMarker, Date.now().toString());
} catch (e) { /* ignore */ }
```

**After (atomic):**
```javascript
if (source === 'resume') {
  try {
    // Atomic check-and-set with exclusive flag
    fs.writeFileSync(sessionMarker, Date.now().toString(), { flag: 'wx' });
  } catch (e) {
    if (e.code === 'EEXIST') {
      process.exit(0); // Already initialized
    }
    // Other errors: ignore, proceed with initialization
  }
}
```

### Step 2: Standardize Error Handling (20 min)

**Add to ck-config-utils.cjs:**

```javascript
/**
 * Standardized error handler for hooks
 * Logs to stderr only when CLAUDE_HOOK_DEBUG is set
 */
function handleHookError(hookName, error) {
  if (process.env.CLAUDE_HOOK_DEBUG) {
    console.error(`[${hookName}] ${error.message}`);
    if (error.stack && process.env.CLAUDE_HOOK_DEBUG === 'verbose') {
      console.error(error.stack);
    }
  }
  // Always exit 0 to prevent blocking Claude
  process.exit(0);
}

module.exports = {
  // ... existing exports
  handleHookError
};
```

**Update hooks:**
```javascript
const { handleHookError } = require('./lib/ck-config-utils.cjs');

// Replace all:
catch (error) {
  // Silent fail
  process.exit(0);
}

// With:
catch (error) {
  handleHookError('session-init', error);
}
```

### Step 3: Extract Magic Numbers (15 min)

**Create:** `.claude/skills/shared/config/constants.js`

```javascript
module.exports = {
  // Structure requirements
  MINIMUM_BULLET_POINTS: 4,
  TOTAL_FUNCTIONS: 50,
  TOTAL_DOMAINS: 10,
  FUNCTIONS_PER_DOMAIN: 5,

  // Display limits
  MAX_DISPLAY_LENGTH: 30,
  MAX_PATH_DISPLAY: 50,

  // Validation thresholds
  MAX_ACCEPTABLE_ERROR_RATE: 0.5,
  IDEAL_GROUP_SIZE_MIN: 3,
  IDEAL_GROUP_SIZE_MAX: 8,

  // Session
  MAX_SESSION_ID_LENGTH: 64
};
```

### Step 4: Add Basic Unit Tests (60 min)

**Create:** `.claude/skills/whole-regrouper/scripts/__tests__/validate-regroup.test.js`

```javascript
const { escapeRegex, findFunctionSection, extractConcepts } = require('../../shared/utils/whole-md-parser.js');

describe('escapeRegex', () => {
  it('escapes special regex characters', () => {
    expect(escapeRegex('1.*')).toBe('1\\.\\*');
    expect(escapeRegex('test(1)')).toBe('test\\(1\\)');
  });

  it('handles plain numbers', () => {
    expect(escapeRegex('42')).toBe('42');
  });
});

describe('extractConcepts', () => {
  it('extracts numbered concepts from section', () => {
    const section = `
## CHỨC NĂNG 1: Test
#### **1. First Concept - Khái niệm đầu**
Content here
#### **2. Second Concept - Khái niệm hai**
More content
`;
    const concepts = extractConcepts(section);
    expect(concepts).toHaveLength(2);
    expect(concepts[0].number).toBe(1);
    expect(concepts[0].name).toBe('First Concept - Khái niệm đầu');
  });

  it('returns empty array for section without concepts', () => {
    const section = '## CHỨC NĂNG 1: Test\nNo concepts here';
    expect(extractConcepts(section)).toHaveLength(0);
  });
});

describe('findFunctionSection', () => {
  const content = `
## CHỨC NĂNG 1: First
Content for 1
## CHỨC NĂNG 2: Second
Content for 2
`;

  it('finds correct section', () => {
    const section = findFunctionSection(content, '1');
    expect(section).toContain('CHỨC NĂNG 1: First');
    expect(section).toContain('Content for 1');
    expect(section).not.toContain('CHỨC NĂNG 2');
  });

  it('returns null for non-existent section', () => {
    expect(findFunctionSection(content, '99')).toBeNull();
  });
});
```

**Add to package.json:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```

### Step 5: Standardize Vietnamese Diacritics (15 min)

Search and replace in workflow/doc files:
- "Tong Quan" → "Tổng Quan"
- "Lien ket" → "Liên kết"
- "Ten" → "Tên"
- "CHUC NANG" → "CHỨC NĂNG"

```bash
# Find occurrences
grep -r "Tong Quan\|CHUC NANG" .claude/ docs/
```

### Step 6: Run Full Test Suite (15 min)

```bash
# Install test dependencies
npm install --save-dev jest

# Run tests
npm test

# Test hooks manually
for hook in session-init progress-indicator validate-edit dev-rules-reminder; do
  echo "Testing $hook..."
  echo '{"source":"startup"}' | node .claude/hooks/${hook}.cjs
done

# Test validation scripts
node .claude/skills/whole-regrouper/scripts/validate-regroup.js 1
```

---

## Todo List

- [ ] Fix race condition with atomic file operation
- [ ] Add handleHookError to ck-config-utils.cjs
- [ ] Standardize error handling in all hooks
- [ ] Create constants.js with extracted magic numbers
- [ ] Create test file for validate-regroup
- [ ] Add jest to package.json
- [ ] Run tests and verify passing
- [ ] Standardize Vietnamese diacritics
- [ ] Commit all changes

---

## Success Criteria

- [ ] Race condition fixed with 'wx' flag
- [ ] All hooks use standardized error handler
- [ ] No magic numbers in scripts (all from constants.js)
- [ ] Tests pass: `npm test`
- [ ] No ASCII-only Vietnamese in docs

---

## Optional Enhancements

If time permits:

1. **Add --quiet flag** to validation scripts for CI/CD
2. **Session marker cleanup** on shutdown event
3. **Add JSDoc types** to all functions
4. **Create validation script shell wrapper** for easier invocation

---

## Next Steps

After completing all phases:
1. Run full validation suite
2. Commit all changes
3. Update .whole-progress.json if needed
4. Create summary report
