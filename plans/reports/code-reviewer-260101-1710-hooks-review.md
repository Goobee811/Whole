# Code Review Report: Hooks System
**Date:** 2026-01-01
**Reviewer:** code-reviewer (aa01678)
**Scope:** `.claude/hooks/` - All hook scripts and utilities

---

## Code Review Summary

### Scope
- **Files reviewed:** 5 hook scripts + 3 shared utility modules
  - `lib/ck-config-utils.cjs` (154 lines)
  - `session-init.cjs` (108 lines)
  - `progress-indicator.cjs` (118 lines)
  - `validate-edit.cjs` (92 lines)
  - `dev-rules-reminder.cjs` (45 lines)
  - `skills/shared/index.js` (70 lines)
  - `skills/shared/utils/security.js` (98 lines)
  - `skills/shared/utils/display.js` (58 lines)
- **Lines analyzed:** ~743 total
- **Focus:** Security, error handling, code quality, import consistency
- **Context:** Recent refactoring moved shared utils to `skills/shared/`

### Overall Assessment
**Quality:** Good to Excellent
**Security:** Strong with recent improvements
**Maintainability:** High - clean separation of concerns

Recent refactoring successfully centralized shared utilities, eliminating duplication. All hooks follow consistent patterns for error handling and input validation. Security hardening is comprehensive with proper sanitization and TOCTOU race condition fixes.

---

## Critical Issues
**None Found** ✅

All security vulnerabilities previously present (path traversal, TOCTOU race conditions) have been properly addressed.

---

## High Priority Findings

### 1. Missing Input Validation in `progress-indicator.cjs`
**File:** `progress-indicator.cjs:98`
**Severity:** High
**Issue:** `tool_result` accessed directly from `rawData` without validation

```javascript
const result = rawData.tool_result || {}; // tool_result not in validateHookInput
```

**Impact:** Potential for malformed data injection if Claude provides unexpected `tool_result` structure

**Recommendation:**
```javascript
// Add to validateHookInput in security.js
function validateHookInput(data) {
  if (!data || typeof data !== 'object') return null;

  return {
    // ... existing fields ...
    tool_result: (data.tool_result && typeof data.tool_result === 'object')
      ? data.tool_result
      : null
  };
}

// Then in progress-indicator.cjs
const result = data.tool_result || {};
```

### 2. Inconsistent Error Exit Behavior
**Files:** `security.js:88`, `ck-config-utils.cjs:133`
**Severity:** Medium-High
**Issue:** Two different error handlers with similar but not identical behavior

**Current state:**
- `security.handleError()`: Conditional exit based on `exitOnError` param
- `ck-config-utils.handleHookError()`: Always exits with code 0

**Recommendation:**
Consolidate to single error handler. Since `handleHookError` is hook-specific wrapper around generic handler, keep both but ensure `handleHookError` always calls `handleError(..., true)`:

```javascript
// ck-config-utils.cjs
function handleHookError(hookName, error) {
  handleError(hookName, error, true); // Always exit for hooks
}
```

This makes exit behavior explicit and maintains single source of truth.

---

## Medium Priority Improvements

### 3. Path Traversal Edge Case in `isWholeEdit()`
**File:** `validate-edit.cjs:24`
**Severity:** Medium
**Issue:** String matching allows bypasses like `./Whole.md`, `../project/Whole.md`

```javascript
function isWholeEdit(toolInput) {
  if (!toolInput || !toolInput.file_path) return false;
  return toolInput.file_path.includes('Whole.md'); // Too permissive
}
```

**Recommendation:**
```javascript
const path = require('path');

function isWholeEdit(toolInput) {
  if (!toolInput || !toolInput.file_path) return false;

  const normalized = path.normalize(toolInput.file_path);
  const basename = path.basename(normalized);

  return basename === 'Whole.md';
}
```

### 4. Magic Numbers in Session Marker Logic
**File:** `session-init.cjs:68-83`
**Severity:** Low-Medium
**Issue:** Session marker path construction uses hardcoded temp dir pattern

```javascript
const sessionMarker = path.join(os.tmpdir(), `whole-session-${sessionId}`);
```

**Recommendation:** Extract to constant for easier testing/configuration
```javascript
// In constants.js
SESSION_MARKER_PREFIX: 'whole-session-',
SESSION_MARKER_DIR: null, // null = use os.tmpdir()

// In session-init.cjs
const markerDir = constants.SESSION_MARKER_DIR || os.tmpdir();
const sessionMarker = path.join(markerDir, `${constants.SESSION_MARKER_PREFIX}${sessionId}`);
```

### 5. Incomplete Bilingual Validation Logic
**File:** `validate-edit.cjs:43`
**Severity:** Medium
**Issue:** Header validation only checks for presence of `|` or `-`, not full bilingual format

```javascript
if (content.includes('####') && !content.includes('|') && !content.includes('-')) {
  warnings.push('WARNING: Heading may be missing bilingual format (use | or -)');
}
```

**Current behavior:** Passes for any heading with `|` or `-` anywhere in text
**Expected:** Should validate pattern like `#### **X. English - Vietnamese**`

**Recommendation:**
```javascript
// Check for proper bilingual heading format
const headingPattern = /####\s*\*\*\d+\.\s+[A-Za-z\s]+-[^*]+\*\*/;
if (content.includes('####') && !headingPattern.test(content)) {
  warnings.push('WARNING: Heading missing bilingual format (expected: #### **N. English - Vietnamese**)');
}
```

### 6. Type Coercion Risk in `calcPercentage()`
**File:** `ck-config-utils.cjs:93-96`
**Severity:** Low-Medium

```javascript
function calcPercentage(completed, total) {
  if (!total) return '0%';
  return `${Math.round((completed / total) * 100)}%`;
}
```

**Issue:** No type validation - could produce `NaN%` or incorrect results with non-numeric inputs

**Recommendation:**
```javascript
function calcPercentage(completed, total) {
  const c = Number(completed) || 0;
  const t = Number(total) || 0;
  if (t === 0) return '0%';
  return `${Math.round((c / t) * 100)}%`;
}
```

---

## Low Priority Suggestions

### 7. JSDoc Completeness
**Files:** All hooks
**Severity:** Low
**Issue:** Some functions missing `@param` types, `@throws`, `@example`

**Current:**
```javascript
/**
 * Build progress line
 */
function buildProgressLine(progress) { ... }
```

**Suggested:**
```javascript
/**
 * Build progress line for session display
 * @param {Object|null} progress - Progress data from .whole-progress.json
 * @param {number} progress.totalFunctions - Total functions (default 50)
 * @param {number[]} progress.completedFunctions - Array of completed function numbers
 * @param {number} [progress.nextSuggested] - Next suggested function number
 * @param {string} [progress.lastUpdated] - ISO date string of last update
 * @returns {string|null} Formatted progress string or null if no progress
 * @example
 * buildProgressLine({ totalFunctions: 50, completedFunctions: [1,2,3] })
 * // => "Progress: 3/50 (6%) | Branch: main"
 */
```

**Impact:** Improves IDE autocomplete and developer experience

### 8. Magic String Duplication
**Files:** Multiple
**Issue:** Tool names like `'Edit'`, `'Write'`, `'Bash'` repeated as string literals

**Recommendation:**
```javascript
// In constants.js
TOOL_NAMES: {
  EDIT: 'Edit',
  WRITE: 'Write',
  BASH: 'Bash',
  READ: 'Read',
  GREP: 'Grep',
  GLOB: 'Glob',
  TODO_WRITE: 'TodoWrite',
  SKILL: 'Skill'
}

// Usage
if ([TOOL_NAMES.EDIT, TOOL_NAMES.WRITE].includes(toolName)) { ... }
```

### 9. Potential Performance Issue in Git Operations
**File:** `ck-config-utils.cjs:60-85`
**Severity:** Low
**Issue:** Synchronous `execSync()` calls could block hook execution

**Current:**
```javascript
function getGitBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  } catch (e) {
    return null;
  }
}
```

**Context:** Acceptable for hooks (ephemeral short-lived processes), but worth documenting

**Recommendation:** Add comment explaining why sync is acceptable:
```javascript
/**
 * Get current git branch name (synchronous)
 * Note: Uses execSync for simplicity - acceptable in hook context (short-lived process)
 * @returns {string|null} Branch name or null
 */
```

### 10. Session Marker Cleanup Not Implemented
**File:** `session-init.cjs:68-84`
**Severity:** Low
**Issue:** Session markers in temp dir accumulate over time

**Impact:** Minor disk space usage (tiny files), but no cleanup mechanism

**Recommendation:**
Add optional cleanup for old markers (e.g., >7 days):
```javascript
// In ck-config-utils.cjs
function cleanupOldSessionMarkers(maxAge = 7 * 24 * 60 * 60 * 1000) {
  const tmpDir = os.tmpdir();
  const files = fs.readdirSync(tmpDir);
  const now = Date.now();

  files.filter(f => f.startsWith('whole-session-')).forEach(file => {
    const filePath = path.join(tmpDir, file);
    try {
      const stats = fs.statSync(filePath);
      if (now - stats.mtimeMs > maxAge) {
        fs.unlinkSync(filePath);
      }
    } catch (e) { /* ignore */ }
  });
}
```

Call at session start (non-blocking, best-effort).

---

## Positive Observations

✅ **Security hardening:**
- Comprehensive input sanitization via `validateHookInput()`
- Path traversal prevention with `sanitizeSessionId()`
- TOCTOU race condition fix using atomic `wx` flag
- Regex escaping to prevent ReDoS attacks

✅ **DRY principle:**
- Successful consolidation of utilities to `skills/shared/`
- Consistent import pattern across all hooks
- Single source of truth for colors, constants, validation

✅ **Error handling:**
- Graceful degradation on all failures
- Always exit 0 to prevent blocking Claude
- Debug-mode-only error logging (no noise in production)

✅ **Code organization:**
- Clear separation: hook-specific vs. shared utilities
- Well-documented module exports with usage examples
- Logical grouping in `ck-config-utils.cjs`

✅ **Maintainability:**
- Constants extracted to single config file
- Meaningful function names and comments
- Consistent code style across all files

✅ **Hook-specific best practices:**
- Idempotency guard for resume events
- Non-blocking design (essential for hooks)
- Minimal dependencies (only Node.js built-ins)

---

## Recommended Actions

### Immediate (Security/Correctness)
1. **Add `tool_result` validation** in `validateHookInput()` (progress-indicator.cjs)
2. **Strengthen `isWholeEdit()`** path matching (validate-edit.cjs)
3. **Add type guards** to `calcPercentage()` (ck-config-utils.cjs)

### Short-term (Code Quality)
4. **Consolidate error handlers** - make `handleHookError` call `handleError` consistently
5. **Improve bilingual header validation** regex in validate-edit.cjs
6. **Extract magic strings** to constants (TOOL_NAMES)

### Long-term (Maintenance)
7. **Complete JSDoc** for all public functions
8. **Add session marker cleanup** (optional, low priority)
9. **Extract session marker config** to constants
10. **Add unit tests** for validation functions (security.js, especially `sanitizeSessionId`)

### Code Examples for Quick Fixes

**Fix #1: tool_result validation**
```javascript
// skills/shared/utils/security.js:30
function validateHookInput(data) {
  if (!data || typeof data !== 'object') return null;

  return {
    source: typeof data.source === 'string' ? data.source : 'unknown',
    session_id: sanitizeSessionId(data.session_id),
    tool_name: typeof data.tool_name === 'string' ? data.tool_name : null,
    tool_parameters: (data.tool_parameters && typeof data.tool_parameters === 'object')
      ? data.tool_parameters
      : {},
    tool_input: (data.tool_input && typeof data.tool_input === 'object')
      ? data.tool_input
      : {},
    tool_result: (data.tool_result && typeof data.tool_result === 'object')
      ? data.tool_result
      : {} // ADD THIS LINE
  };
}
```

**Fix #2: isWholeEdit strengthening**
```javascript
// validate-edit.cjs:22
const path = require('path');

function isWholeEdit(toolInput) {
  if (!toolInput || !toolInput.file_path) return false;

  try {
    const normalized = path.normalize(toolInput.file_path);
    const basename = path.basename(normalized);
    return basename === 'Whole.md';
  } catch (e) {
    return false;
  }
}
```

**Fix #3: calcPercentage type safety**
```javascript
// ck-config-utils.cjs:93
function calcPercentage(completed, total) {
  const c = Number(completed) || 0;
  const t = Number(total) || 0;
  if (t === 0) return '0%';
  const pct = Math.round((c / t) * 100);
  return `${pct}%`;
}
```

---

## Metrics

- **Security Issues:** 0 critical, 1 high (missing validation)
- **Code Quality:** Strong (consistent patterns, good documentation)
- **Test Coverage:** 0% (no tests found) - Consider adding for `security.js`
- **Linting:** N/A (no linter configured) - Consider ESLint with Node.js preset
- **Complexity:** Low - all functions <15 LOC, clear single responsibilities
- **Dependencies:** Minimal - only Node.js built-ins (excellent for hooks)

---

## Test Coverage Recommendations

Currently no unit tests exist for hooks. Suggested priority order:

### High Priority (Security-critical)
1. `security.sanitizeSessionId()` - test path traversal attempts
2. `security.validateHookInput()` - test malformed/malicious input
3. `security.escapeRegex()` - test ReDoS prevention

### Medium Priority (Correctness)
4. `ck-config-utils.calcPercentage()` - test edge cases (0, negative, NaN)
5. `validate-edit.isWholeEdit()` - test various path formats
6. `progress-indicator.buildMessage()` - test all tool types

### Low Priority (Nice-to-have)
7. `display.truncate()` - test boundary conditions
8. `parser.*` functions - test parsing edge cases

**Example test structure:**
```javascript
// test/security.test.js
const { sanitizeSessionId, validateHookInput } = require('../skills/shared/utils/security');

describe('sanitizeSessionId', () => {
  it('prevents path traversal', () => {
    expect(sanitizeSessionId('../../../etc/passwd')).toBe('etcpasswd');
    expect(sanitizeSessionId('../../.ssh/id_rsa')).toBe('sshidrsa');
  });

  it('handles special characters', () => {
    expect(sanitizeSessionId('abc-123_def')).toBe('abc-123_def');
    expect(sanitizeSessionId('test@#$%')).toBe('test');
  });

  it('enforces length limit', () => {
    const longId = 'a'.repeat(100);
    expect(sanitizeSessionId(longId).length).toBe(64);
  });
});
```

---

## Conclusion

Hook system is **production-ready** with solid security foundation and clean architecture. Recent refactoring eliminated duplication and centralized utilities effectively.

**Strengths:**
- Comprehensive security hardening
- Excellent separation of concerns
- Consistent error handling patterns
- Well-documented code

**Areas for improvement:**
- Add validation for `tool_result` in progress-indicator
- Strengthen path validation in validate-edit
- Add type guards for numeric operations
- Consider adding unit tests for security-critical functions

**Overall Grade:** A- (Excellent with minor improvements needed)

---

## Unresolved Questions

1. **Testing strategy:** Should hooks have unit tests, or is manual testing sufficient given their simplicity?
2. **Linting:** Would ESLint add value, or is current code review process adequate?
3. **Session marker TTL:** What is appropriate cleanup interval for temp session markers?
4. **Error verbosity:** Should `CLAUDE_HOOK_DEBUG=verbose` also log to file for post-mortem analysis?
5. **Performance monitoring:** Should hooks track execution time to detect slowdowns?
