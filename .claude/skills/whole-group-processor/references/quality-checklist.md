# Group Processing Quality Checklist

## Pre-Processing Checklist

### ☐ Identification
- [ ] Group identifier parsed correctly (D-F-G format)
- [ ] Group location found in Whole.md
- [ ] Content boundaries identified (start/end lines)

### ☐ Content Review
- [ ] Current concept count noted
- [ ] Compared with Tổng Quan listing
- [ ] Existing cross-references mapped

### ☐ Gap Analysis
- [ ] Missing concepts identified (if any)
- [ ] Incomplete 4-point structures noted
- [ ] Missing bilingual pairs flagged
- [ ] Cross-reference gaps detected

---

## During Processing Checklist

### ☐ Content Integrity
- [ ] **Only Add, Never Subtract** - No content deleted
- [ ] Existing concepts preserved exactly
- [ ] Format consistency maintained

### ☐ Structure Compliance

#### Concept Format
```markdown
#### **[N]. English Name - Tên Tiếng Việt**

[Mô tả ngắn về khái niệm]

- **[Term 1]**: [Vietnamese explanation]
- **[Term 2]**: [Vietnamese explanation]
- **[Term 3]**: [Vietnamese explanation]
- **[Term 4]**: [Vietnamese explanation]
- ... (minimum 4, can have more)

→ **Liên kết:** [Cross-references]
```

- [ ] Heading follows `#### **N. Name - Tên**` format
- [ ] Short description present
- [ ] Minimum 4 bullet points
- [ ] Each bullet: `**English**: Vietnamese`
- [ ] Cross-reference section present

### ☐ Bilingual Requirements
- [ ] Concept name: English - Vietnamese
- [ ] Terms: English term with Vietnamese explanation
- [ ] Descriptions: Vietnamese primary
- [ ] Cultural authenticity preserved

### ☐ Numbering
- [ ] Sequential within group (1, 2, 3...)
- [ ] No gaps or duplicates
- [ ] Matches Tổng Quan count after changes

---

## Post-Processing Checklist

### ☐ Validation

#### Content Check
- [ ] All concepts have 4+ points
- [ ] No formatting errors
- [ ] Bilingual pairs complete

#### Count Verification
| Item | Before | After | Match? |
|------|--------|-------|--------|
| Concepts | [N] | [M] | ☐ |

#### Cross-Reference Audit
- [ ] All `→ **Liên kết:**` sections present
- [ ] Referenced concepts exist
- [ ] Bidirectional links verified

### ☐ Progress Update
- [ ] Group status updated to "completed"
- [ ] Session logged in tracker
- [ ] Notes captured

### ☐ Commit Ready
- [ ] Changes reviewed
- [ ] No unintended modifications
- [ ] Ready for commit/push

---

## Action-Specific Checklists

### [E] Expand - Thêm khái niệm

- [ ] New concept relevant to group theme
- [ ] Fills identified gap
- [ ] Full 4-point structure
- [ ] Proper bilingual format
- [ ] Cross-references to related concepts
- [ ] Numbered correctly in sequence

### [R] Refine - Cải thiện mô tả

- [ ] Original meaning preserved
- [ ] Clarity improved
- [ ] Examples added (if needed)
- [ ] Language enhanced
- [ ] No content removed

### [C] Complete - Hoàn thiện cấu trúc

- [ ] All concepts now have 4+ points
- [ ] Format standardized
- [ ] Cross-references added
- [ ] Bilingual pairs complete

### [X] Cross-ref - Cập nhật liên kết

- [ ] New links added
- [ ] Bidirectional links created
- [ ] Invalid links removed/fixed
- [ ] Link format correct: `[Concept] (Source)`

### [V] Validate - Xác nhận hoàn thành

- [ ] All checklist items passed
- [ ] No changes needed
- [ ] Status marked as validated

---

## Quality Scores

### Scoring Rubric

| Metric | 5 Stars | 4 Stars | 3 Stars | 2 Stars | 1 Star |
|--------|---------|---------|---------|---------|--------|
| **Completeness** | All 4-point, complete | 90%+ | 70%+ | 50%+ | <50% |
| **Structure** | Perfect format | Minor issues | Some issues | Many issues | Broken |
| **Bilingual** | Full pairs | 90%+ | 70%+ | 50%+ | <50% |
| **Cross-refs** | All linked | Most linked | Some linked | Few linked | None |

### Minimum Standards

| Metric | Minimum for "Complete" |
|--------|------------------------|
| Completeness | ⭐⭐⭐⭐ (4/5) |
| Structure | ⭐⭐⭐⭐ (4/5) |
| Bilingual | ⭐⭐⭐⭐⭐ (5/5) |
| Cross-refs | ⭐⭐⭐ (3/5) |

---

## Common Issues & Fixes

| Issue | Detection | Fix |
|-------|-----------|-----|
| Missing points | Count < 4 | Add more bullet points |
| Broken format | Missing `**` or `:` | Correct markdown syntax |
| No VN translation | English-only term | Add Vietnamese pair |
| Dead link | Concept not found | Update or remove link |
| Wrong count | Mismatch with Tổng Quan | Reconcile listing |
| Duplicate concept | Same concept twice | Merge or remove |

---

## Session Summary Template

```
═══════════════════════════════════════════════════════════
SESSION COMPLETE
═══════════════════════════════════════════════════════════

Groups Processed:  [N]
Actions Taken:     E([n]) R([n]) C([n]) X([n]) V([n])
Concepts Added:    [N]
Issues Found:      [N]
Issues Resolved:   [N]

Quality Scores:
├─ Completeness:   ⭐⭐⭐⭐☆
├─ Structure:      ⭐⭐⭐⭐⭐
├─ Bilingual:      ⭐⭐⭐⭐⭐
└─ Cross-refs:     ⭐⭐⭐☆☆

Progress:          [N]/371 groups ([X]%)
Next Suggested:    [GROUP_ID]

═══════════════════════════════════════════════════════════
```

---

**Version:** 1.0.0
