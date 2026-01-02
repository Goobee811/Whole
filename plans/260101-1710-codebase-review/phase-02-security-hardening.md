# Phase 2: Security Hardening

**Priority**: HIGH
**Status**: ✅ COMPLETE
**Completed**: 2026-01-01
**Commit**: c55ae3f

## Context
Security is already strong. These improvements add defense in depth.

## Requirements

### 2.1 Consolidate Error Handlers
**Files**:
- `.claude/skills/shared/utils/security.js`
- `.claude/hooks/lib/ck-config-utils.cjs`

Two similar error handlers exist. Consolidate:
```javascript
// security.js - update handleError to accept exitOnError param
function handleError(context, error, exitOnError = false) {
  // existing logic
  if (exitOnError) process.exit(0);
}

// ck-config-utils.cjs - delegate to shared
function handleHookError(hookName, error) {
  return shared.handleError(hookName, error, true);
}
```

### 2.2 Add Type Guards to calcPercentage
**File**: `.claude/hooks/lib/ck-config-utils.cjs:93-96`

```javascript
function calcPercentage(completed, total) {
  if (typeof completed !== 'number' || typeof total !== 'number') return '0%';
  if (!total || total <= 0) return '0%';
  return `${Math.round((completed / total) * 100)}%`;
}
```

### 2.3 Add Input Guards to Display Functions
**File**: `.claude/skills/shared/utils/display.js`

```javascript
function colorize(text, color) {
  if (text == null) return '';
  return `${COLORS[color] || ''}${text}${COLORS.reset}`;
}

function truncate(str, maxLen = 50) {
  if (str == null) return '';
  if (str.length <= maxLen) return str;
  return str.substring(0, maxLen) + '...';
}
```

### 2.4 Standardize Function Number Validation
**Files**: All validation scripts

Ensure all calls include range:
```javascript
const funcNum = validateFunctionNumber(rawFuncNum, 1, 50);
```

## Implementation Steps

- [ ] Consolidate error handlers
- [ ] Add type guards to calcPercentage
- [ ] Add input guards to display functions
- [ ] Update function validation calls
- [ ] Test all scripts
- [ ] Commit: `fix(security): add defensive guards`

## Success Criteria
- All guards implemented
- No type errors in edge cases
- Scripts handle null/undefined gracefully
