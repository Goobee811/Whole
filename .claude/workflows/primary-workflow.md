# Primary Workflow for Whole Knowledge Architecture

This document outlines the main workflow for editing and expanding the Whole documentation.

## Workflow Overview

```
User Request -> Analyze -> Propose -> Approve -> Execute -> Validate -> Complete
```

## Step-by-Step Process

### 1. Receive Request

- Understand user intent clearly
- Identify target section (Domain, Function, Concept)
- Clarify scope of changes

### 2. Analyze Target Section

```bash
# Use grep to find target section
grep -n "CHUC NANG [number]" Whole.md

# Read specific lines with context
Read file with offset/limit
```

**Use `/analyze` command** for comprehensive analysis:
- Check existing content
- Identify gaps
- Find potential duplicates
- Map cross-references

### 3. Propose Changes

Present changes with:
- **What**: Specific content to add/modify
- **Why**: Rationale for changes
- **Where**: Exact location in document
- **Impact**: Cross-references affected

**Wait for explicit user approval before proceeding.**

### 4. Execute Changes

- Use Edit tool for modifications
- Preserve all existing content
- Maintain 4-point structure
- Update cross-references bidirectionally

### 5. Validate Results

Run validation checks:
```bash
node .claude/skills/whole-regrouper/scripts/validate-regroup.js [function-num]
```

Check:
- [ ] 4-point structure compliance
- [ ] Bilingual headers complete
- [ ] Cross-references valid
- [ ] Numbering sequential

### 6. Complete Task

- Summarize changes made
- List any pending items
- Update progress tracker if applicable

## Quick Reference

| Action | Command/Tool |
|--------|-------------|
| Analyze section | `/analyze [section]` |
| Start editing | `/edit [section]` |
| Add concepts | `/expand [domain] [function] [topic]` |
| Regroup function | `/regroup [number]` |
| Check status | `/status` |
| Validate | `/validate [section]` |

## Decision Tree

```
Is this a new concept?
|
+-- Yes -> Use /expand
|
+-- No -> Is this reorganization?
          |
          +-- Yes -> Use /regroup
          |
          +-- No -> Use /edit
```

## Important Reminders

1. **Never delete** without explicit approval
2. **Always validate** after changes
3. **Update cross-references** bidirectionally
4. **Use grep first** - Whole.md is >1MB
