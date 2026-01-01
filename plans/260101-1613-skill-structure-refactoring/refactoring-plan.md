# Skill Structure Refactoring Plan

**Date**: 2026-01-01
**Type**: Refactoring
**Scope**: `.claude/skills/` and `.claude/hooks/` directories
**Context Tokens**: ~150 words
**Status**: COMPLETED

## Executive Summary
Consolidate duplicated utilities, establish clear separation of concerns, and create consistent patterns across all skills. Current structure has utilities scattered between hooks and skills with duplicated code.

## Current State Analysis

### Issues with Current Implementation
- [x] **Issue 1**: COLORS defined in 2 places (`whole-md-parser.js` + `ck-config-utils.cjs`)
- [x] **Issue 2**: Security utilities in `hooks/lib/` but used by `skills/` scripts
- [x] **Issue 3**: `validate-regroup.js` redefines `findFunctionBoundaries` instead of using shared `findFunctionSection`
- [x] **Issue 4**: Constants duplicated (`MINIMUM_BULLET_POINTS` in parser.js AND constants.js)
- [x] **Issue 5**: No consistent entry point pattern for skills

### Current File Structure
```
.claude/
├── hooks/
│   ├── lib/
│   │   └── ck-config-utils.cjs     # Mixed: progress + security + git
│   ├── session-init.cjs
│   ├── progress-indicator.cjs
│   ├── validate-edit.cjs
│   └── dev-rules-reminder.cjs
└── skills/
    ├── shared/
    │   ├── config/constants.js      # Structure constants
    │   └── utils/whole-md-parser.js # Parsing utilities + COLORS
    ├── whole-analyzer/SKILL.md
    ├── whole-editor/
    │   ├── SKILL.md
    │   ├── references/
    │   └── scripts/
    ├── whole-reviewer/SKILL.md
    └── whole-regrouper/
        ├── SKILL.md
        ├── references/
        └── scripts/
```

### Metrics (Before)
- **Code Duplication**: COLORS (2x), escapeRegex (2x), constants (2x)
- **Import Depth**: 3-4 levels (`../../../hooks/lib/`)
- **Files with Utils**: 6 files with mixed utilities

## Context Links
- **Affected Modules**: `skills/shared/`, `hooks/lib/`, all validation scripts
- **Dependencies**: Node.js fs, path, child_process
- **Related Documentation**: `.claude/CLAUDE.md`

## Refactoring Strategy

### Approach
Establish `skills/shared/` as single source of truth for all utilities. Hooks import from skills/shared, not vice versa. Clear separation: parsing vs security vs display.

### Architecture Changes

**Before:**
```
hooks/lib/ck-config-utils.cjs ← skills/scripts import (wrong direction)
skills/shared/utils/           ← partial utilities
```

**After:**
```
skills/shared/
├── utils/
│   ├── whole-md-parser.js   # Parsing only
│   ├── display.js           # COLORS, formatting
│   └── security.js          # Input validation, sanitization
├── config/
│   └── constants.js         # All constants
└── index.js                 # Re-exports everything

hooks/lib/
└── hook-utils.cjs           # Hook-specific only (progress, git)
                             # Imports from skills/shared/
```

### Key Improvements
- **Single Source of Truth**: All shared code in `skills/shared/`
- **Clear Import Direction**: hooks → skills/shared (never reverse)
- **Separation of Concerns**: parsing | security | display | config

## Implementation Plan

### Phase 1: Consolidate Shared Utilities
**Scope**: Create proper module structure in skills/shared/

1. [x] Create `skills/shared/utils/display.js` - Extract COLORS and formatting
   - file: `.claude/skills/shared/utils/display.js`
2. [x] Create `skills/shared/utils/security.js` - Move from ck-config-utils
   - file: `.claude/skills/shared/utils/security.js`
3. [x] Update `skills/shared/config/constants.js` - Add all constants
   - file: `.claude/skills/shared/config/constants.js`
4. [x] Clean `whole-md-parser.js` - Remove COLORS, import from display.js
   - file: `.claude/skills/shared/utils/whole-md-parser.js`
5. [x] Create `skills/shared/index.js` - Central export
   - file: `.claude/skills/shared/index.js`

### Phase 2: Update Consumers
**Scope**: Fix all import paths

1. [x] Update `validate-regroup.js` - Use findFunctionSection
   - file: `.claude/skills/whole-regrouper/scripts/validate-regroup.js`
2. [x] Update `bilingual-check.js` - Import from shared/
   - file: `.claude/skills/whole-editor/scripts/bilingual-check.js`
3. [x] Update `validate-structure.js` - Import from shared/
   - file: `.claude/skills/whole-editor/scripts/validate-structure.js`
4. [x] Update `check-cross-refs.js` - Import from shared/
   - file: `.claude/skills/whole-editor/scripts/check-cross-refs.js`

### Phase 3: Refactor Hooks
**Scope**: Clean up hooks/lib/

1. [x] Slim `ck-config-utils.cjs` - Keep only hook-specific (progress, git)
   - file: `.claude/hooks/lib/ck-config-utils.cjs`
2. [x] Update hook imports - Point to skills/shared/
   - files: All hooks in `.claude/hooks/`
3. [x] Test all hooks still work

### Phase 4: Validation & Cleanup
**Scope**: Verify everything works

1. [x] Run all validation scripts
2. [x] Test hooks with Claude
3. [x] Remove dead code
4. [x] Update any documentation

## Backward Compatibility
- **Breaking Changes**: Import paths change (internal only)
- **Migration Path**: Update imports, functionality unchanged
- **Deprecation Timeline**: N/A (internal refactoring)

## Success Metrics (After)
- **Code Duplication**: 0 duplicated utilities
- **Import Depth**: Max 2 levels (`../../shared/`)
- **Single Source**: All utilities from `skills/shared/`

## Risk Assessment
| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking imports | Medium | Test each file after update |
| CJS/ESM conflicts | Low | Keep CJS for hooks, ESM for skills |
| Missing exports | Low | Create index.js with all exports |

## New File Structure (Target)
```
.claude/
├── hooks/
│   ├── lib/
│   │   └── hook-utils.cjs      # ONLY: progress, git, hook-specific
│   └── *.cjs                   # Hooks (unchanged)
└── skills/
    └── shared/
        ├── index.js            # NEW: Central export
        ├── config/
        │   └── constants.js    # UPDATED: All constants
        └── utils/
            ├── display.js      # NEW: COLORS, colorize, log
            ├── security.js     # NEW: From ck-config-utils
            └── whole-md-parser.js  # UPDATED: Parsing only
```

## Estimated Changes
- **New Files**: 3 (display.js, security.js, index.js)
- **Modified Files**: 7 (parser, constants, 4 scripts, ck-config-utils)
- **Deleted Code**: ~50 lines of duplicates
