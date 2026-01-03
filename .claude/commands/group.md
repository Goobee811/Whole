---
description: 📦 Process specific GROUP (D-F-G format, CFN-G format, or "next")
argument-hint: [identifier] [--pr|--commit|--dry]
---

## Identifier Parsing

Parse the provided identifier to determine target group:

### Format 1: `D-F-G` (Domain-Function-Group)
```
/group 1-1-3   → Domain 1, Function 1, Group 3
/group 2-3-5   → Domain 2, Function 8, Group 5
/group 10-5-8  → Domain 10, Function 50, Group 8
```

### Format 2: `CFN-G` (Function-Group)
```
/group CF1-3   → Function 1, Group 3
/group CF15-8  → Function 15, Group 8
/group CF50-1  → Function 50, Group 1
```

### Format 3: `next` (Auto-detect)
```
/group next    → Read .group-progress.json, suggest next pending group
```

---

## Flag Handling

| Flag | Effect |
|------|--------|
| `--pr` | Auto push, create PR, merge after completion |
| `--commit` | Commit only to current branch (no PR) |
| `--dry` | Dry run - analyze only, no changes |

---

## Pre-Work Checks

Before processing:

1. Parse $ARGUMENTS for identifier and flags
2. Check `.group-progress.json` exists (create if missing)
3. Validate identifier format (D-F-G, CFN-G, or "next")
4. Grep Whole.md to verify group exists
5. **Auto-activate** `whole-group-processor` skill

---

## Workflow Execution

### Step 1: Parse arguments
```javascript
const args = "$ARGUMENTS".split(" ");
const identifier = args[0]; // e.g., "1-1-3", "CF5-7", "next"
const flags = args.filter(a => a.startsWith("--")); // e.g., ["--pr"]
```

### Step 2: Resolve identifier
```javascript
if (identifier === "next") {
  // Read .group-progress.json
  // Find first pending group
  // Display: "Next suggested: CF{N}-{G} ({GroupName})"
} else if (identifier.startsWith("CF")) {
  // Parse CFN-G format: CF5-7 → function=5, group=7
} else {
  // Parse D-F-G format: 1-1-3 → domain=1, function=1, group=3
}
```

### Step 3: Locate group in Whole.md
```bash
# Grep for group header pattern
grep -n "#### GROUP [0-9]+:" Whole.md | grep "function ${functionNumber}"
# Read group content (concepts list)
```

### Step 4: Display context
```
[GROUP] CF{N}-{G} | {GroupName}
[DOMAIN] {DomainName}
[CONCEPTS] {count} concepts
[FLAGS] {flags or "none"}
```

### Step 5: Analyze group (if not --dry)
```
[ANALYZE]
├─ Completeness: ⭐⭐⭐⭐☆ (4/5)
├─ Structure:    ⭐⭐⭐⭐⭐ (5/5)
├─ Cross-refs:   ⭐⭐⭐☆☆ (3/5)
└─ Recommended:  [E|R|C|X|V]
```

### Step 6: Execute action
Based on analysis, perform one of:
- **[E] Expand** - Add new concepts
- **[R] Refine** - Improve descriptions
- **[C] Complete** - Fill 4-point structure
- **[X] Cross-ref** - Update links
- **[V] Validate** - Confirm complete

### Step 7: Apply flags
```javascript
if (flags.includes("--dry")) {
  // Output analysis only, no edits
} else if (flags.includes("--commit")) {
  // Commit to current branch
  git add Whole.md .group-progress.json
  git commit -m "docs(whole): process ${identifier}"
} else if (flags.includes("--pr")) {
  // Full PR flow
  git checkout -b claude/group-${identifier}-${timestamp}
  git add Whole.md .group-progress.json
  git commit -m "docs(whole): process ${identifier}"
  git push -u origin HEAD
  gh pr create --title "Process ${identifier}" --body "..."
  gh pr merge --auto --squash
  git checkout main && git pull
}
```

### Step 8: Update progress
```javascript
// Update .group-progress.json:
// - Add identifier to completedGroups[]
// - Update lastProcessed
// - Increment stats
```

### Step 9: Completion signal
```
[DONE] CF{N}-{G} processed
[PROGRESS] {completed}/{total} groups ({pct}%)
[NEXT] CF{N}-{G+1} ({NextGroupName})
```

---

## Error Handling

### If identifier invalid:
```
❌ Invalid identifier: "${identifier}"
   Valid formats: D-F-G (e.g., 1-1-3), CFN-G (e.g., CF5-7), or "next"
```

### If group not found:
```
❌ Group not found: ${identifier}
   Check Whole.md structure or run /group-status for available groups
```

### If already processed:
```
⚠️  Group ${identifier} already processed
    Last processed: ${timestamp}
    Continue anyway? [y/N]
```

---

## Examples

### Example 1: Process specific group
```bash
/group 1-1-3

# Output:
[GROUP] CF1-3 | Emergence & Creative Principles
[DOMAIN] FOUNDATIONS
[CONCEPTS] 4 concepts
[ANALYZE] Recommended: [X] Cross-ref
[EDIT] Adding links to DYNAMICS, CREATION
[DONE] CF1-3 processed | Progress: 48/371 (12.9%)
```

### Example 2: With PR flow
```bash
/group CF5-7 --pr

# Output:
[GROUP] CF5-7 | System Dynamics
[BRANCH] claude/group-CF5-7-260103
[EDIT] Done
[COMMIT] abc1234
[PR] #123 created
[MERGE] ✓ Merged
[DONE] Progress: 49/371 (13.2%)
```

### Example 3: Auto-detect next
```bash
/group next

# Output:
[NEXT] Suggested: CF5-8 (Feedback & Adaptation)
[GROUP] CF5-8
...
```

### Example 4: Dry run
```bash
/group 2-1-4 --dry

# Output:
[DRY RUN] No changes will be made
[GROUP] CF6-4 | Evolution Mechanisms
[ANALYZE]
├─ Completeness: ⭐⭐⭐☆☆ (3/5)
├─ Missing: 2 concepts need expansion
└─ Recommended: [E] Expand
[DRY RUN] Would add 2 concepts, update 3 cross-refs
```

---

## Integration

This command activates `whole-group-processor` skill v1.1.0.

**Escalation paths:**
- Group needs restructuring → `/regroup [function]`
- Duplicate concepts detected → `/analyze [function]`
- Major validation needed → `whole-reviewer` agent

---

## Output Format

**Token-efficient output** (no decorative ASCII):

```
[GROUP] CF5-7 | Name
[ANALYZE] Completeness: 4/5, Structure: 5/5, Cross-refs: 3/5
[ACTION] [X] Cross-ref
[EDIT] Done
[COMMIT] abc1234 (if --commit or --pr)
[DONE] 49/371 (13.2%) | Next: CF5-8
```

---

**Version:** 1.0.0
**Requires:** `whole-group-processor` skill v1.1.0+, `.group-progress.json`
