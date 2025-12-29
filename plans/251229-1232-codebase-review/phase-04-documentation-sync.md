# Phase 4: Documentation Sync

**Status:** Complete
**Priority:** Medium
**Estimated Effort:** 1 hour
**Prerequisites:** Phase 1 Complete

---

## Context

Documentation files have content duplication (~10%) and redundancy in workflows (~25%). Some files reference outdated progress or missing scripts.

---

## Overview

| Date | Priority | Status |
|------|----------|--------|
| 2025-12-29 | Medium | Pending |

---

## Key Insights

- ~300-400 lines duplicated across 11 docs files
- 3 validation scripts referenced but don't exist
- IMPROVEMENTS-2025-12-16.md needs historical context
- Terminology inconsistencies (CHỨC NĂNG vs CF vs Function)

---

## Requirements

1. Add historical context to IMPROVEMENTS-2025-12-16.md
2. Create hooks README.md documentation
3. Update quality-assurance.md for missing scripts
4. Add navigation sections to key docs

---

## Related Code Files

**Docs to update:**
- `docs/IMPROVEMENTS-2025-12-16.md`
- `docs/quality-assurance.md` (or workflow file)
- `.claude/hooks/README.md` (new)
- `.claude/workflows/README.md` (new)

---

## Implementation Steps

### Step 1: Add Historical Context (10 min)

**File:** `docs/IMPROVEMENTS-2025-12-16.md`

Add at top after title:

```markdown
# ClaudeKit Improvements Applied to Whole Repository

> **HISTORICAL DOCUMENT** - Captures initial implementation (2025-12-16)
> - Project status at time: 4/50 functions (8% complete)
> - Current status: 50/50 functions (100% complete as of 2025-12-27)
> - For current status, see: [Project Overview](./project-overview-pdr.md)

**Date:** 2025-12-16
...
```

### Step 2: Create Hooks README (15 min)

**Create:** `.claude/hooks/README.md`

```markdown
# Claude Hooks System

Hook scripts that fire on Claude Code events.

## Hook Types

| Hook File | Event | Purpose | Exit Code |
|-----------|-------|---------|-----------|
| session-init.cjs | SessionStart | Display progress, rules | Always 0 |
| dev-rules-reminder.cjs | UserPromptSubmit | Inject context | Always 0 |
| progress-indicator.cjs | PostToolUse | Tool feedback | Always 0 |
| validate-edit.cjs | PostToolUse | Whole.md validation | Always 0 |

## Shared Utilities

`lib/ck-config-utils.cjs` provides:
- `loadProgress()` - Load .whole-progress.json
- `getGitBranch()` - Get current git branch
- `sanitizeSessionId()` - Sanitize session ID for filesystem
- `validateHookInput()` - Validate JSON input structure

## Testing Hooks

```bash
# Test session-init
echo '{"source":"startup","session_id":"test123"}' | node session-init.cjs

# Test progress-indicator
echo '{"tool_name":"Read","tool_parameters":{"file_path":"test.md"}}' | node progress-indicator.cjs
```

## Stdin Contract

All hooks receive JSON via stdin:
- `source` (string): Event source (startup/resume/clear)
- `session_id` (string): Unique session identifier
- `tool_name` (string): Tool that executed
- `tool_parameters` (object): Tool parameters

## Error Handling

All hooks exit(0) to prevent blocking Claude operations. Errors are logged to stderr when `CLAUDE_HOOK_DEBUG=1`.

```bash
CLAUDE_HOOK_DEBUG=1 echo '{}' | node session-init.cjs
```
```

### Step 3: Create Workflows README (15 min)

**Create:** `.claude/workflows/README.md`

```markdown
# Whole Project Workflows

Navigation hub for workflow documentation.

## Workflow Quick Reference

| Workflow | Purpose | When to Use |
|----------|---------|-------------|
| [primary-workflow.md](./primary-workflow.md) | Main operational workflow | New to Whole project |
| [editing-workflow.md](./editing-workflow.md) | Content editing process | Editing Whole.md |
| [quality-assurance.md](./quality-assurance.md) | QA validation | Before commit |
| [development-rules.md](./development-rules.md) | Dev principles | Reference |

## Common Tasks

**Adding new content:**
1. Start with primary-workflow.md
2. Follow editing-workflow.md for changes
3. Run quality-assurance.md before commit

**Regrouping functions:**
1. Use `/regroup [number]` command
2. See [skill-reference.md](../docs/skill-reference.md) for details

**Reconciling mismatches:**
1. Use `/reconcile [number]` command
2. Follow intelligent analysis recommendations

## Cross-References

- [Skill Reference](../docs/skill-reference.md) - Detailed skill docs
- [Troubleshooting](../docs/troubleshooting.md) - Common issues
- [Project Roadmap](../docs/project-roadmap.md) - Future plans
```

### Step 4: Update Quality Assurance for Missing Scripts (10 min)

**File:** `.claude/workflows/quality-assurance.md`

Find script references and update:

```markdown
## Validation Scripts

| Script | Purpose | Status |
|--------|---------|--------|
| `validate-regroup.js` | Regroup validation | ✅ Available |
| `validate-structure.js` | 4-point structure check | ⚠️ Planned |
| `check-cross-refs.js` | Reference validation | ⚠️ Planned |
| `bilingual-check.js` | Bilingual compliance | ⚠️ Planned |

### Available Validation

```bash
# Full function validation (working)
node .claude/skills/whole-regrouper/scripts/validate-regroup.js [num]
```

### Manual Checks (until scripts implemented)

- **Structure**: Review 4-point format manually
- **Cross-refs**: Verify links in context during edit
- **Bilingual**: Check headers during /edit
```

### Step 5: Validate Changes (10 min)

```bash
# Check new files exist
ls -la .claude/hooks/README.md
ls -la .claude/workflows/README.md

# Verify historical context added
head -20 docs/IMPROVEMENTS-2025-12-16.md
```

---

## Todo List

- [ ] Add historical context to IMPROVEMENTS-2025-12-16.md
- [ ] Create .claude/hooks/README.md
- [ ] Create .claude/workflows/README.md
- [ ] Update quality-assurance.md script references
- [ ] Validate all changes
- [ ] Commit changes

---

## Success Criteria

- [ ] IMPROVEMENTS-2025-12-16.md has historical context banner
- [ ] .claude/hooks/README.md exists with hook documentation
- [ ] .claude/workflows/README.md exists as navigation hub
- [ ] Script availability accurately documented

---

## Next Steps

After completing Phase 4:
- Proceed to [Phase 5: Polish & Testing](./phase-05-polish-testing.md)
