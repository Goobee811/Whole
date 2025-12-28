---
description: 🔄 Reconcile Tổng Quan ↔ Content mismatch for CHỨC NĂNG
argument-hint: [function-number]
---

## Purpose

Detect and fix inconsistencies between:
- **Tổng Quan listing** (group names at top)
- **Actual ### headers** (in content body)

---

## Quick Start

```bash
/reconcile 6     # Reconcile CHỨC NĂNG 6
/reconcile all   # Scan all 50, report mismatches
```

---

## Workflow

### Step 1: Grep CHỨC NĂNG location
```bash
# Find target function
Grep "## CHỨC NĂNG $ARG1:" Whole.md
# Find next function (to know where to stop)
Grep "## CHỨC NĂNG" Whole.md
```

### Step 2: Read and Parse

Read the CHỨC NĂNG section, then parse:

**A. Parse Tổng Quan:**
```
Pattern: [số]. **[English]** ([count]): [Vietnamese] - [concepts...]
```

**B. Parse Actual Headers:**
```
Pattern: ### **[số]. [English] - [Vietnamese]**
Count #### under each ### until next ###
```

### Step 3: Compare and Report

Output comparison table:

```markdown
📊 RECONCILIATION ANALYSIS: CHỨC NĂNG [N]

| # | Tổng Quan | Actual Header | Status |
|---|-----------|---------------|--------|
| 1 | Group A (8) | Group A (8) | ✅ MATCH |
| 2 | Group B (7) | Group X (5) | ❌ NAME + COUNT |
| 3 | Group C (5) | [missing] | ❌ MISSING |

SUMMARY:
- Matched: 1/3
- Mismatched: 2/3
- Issues: Name differs (1), Count differs (1), Missing (1)
```

### Step 4: User Decision

```markdown
Choose reconciliation strategy:

[A] Tổng Quan → Content
    Update actual headers to match Tổng Quan listing
    (Use when Tổng Quan is the authoritative source)

[B] Content → Tổng Quan
    Update Tổng Quan to match actual headers
    (Use when content was regrouped but Tổng Quan not updated)

[C] Full Regroup
    Analyze concepts fresh, create new groups for both
    (Use when neither representation is correct)

Enter choice [A/B/C]:
```

### Step 5: Execute

**For A:**
1. Read Tổng Quan groups
2. For each group, update ### header to match
3. Reorganize concepts if needed

**For B:**
1. Read all ### headers
2. Count concepts in each
3. Regenerate Tổng Quan listing

**For C:**
- Activate `/regroup [N]` workflow

### Step 6: Validate

After changes:
- [ ] Group count matches in both
- [ ] Group names identical
- [ ] Concept counts correct
- [ ] All concepts preserved

---

## Batch Mode: `/reconcile all`

Scan all 50 CHỨC NĂNGs, report status:

```markdown
📊 RECONCILIATION STATUS: ALL CHỨC NĂNGs

| CF# | Domain | Function | Status | Issues |
|-----|--------|----------|--------|--------|
| 1 | FOUNDATIONS | First Principles | ✅ | - |
| 2 | FOUNDATIONS | Universal Laws | ⚠️ | Count mismatch (2) |
| 6 | DYNAMICS | Emergence & Flow | ❌ | Name mismatch (5) |
...

SUMMARY:
- ✅ Synced: 35/50
- ⚠️ Minor issues: 10/50
- ❌ Major issues: 5/50

Recommended action: /reconcile 6, 12, 23, 31, 45
```

---

## Integration

- **Activates:** `whole-regrouper` skill (v4.0.0+)
- **Uses:** Grep, Read, Edit, Bash tools
- **Updates:** `.whole-progress.json` after reconciliation

---

## Examples

### Example 1: Single function
```
/reconcile 6

📊 RECONCILIATION: CHỨC NĂNG 6 - Emergence & Flow

TỔNG QUAN (7 groups):
1. Core Emergence Principles (8)
2. Chaos & Criticality Dynamics (7)
...

ACTUAL HEADERS (6 groups):
1. Foundational Axioms & Logic (6)
2. Unity, Duality & Reality (5)
...

❌ MISMATCH DETECTED
- Group count: 7 vs 6
- Names differ: All 6 positions

Recommended: [C] Full Regroup
```

### Example 2: Already synced
```
/reconcile 37

📊 RECONCILIATION: CHỨC NĂNG 37 - Force Multiplication

✅ ALREADY SYNCED
- Groups: 7/7 match
- Names: All match
- Counts: All match

No action needed.
```

---

## Error Handling

**If function not found:**
```
❌ CHỨC NĂNG [N] not found
Available: 1-50
```

**If Tổng Quan missing:**
```
⚠️ CHỨC NĂNG [N] has no Tổng Quan section
Action: Run /regroup [N] to create structure
```

**If no ### headers found:**
```
⚠️ CHỨC NĂNG [N] has no group headers
Content appears ungrouped. Run /regroup [N]
```

---

**Version:** 1.0.0
**Requires:** `whole-regrouper` skill v4.0.0+
