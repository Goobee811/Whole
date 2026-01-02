# Shared Utilities Library

**Version:** 1.0.1
**Purpose:** DRY refactoring - Centralized utilities for all Whole skills, agents, and scripts
**Created:** 2025-12-29 (Phase 2 of codebase review)

## Overview

The `shared/` directory contains common utilities extracted from duplicated code across skill validation scripts. This library follows the **DRY (Don't Repeat Yourself)** principle, providing a single source of truth for:

- Configuration constants
- Display and formatting utilities
- Security and input validation
- Whole.md parsing operations
- CLI initialization helpers
- Type definitions

**Used by:** Skills (whole-editor, whole-regrouper, whole-reviewer), Agents (whole-content-validator, whole-cross-reference, whole-translator), Hooks, Scripts

## Directory Structure

```
shared/
├── config/
│   └── constants.js          # Configuration values (50+ constants)
├── types/
│   └── validation-result.js  # Validation result type system
├── utils/
│   ├── cli-helpers.js         # CLI script initialization
│   ├── display.js             # Terminal colors & formatting
│   ├── security.js            # Input validation & sanitization
│   └── whole-md-parser.js     # Whole.md parsing functions
├── index.js                   # Central export hub
└── README.md                  # This file
```

## Installation & Usage

### Basic Import

```javascript
// From any skill script:
const { COLORS, escapeRegex, findFunctionSection } = require('../shared');
```

### Import All Modules

```javascript
const shared = require('../shared');

// Access via namespace:
shared.TOTAL_FUNCTIONS        // 50
shared.colorize('text', 'red')
shared.findWholemd()
```

## Module Reference

### 1. **config/constants.js**

Centralized configuration values to eliminate magic numbers.

#### Structure Requirements
```javascript
MINIMUM_BULLET_POINTS: 4      // 4-point structure minimum
TOTAL_FUNCTIONS: 50            // Total CHỨC NĂNGs
TOTAL_DOMAINS: 10              // Total domains
FUNCTIONS_PER_DOMAIN: 5        // Functions per domain
```

#### Display Limits
```javascript
MAX_DISPLAY_LENGTH: 30         // Truncated string length
MAX_PATH_DISPLAY: 50           // Path display length
```

#### Validation Thresholds
```javascript
MAX_ACCEPTABLE_ERROR_RATE: 0.5    // Max error rate (50%)
IDEAL_GROUP_SIZE_MIN: 3            // Min concepts/group
IDEAL_GROUP_SIZE_MAX: 8            // Max concepts/group
```

#### Language Patterns
```javascript
VIETNAMESE_CHARS_REGEX            // Vietnamese diacritics validation
```

#### Security Limits
```javascript
MAX_SESSION_ID_LENGTH: 64         // Session ID max length
FUNCTION_NUMBER_MIN: 1            // Valid function range
FUNCTION_NUMBER_MAX: 50
```

#### File Paths
```javascript
WHOLE_MD_PATH: 'Whole.md'         // Main knowledge document
PROGRESS_FILE: '.whole-progress.json'
```

**Usage Example:**
```javascript
const { TOTAL_FUNCTIONS, IDEAL_GROUP_SIZE_MAX } = require('../shared');

if (groupSize > IDEAL_GROUP_SIZE_MAX) {
  console.warn(`Group too large: ${groupSize} > ${IDEAL_GROUP_SIZE_MAX}`);
}
```

---

### 2. **utils/display.js**

Terminal colors and formatting utilities with unit tests.

#### COLORS Object
```javascript
COLORS = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  reset: '\x1b[0m'
}
```

#### Functions

**`colorize(text, color)`**
```javascript
// Apply color to text
colorize('Success!', 'green')  // → '\x1b[32mSuccess!\x1b[0m'
colorize('Error!', 'red')       // → '\x1b[31mError!\x1b[0m'
```

**`log(message, color)`**
```javascript
// Log colored message to console
log('Processing...', 'cyan')   // → cyan colored output
log('Warning!', 'yellow')      // → yellow colored output
```

**`truncate(text, maxLength)`**
```javascript
// Truncate long text with ellipsis
truncate('Very long text here', 10)  // → 'Very lo...'
truncate('Short', 10)                 // → 'Short'
```

**Testing:** See `display.test.js` for 20+ unit tests

---

### 3. **utils/security.js**

Input validation and sanitization with unit tests.

#### Functions

**`sanitizeSessionId(sessionId)`**
```javascript
// Remove dangerous characters from session IDs
sanitizeSessionId('abc-123_xyz')      // → 'abc-123_xyz'
sanitizeSessionId('evil<script>')     // → 'evilscript'
sanitizeSessionId('a'.repeat(100))    // → (truncated to MAX_SESSION_ID_LENGTH)
```

**`validateHookInput(input)`**
```javascript
// Validate hook input is safe object
validateHookInput({ foo: 'bar' })     // → { foo: 'bar' }
validateHookInput(null)                // → throws Error
validateHookInput('string')            // → throws Error
```

**`validateFunctionNumber(value, min, max)`**
```javascript
// Parse and validate function number
validateFunctionNumber('42', 1, 50)   // → 42
validateFunctionNumber('abc', 1, 50)  // → null
validateFunctionNumber('99', 1, 50)   // → null (out of range)
```

**`escapeRegex(str)`**
```javascript
// Escape special regex characters
escapeRegex('test.md')                // → 'test\\.md'
escapeRegex('[group]')                // → '\\[group\\]'
```

**`handleError(error, context)`**
```javascript
// Standardized error handling with context
try {
  // risky operation
} catch (error) {
  handleError(error, 'validate-structure.js');
}
```

**Testing:** See `security.test.js` for comprehensive test coverage

---

### 4. **utils/whole-md-parser.js**

Whole.md parsing and analysis utilities with unit tests.

#### Functions

**`findWholemd(startDir)`**
```javascript
// Find Whole.md file in project
const path = findWholemd();  // → 'C:\\...\\Whole\\Whole.md'
```

**`getWholemdPath()`**
```javascript
// Get Whole.md absolute path
const path = getWholemdPath();  // → absolute path to Whole.md
```

**`findFunctionSection(content, funcNum)`**
```javascript
// Extract specific CHỨC NĂNG section
const content = fs.readFileSync('Whole.md', 'utf8');
const section = findFunctionSection(content, 42);
// → Returns full text of CF42 section
```

**`extractConcepts(section)`**
```javascript
// Extract concept headers (bilingual)
const concepts = extractConcepts(section);
// → ['1. Concept Name - Tên Khái Niệm', '2. Another - Khác', ...]
```

**`extractConceptsWithContent(section)`**
```javascript
// Extract concepts with full content
const concepts = extractConceptsWithContent(section);
// → [{ title: '1. Name - Tên', content: '...' }, ...]
```

**`extractHeaders(content)`**
```javascript
// Extract all section headers from Whole.md
const headers = extractHeaders(content);
// → { domain: '1. FOUNDATIONS', function: 'CF01', ... }
```

**`validateBilingualFormat(text)`**
```javascript
// Check if text follows bilingual format
validateBilingualFormat('Name - Tên')     // → true
validateBilingualFormat('Only English')   // → false
```

**Testing:** See `whole-md-parser.test.js` for parser validation

---

### 5. **utils/cli-helpers.js**

CLI script initialization helpers to reduce boilerplate.

#### Functions

**`initValidationScript(scriptName)`**

Handles common setup for validation scripts:
1. Parse command-line arguments
2. Validate function number
3. Find and read Whole.md
4. Extract target function section
5. Return initialized context

```javascript
// In any validation script:
const { initValidationScript } = require('../shared');

const { funcNum, content, section } = initValidationScript('bilingual-check.js');

// Now you have:
// - funcNum: validated function number (1-50)
// - content: full Whole.md contents
// - section: extracted function section text

// Continue with validation logic...
```

**Before (duplicated in every script):**
```javascript
const args = process.argv.slice(2);
if (args.length === 0) { /* usage */ }
const funcNum = parseInt(args[0]);
if (isNaN(funcNum) || funcNum < 1 || funcNum > 50) { /* error */ }
const wholePath = findWholemd();
const content = fs.readFileSync(wholePath, 'utf8');
const section = findFunctionSection(content, funcNum);
// 20+ lines of boilerplate!
```

**After (with cli-helpers):**
```javascript
const { funcNum, content, section } = initValidationScript('my-script.js');
// 1 line!
```

---

### 6. **types/validation-result.js**

Type system for validation results (standardized format).

#### Functions

**`createValidationResult(isValid, errors, warnings, context)`**
```javascript
// Create standardized validation result object
const result = createValidationResult(
  true,                    // isValid
  [],                      // errors (array)
  ['Minor issue'],         // warnings (array)
  { funcNum: 42 }          // context (optional)
);

// Returns:
// {
//   isValid: true,
//   errors: [],
//   warnings: ['Minor issue'],
//   context: { funcNum: 42 },
//   timestamp: '2025-12-29T...'
// }
```

**`mergeValidationResults(...results)`**
```javascript
// Combine multiple validation results
const result1 = createValidationResult(true, [], ['Warning 1']);
const result2 = createValidationResult(false, ['Error 1'], []);

const merged = mergeValidationResults(result1, result2);

// Returns:
// {
//   isValid: false,              // false if any result is invalid
//   errors: ['Error 1'],
//   warnings: ['Warning 1'],
//   context: { merged: true }
// }
```

---

## Integration Examples

### Example 1: Validation Script

```javascript
// .claude/skills/whole-editor/scripts/validate-structure.js
const {
  initValidationScript,
  MINIMUM_BULLET_POINTS,
  extractConcepts,
  log,
  createValidationResult
} = require('../../shared');

// Initialize (1 line instead of 20!)
const { funcNum, content, section } = initValidationScript('validate-structure.js');

log(`Validating CF${funcNum}...`, 'cyan');

// Extract and validate concepts
const concepts = extractConcepts(section);
const errors = [];

concepts.forEach(concept => {
  const bulletCount = (concept.match(/^-\s/gm) || []).length;
  if (bulletCount < MINIMUM_BULLET_POINTS) {
    errors.push(`Concept "${concept}" has only ${bulletCount} points`);
  }
});

// Report results
const result = createValidationResult(
  errors.length === 0,
  errors,
  [],
  { funcNum, totalConcepts: concepts.length }
);

if (result.isValid) {
  log('✓ All concepts have minimum 4 points', 'green');
} else {
  log(`✗ Found ${errors.length} issues`, 'red');
}
```

### Example 2: Hook Integration

```javascript
// .claude/hooks/progress-indicator.cjs
const {
  TOTAL_FUNCTIONS,
  COLORS,
  colorize,
  sanitizeSessionId
} = require('../skills/shared');

function showProgress(sessionId) {
  const safe = sanitizeSessionId(sessionId);
  const completed = 42;
  const percent = Math.round((completed / TOTAL_FUNCTIONS) * 100);

  console.log(colorize(`Progress: ${completed}/${TOTAL_FUNCTIONS} (${percent}%)`, 'cyan'));
}
```

### Example 3: Skill Script

```javascript
// .claude/skills/whole-regrouper/scripts/validate-regroup.js
const {
  initValidationScript,
  validateBilingualFormat,
  extractHeaders,
  IDEAL_GROUP_SIZE_MIN,
  IDEAL_GROUP_SIZE_MAX,
  handleError,
  log
} = require('../../shared');

try {
  const { funcNum, section } = initValidationScript('validate-regroup.js');

  // Validate group names are bilingual
  const headers = extractHeaders(section);
  headers.forEach(header => {
    if (!validateBilingualFormat(header)) {
      log(`Warning: "${header}" is not bilingual`, 'yellow');
    }
  });

  // Validate group sizes
  // ... (group size validation logic)

} catch (error) {
  handleError(error, 'validate-regroup.js');
  process.exit(1);
}
```

### Example 4: Agent Integration (v2.1.0)

```javascript
// .claude/agents/whole-content-validator.md
// Agents reference shared utilities in their prompts:

const { initValidationScript, MINIMUM_BULLET_POINTS } = require('./.claude/skills/shared');
const { funcNum, content, section } = initValidationScript('whole-content-validator');

// Phase 1: Initialization using shared utilities
// Phase 2: Execute validation scripts
// Phase 3: Manual analysis with shared parsing functions
// Phase 4: Report generation

// Agents use:
// - initValidationScript() for setup
// - MINIMUM_BULLET_POINTS for validation
// - validateBilingualFormat() for format checking
// - extractConcepts() for parsing
// - handleError() for error handling
```

---

## Testing

All utility modules include unit tests:

```bash
# Run all tests
npm test

# Run specific module tests
node .claude/skills/shared/utils/display.test.js
node .claude/skills/shared/utils/security.test.js
node .claude/skills/shared/utils/whole-md-parser.test.js
```

**Test Coverage:**
- `display.test.js`: 20+ tests (colorize, log, truncate)
- `security.test.js`: 25+ tests (sanitize, validate, escape)
- `whole-md-parser.test.js`: 15+ tests (find, extract, validate)

---

## Design Principles

### 1. **Single Responsibility**
Each module has one clear purpose:
- `constants.js`: Configuration only
- `display.js`: Visual formatting only
- `security.js`: Validation only
- `whole-md-parser.js`: Parsing only
- `cli-helpers.js`: CLI setup only

### 2. **DRY (Don't Repeat Yourself)**
Eliminates code duplication:
- **Before:** 20+ lines of CLI setup in every script
- **After:** 1 line with `initValidationScript()`

### 3. **Fail-Fast Validation**
Input validation throws errors immediately:
```javascript
validateFunctionNumber('abc', 1, 50);  // → null (invalid)
validateHookInput(null);               // → throws Error
```

### 4. **Immutability**
Constants are frozen to prevent modification:
```javascript
const { TOTAL_FUNCTIONS } = require('../shared');
TOTAL_FUNCTIONS = 100;  // ❌ TypeError: Cannot assign to read only property
```

### 5. **Testability**
All utilities are pure functions with unit tests:
- No side effects
- Deterministic outputs
- Easy to mock and test

---

## Migration Guide

### Before DRY Refactoring

Each skill had duplicated code:

```javascript
// whole-editor/scripts/bilingual-check.js (50 lines)
const fs = require('fs');
const MINIMUM_BULLET_POINTS = 4;
const TOTAL_FUNCTIONS = 50;
// ... 20 lines of CLI setup ...
// ... 10 lines of file finding ...
// ... 15 lines of parsing logic ...
```

```javascript
// whole-regrouper/scripts/validate-regroup.js (45 lines)
const fs = require('fs');
const MINIMUM_BULLET_POINTS = 4;  // DUPLICATED!
const TOTAL_FUNCTIONS = 50;        // DUPLICATED!
// ... 20 lines of CLI setup ...   // DUPLICATED!
// ... 10 lines of file finding ... // DUPLICATED!
```

### After DRY Refactoring

```javascript
// whole-editor/scripts/bilingual-check.js (15 lines)
const { initValidationScript, MINIMUM_BULLET_POINTS } = require('../../shared');
const { funcNum, section } = initValidationScript('bilingual-check.js');
// ... validation logic only ...
```

```javascript
// whole-regrouper/scripts/validate-regroup.js (12 lines)
const { initValidationScript, MINIMUM_BULLET_POINTS } = require('../../shared');
const { funcNum, section } = initValidationScript('validate-regroup.js');
// ... validation logic only ...
```

**Result:** 70% code reduction + improved maintainability

---

## Changelog

### v1.0.1 (2026-01-02)
- 📝 Documentation update for agents v2.1.0 integration
- ✨ Added agent integration example
- 📚 Updated "Used by" section (added agents, whole-reviewer v2.1.0)
- 🔗 Agents (whole-content-validator, whole-cross-reference, whole-translator) now reference shared utilities

### v1.0.0 (2025-12-29)
- ✨ Initial release
- 📦 Extracted from whole-editor, whole-regrouper validation scripts
- ✅ 60+ unit tests
- 📚 Comprehensive documentation
- 🔒 Security hardening (input validation, sanitization)
- 🎨 Terminal color utilities
- 📊 Standardized validation result types

---

## Contributing

When adding new utilities:

1. **Choose the right module**
   - Configuration → `config/constants.js`
   - Display/formatting → `utils/display.js`
   - Validation/security → `utils/security.js`
   - Parsing → `utils/whole-md-parser.js`
   - CLI setup → `utils/cli-helpers.js`

2. **Add unit tests**
   - Create `[module].test.js`
   - Test edge cases and error conditions
   - Ensure 100% coverage

3. **Update exports**
   - Add to module's `module.exports`
   - Add to `index.js` central export
   - Document in this README

4. **Document usage**
   - JSDoc comments in code
   - Usage examples in README
   - Update integration examples

---

## FAQ

**Q: Why not use a third-party library?**
A: These utilities are specific to Whole's architecture and conventions. External libraries would add dependencies and complexity.

**Q: Can I use these utilities outside .claude/skills/?**
A: Yes! Import from hooks, scripts, or any Node.js file:
```javascript
const shared = require('./.claude/skills/shared');
```

**Q: What if a constant needs to change?**
A: Update `config/constants.js` once, and all scripts automatically use the new value.

**Q: How do I add a new constant?**
A: Add to `constants.js`, export from `index.js`, document in this README.

**Q: Why separate `types/` directory?**
A: Type definitions may grow (e.g., ConceptType, GroupType). Separating now prevents future refactoring.

---

## Related Documentation

- **Skill Development:** `.claude/workflows/development-rules.md`
- **Validation Protocols:** `.claude/workflows/quality-assurance.md`
- **Whole.md Structure:** `.claude/CLAUDE.md`
- **Hook System:** `.claude/hooks/README.md`
- **Agents (v2.1.0):** `.claude/agents/` (whole-content-validator, whole-cross-reference, whole-translator)
- **Commands:** `.claude/commands/` (/validate, /edit integration)

---

**Status:** ✅ Production-ready (v1.0.1)
**Maintainer:** Whole Project Team
**Last Updated:** 2026-01-02
