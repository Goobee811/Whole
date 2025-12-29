# Code Review: Whole Project Skills & Commands

**Reviewer:** code-reviewer
**Date:** 2025-12-29
**Scope:** Skills (whole-editor, whole-analyzer, whole-reviewer, whole-regrouper), Commands (9 total), Validation Scripts (4 total)

---

## Executive Summary

**Overall Quality:** Good
**Lines Reviewed:** ~2,500+ (4 skills, 9 commands, 4 scripts)
**Critical Issues:** 1
**High Priority:** 4
**Medium Priority:** 6
**Low Priority:** 3

Project demonstrates solid architecture with good separation of concerns, progressive disclosure patterns, and comprehensive validation. Main concerns: version inconsistencies, error handling patterns, and documentation drift.

---

## Critical Issues

### 1. Version Inconsistency Across Documentation

**Severity:** Critical
**Files:** `.claude/CLAUDE.md`, `.claude/README.md`, `.claude/commands/regroup.md`, `.claude/skills/whole-regrouper/SKILL.md`

**Issue:**
- `CLAUDE.md` references `whole-regrouper v4.0.0`
- `README.md` references `whole-regrouper v3.0.0`
- `regroup.md` requires `v3.0.0+`
- Actual `SKILL.md` declares `version: 5.0.0`

**Impact:** Confusion about compatibility, potentially incorrect skill activation, user uncertainty about features available.

**Fix:**
```markdown
# In CLAUDE.md (line 15, 23)
- `whole-regrouper`: ... (v5.0.0 - Intelligent Analysis)

# In README.md (line 25, 83)
│   └── whole-regrouper/          # Concept reorganization (v5.0.0)

# In regroup.md (line 263)
**Requires:** `whole-regrouper` skill v5.0.0+
```

**Recommendation:** Implement version check script or single source of truth for version numbers.

---

## High Priority Findings

### 1. Incomplete Error Recovery in Scripts

**Severity:** High
**Files:** All 4 validation scripts

**Issue:** Scripts use `process.exit(1)` on errors but don't provide recovery guidance or actionable next steps beyond displaying errors.

**Example:** `validate-regroup.js:343`
```javascript
// Current:
log(colors.red, '❌', `Validation error: ${err.message}`);
return 1;

// Better:
log(colors.red, '❌', `Validation error: ${err.message}`);
console.error('\nRecovery options:');
console.error('  1. Check CHỨC NĂNG number is between 1-50');
console.error('  2. Verify Whole.md exists in current directory');
console.error('  3. Run: grep "## CHỨC NĂNG" Whole.md');
return 1;
```

**Impact:** Users stuck when validation fails, reduced DX.

---

### 2. Regex Pattern Duplication Across Scripts

**Severity:** High (DRY violation)
**Files:** All scripts in `whole-editor/scripts/` and `whole-regrouper/scripts/`

**Issue:** Same regex patterns duplicated:
- `findFunctionSection()` - duplicated 4 times
- Concept extraction patterns - duplicated 3 times
- Bilingual header patterns - duplicated 2 times

**Lines:**
- `validate-regroup.js:42-67`
- `bilingual-check.js:25-38`
- `validate-structure.js:33-46`
- `check-cross-refs.js:25-38`

**Fix:** Create shared utility module:
```javascript
// .claude/skills/shared/utils/whole-md-parser.js
module.exports = {
  findFunctionSection(content, funcNum) { /* ... */ },
  extractConcepts(section) { /* ... */ },
  validateBilingualFormat(text) { /* ... */ }
};
```

**Impact:** Maintenance burden, risk of inconsistent behavior, harder to fix bugs.

---

### 3. No Input Sanitization in Script Args

**Severity:** High (Security)
**Files:** All 4 validation scripts

**Issue:** User input directly used in regex without sanitization:

```javascript
// validate-regroup.js:49
const functionRegex = new RegExp(`^## CHỨC NĂNG ${functionNumber}:`);
```

If `functionNumber` contains regex metacharacters, could cause ReDoS or unexpected behavior.

**Fix:**
```javascript
function escapeRegex(str) {
  return str.toString().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const functionRegex = new RegExp(`^## CHỨC NĂNG ${escapeRegex(functionNumber)}:`);
```

**Impact:** Potential ReDoS, unexpected failures with malformed input.

---

### 4. Hardcoded File Paths

**Severity:** High
**Files:** All scripts

**Issue:** `Whole.md` path hardcoded to `process.cwd()`, fails if run from subdirectory:

```javascript
// Current (all scripts):
const WHOLE_MD_PATH = path.join(process.cwd(), 'Whole.md');

// Better:
function findWholemd() {
  let dir = process.cwd();
  while (dir !== path.parse(dir).root) {
    const candidate = path.join(dir, 'Whole.md');
    if (fs.existsSync(candidate)) return candidate;
    dir = path.dirname(dir);
  }
  throw new Error('Whole.md not found in current or parent directories');
}
```

**Impact:** Scripts fail when run from `.claude/skills/` subdirectories.

---

## Medium Priority Improvements

### 1. Inconsistent Separator Handling

**Severity:** Medium
**Files:** `bilingual-check.js`, `validate-structure.js`

**Issue:** Code accepts both `-` and `|` separators but doesn't enforce consistency:

```javascript
// bilingual-check.js:63-64
const hasDash = text.includes(' - ');
const hasPipe = text.includes(' | ');
```

**Current:** Warns about mixed usage but doesn't block.
**Recommendation:** Add `--strict` flag to enforce single separator project-wide.

---

### 2. Magic Numbers Without Constants

**Severity:** Medium
**Files:** `validate-regroup.js`, `check-cross-refs.js`

**Examples:**
- Line 144: `if (issueCount > refs.length / 2)` - why 50%?
- validate-structure.js:96: `if (bulletPoints < 4)` - should be `MINIMUM_BULLET_POINTS`

**Fix:**
```javascript
const MINIMUM_BULLET_POINTS = 4; // 4-point structure requirement
const MAX_ACCEPTABLE_ERROR_RATE = 0.5; // 50% threshold
```

---

### 3. Missing TypeScript Types

**Severity:** Medium
**Impact:** No type safety, harder to catch bugs in validation logic

**Recommendation:** Migrate scripts to TypeScript or add JSDoc types:
```javascript
/**
 * @typedef {Object} ConceptData
 * @property {number} number - Concept number
 * @property {string} name - Bilingual concept name
 * @property {number} position - Line position
 * @property {string} content - Full concept content
 */

/**
 * @param {string} section - Function section content
 * @returns {ConceptData[]} Extracted concepts
 */
function extractConcepts(section) { /* ... */ }
```

---

### 4. Command Description Inconsistencies

**Severity:** Medium
**Files:** Commands in `.claude/commands/`

**Issue:**
- `analyze.md` - minimal (17 lines)
- `edit.md` - minimal (28 lines)
- `reconcile.md` - comprehensive (301 lines)
- `regroup.md` - comprehensive (265 lines)

**Impact:** Inconsistent activation guidance, some commands under-documented.

**Fix:** Expand `analyze.md` and `edit.md` to match detail level of `reconcile.md`.

---

### 5. No Progress Validation in Commands

**Severity:** Medium
**Files:** `regroup.md`, `reconcile.md`

**Issue:** Commands reference `.whole-progress.json` but don't validate JSON structure or handle corruption.

**Example scenario:**
1. User manually edits `.whole-progress.json`
2. Introduces syntax error
3. Command crashes without helpful message

**Fix:** Add schema validation:
```javascript
const schema = {
  version: 'string',
  totalFunctions: 'number',
  completedFunctions: 'array',
  // ...
};

function validateProgress(data) {
  // Validate against schema
  // Provide detailed error messages
}
```

---

### 6. Skill References Not Validated

**Severity:** Medium
**Files:** All SKILL.md files

**Issue:** Skills reference `references/*.md` files in progressive disclosure pattern, but no validation that files exist:

```markdown
### Editing Protocol
Load: `references/editing-protocol.md`
```

If file missing or renamed, skill activation fails silently.

**Fix:** Add pre-flight check or list available references dynamically.

---

## Low Priority Suggestions

### 1. Console Output Token Efficiency

**Severity:** Low
**Files:** All scripts

**Issue:** Verbose ASCII art in output:
```javascript
// validate-regroup.js:277-279
console.log(`${colors.bold}╔═══════════════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.bold}║  VALIDATION RESULTS                           ║${colors.reset}`);
console.log(`${colors.bold}╚═══════════════════════════════════════════════╝${colors.reset}`);
```

**Recommendation:** Add `--quiet` flag for CI/CD environments.

---

### 2. CHUC vs CHỨC Encoding Inconsistency

**Severity:** Low
**Files:** Script comments and regex patterns

**Example:**
- `validate-structure.js:34` uses `CHUC NANG` (no diacritic)
- Actual Whole.md uses `CHỨC NĂNG` (with diacritics)

**Impact:** Regex patterns work but comments misleading.

**Fix:** Standardize on `CHỨC NĂNG` in comments, keep regex flexible.

---

### 3. Missing Script Tests

**Severity:** Low
**Files:** All validation scripts

**Issue:** No unit tests for validation logic, manual testing only.

**Recommendation:** Add Jest/Mocha tests:
```javascript
// __tests__/validate-regroup.test.js
describe('validateTongQuan', () => {
  it('should detect missing Tổng Quan section', () => {
    const lines = ['## CHỨC NĂNG 1:', '### **Group 1**'];
    const result = validateTongQuan(lines);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Tổng Quan section not found');
  });
});
```

---

## Positive Observations

**Well-designed patterns:**
1. **Progressive Disclosure:** `whole-regrouper` loads references on-demand - excellent token efficiency
2. **Separation of Concerns:** Clear skill boundaries (analyze → edit → review)
3. **Comprehensive Validation:** Multiple validation dimensions (structure, bilingual, cross-refs, numbering)
4. **Colored Output:** User-friendly terminal output with ANSI colors
5. **Detailed Error Messages:** Most errors include context and location
6. **Version Control Integration:** Git workflow integrated into reconcile/regroup
7. **Progress Tracking:** `.whole-progress.json` provides excellent session continuity

**Code quality highlights:**
- Clean function decomposition in scripts
- Consistent naming conventions
- Good use of regex for pattern matching
- Proper exit codes for CI/CD integration

---

## Recommended Actions

**Priority 1 (Critical - Fix Immediately):**
1. **Version sync:** Update all docs to `whole-regrouper v5.0.0` ✅
2. **Create version source of truth:** Single `versions.json` file

**Priority 2 (High - Fix This Sprint):**
1. **DRY refactor:** Extract shared parser utilities
2. **Input sanitization:** Add regex escaping to all scripts
3. **Smart path resolution:** Implement `findWholemd()` search
4. **Recovery guidance:** Add actionable error recovery steps

**Priority 3 (Medium - Next Sprint):**
1. **Separator enforcement:** Add `--strict` mode to bilingual-check
2. **Extract constants:** Replace magic numbers
3. **Add JSDoc types:** Type all validation functions
4. **Expand commands:** Bring analyze/edit to reconcile detail level
5. **Progress validation:** Add JSON schema validation
6. **Reference validation:** Check references/*.md existence

**Priority 4 (Low - Backlog):**
1. **Quiet mode:** Add `--quiet` flag for CI/CD
2. **Encoding standardization:** Fix CHUC → CHỨC in comments
3. **Add tests:** Unit tests for validation logic

---

## Metrics

**Type Coverage:** N/A (JavaScript, recommend JSDoc)
**Test Coverage:** 0% (no tests exist)
**Linting Issues:** 0 (no linter configured)
**Scripts:** 4 files, ~600 LOC total
**Skills:** 4 files, ~300 LOC markdown
**Commands:** 9 files, ~900 LOC markdown
**Documentation Quality:** High (detailed, structured)

---

## Task Completeness Verification

**Reviewed files:**
- ✅ 4 SKILL.md files (whole-editor, whole-analyzer, whole-reviewer, whole-regrouper)
- ✅ 9 command files (analyze, edit, expand, next, report, status, validate, regroup, reconcile)
- ✅ 4 validation scripts (validate-regroup.js, bilingual-check.js, validate-structure.js, check-cross-refs.js)
- ✅ Version tracking (.whole-progress.json)
- ✅ Recent commits and changes

**No plan file provided** - no task tracking to verify.

---

## Unresolved Questions

1. **Version strategy:** Should we implement semantic versioning for skills or lock to project version?
2. **Test framework:** Prefer Jest, Mocha, or Node built-in test runner?
3. **TypeScript migration:** Worth the effort for ~600 LOC of scripts?
4. **Progressive disclosure scope:** Should we extend to other skills beyond whole-regrouper?
5. **CI/CD integration:** Are validation scripts intended for pre-commit hooks or CI pipelines?

---

**Review Complete** | Next: Address Critical + High priority issues
