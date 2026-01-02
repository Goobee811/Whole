# Node.js CLI Automation: Hooks, Validation & State Management
**Report Date:** 2026-01-02 | **Research Scope:** 5 research directions

---

## Executive Summary

Comprehensive analysis of Node.js CLI architecture patterns, with focus on:
- Event-driven hook systems for CLI tools
- Input validation, sanitization, security hardening
- Progress tracking and state persistence
- DRY modularity principles in shared utilities
- Testing strategies for CLI/validation scripts

**Key Finding:** Modern Node.js CLI tools use stdin-based JSON hooks with event-driven architecture, centralized security validation layers, and shared utility modules to achieve DRY principles and testability.

---

## 1. Hook System Architectures: Pre/Post Execution Patterns

### 1.1 Event-Driven Hook Model
**Source:** Whole Knowledge Architecture `.claude/hooks/` system (v2.0.0)

CLI hooks fire on discrete Claude Code events:
- **SessionStart** - Single invocation per session (display progress, rules)
- **PostToolUse** - After any tool execution (feedback, validation)
- **UserPromptSubmit** - Pre-execution context injection
- **Custom Validations** - Post-edit structural checks

**Stdin-based Invocation Contract:**
```json
{
  "source": "startup|resume|clear|compact",
  "session_id": "sanitized_string",
  "tool_name": "ToolName",
  "tool_parameters": { /* object */ },
  "tool_input": { /* object */ },
  "tool_result": "truncated_string"
}
```

**Critical Pattern:** All hooks exit with code `0` to prevent blocking CLI operations. Invalid input triggers silent fallback to defaults.

### 1.2 Idempotency Guard Pattern
**Atomic Check-and-Set Pattern** (prevents hook loops):
```javascript
const sessionMarker = path.join(os.tmpdir(), `whole-session-${sessionId}`);
try {
  fs.writeFileSync(sessionMarker, Date.now().toString(), { flag: 'wx' }); // exclusive mode
} catch (e) {
  if (e.code === 'EEXIST') {
    process.exit(0); // already initialized
  }
}
```

Fixes TOCTOU (Time-of-Check Time-of-Use) race condition with exclusive write flag.

### 1.3 Hook Lifecycle Flow
1. **Trigger** - Event fires in Claude Code
2. **Invocation** - JSON serialized via stdin
3. **Validation** - Input sanitized immediately (security hardening)
4. **Execution** - Hook performs operation (logging, state update)
5. **Exit** - Always exit(0) to prevent cascading failures
6. **No-Throw** - Errors caught silently; DEBUG env controls logging

**Benefit:** Hooks never block user operations; graceful degradation on all error paths.

---

## 2. CLI Validation & Security Best Practices

### 2.1 Input Validation Defense Layers
**Source:** `.claude/skills/shared/utils/security.js` (v1.0.0)

**Three-layer validation strategy:**

#### Layer 1: Type & Structure Validation
```javascript
function validateHookInput(data) {
  if (!data || typeof data !== 'object') return null;

  return {
    source: typeof data.source === 'string' ? data.source : 'unknown',
    session_id: sanitizeSessionId(data.session_id),
    tool_name: typeof data.tool_name === 'string' ? data.tool_name : null,
    tool_parameters: (data.tool_parameters && typeof data.tool_parameters === 'object')
      ? data.tool_parameters : {},
    tool_result: typeof data.tool_result === 'string'
      ? data.tool_result.substring(0, 1000) : null
  };
}
```

**Key behaviors:**
- Type coercion prevented; explicit null for invalid types
- String truncation (1000 char limit) prevents buffer overflow
- Object passthrough (not filtered) - whitelist approach on consumption

#### Layer 2: Path Traversal Prevention
```javascript
function sanitizeSessionId(id) {
  if (!id || typeof id !== 'string') {
    return process.ppid?.toString() || 'default';
  }
  // Whitelist: alphanumeric, dash, underscore only
  const sanitized = id.replace(/[^a-zA-Z0-9_-]/g, '').substring(0, 64);
  return sanitized || 'default';
}
```

**Attack Prevention:**
- Blocks `../../../etc/passwd` patterns
- Length limit (64 chars) prevents resource exhaustion
- Whitelist approach (remove bad chars) vs. blacklist (more secure)

#### Layer 3: ReDoS (Regex Denial of Service) Prevention
```javascript
function escapeRegex(str) {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
```

**Use case:** Before using user input in regex patterns. Prevents attacker-controlled regex causing exponential backtracking.

### 2.2 Function Number Validation (Range + Type)
```javascript
function validateFunctionNumber(input, min = 1, max = 50) {
  if (!input || typeof input !== 'string') return null;
  if (!/^\d+$/.test(input)) return null; // reject floats, scientific notation

  const num = parseInt(input, 10);
  if (isNaN(num) || num < min || num > max) return null;

  return num;
}
```

**Security aspects:**
- Strict type checking (string input)
- Regex whitelist: `^\d+$` prevents `1e10`, `1.5`
- Range validation (min/max configurable)
- Safe parsing (NaN check post-parseInt)

### 2.3 Error Handling & Information Disclosure
```javascript
function handleError(context, error, exitOnError = false) {
  if (process.env.CLAUDE_HOOK_DEBUG) {
    console.error(`[${context}] ${error.message}`);
    if (process.env.CLAUDE_HOOK_DEBUG === 'verbose' && error.stack) {
      console.error(error.stack);
    }
  }
  if (exitOnError) {
    process.exit(0); // Exit 0 to prevent blocking
  }
}
```

**Pattern:** Errors logged only in DEBUG mode (prevents information leakage in production). Always exit(0) even on errors.

---

## 3. Progress Tracking & State Management Patterns

### 3.1 File-Based State Persistence
**Source:** `.claude/hooks/lib/ck-config-utils.cjs`

```javascript
function loadProgress() {
  try {
    const progressPath = path.join(process.cwd(), '.whole-progress.json');
    if (fs.existsSync(progressPath)) {
      return JSON.parse(fs.readFileSync(progressPath, 'utf8'));
    }
  } catch (e) { /* ignore */ }
  return null;
}

function saveProgress(progress) {
  try {
    const progressPath = path.join(process.cwd(), '.whole-progress.json');
    progress.lastUpdated = new Date().toISOString();
    fs.writeFileSync(progressPath, JSON.stringify(progress, null, 2));
    return true;
  } catch (e) {
    return false;
  }
}
```

**Advantages:**
- Git-friendly (JSON in repo)
- Human-readable (2-space indent)
- Timestamp auto-injection for audit trail
- Silent failures (return boolean, don't throw)

### 3.2 Progress State Schema
**Inferred from hooks/session-init.cjs:**

```json
{
  "totalFunctions": 50,
  "completedFunctions": [1, 3, 5, 7],
  "nextSuggested": 2,
  "lastUpdated": "2026-01-02T15:17:00.000Z",
  "stats": {
    "avgConceptsPerFunction": 4.2,
    "sessionTime": 1200,
    "completionPercentage": 8
  }
}
```

**Key fields:**
- `completedFunctions` - Array of completed function numbers (sparse, efficient)
- `nextSuggested` - Auto-calculated by skill logic
- `lastUpdated` - ISO8601 timestamp (sortable, timezone-aware)
- Optional `stats` - Session metrics for reporting

### 3.3 Git Integration for State
```javascript
function getGitBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  } catch (e) {
    return null;
  }
}

function getGitStatus() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    const lines = status.split('\n').filter(l => l.trim());
    return {
      staged: lines.filter(l => l[0] !== ' ' && l[0] !== '?').length,
      unstaged: lines.filter(l => l[1] === 'M').length,
      untracked: lines.filter(l => l.startsWith('??')).length,
      total: lines.length
    };
  } catch (e) {
    return { staged: 0, unstaged: 0, untracked: 0, total: 0 };
  }
}
```

**Pattern:** Git status parsed programmatically to show change counts in session header.

---

## 4. Script Modularity & DRY Principles in Node.js CLIs

### 4.1 Shared Utilities Directory Structure
```
.claude/skills/shared/
├── index.js                          # Main export (re-exports all submodules)
├── config/constants.js               # Configuration constants
├── types/validation-result.js        # Shared type definitions
└── utils/
    ├── cli-helpers.js                # CLI initialization logic
    ├── display.js                    # Terminal output (colors, formatting)
    ├── security.js                   # Input validation & sanitization
    ├── whole-md-parser.js            # Whole.md parsing utilities
    └── *.test.js                     # Unit tests for each utility
```

**Core principle:** Single Source of Truth (SSoT). All skills import from `shared/`.

### 4.2 CLI Helper Abstraction
**Source:** `.claude/skills/shared/utils/cli-helpers.js`

```javascript
function initValidationScript(scriptName) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`Usage: node ${scriptName} <function-number>`);
    process.exit(1);
  }

  const funcNum = validateFunctionNumber(args[0], 1, 50);
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

  return { funcNum, content, section };
}
```

**Eliminates boilerplate:** Every validation script (validate-regroup.js, validate-analyze.js, etc.) calls this once. Returns pre-validated, pre-loaded context.

### 4.3 DRY Re-exports Pattern
**Source:** `.claude/hooks/lib/ck-config-utils.cjs` (lines 19-21)

```javascript
// Import from shared utilities (single source of truth)
// Re-export for backward compatibility with existing hooks
const shared = require('../../skills/shared');
```

**Pattern:** Hook utilities import shared modules, re-export for backward compatibility. All changes propagate automatically.

**Benefit:** Changing security logic in `skills/shared/utils/security.js` automatically updates:
- All validation scripts
- All hooks
- All skills

No manual propagation needed.

### 4.4 Validation Script Template
**Source:** `.claude/skills/whole-regrouper/scripts/validate-regroup.js`

Demonstrates modular validation structure:

```javascript
// 1. Define validation functions (pure, testable)
function validateTongQuan(lines) { /* ... */ }
function validateNumbering(lines) { /* ... */ }
function validateBilingualGroups(lines, tongQuanIndex) { /* ... */ }
function validateMarkdownFormat(lines) { /* ... */ }

// 2. Compose validators into main function
function validateFunction(functionNumber) {
  const { lines } = findFunctionBoundaries(functionNumber);
  const results = {
    tongQuan: validateTongQuan(lines),
    numbering: validateNumbering(lines),
    bilingual: validateBilingualGroups(lines, results.tongQuan.tongQuanIndex),
    format: validateMarkdownFormat(lines),
  };
  // Display and aggregate results
}

// 3. CLI entry point (thin wrapper)
if (require.main === module) {
  const functionNumber = validateFunctionNumber(args[0], 1, 50);
  const exitCode = validateFunction(functionNumber);
  process.exit(exitCode);
}
```

**DRY Benefit:** Validation logic separated from CLI logic. Validators can be:
- Tested independently
- Composed in different ways
- Reused in other scripts

---

## 5. Testing Strategies for CLI Tools

### 5.1 Unit Test Framework: Node.js Built-in Test Runner
**Source:** `.claude/skills/shared/utils/security.test.js`

Node.js v18+ includes native test runner (no Jest/Mocha needed):

```javascript
const assert = require('assert');
const { describe, it } = require('node:test');
const { sanitizeSessionId, validateFunctionNumber } = require('./security');

describe('Security Utilities', () => {
  describe('sanitizeSessionId', () => {
    it('should sanitize valid session ID', () => {
      const result = sanitizeSessionId('abc123_-DEF');
      assert.strictEqual(result, 'abc123_-DEF');
    });

    it('should remove invalid characters', () => {
      const result = sanitizeSessionId('abc@123#def$');
      assert.strictEqual(result, 'abc123def');
    });

    it('should limit length to 64 characters', () => {
      const longId = 'a'.repeat(100);
      const result = sanitizeSessionId(longId);
      assert.strictEqual(result.length, 64);
    });
  });
});
```

**Advantages:**
- No external dependencies (npm install)
- ESM/CommonJS compatible
- Async/await support
- Detailed assertion messages
- Runs with: `node --test *.test.js`

### 5.2 Test Patterns for Security Functions

#### Input Boundary Testing
```javascript
it('should handle null/undefined', () => {
  assert.strictEqual(validateFunctionNumber(null, 1, 50), null);
  assert.strictEqual(validateFunctionNumber(undefined, 1, 50), null);
});
```

#### Range Validation Testing
```javascript
it('should reject numbers outside range', () => {
  assert.strictEqual(validateFunctionNumber('0', 1, 50), null);
  assert.strictEqual(validateFunctionNumber('51', 1, 50), null);
});
```

#### Type Coercion Testing
```javascript
it('should reject non-numeric strings', () => {
  assert.strictEqual(validateFunctionNumber('abc', 1, 50), null);
  assert.strictEqual(validateFunctionNumber('1.5', 1, 50), null); // floats rejected
  assert.strictEqual(validateFunctionNumber('1e10', 1, 50), null); // scientific rejected
});
```

#### ReDoS (Regex Injection) Testing
```javascript
it('should escape special regex characters', () => {
  assert.strictEqual(escapeRegex('.'), '\\.');
  assert.strictEqual(escapeRegex('.*+?'), '\\.\\*\\+\\?');
  assert.strictEqual(escapeRegex('(test)'), '\\(test\\)');
});
```

### 5.3 Hook Testing via Stdin Injection
**From `.claude/hooks/README.md`:**

```bash
# Test session-init
echo '{"source":"startup","session_id":"test123"}' | node session-init.cjs

# Test progress-indicator
echo '{"tool_name":"Read","tool_parameters":{"file_path":"test.md"}}' | node progress-indicator.cjs

# Test path traversal protection (security)
echo '{"session_id":"../../../etc/passwd"}' | node session-init.cjs
# Should sanitize to safe value
```

**Pattern:** JSON serialization via stdin allows testing without modifying actual event sources.

### 5.4 Integration Testing Strategy (Not Yet Implemented)
**Based on codebase gaps, suggested patterns:**

1. **End-to-end hook testing:**
   - Mock Claude Code event sources
   - Invoke hooks with simulated input
   - Verify stdout/exit code

2. **Validation script integration:**
   - Create test fixtures (sample Whole.md functions)
   - Run validation scripts against fixtures
   - Assert pass/fail counts

3. **State persistence testing:**
   - Create temp .whole-progress.json
   - Load/save cycles
   - Verify timestamp injection

4. **CLI argument parsing:**
   - Test all edge cases (missing args, invalid ranges, type coercion)
   - Verify error messages

---

## 6. Real-World Implementation: Whole Knowledge Architecture

### 6.1 Hook Flow: Session Initialization
```
Claude Code SessionStart event
  ↓
session-init.cjs hook invoked with JSON stdin
  ↓
validateHookInput() → sanitizes session_id, validates structure
  ↓
loadProgress() from .whole-progress.json
  ↓
Display: "Progress: 8/50 (16%) | Next: CF2 | Branch: main"
  ↓
Suggest: "/regroup 2" command
  ↓
exit(0) → never blocks Claude
```

### 6.2 Validation Script Flow: validate-regroup.js
```
CLI: node validate-regroup.js 5
  ↓
initValidationScript('validate-regroup.js')
  ├─ validateFunctionNumber('5', 1, 50) → 5
  ├─ findWholemd() → path
  ├─ fs.readFileSync() → content
  └─ findFunctionSection(content, 5) → section
  ↓
validateFunction(5)
  ├─ validateTongQuan(lines) → { valid: true, ... }
  ├─ validateNumbering(lines) → { valid: true, count: 8, ... }
  ├─ validateBilingualGroups(lines) → { valid: true, count: 3, ... }
  └─ validateMarkdownFormat(lines) → { valid: true }
  ↓
Display: "[PASS] Tong Quan section: OK" + summary
  ↓
exit(0) on success, exit(1) on failure
```

### 6.3 Modularity in Practice
**Security fix propagation (example):**

1. Vulnerability found in `sanitizeSessionId()` (path traversal)
2. Fix applied to `.claude/skills/shared/utils/security.js`
3. Automatically used by:
   - `session-init.cjs` (hook)
   - `dev-rules-reminder.cjs` (hook)
   - `progress-indicator.cjs` (hook)
   - `validate-edit.cjs` (hook)
   - All validation scripts
   - All future skills
4. No duplicated code; single point of change

---

## Key Patterns & Best Practices Summary

### Hooks
- **Event-driven:** Fire on discrete Claude Code events
- **Stdin JSON contract:** Standardized JSON schema via stdin
- **Always exit(0):** Never block CLI operations
- **Idempotency guards:** Atomic check-and-set with `fs.writeFileSync(..., { flag: 'wx' })`
- **Silent errors:** DEBUG env controls logging; graceful degradation

### Validation
- **Three-layer defense:** Type, structure, range; path traversal; ReDoS
- **Whitelist approach:** Remove bad chars, don't blacklist
- **Type checking:** Explicit null for invalid types
- **String truncation:** Prevent buffer overflow
- **No throw:** Return null/false for invalid input

### State Management
- **File-based:** JSON in git repo (human-readable, auditable)
- **Auto-timestamps:** ISO8601 for all changes
- **Silent failures:** Return boolean, don't throw
- **Git integration:** Auto-fetch branch/status

### Modularity
- **Shared utilities:** Single source of truth
- **Re-export pattern:** Backward compatibility with automatic propagation
- **CLI helpers:** `initValidationScript()` eliminates boilerplate
- **Pure validators:** Testable, composable, reusable

### Testing
- **Built-in test runner:** Node.js v18+ native (no dependencies)
- **Boundary testing:** null, undefined, out-of-range
- **Type coercion testing:** Floats, scientific notation rejected
- **Security testing:** Path traversal, ReDoS patterns
- **Stdin injection:** Test hooks without event sources

---

## Technology Stack References

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Runtime | Node.js | 18+ | CLI execution, file system, child processes |
| Module System | CommonJS | - | `.cjs` files for hooks (ESM incompatibility) |
| Testing | Built-in `node:test` | v18+ | Unit tests, assertions |
| State | JSON files | - | Progress tracking, Git repo friendly |
| Validation | Custom regex | - | Input sanitization, ReDoS prevention |
| CLI Parsing | process.argv | - | Manual arg parsing (no commander/yargs) |
| Child Process | child_process.execSync | - | Git status/branch queries |
| File I/O | fs module | - | Whole.md parsing, progress persistence |

---

## Unresolved Questions

1. **Integration Testing:** Codebase lacks integration tests for hook chains and end-to-end flows. Suggested implementation: mock Claude Code event dispatcher.

2. **Performance Monitoring:** No metrics collection for hook execution time, file I/O latency, or memory usage. Consider `process.hrtime.bigint()` for precise timing.

3. **Concurrency Handling:** Progress file write may have race conditions under concurrent skill execution. Atomic file operations (temp + rename) recommended for production.

4. **Rollback Mechanism:** No way to revert progress if `saveProgress()` fails. Consider write-ahead logging or versioned progress files.

5. **CLI Framework:** Why not use commander.js or yargs for argument parsing? Manual `process.argv` works but lacks advanced features (subcommands, help generation).

6. **Env Variable Documentation:** `CLAUDE_HOOK_DEBUG` mentioned in code but not documented in README. Standard should be published.

7. **Hook Timeout:** No timeout mechanism if hook hangs. Consider `AbortController` or process timeout wrapper.

8. **Security Audit:** Comprehensive OWASP Top 10 review recommended (only path traversal, ReDoS, type coercion covered so far).

---

**Report prepared:** 2026-01-02 15:17 UTC | **Research method:** Codebase analysis + documentation review | **Sources:** Whole Knowledge Architecture project files
