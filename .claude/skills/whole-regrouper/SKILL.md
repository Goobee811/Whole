---
name: whole-regrouper
description: |
  Phân tích, gom nhóm, và ĐỒNG BỘ (reconcile) giữa Tổng Quan listing và actual group headers.
  Works on ONE CHỨC NĂNG at a time (50 total, process sequentially).
  v4.1.0: Single-function workflow, removed batch mode.
version: 4.1.0
license: MIT
allowed-tools:
  - Edit
  - Grep
  - Read
  - Bash
metadata:
  author: "Whole Project"
  category: "documentation"
  updated: "2025-12-29"
---

# Whole Concept Regrouper & Reconciler v4.1

**Single-function workflow** - Process one CHỨC NĂNG at a time.

---

## The Problem

Each CHỨC NĂNG has TWO group representations that may be OUT OF SYNC:

```
TỔNG QUAN (top):                    ACTUAL HEADERS (content):
1. **Group A** (8): Nhóm A          ### **1. Group X - Nhóm X**
2. **Group B** (7): Nhóm B          ### **2. Group Y - Nhóm Y**
   ↑ DIFFERENT NAMES! ↑                ↑ DIFFERENT NAMES! ↑
```

---

## Single-Function Workflow

### Step 1: LOCATE
```bash
# Find CHỨC NĂNG N
Grep "## CHỨC NĂNG [N]:" Whole.md → line number

# Find next CHỨC NĂNG (to know boundary)
Grep "## CHỨC NĂNG [N+1]:" Whole.md → end boundary
```

### Step 2: READ & PARSE
```bash
Read Whole.md offset=[start] limit=[end-start]
```

**Parse Tổng Quan** (pattern after "nhóm chủ đề:"):
```
1. **[English]** ([count]): [Vietnamese] - [concepts...]
```

**Parse Actual Headers** (pattern):
```
### **[N]. [English] - [Vietnamese]**
```

**Count concepts** under each header (#### until next ###)

### Step 3: COMPARE
Output comparison table:
```
| # | Tổng Quan | Actual | Match |
|---|-----------|--------|-------|
| 1 | Group A (8) | Group X (6) | ❌ |
| 2 | Group B (7) | Group Y (5) | ❌ |
```

### Step 4: CHOOSE STRATEGY

**[B] Content → Tổng Quan** (RECOMMENDED - most common)
- Actual headers are correct, Tổng Quan outdated
- Update Tổng Quan to match actual headers

**[A] Tổng Quan → Content**
- Tổng Quan is authoritative
- Reorganize content to match Tổng Quan

**[C] Full Regroup**
- Both are wrong, need fresh analysis
- Use `/regroup [N]` workflow instead

### Step 5: EXECUTE (Option B - typical case)

**Generate new Tổng Quan from actual headers:**

```markdown
### **Tổng Quan**

[Keep existing intro paragraph]

Bao gồm [total] khái niệm được tổ chức thành [M] nhóm chủ đề:

1. **[Header1 English]** ([count]): [Header1 Vietnamese] - [concept1], [concept2]...
2. **[Header2 English]** ([count]): [Header2 Vietnamese] - [concept1], [concept2]...
...

---
```

### Step 6: EDIT & VALIDATE

```
Read(Whole.md, offset, limit) → Edit(Tổng Quan section) → Verify sync
```

---

## Critical Rules

### 🚨 Atomic Read-Edit
```
✅ Read → Edit (same turn)
❌ Read → [output] → Edit (will fail)
```

### ✅ MUST
- Preserve all concept content
- Match group names exactly (Tổng Quan ↔ Headers)
- Match concept counts exactly
- List ALL concepts in Tổng Quan listing

### ❌ NEVER
- Delete concepts
- Modify concept content
- Process multiple functions at once

---

## Progress Tracking

Track in `.whole-progress.json` or output:

```
RECONCILE PROGRESS:
✅ CF1-5 (FOUNDATIONS) - synced
✅ CF6-10 (DYNAMICS) - synced
⏳ CF11 (OPERATIONS) - in progress
⬚ CF12-50 - pending
```

**After each CF:**
```
✅ RECONCILE COMPLETE: CF[N]
- Groups: [M] synced
- Concepts: [total]
Next: CF[N+1]
```

---

## Commands

- `/reconcile [N]` - Reconcile single CHỨC NĂNG
- `/reconcile` - Auto-detect next pending (from progress)
- `/regroup [N]` - Full regroup (when reconcile isn't enough)

---

## Output Format (Token-efficient)

```
[RECONCILE] CF6 | DYNAMICS - Emergence & Flow
[READ] Lines 3534-4069 | 44 concepts, 7 groups
[PARSE] Tổng Quan: 7 groups | Actual: 6 headers
[COMPARE]
  #1: Core Emergence (8) vs Foundational Axioms (6) ❌
  #2: Chaos & Criticality (7) vs Unity & Duality (5) ❌
  ...
[STRATEGY] B - Content → Tổng Quan
[EDIT] Updated Tổng Quan to match 6 actual headers
[DONE] CF6 synced | Next: CF7
```

---

**Version:** 4.1.0 (Single-function workflow)
