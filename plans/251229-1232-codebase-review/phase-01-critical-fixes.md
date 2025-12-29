# Phase 1: Critical Fixes

**Status:** Pending
**Priority:** Critical
**Estimated Effort:** 1 hour
**Prerequisites:** None

---

## Context

Version inconsistencies across 4 files create user confusion and workflow failures. The whole-regrouper skill is at v5.0.0 but several files still reference v3.0.0 or v4.0.0.

---

## Overview

| Date | Priority | Status |
|------|----------|--------|
| 2025-12-29 | Critical | Pending |

---

## Key Insights

- SKILL.md declares v5.0.0 (source of truth)
- docs/*.md files correctly updated to v5.0.0
- .claude/*.md files still reference old versions
- Template and command files outdated

---

## Requirements

1. Update all version references to v5.0.0
2. Add /reconcile command to README.md
3. Update progress indicators (50/50 COMPLETE)

---

## Related Code Files

| File | Current | Target |
|------|---------|--------|
| `.claude/CLAUDE.md` | v4.0.0 | v5.0.0 |
| `.claude/README.md` | v3.0.0 | v5.0.0 |
| `.claude/commands/regroup.md` | v3.0.0 | v5.0.0 |
| `plans/templates/regroup-template.md` | v3.0.0 | v5.0.0 |

---

## Implementation Steps

### Step 1: Update .claude/CLAUDE.md (15 min)

**Lines to update:** 15, 23, 136

```markdown
# Line 15
- `whole-regrouper`: ... (v4.0.0 - Reconciliation)
+ `whole-regrouper`: ... (v5.0.0 - Intelligent Analysis)

# Line 23
- **whole-regrouper v4.0.0**: Now includes...
+ **whole-regrouper v5.0.0**: Intelligent Analysis - analyzes both representations

# Line 136
- `/reconcile [function-number]` - ... (v4.0.0)
+ `/reconcile [function-number]` - ... (v5.0.0)
```

### Step 2: Update .claude/README.md (15 min)

**Lines to update:** 25, 83, 96-105

```markdown
# Line 25
- │   └── whole-regrouper/          # Concept reorganization (v3.0.0)
+ │   └── whole-regrouper/          # Concept reorganization (v5.0.0)

# Line 83
- ### whole-regrouper (v3.0.0)
+ ### whole-regrouper (v5.0.0)

# Lines 96-105: Add /reconcile to command table
| `/reconcile [number]` | Intelligent Tổng Quan ↔ Content sync (v5.0.0) |

# Update progress
- | `/status` | Show current progress (37/50 functions) |
+ | `/status` | Show current progress (50/50 - COMPLETE) |
```

### Step 3: Update .claude/commands/regroup.md (5 min)

**Line to update:** 263

```markdown
- **Requires:** `whole-regrouper` skill v3.0.0+
+ **Requires:** `whole-regrouper` skill v5.0.0+
```

### Step 4: Update plans/templates/regroup-template.md (5 min)

**Line to update:** 239

```markdown
- **Required Skills:** whole-regrouper v3.0.0+
+ **Required Skills:** whole-regrouper v5.0.0+
```

### Step 5: Validate Changes (10 min)

```bash
# Verify no remaining old version references
grep -r "v3\.0\.0\|v4\.0\.0" .claude/ --include="*.md"
grep -r "whole-regrouper.*v[34]" . --include="*.md"

# Should return empty results
```

---

## Todo List

- [ ] Update .claude/CLAUDE.md (lines 15, 23, 136)
- [ ] Update .claude/README.md (lines 25, 83, 96-105)
- [ ] Update .claude/commands/regroup.md (line 263)
- [ ] Update plans/templates/regroup-template.md (line 239)
- [ ] Run validation grep commands
- [ ] Commit changes

---

## Success Criteria

- [ ] `grep -r "v3\.0\.0" .claude/` returns no results
- [ ] `grep -r "v4\.0\.0" .claude/` returns no results
- [ ] `/reconcile` command appears in README.md table
- [ ] Progress shows "50/50 - COMPLETE"

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Miss a file | Low | Medium | Run grep validation |
| Break skill activation | Very Low | High | Test /regroup after changes |

---

## Next Steps

After completing Phase 1:
- Proceed to [Phase 2: DRY Refactoring](./phase-02-dry-refactoring.md)
- Or commit and push changes
