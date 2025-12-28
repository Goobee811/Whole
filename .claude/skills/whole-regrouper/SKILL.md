---
name: whole-regrouper
description: |
  Phân tích, gom nhóm, và ĐỒNG BỘ (reconcile) giữa Tổng Quan listing và actual group headers.
  Detects inconsistencies between what Tổng Quan says vs what actual content shows.
  v4.0.0: Added reconciliation workflow for Tổng Quan ↔ Content sync.
version: 4.0.0
license: MIT
allowed-tools:
  - Edit
  - Grep
  - Read
  - Bash
metadata:
  author: "Whole Project"
  category: "documentation"
  updated: "2025-12-28"
---

# Whole Concept Regrouper & Reconciler

**v4.0.0** - Now includes reconciliation between Tổng Quan and actual content.

## The Problem This Solves

There are TWO representations of groups in each CHỨC NĂNG:

1. **Tổng Quan Listing** (at top):
   ```markdown
   ### **Tổng Quan**
   Bao gồm 44 khái niệm được tổ chức thành 7 nhóm chủ đề:
   1. **Core Emergence Principles** (8): Nguyên Lý Đột Sinh Cốt Lõi...
   2. **Chaos & Criticality Dynamics** (7): Động Lực Hỗn Loạn...
   ```

2. **Actual Group Headers** (in content):
   ```markdown
   ### **1. Foundational Axioms & Logic - Tiên Đề & Logic Nền Tảng**
   ### **2. Unity, Duality & Ultimate Reality - Thống Nhất, Nhị Nguyên...**
   ```

**Problem:** These two can be DIFFERENT - causing confusion!

---

## Two Workflows

### Workflow A: REGROUP (Original)
Bottom-up: Analyze concepts → Create new groups → Update both Tổng Quan + Headers

### Workflow B: RECONCILE (New in v4.0)
Sync existing: Compare Tổng Quan vs Headers → Fix mismatches → Choose source of truth

---

## Workflow B: RECONCILE (Step-by-Step)

### Step 1: 🔍 Parse Both Representations

**1.1 Parse Tổng Quan Listing:**
```markdown
Look for pattern after "nhóm chủ đề:" or "groups:"
1. **[English Name]** (N): [Vietnamese] - concept1, concept2...
2. **[English Name]** (N): [Vietnamese] - concept1, concept2...
```

Extract:
- Group number
- English name
- Concept count (N)
- Vietnamese name
- Listed concepts

**1.2 Parse Actual Headers:**
```markdown
Look for pattern: ### **[số]. [English] - [Vietnamese]**
```

Extract:
- Group number
- English name
- Vietnamese name
- Concepts under this header (count #### headings until next ###)

---

### Step 2: 🔎 Compare & Detect Mismatches

Create comparison table:

```markdown
| # | Tổng Quan Says | Actual Header Says | Match? |
|---|----------------|-------------------|--------|
| 1 | Core Emergence Principles (8) | Foundational Axioms & Logic | ❌ NO |
| 2 | Chaos & Criticality (7) | Unity, Duality & Reality | ❌ NO |
| 3 | System Stability (5) | Emergence & Creative Principles | ❌ NO |
...
```

**Mismatch Types:**
- **Name Mismatch**: Same position, different names
- **Count Mismatch**: Tổng Quan says 8, actual has 6
- **Missing Group**: Exists in one but not other
- **Order Mismatch**: Same groups, different order

---

### Step 3: 🎯 Choose Reconciliation Strategy

**OPTION A: Tổng Quan → Content (Tổng Quan is authoritative)**
- Update actual ### headers to match Tổng Quan listing
- Reorganize concepts to match Tổng Quan's groupings
- Use when: Tổng Quan was carefully designed, content drifted

**OPTION B: Content → Tổng Quan (Content is authoritative)**
- Update Tổng Quan listing to reflect actual headers
- Recalculate concept counts
- Use when: Content was recently regrouped correctly, Tổng Quan outdated

**OPTION C: Full Regroup (Neither is good)**
- Analyze concepts fresh
- Create new grouping logic
- Update BOTH Tổng Quan AND headers
- Use when: Both are inconsistent with actual content

---

### Step 4: ✍️ Execute Reconciliation

**For OPTION A (Tổng Quan → Content):**
1. Read Tổng Quan's group structure
2. For each group in Tổng Quan:
   - Create corresponding ### header
   - Move listed concepts under that header
   - Verify concept count matches
3. Renumber concepts continuously

**For OPTION B (Content → Tổng Quan):**
1. Read all ### headers and their concept counts
2. Regenerate Tổng Quan listing:
   ```markdown
   Bao gồm [N] khái niệm được tổ chức thành [M] nhóm chủ đề:

   1. **[Header 1 English]** ([count]): [Header 1 Vietnamese] - [concept list]
   2. **[Header 2 English]** ([count]): [Header 2 Vietnamese] - [concept list]
   ...
   ```
3. Preserve all other Tổng Quan content (intro paragraph)

**For OPTION C (Full Regroup):**
1. Follow original regroup workflow
2. Update BOTH representations simultaneously

---

### Step 5: ✅ Validate Sync

After reconciliation, verify:
- [ ] Tổng Quan group count = Actual ### header count
- [ ] Each Tổng Quan group name = Corresponding ### header name
- [ ] Tổng Quan concept counts match actual counts
- [ ] All concepts accounted for (no duplicates, no missing)

---

## Reconciliation Output Format

```markdown
📊 RECONCILIATION ANALYSIS: CHỨC NĂNG [N]

TỔNG QUAN SAYS:
1. [Group A] (8 concepts)
2. [Group B] (7 concepts)
...

ACTUAL HEADERS:
1. [Group X] (6 concepts)
2. [Group Y] (5 concepts)
...

MISMATCHES DETECTED: [N]
| Position | Tổng Quan | Actual | Issue |
|----------|-----------|--------|-------|
| 1 | Group A | Group X | Name differs |
...

RECOMMENDED: OPTION [A/B/C]
REASON: [Brief explanation]

Proceed with reconciliation? [Y/n]
```

---

## Critical Rules (Both Workflows)

### 🚨 MANDATORY: Atomic Read-Edit Pattern
**ALWAYS Read IMMEDIATELY before Edit - same turn, NO output in between.**

```
✅ ĐÚNG:  Read(Whole.md) → Edit(Whole.md)  [same turn]
❌ SAI:   Read(Whole.md) → [output] → Edit(Whole.md)  [fail risk]
```

### ✅ MUST PRESERVE
- All concept content (every word)
- → **Liên kết:** lines
- Markdown formatting

### ✅ MUST SYNC
- Tổng Quan listing ↔ Actual ### headers
- Group names (bilingual)
- Concept counts
- Concept numbering (continuous: 1, 2, 3...)

### ❌ NEVER
- Delete concepts
- Modify concept content
- Leave Tổng Quan ↔ Content out of sync

---

## Tổng Quan Format Standard

After reconciliation, Tổng Quan MUST follow this format:

```markdown
### **Tổng Quan**

[1-2 sentence description of this CHỨC NĂNG's purpose]

Bao gồm [N] khái niệm được tổ chức thành [M] nhóm chủ đề:

1. **[English Group Name]** ([count]): [Vietnamese Group Name] - [concept1], [concept2], [concept3]...
2. **[English Group Name]** ([count]): [Vietnamese Group Name] - [concept1], [concept2], [concept3]...
...

---
```

**Requirements:**
- Group number matches actual ### header number
- English name matches actual ### header English part
- Vietnamese name matches actual ### header Vietnamese part
- Count matches actual concept count under that header
- Concept list includes ALL concepts under that header

---

## Commands

- `/regroup [N]` - Full regroup workflow (analyze → new groups → update both)
- `/reconcile [N]` - Compare Tổng Quan vs Content, sync them

---

## References (Load as Needed)

- `references/workflow-steps.md` - Original regroup workflow
- `references/grouping-principles.md` - How to create good groups
- `references/naming-guidelines.md` - Bilingual naming rules
- `references/quality-checklist.md` - Validation checklists
- `references/robust-operations.md` - Error handling

---

**Version:** 4.0.0 (Added reconciliation for Tổng Quan ↔ Content sync)
