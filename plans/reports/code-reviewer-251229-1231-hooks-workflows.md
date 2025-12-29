# Code Review: Whole Project Hooks & Workflows

**Reviewer:** code-reviewer (ae3903d)
**Date:** 2025-12-29
**Scope:** Claude hooks system and workflow documentation

---

## Code Review Summary

### Scope
**Files reviewed:**
- `.claude/hooks/session-init.cjs` (115 lines)
- `.claude/hooks/progress-indicator.cjs` (110 lines)
- `.claude/hooks/validate-edit.cjs` (84 lines)
- `.claude/hooks/dev-rules-reminder.cjs` (66 lines)
- `.claude/hooks/lib/ck-config-utils.cjs` (143 lines)
- `.claude/workflows/development-rules.md` (75 lines)
- `.claude/workflows/editing-workflow.md` (40 lines)
- `.claude/workflows/primary-workflow.md` (102 lines)
- `.claude/workflows/quality-assurance.md` (152 lines)

**Total:** ~887 lines across 9 files
**Review focus:** Recent changes, hook execution patterns, error handling, token efficiency
**Updated plans:** None (no existing plan provided)

### Overall Assessment

Code demonstrates good understanding of hook architecture with proper exit code handling and idempotency guards. However, **significant code duplication** exists across hooks (loadProgress, getGitBranch replicated 3x). Token efficiency is reasonable but workflows have redundancy. Security posture is adequate for non-privileged operations.

**Key strengths:**
- Consistent exit(0) for non-blocking behavior
- Idempotency guard in session-init prevents hook loops
- Clear separation of concerns (session/progress/validation)
- Graceful error handling with silent fails

**Key weaknesses:**
- DRY violation: 3 files duplicate loadProgress/getGitBranch despite lib/ck-config-utils.cjs existing
- Missing security: No input validation on JSON parsing from stdin
- Incomplete implementation: ck-config-utils.cjs has unused functions (saveProgress, getGitStatus, etc.)
- Race condition risk: sessionMarker file write has no mutex

---

## Critical Issues

None identified.

---

## High Priority Findings

### H1: Code Duplication Violates DRY Principle
**Severity:** High
**Files:** `session-init.cjs`, `dev-rules-reminder.cjs` vs `lib/ck-config-utils.cjs`

**Problem:**
Both `session-init.cjs` (lines 26-45) and `dev-rules-reminder.cjs` (lines 13-29) reimplement `loadProgress()` and `getGitBranch()` despite identical implementations existing in `lib/ck-config-utils.cjs` (lines 21-56).

**Impact:**
- Maintenance burden: bug fixes require 3 changes
- Inconsistency risk: implementations can drift
- Token waste: duplicated code in every hook activation

**Current implementation:**
```javascript
// session-init.cjs lines 26-34 (DUPLICATED)
function loadProgress() {
  try {
    const progressPath = path.join(process.cwd(), '.whole-progress.json');
    if (fs.existsSync(progressPath)) {
      return JSON.parse(fs.readFileSync(progressPath, 'utf8'));
    }
  } catch (e) { /* ignore */ }
  return null;
}
```

**Recommended fix:**
```javascript
// session-init.cjs - REFACTORED
const { loadProgress, getGitBranch } = require('./lib/ck-config-utils.cjs');

async function main() {
  const progress = loadProgress();
  const branch = getGitBranch();
  // ... rest of logic
}
```

**Action:** Import from ck-config-utils.cjs instead of reimplementing. Remove lines 26-45 from session-init.cjs, lines 13-29 from dev-rules-reminder.cjs.

---

### H2: Incomplete ck-config-utils.cjs Library
**Severity:** High
**Files:** `lib/ck-config-utils.cjs`

**Problem:**
Library defines 9 exported functions but 6 are never used across codebase:
- `saveProgress()` - No callers found
- `getGitStatus()` - No callers found
- `calcPercentage()` - No callers found
- `formatDateVN()` - No callers found
- `wholeExists()` - No callers found
- `colorize()`, `COLORS` - No callers found

**Impact:**
- Dead code increases maintenance burden
- Token waste loading unused utilities
- YAGNI violation: "You Aren't Gonna Need It"

**Recommendation:**
```javascript
// Option 1: Remove unused functions (preferred)
module.exports = {
  loadProgress,
  getGitBranch
};

// Option 2: If planned for future use, add JSDoc @private tags
/**
 * @private - Reserved for future progress tracking features
 */
function saveProgress(progress) { ... }
```

**Action:** Either remove unused functions or document why they're preserved for future use.

---

### H3: Unsafe JSON Parsing Without Validation
**Severity:** High (Security)
**Files:** All 4 hooks

**Problem:**
All hooks parse stdin JSON without input validation:

```javascript
// session-init.cjs line 78
const data = stdin ? JSON.parse(stdin) : {};
const source = data.source || 'unknown';  // No validation of 'source' value
const sessionId = data.session_id || process.ppid || 'default';  // sessionId used in fs path
```

**Impact:**
- **Path traversal risk:** sessionId used in `path.join(os.tmpdir(), 'whole-session-${sessionId}')` without sanitization
- **Type confusion:** No validation that data.source is string, data.tool_parameters is object, etc.
- **Malformed data crashes:** While wrapped in try/catch, could mask real errors

**Recommended fix:**
```javascript
// Add input validation function
function validateHookInput(data) {
  if (!data || typeof data !== 'object') return null;

  return {
    source: typeof data.source === 'string' ? data.source : 'unknown',
    session_id: sanitizeSessionId(data.session_id),
    tool_name: typeof data.tool_name === 'string' ? data.tool_name : null,
    tool_parameters: typeof data.tool_parameters === 'object' ? data.tool_parameters : {}
  };
}

function sanitizeSessionId(id) {
  // Prevent path traversal: only allow alphanumeric + dash
  if (!id || typeof id !== 'string') return process.ppid || 'default';
  return id.replace(/[^a-zA-Z0-9-]/g, '').substring(0, 64) || 'default';
}

// Usage
const data = stdin ? JSON.parse(stdin) : {};
const validated = validateHookInput(data);
if (!validated) process.exit(0);
```

**Action:** Add input validation to prevent path traversal and type confusion attacks.

---

## Medium Priority Improvements

### M1: Race Condition in Session Marker
**Severity:** Medium
**Files:** `session-init.cjs` (lines 83-89)

**Problem:**
Idempotency check has TOCTOU (time-of-check-time-of-use) race condition:

```javascript
// Line 84-89
if (source === 'resume' && fs.existsSync(sessionMarker)) {
  process.exit(0);  // Check
}
try {
  fs.writeFileSync(sessionMarker, Date.now().toString());  // Use
} catch (e) { /* ignore */ }
```

**Impact:**
Two concurrent session resumes could both pass existsSync check before either writes, causing duplicate initialization.

**Recommended fix:**
```javascript
// Atomic check-and-set using exclusive flag
if (source === 'resume') {
  try {
    fs.writeFileSync(sessionMarker, Date.now().toString(), { flag: 'wx' });
  } catch (e) {
    if (e.code === 'EEXIST') {
      process.exit(0);  // Already initialized
    }
    // Other errors: ignore, proceed with initialization
  }
}
```

**Action:** Use atomic file operations with 'wx' flag to prevent race conditions.

---

### M2: Inconsistent Error Handling Patterns
**Severity:** Medium
**Files:** All hooks

**Problem:**
Three different error handling patterns across hooks:

```javascript
// Pattern 1: session-init.cjs (line 108-111)
catch (error) {
  console.error(`SessionStart error: ${error.message}`);
  process.exit(0);
}

// Pattern 2: progress-indicator.cjs (line 102-104)
catch (error) {
  // Silent fail - never block Claude
}

// Pattern 3: validate-edit.cjs (line 77-80)
catch (error) {
  // Silent fail - don't block operations
  process.exit(0);
}
```

**Impact:**
- Inconsistent debugging experience
- Pattern 1 reveals errors, Pattern 2/3 hide them
- Comment inconsistency: "Silent fail" vs "never block" vs "don't block"

**Recommended fix:**
```javascript
// Standardize on explicit silent fail with optional debug mode
catch (error) {
  // Silent fail to prevent blocking Claude operations
  if (process.env.CLAUDE_HOOK_DEBUG) {
    console.error(`[${hookName}] ${error.message}`);
  }
  process.exit(0);
}
```

**Action:** Standardize error handling and add debug mode for troubleshooting.

---

### M3: Missing Hook Registration Documentation
**Severity:** Medium
**Files:** None (missing documentation)

**Problem:**
No documentation exists explaining:
- Which hooks fire on which events (SessionStart, PostToolUse, UserPromptSubmit)
- Hook execution order
- How to test hooks in isolation
- Hook lifecycle and stdin/stdout contract

**Impact:**
- New developers can't understand hook system
- Maintenance requires reverse-engineering
- No testing strategy documented

**Recommended fix:**
Create `.claude/hooks/README.md`:

```markdown
# Claude Hooks System

## Hook Types

| Hook File | Event | Purpose | Exit Code |
|-----------|-------|---------|-----------|
| session-init.cjs | SessionStart | Display progress, rules | Always 0 |
| dev-rules-reminder.cjs | UserPromptSubmit | Inject context | Always 0 |
| progress-indicator.cjs | PostToolUse | Tool feedback | Always 0 |
| validate-edit.cjs | PostToolUse | Whole.md validation | Always 0 |

## Testing Hooks

```bash
# Test session-init
echo '{"source":"startup","session_id":"test123"}' | node session-init.cjs

# Test progress-indicator
echo '{"tool_name":"Read","tool_parameters":{"file_path":"test.md"}}' | node progress-indicator.cjs
```

## Stdin Contract
All hooks receive JSON via stdin with fields:
- `source` (string): Event source (startup/resume/clear)
- `session_id` (string): Unique session identifier
- `tool_name` (string): Tool that executed
- `tool_parameters` (object): Tool parameters
```

**Action:** Create comprehensive hook documentation.

---

### M4: Workflow Documentation Redundancy
**Severity:** Medium
**Files:** `workflows/*.md`

**Problem:**
Workflows repeat identical content:
- `editing-workflow.md` and `primary-workflow.md` both describe 6-step edit process
- `development-rules.md` section "Pre-commit Rules" duplicates `quality-assurance.md` "Post-Edit Validation"
- Validation scripts listed 3x across files with conflicting availability (some don't exist)

**Example duplication:**
```markdown
# editing-workflow.md lines 5-34
### 1. Preparation
- Activate `whole-analyzer`
...

# primary-workflow.md lines 13-69
### 1. Receive Request
- Understand user intent clearly
...
### 2. Analyze Target Section
```

**Impact:**
- Token waste: Claude loads redundant content
- Maintenance burden: changes require updates in multiple files
- Inconsistency risk: workflows can drift

**Recommended fix:**
```markdown
# workflows/README.md (NEW - Hub document)
## Workflow Quick Reference
- **New to Whole?** → Start with `primary-workflow.md`
- **Editing content?** → Follow `editing-workflow.md`
- **Quality checks?** → Use `quality-assurance.md`
- **Development rules?** → See `development-rules.md`

# primary-workflow.md - Keep comprehensive guide
# editing-workflow.md - Reduce to "See primary-workflow.md steps 1-6"
# quality-assurance.md - Focus only on QA-specific checklists
# development-rules.md - Remove duplicated validation info
```

**Action:** Create hub document, deduplicate workflows, use cross-references.

---

### M5: Hardcoded File Paths
**Severity:** Medium
**Files:** All hooks, workflows

**Problem:**
File paths hardcoded throughout:
- `.whole-progress.json` (repeated 3x)
- `.claude/skills/whole-regrouper/scripts/validate-regroup.js` (repeated 4x)
- `Whole.md` (repeated 6x)

**Example:**
```javascript
// session-init.cjs line 28
const progressPath = path.join(process.cwd(), '.whole-progress.json');

// dev-rules-reminder.cjs line 15
const progressPath = path.join(process.cwd(), '.whole-progress.json');
```

**Impact:**
- Changing file location requires updates in multiple files
- Testing requires mocking file system
- No configuration flexibility

**Recommended fix:**
```javascript
// lib/ck-config-utils.cjs - Centralize paths
const PATHS = {
  PROGRESS: path.join(process.cwd(), '.whole-progress.json'),
  WHOLE_MD: path.join(process.cwd(), 'Whole.md'),
  VALIDATION_SCRIPT: path.join(process.cwd(), '.claude/skills/whole-regrouper/scripts/validate-regroup.js')
};

module.exports = {
  PATHS,
  loadProgress() {
    if (fs.existsSync(PATHS.PROGRESS)) {
      return JSON.parse(fs.readFileSync(PATHS.PROGRESS, 'utf8'));
    }
    return null;
  }
};
```

**Action:** Centralize path definitions in ck-config-utils.cjs.

---

### M6: Validation Scripts Don't Exist
**Severity:** Medium
**Files:** `workflows/quality-assurance.md`

**Problem:**
Quality assurance workflow references 4 validation scripts (lines 122-142):
- `validate-regroup.js` ✓ EXISTS
- `validate-structure.js` ✗ NOT FOUND
- `check-cross-refs.js` ✗ NOT FOUND
- `bilingual-check.js` ✗ NOT FOUND

**Impact:**
- Users follow broken instructions
- QA process can't be completed as documented
- False sense of automated validation

**Recommended fix:**
```markdown
# quality-assurance.md - Update to reality

### Available Scripts

| Script | Purpose | Status |
|--------|---------|--------|
| `validate-regroup.js` | Regroup validation | ✓ Available |
| `validate-structure.js` | 4-point structure check | Planned |
| `check-cross-refs.js` | Reference validation | Planned |
| `bilingual-check.js` | Bilingual compliance | Planned |

### Current Validation

```bash
# Full function validation (ONLY working script)
node .claude/skills/whole-regrouper/scripts/validate-regroup.js [num]
```

**Manual checks required:**
- Structure validation: Review 4-point format manually
- Cross-references: Verify links in context
- Bilingual: Check headers during edit
```

**Action:** Update docs to reflect actual script availability or implement missing scripts.

---

## Low Priority Suggestions

### L1: Missing Progress Indicator for Long Operations
**Severity:** Low
**Files:** `progress-indicator.cjs`

**Problem:**
Hook only shows completion (`✓ Read: file.md`) but not start of long operations. User sees silence during 10-second grep.

**Recommendation:**
```javascript
// Could add PreToolUse hook to show "⏳ Running grep..."
// But: Claude doesn't support PreToolUse hooks
// Alternative: Document expected behavior in CLAUDE.md
```

**Action:** Document that progress feedback is post-operation only.

---

### L2: Session Marker Cleanup
**Severity:** Low
**Files:** `session-init.cjs`

**Problem:**
Session markers in `os.tmpdir()` accumulate over time. No cleanup mechanism.

**Recommendation:**
```javascript
// Add cleanup in session-init on 'shutdown' event
if (source === 'shutdown') {
  try {
    fs.unlinkSync(sessionMarker);
  } catch (e) { /* ignore */ }
}
```

**Impact:** Low - OS temp cleanup usually handles this.

---

### L3: Magic Numbers in Code
**Severity:** Low
**Files:** `progress-indicator.cjs`, `session-init.cjs`

**Problem:**
```javascript
// progress-indicator.cjs line 19
function truncate(str, maxLength = 30) {  // Why 30?

// session-init.cjs line 56
const percentage = Math.round((completedCount / totalFunctions) * 100);  // Why 100 not 1.0?
```

**Recommendation:**
```javascript
const CONFIG = {
  MAX_DISPLAY_LENGTH: 30,  // Terminal width constraint
  TOTAL_FUNCTIONS: 50      // 10 domains × 5 functions
};
```

---

### L4: Inconsistent Naming Conventions
**Severity:** Low
**Files:** Workflows

**Problem:**
Vietnamese terms use inconsistent romanization:
- "Tong Quan" vs "Tổng Quan"
- "Lien ket" vs "Liên kết"
- "Ten" vs "Tên"

**Recommendation:**
Standardize on diacritics: "Tổng Quan", "Liên kết", "Tên" (with proper Vietnamese accents).

---

## Positive Observations

✓ **Excellent exit code discipline:** All hooks consistently use exit(0) for non-blocking behavior
✓ **Idempotency guard:** session-init prevents double initialization on resume
✓ **Clear separation of concerns:** Each hook has single responsibility
✓ **Graceful degradation:** Missing progress file doesn't crash hooks
✓ **User-friendly output:** Progress indicators use clear formatting
✓ **Version documentation:** session-init.cjs documents v2.0.0 merger
✓ **Defensive programming:** Try-catch blocks prevent hook failures from breaking Claude

---

## Recommended Actions

**Priority Order (Do First → Last):**

1. **[HIGH]** Refactor loadProgress/getGitBranch duplication
   - Import from ck-config-utils.cjs
   - Remove duplicate implementations
   - Test all 3 hooks still work

2. **[HIGH]** Add input validation to prevent security issues
   - Implement sanitizeSessionId()
   - Validate JSON structure
   - Test with malformed input

3. **[HIGH]** Clean up ck-config-utils.cjs dead code
   - Remove unused functions or document why preserved
   - Update module.exports

4. **[MEDIUM]** Fix race condition in session marker
   - Use atomic 'wx' flag
   - Test concurrent session resumes

5. **[MEDIUM]** Create hooks documentation (README.md)
   - Document hook types, events, testing
   - Add stdin contract specification

6. **[MEDIUM]** Deduplicate workflow documentation
   - Create workflows/README.md hub
   - Cross-reference instead of repeating

7. **[MEDIUM]** Update quality-assurance.md for missing scripts
   - Mark scripts as "Planned" if not implemented
   - Document manual alternatives

8. **[MEDIUM]** Centralize hardcoded paths
   - Add PATHS constant to ck-config-utils
   - Update all hooks to import

9. **[LOW]** Standardize error handling patterns
   - Add CLAUDE_HOOK_DEBUG support
   - Consistent comments

10. **[LOW]** Fix Vietnamese diacritic inconsistencies
    - Use proper accents in all workflow docs

---

## Metrics

**Code Quality:**
- Type Coverage: N/A (JavaScript, no TypeScript)
- Test Coverage: 0% (no tests found)
- Linting Issues: Not run (no linter configured)

**Hook Statistics:**
- Total hooks: 4
- Total shared utilities: 1
- Lines of code: ~518 (hooks + lib)
- Code duplication: ~15% (loadProgress/getGitBranch duplicated 3x)
- Dead code: ~40% of ck-config-utils.cjs

**Workflow Statistics:**
- Total workflows: 4
- Total lines: ~369
- Estimated redundancy: ~25% (based on duplicate validation sections)

**Security:**
- Input validation: Missing
- Path traversal risk: Present (sessionId)
- Command injection: Not applicable (no shell commands with user input)
- File permission issues: None (read-only operations)

---

## Unresolved Questions

1. **Dead code rationale:** Why does ck-config-utils.cjs export 6 unused functions? Are they planned for future hooks?

2. **Workflow consolidation strategy:** Should workflows merge into single source of truth, or remain separate for different audiences?

3. **Missing validation scripts:** Should missing scripts be implemented or docs updated to reflect reality?

4. **Hook testing:** No test suite exists. Is manual testing sufficient, or should automated tests be added?

5. **Session marker TTL:** Should session markers expire after N hours to prevent tmpdir accumulation?

6. **Progress tracking scope:** .whole-progress.json only tracks CHỨC NĂNG completion. Should it track concepts, cross-references, validation runs?
