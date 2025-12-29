# Phase 3: Security Hardening

**Status:** Pending
**Priority:** High
**Estimated Effort:** 1-2 hours
**Prerequisites:** Phase 2 Complete (shared utils available)

---

## Context

Two security concerns identified:
1. **Scripts** - User input used in regex without escaping (ReDoS risk)
2. **Hooks** - Session ID from stdin used in filesystem path without sanitization (path traversal)

---

## Overview

| Date | Priority | Status |
|------|----------|--------|
| 2025-12-29 | High | Pending |

---

## Key Insights

- Scripts receive function number from CLI args, used directly in regex
- Hooks receive session_id from Claude via stdin JSON
- session_id used in `path.join(os.tmpdir(), 'whole-session-${sessionId}')`
- No input validation on JSON structure

---

## Requirements

1. Add regex escaping to all scripts
2. Add session ID sanitization to hooks
3. Add JSON structure validation
4. Add recovery guidance to error messages

---

## Related Code Files

**Scripts to secure:**
- `.claude/skills/whole-regrouper/scripts/validate-regroup.js` (line 49)
- `.claude/skills/whole-editor/scripts/*.js`

**Hooks to secure:**
- `.claude/hooks/session-init.cjs` (line 78, 83)
- `.claude/hooks/progress-indicator.cjs`
- `.claude/hooks/validate-edit.cjs`
- `.claude/hooks/dev-rules-reminder.cjs`

---

## Implementation Steps

### Step 1: Add escapeRegex to Shared Utils (5 min)

Already included in Phase 2's `whole-md-parser.js`:

```javascript
function escapeRegex(str) {
  return str.toString().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
```

### Step 2: Add Input Validation to ck-config-utils.cjs (20 min)

```javascript
/**
 * Sanitize session ID to prevent path traversal
 * Only allows alphanumeric characters and dashes
 */
function sanitizeSessionId(id) {
  if (!id || typeof id !== 'string') {
    return process.ppid?.toString() || 'default';
  }
  // Remove any non-alphanumeric chars except dash, limit length
  return id.replace(/[^a-zA-Z0-9-]/g, '').substring(0, 64) || 'default';
}

/**
 * Validate hook input JSON structure
 */
function validateHookInput(data) {
  if (!data || typeof data !== 'object') return null;

  return {
    source: typeof data.source === 'string' ? data.source : 'unknown',
    session_id: sanitizeSessionId(data.session_id),
    tool_name: typeof data.tool_name === 'string' ? data.tool_name : null,
    tool_parameters: typeof data.tool_parameters === 'object' ? data.tool_parameters : {}
  };
}

module.exports = {
  loadProgress,
  getGitBranch,
  sanitizeSessionId,
  validateHookInput
};
```

### Step 3: Update session-init.cjs (15 min)

**Before (vulnerable):**
```javascript
const data = stdin ? JSON.parse(stdin) : {};
const source = data.source || 'unknown';
const sessionId = data.session_id || process.ppid || 'default';
const sessionMarker = path.join(os.tmpdir(), `whole-session-${sessionId}`);
```

**After (secure):**
```javascript
const { validateHookInput } = require('./lib/ck-config-utils.cjs');

const rawData = stdin ? JSON.parse(stdin) : {};
const data = validateHookInput(rawData);
if (!data) process.exit(0);

const { source, session_id: sessionId } = data;
const sessionMarker = path.join(os.tmpdir(), `whole-session-${sessionId}`);
```

### Step 4: Update validate-regroup.js (10 min)

**Before (vulnerable):**
```javascript
const functionNumber = process.argv[2];
const functionRegex = new RegExp(`^## CHỨC NĂNG ${functionNumber}:`);
```

**After (secure):**
```javascript
const { escapeRegex } = require('../../shared/utils/whole-md-parser.js');

const functionNumber = process.argv[2];
if (!functionNumber || !/^\d+$/.test(functionNumber)) {
  console.error('Error: Function number must be a positive integer (1-50)');
  console.error('Usage: node validate-regroup.js <function-number>');
  process.exit(1);
}

const functionRegex = new RegExp(`^## CHỨC NĂNG ${escapeRegex(functionNumber)}:`);
```

### Step 5: Add Recovery Guidance (20 min)

Update all scripts to include actionable recovery steps:

```javascript
// Example for validate-regroup.js
function handleError(error, context) {
  console.error(`\n${colors.red}❌ Validation error: ${error.message}${colors.reset}`);
  console.error(`\nContext: ${context}`);
  console.error('\nRecovery options:');
  console.error('  1. Verify CHỨC NĂNG number is between 1-50');
  console.error('  2. Confirm Whole.md exists: ls Whole.md');
  console.error('  3. Check file encoding: file Whole.md');
  console.error('  4. Try running from project root directory');
  console.error('\nFor help: cat .claude/skills/whole-regrouper/SKILL.md');
  return 1;
}
```

### Step 6: Update Other Hooks (20 min)

Apply `validateHookInput()` pattern to:
- `progress-indicator.cjs`
- `validate-edit.cjs`
- `dev-rules-reminder.cjs`

### Step 7: Test Security Fixes (15 min)

```bash
# Test path traversal protection
echo '{"session_id":"../../../etc/passwd"}' | node .claude/hooks/session-init.cjs
# Should sanitize to empty string, use default

# Test regex injection protection
node .claude/skills/whole-regrouper/scripts/validate-regroup.js "1.*"
# Should show error about invalid input

# Test malformed JSON handling
echo 'not-json' | node .claude/hooks/session-init.cjs
# Should exit(0) gracefully
```

---

## Todo List

- [ ] Add `sanitizeSessionId()` to ck-config-utils.cjs
- [ ] Add `validateHookInput()` to ck-config-utils.cjs
- [ ] Update session-init.cjs with validation
- [ ] Update validate-regroup.js with escaping + validation
- [ ] Update other validation scripts with escaping
- [ ] Update other hooks with validation
- [ ] Add recovery guidance to all error messages
- [ ] Test path traversal protection
- [ ] Test regex injection protection
- [ ] Commit changes

---

## Success Criteria

- [ ] `echo '{"session_id":"../../../etc"}' | node session-init.cjs` creates safe path
- [ ] `node validate-regroup.js "1.*"` shows validation error
- [ ] All scripts include recovery guidance in errors
- [ ] No crashes on malformed input

---

## Security Checklist

- [ ] All user input escaped before regex use
- [ ] All session IDs sanitized before filesystem use
- [ ] All JSON input validated for structure
- [ ] Error messages don't leak sensitive info
- [ ] Recovery guidance provided for all errors

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Over-sanitization breaks valid input | Medium | Low | Allow alphanumeric + dash |
| Validation too strict | Low | Medium | Default values for missing fields |
| Performance impact | Very Low | Very Low | Simple regex, no network calls |

---

## Next Steps

After completing Phase 3:
- Proceed to [Phase 4: Documentation Sync](./phase-04-documentation-sync.md)
