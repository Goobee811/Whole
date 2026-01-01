# Phase 3: DRY Improvements

**Priority**: MEDIUM
**Status**: PENDING
**Estimated Effort**: 2-3 hours

## Context
Recent refactoring eliminated most duplication. Remaining opportunities for further consolidation.

## Requirements

### 3.1 Extract Shared CLI Initialization
**Files**: 4 validation scripts have ~50 duplicated lines

Create `.claude/skills/shared/utils/cli-helpers.js`:
```javascript
/**
 * Shared CLI helpers for validation scripts
 */

function initValidationScript(scriptName, usage) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`Usage: node ${scriptName} <function-number>`);
    console.log(`Example: node ${scriptName} 1`);
    process.exit(1);
  }

  const funcNum = validateFunctionNumber(args[0], 1, 50);
  if (!funcNum) {
    console.error('Invalid function number. Must be 1-50.');
    process.exit(1);
  }

  const wholePath = findWholemd();
  const content = fs.readFileSync(wholePath, 'utf8');
  const section = findFunctionSection(content, funcNum);

  if (!section) {
    console.error(`Function ${funcNum} not found`);
    process.exit(1);
  }

  return { funcNum, content, section };
}

module.exports = { initValidationScript };
```

### 3.2 Standardize Validation Result Format
Create standard result structure:
```javascript
const ValidationResult = {
  valid: boolean,
  errors: string[],
  warnings: string[],
  stats: {
    checked: number,
    passed: number,
    failed: number
  }
};
```

### 3.3 Remove Re-exports from Parser
**File**: `.claude/skills/shared/utils/whole-md-parser.js:189-195`

Remove backward compatibility re-exports:
```javascript
// Remove these lines:
// COLORS,
// log,
// escapeRegex,
// MINIMUM_BULLET_POINTS,
// MAX_ACCEPTABLE_ERROR_RATE,
```

Update any consumers to import from index.js directly.

### 3.4 Extract Vietnamese Characters to Constants
**File**: `.claude/skills/shared/config/constants.js`

```javascript
// Vietnamese diacritics for validation
VIETNAMESE_CHARS_REGEX: /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i,
```

## Implementation Steps

- [ ] Create cli-helpers.js
- [ ] Update all 4 validation scripts
- [ ] Create ValidationResult type
- [ ] Remove parser re-exports
- [ ] Move Vietnamese regex to constants
- [ ] Test all scripts
- [ ] Commit: `refactor(dry): extract shared CLI helpers`

## Success Criteria
- CLI code deduplicated
- All scripts use shared helpers
- No functionality regressions
