# Group Processing Workflow Steps

## Overview

Hướng dẫn chi tiết quy trình xử lý từng group trong Whole Knowledge Architecture.

---

## Phase 1: LOCATE - Xác định vị trí

### 1.1 Parse Identifier

```
Input: "1-1-3" hoặc "CF1-3"
Output:
  - Domain: 1 (FOUNDATIONS)
  - Function: 1 (CF1 - First Principles)
  - Group: 3 (Emergence & Creative Principles)
```

### 1.2 Find Group in Whole.md

```bash
# Tìm function header
Grep "## CHỨC NĂNG 1:" → Line number

# Tìm group header trong function
Grep "### 3. Emergence & Creative Principles" → Line number

# Đọc content
Read Whole.md với offset và limit phù hợp
```

### 1.3 Extract Group Content

```
Bao gồm:
- Group header (### N. Name - Tên)
- All concepts (#### **N. Concept Name**)
- Content until next group header
```

---

## Phase 2: ANALYZE - Phân tích

### 2.1 Count & Verify

| Metric | Check |
|--------|-------|
| Concept count | Matches Tổng Quan listing? |
| 4-point structure | All concepts have 4+ points? |
| Bilingual pairs | All terms have VN/EN? |
| Cross-references | Present and valid? |

### 2.2 Score Group Quality

```
Completeness:  ⭐⭐⭐⭐☆ (4/5)
  - All concepts present
  - Some missing 4-point structure

Structure:     ⭐⭐⭐⭐⭐ (5/5)
  - Proper formatting
  - Consistent headings

Cross-refs:    ⭐⭐⭐☆☆ (3/5)
  - Some links present
  - Missing bidirectional links

Overall:       Good - Minor improvements needed
```

### 2.3 Identify Action

| Condition | Recommended Action |
|-----------|-------------------|
| Concepts < 3 | [E] Expand |
| Descriptions mơ hồ | [R] Refine |
| Missing 4-points | [C] Complete |
| No cross-refs | [X] Cross-ref |
| All good | [V] Validate |

---

## Phase 3: PROCESS - Xử lý

### 3.1 Action: [E] Expand

**Khi nào:** Group có ít concepts hoặc thiếu coverage

**Quy trình:**
1. Identify missing sub-topics
2. Research related concepts
3. Draft new concepts với full 4-point structure
4. Add cross-references to existing concepts
5. Verify bilingual integrity

**Output format:**
```markdown
#### **[N]. New Concept Name - Tên Khái Niệm Mới**

[Mô tả ngắn về khái niệm]

- **[Term 1]**: [Vietnamese explanation]
- **[Term 2]**: [Vietnamese explanation]
- **[Term 3]**: [Vietnamese explanation]
- **[Term 4]**: [Vietnamese explanation]

→ **Liên kết:** [Cross-references]
```

### 3.2 Action: [R] Refine

**Khi nào:** Descriptions không rõ ràng hoặc thiếu depth

**Quy trình:**
1. Read existing descriptions carefully
2. Identify unclear or vague points
3. Enhance with:
   - Better definitions
   - Concrete examples
   - Clearer language
4. Maintain original meaning
5. Keep bilingual balance

### 3.3 Action: [C] Complete

**Khi nào:** Concepts thiếu 4-point structure

**Quy trình:**
1. List all concepts needing completion
2. For each concept:
   - Add missing bullet points
   - Ensure 4+ points
   - Add cross-references if missing
3. Verify format consistency

### 3.4 Action: [X] Cross-ref

**Khi nào:** Missing or outdated cross-references

**Quy trình:**
1. Analyze concept connections
2. Identify related concepts in other:
   - Groups (same function)
   - Functions (same domain)
   - Domains (cross-domain)
3. Add bidirectional links
4. Verify link validity

**Format:**
```markdown
→ **Liên kết:**
  - [Concept A] (CF5)
  - [Concept B] (DYNAMICS)
  - [Concept C] (OPERATIONS #12)
```

### 3.5 Action: [V] Validate

**Khi nào:** Group đã đầy đủ, chỉ cần confirm

**Quy trình:**
1. Final review of all points
2. Confirm 4-point structure
3. Verify cross-references work
4. Mark as validated
5. Update progress tracker

---

## Phase 4: EXECUTE - Thực thi

### 4.1 Apply Changes

```
1. Use Edit tool for modifications
2. Preserve existing content
3. Add new content appropriately
4. Maintain formatting consistency
```

### 4.2 Validate Changes

```
1. Re-read modified section
2. Check concept count
3. Verify 4-point structure
4. Test cross-references
```

### 4.3 Handle Errors

| Error | Resolution |
|-------|------------|
| Content deleted | Revert immediately, re-apply |
| Format broken | Fix formatting, re-validate |
| Count mismatch | Reconcile with Tổng Quan |
| Link broken | Fix or remove invalid link |

---

## Phase 5: UPDATE - Cập nhật

### 5.1 Update Progress Tracker

```json
{
  "1": {
    "name": "Group Name",
    "concepts": 4,
    "status": "completed",  // ← Update this
    "completedDate": "2026-01-03T19:40:00Z",
    "action": "R",  // Action taken
    "notes": "Refined 2 descriptions"
  }
}
```

### 5.2 Log Session

```json
{
  "date": "2026-01-03",
  "groupsProcessed": ["1-1-3", "1-1-4"],
  "actions": { "R": 1, "C": 1 },
  "conceptsAdded": 0,
  "time": "15m"
}
```

### 5.3 Suggest Next

```
Based on:
1. Sequential order (next pending)
2. Same function (group consistency)
3. Related topics (thematic flow)

Next suggested: 1-1-4 (Causality, Time & Transformation)
```

---

## Quick Commands

| Command | Action |
|---------|--------|
| `/group 1-1-3` | Process specific group |
| `/group CF1-3` | Process using CF format |
| `/group next` | Auto-suggest next |
| `/group-status` | View progress |
| `/group-status CF1` | View function progress |

---

## Tips & Best Practices

### Efficiency
- Process related groups together
- Use batch operations for similar actions
- Keep session notes for continuity

### Quality
- Read before editing (always)
- Preserve all existing content
- Maintain bilingual balance
- Verify cross-references

### Progress
- Update tracker immediately after completion
- Note learnings for future sessions
- Celebrate milestones! 🎉

---

**Version:** 1.0.0
