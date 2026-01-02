# Phase 1: Critical Fixes

**Priority**: HIGH
**Status**: ✅ COMPLETE
**Completed**: 2026-01-01
**Commit**: 9269340

## Context
No critical security vulnerabilities found. This phase addresses high-priority improvements that should be fixed soon.

## Requirements

### 1.1 Fix ReDoS Risk in Cross-Reference Regex
**File**: `.claude/skills/whole-editor/scripts/check-cross-refs.js:31`

**Current** (vulnerable to catastrophic backtracking):
```javascript
const refSectionPattern = /(?:→|->)\s*\*\*(?:Liên kết|Lien ket|Cross-ref)[:\*]*\*\*([^#]+?)(?=####|\n\n\n|$)/gi;
```

**Fix** (add length limit):
```javascript
const refSectionPattern = /(?:→|->)\s*\*\*(?:Liên kết|Lien ket|Cross-ref)[:\*]*\*\*([^#]{1,500}?)(?=####|\n\n\n|$)/gi;
```

### 1.2 Add tool_result Validation
**File**: `.claude/hooks/progress-indicator.cjs`

Add to `validateHookInput()` in security.js:
```javascript
tool_result: typeof data.tool_result === 'string'
  ? data.tool_result.substring(0, 1000)
  : null
```

### 1.3 Strengthen Path Validation
**File**: `.claude/hooks/validate-edit.cjs:24`

**Current**:
```javascript
const isWholeEdit = filePath && filePath.includes('Whole.md');
```

**Fix**:
```javascript
const isWholeEdit = filePath && path.basename(filePath) === 'Whole.md';
```

## Implementation Steps

- [ ] Fix regex in check-cross-refs.js
- [ ] Add tool_result to validateHookInput
- [ ] Update path validation in validate-edit.cjs
- [ ] Test all hooks work correctly
- [ ] Commit with message: `fix(security): address high-priority findings`

## Success Criteria
- All 3 fixes implemented
- Scripts still run without errors
- No regressions in validation behavior

## Risk Assessment
| Risk | Impact | Mitigation |
|------|--------|------------|
| Regex change breaks matches | Low | Test with sample data |
| Path check too strict | Low | Test with various paths |
