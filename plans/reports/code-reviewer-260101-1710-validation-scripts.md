# Code Review: Validation Scripts

**Reviewer:** code-reviewer (a6f9d20)
**Date:** 2026-01-01
**Scope:** Validation scripts in `.claude/skills/` directory

---

## Code Review Summary

### Scope
- **Files reviewed:** 4 validation scripts + 1 shared utilities module
  - `.claude/skills/whole-regrouper/scripts/validate-regroup.js` (368 lines)
  - `.claude/skills/whole-editor/scripts/bilingual-check.js` (146 lines)
  - `.claude/skills/whole-editor/scripts/validate-structure.js` (147 lines)
  - `.claude/skills/whole-editor/scripts/check-cross-refs.js` (153 lines)
  - `.claude/skills/shared/utils/whole-md-parser.js` (208 lines)
- **Lines analyzed:** ~1,022 total
- **Review focus:** Code quality, consistency, error handling, DRY violations, security
- **Architecture:** Shared utilities pattern with centralized imports

### Overall Assessment
**Code Quality: HIGH (85/100)**

Well-structured validation scripts with excellent DRY adherence through shared utilities. Strong security practices, consistent error handling, and good separation of concerns. Main issues: regex complexity, duplicated validation logic, and missing tests.

---

## Critical Issues

**NONE FOUND** - No security vulnerabilities, data loss risks, or breaking changes detected.

---

## High Priority Findings

### 1. **ReDoS Risk in Cross-Reference Regex**
**File:** `check-cross-refs.js:31-38`

```javascript
const refSectionPattern = /(?:→|->)\s*\*\*(?:Liên kết|Lien ket|Cross-ref)[:\*]*\*\*([^#]+?)(?=####|\n\n\n|$)/gi;
```

**Issue:** Pattern `([^#]+?)` with lookahead `(?=####|\n\n\n|$)` can cause catastrophic backtracking on malformed input with many non-# chars.

**Impact:** Script hang/timeout on malicious Whole.md content.

**Fix:**
```javascript
// Add max length limit + atomic grouping
const refSectionPattern = /(?:→|->)\s*\*\*(?:Liên kết|Lien ket|Cross-ref)[:\*]*\*\*([^#]{1,500}?)(?=####|\n\n\n|$)/gi;
```

---

### 2. **Inconsistent Function Number Validation**
**Files:**
- `bilingual-check.js:75` - calls `validateFunctionNumber(rawFuncNum)` (no range)
- `validate-structure.js:90` - calls `validateFunctionNumber(rawFuncNum)` (no range)
- `check-cross-refs.js:91` - calls `validateFunctionNumber(rawFuncNum)` (no range)
- `validate-regroup.js:353` - calls `validateFunctionNumber(args[0], 1, 50)` (with range)

**Issue:** Three scripts don't pass min/max parameters, relying on defaults in `security.js:53`. However, if defaults change, these break silently.

**Impact:** Medium - Could accept invalid ranges if `security.js` is modified.

**Fix:** Explicitly pass range in all calls:
```javascript
const funcNum = validateFunctionNumber(rawFuncNum, 1, 50);
```

---

### 3. **Missing Error Context in `findFunctionSection`**
**File:** `whole-md-parser.js:55-106`

**Issue:** Returns `null` when function not found, but caller error messages vary:
- `bilingual-check.js:93` → "Function ${funcNum} not found"
- `validate-structure.js:108` → "Function ${funcNum} not found"
- `check-cross-refs.js:109` → "Function ${funcNum} not found"

**Impact:** Difficult debugging - no info on why function wasn't found (wrong number? malformed Whole.md?).

**Fix:** Return error object instead of null:
```javascript
function findFunctionSection(content, funcNum) {
  // ... existing code ...

  if (!startMatch) {
    return {
      error: true,
      message: `CHỨC NĂNG ${funcNum} not found - check Whole.md structure`,
      searched: patterns.map(p => p.toString())
    };
  }

  // ... rest of code ...
}
```

---

## Medium Priority Improvements

### 4. **DRY Violation: Duplicated Main Function Pattern**
**Files:** All 4 validation scripts have near-identical `main()` structure:

```javascript
// Pattern repeated in all 4 files:
function main() {
  const rawFuncNum = process.argv[2];
  if (!rawFuncNum) {
    console.log('Usage: node <script>.js <function-number>');
    process.exit(1);
  }

  const funcNum = validateFunctionNumber(rawFuncNum);
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

  // ... validation logic ...
}
```

**Impact:** ~50 lines duplicated across 4 files. Changes to error handling need 4 updates.

**Fix:** Extract to shared utility:
```javascript
// In shared/utils/cli-helpers.js
function initializeValidationScript(scriptName) {
  const rawFuncNum = process.argv[2];

  if (!rawFuncNum) {
    console.log(`Usage: node ${scriptName} <function-number>`);
    console.log(`Example: node ${scriptName} 1`);
    process.exit(1);
  }

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

  return { funcNum, wholePath, content, section };
}

// Usage in each script:
const { funcNum, section } = initializeValidationScript('bilingual-check.js');
```

---

### 5. **Magic Numbers in `validateBilingualGroups`**
**File:** `validate-regroup.js:146-207`

```javascript
for (let i = 1; i < tongQuanIndex; i++) {  // What is 1?
  if (/^### \*\*/.test(lines[i]) && !/CHỨC NĂNG/.test(lines[i])) {
    // ...
  }
}
```

**Issue:** Hardcoded `i = 1` without explanation. Why skip first line?

**Fix:**
```javascript
const HEADER_OFFSET = 1; // Skip function header line
for (let i = HEADER_OFFSET; i < tongQuanIndex; i++) {
```

---

### 6. **Inconsistent Validation Result Format**
**Files:** All 4 scripts return different result structures:

- `validate-regroup.js:258-269` → `{ tongQuan: {...}, numbering: {...}, bilingual: {...}, format: {...} }`
- `bilingual-check.js:102-118` → Uses `passCount/failCount` directly
- `validate-structure.js:113-132` → Uses `hasErrors` flag
- `check-cross-refs.js:117-138` → Uses `validCount/issueCount`

**Impact:** Cannot compose validators or build unified reporting.

**Fix:** Standardize on common result format:
```javascript
// Shared result structure
{
  valid: boolean,
  errors: string[],
  warnings: string[],
  stats: {
    total: number,
    passed: number,
    failed: number
  }
}
```

---

### 7. **Potential Performance Issue: Multiple Regex Executions**
**File:** `whole-md-parser.js:59-67`

```javascript
const patterns = [
  new RegExp(`^## CHỨC NĂNG ${safeNum}:`, 'm'),
  new RegExp(`## CHUC NANG ${safeNum}:`, 'i')
];

let startMatch = null;
for (const pattern of patterns) {
  startMatch = content.match(pattern);
  if (startMatch) break;
}
```

**Issue:** Creates 2 regex objects on every call. For 50 functions, creates 100 regex objects.

**Fix:** Use single alternation pattern:
```javascript
const pattern = new RegExp(`^## CH[UỨ]C NĂNG ${safeNum}:`, 'mi');
const startMatch = content.match(pattern);
```

---

### 8. **Hardcoded Vietnamese Characters List**
**File:** `bilingual-check.js:57-58`

```javascript
const vietnameseChars = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
```

**Issue:** Duplicated knowledge. If Vietnamese char set needs update, must change in multiple places.

**Fix:** Move to `constants.js`:
```javascript
// In constants.js
VIETNAMESE_CHARS_PATTERN: /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i,
```

---

## Low Priority Suggestions

### 9. **Inconsistent String Truncation**
**Files:**
- `bilingual-check.js:110` → `.substring(0, 50) + '...'`
- `validate-structure.js:126` → `.substring(0, 40) + '...'`

**Fix:** Use shared `truncate()` from `display.js` instead:
```javascript
console.log(`${COLORS.green}[PASS]${COLORS.reset} ${truncate(header.text, 50)}`);
```

---

### 10. **Missing JSDoc for Public Functions**
**File:** `validate-regroup.js:65-95, 98-141, 144-207`

Functions like `validateTongQuan`, `validateNumbering`, `validateBilingualGroups` lack JSDoc comments. Only internal implementation comments present.

**Fix:**
```javascript
/**
 * Validate "Tổng Quan" section presence and position
 * @param {string[]} lines - Section lines
 * @returns {{valid: boolean, errors: string[], tongQuanIndex: number}}
 */
function validateTongQuan(lines) {
  // ...
}
```

---

### 11. **Inconsistent Separator Detection Logic**
**File:** `bilingual-check.js:39-40` vs `whole-md-parser.js:165`

Two different approaches to detect bilingual separator:

```javascript
// bilingual-check.js
const hasDash = text.includes(' - ');
const separator = hasDash ? ' - ' : ' | ';

// whole-md-parser.js
return / - | \| /.test(text);
```

**Fix:** Use shared `validateBilingualFormat()` consistently, then extract separator:
```javascript
function extractBilingualSeparator(text) {
  if (!validateBilingualFormat(text)) return null;
  return text.includes(' - ') ? ' - ' : ' | ';
}
```

---

## Positive Observations

**Excellent practices found:**

1. ✅ **Strong DRY adherence** - Shared utilities pattern prevents massive duplication
2. ✅ **Security-first approach** - Input validation via `validateFunctionNumber()`, regex escaping
3. ✅ **Consistent imports** - All scripts import from `../../shared` correctly
4. ✅ **No hardcoded paths** - Uses `findWholemd()` to locate files dynamically
5. ✅ **Color-coded output** - Professional CLI UX with ANSI colors
6. ✅ **Proper exit codes** - Scripts return 0 (success) or 1 (failure) correctly
7. ✅ **Shebang headers** - All scripts executable with `#!/usr/bin/env node`
8. ✅ **Module exports** - Scripts can be imported as libraries (e.g., `validate-regroup.js:367`)
9. ✅ **Recovery guidance** - `showErrorWithRecovery()` helps users fix issues
10. ✅ **No console.log pollution** - Structured output only, no debug spew

---

## Recommended Actions

### Immediate (Before Next Release)

1. **Fix ReDoS risk** in `check-cross-refs.js:31` - Add length limit to regex
2. **Standardize function number validation** - Pass `(input, 1, 50)` in all 3 scripts
3. **Add unit tests** - Create `.test.js` files for each validator

### Short-term (Next Sprint)

4. **Extract shared CLI initialization** - Create `initializeValidationScript()` helper
5. **Standardize result format** - Unified `{ valid, errors, warnings, stats }` structure
6. **Improve error context** - Make `findFunctionSection()` return error details
7. **Move Vietnamese chars to constants** - Single source of truth

### Long-term (Future Refactor)

8. **Add JSDoc comments** - Document all public functions
9. **Optimize regex creation** - Use alternation instead of pattern arrays
10. **Create validator composition API** - Allow chaining validators
11. **Add performance benchmarks** - Track validation speed on large files

---

## Metrics

- **Type Coverage:** N/A (JavaScript, not TypeScript)
- **Test Coverage:** 0% (no tests found)
- **Linting Issues:** 0 (manual review)
- **Security Issues:** 1 medium (ReDoS risk)
- **DRY Violations:** 2 medium (main function, separator logic)
- **Total Issues:** 11 (1 high, 6 medium, 4 low)

---

## Files Requiring Changes

| File | Priority | Changes |
|------|----------|---------|
| `check-cross-refs.js` | HIGH | Fix ReDoS regex (line 31) |
| `bilingual-check.js` | HIGH | Add range params (line 75) |
| `validate-structure.js` | HIGH | Add range params (line 90) |
| `shared/utils/cli-helpers.js` | MEDIUM | Create new file with shared init |
| `shared/config/constants.js` | MEDIUM | Add VIETNAMESE_CHARS_PATTERN |
| All 4 validators | MEDIUM | Standardize result format |
| `whole-md-parser.js` | MEDIUM | Optimize regex creation |

---

## Unresolved Questions

1. Should validation scripts support JSON output mode for CI/CD integration?
2. Is there a plan to add TypeScript types for better editor support?
3. Should cross-reference validation check bidirectional links (A→B implies B→A)?
4. What is the expected behavior when Whole.md has merge conflicts?
5. Should validators support incremental mode (only validate changed sections)?
