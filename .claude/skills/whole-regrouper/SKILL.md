---
name: whole-regrouper
description: |
  Phân tích, gom nhóm, và ĐỒNG BỘ THÔNG MINH giữa Tổng Quan listing và actual group headers.
  v5.0.0: Intelligent Analysis - không giả định grouping nào tốt hơn, phân tích thực sự cả hai.
version: 5.0.0
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

# Whole Concept Regrouper & Reconciler v5.0

**Intelligent Analysis** - Phân tích thực sự cả hai groupings, không giả định.

---

## Core Philosophy

> **KHÔNG giả định grouping nào tốt hơn.**

Mỗi CHỨC NĂNG có TWO representations:
1. **Tổng Quan listing** - Overview với group names và concept counts
2. **Content headers** - Actual ### headers với #### concepts bên dưới

Cả hai có thể có điểm mạnh riêng:
- **Tổng Quan** có thể có grouping logic tốt hơn (coherent, mental model rõ)
- **Content** có thể có chi tiết chính xác hơn (accurate to actual concepts)

**→ Phân tích cả hai, quyết định có căn cứ.**

---

## Analysis Criteria

### 1. Coherence (Mạch lạc) - Weight: HIGH
- Các concepts trong nhóm có chung chủ đề?
- Có thể giải thích "đều về..." trong 1 câu?
- Có concept "lạc lõng"?

### 2. Balance (Cân bằng) - Weight: MEDIUM
- Per group: 3-8 concepts (ideal: 5-6)
- Không có groups quá lớn (>10) hoặc quá nhỏ (<2)

### 3. Natural Thinking (Tự nhiên) - Weight: HIGH
- Phù hợp mental model của người dùng?
- Tên nhóm gợi nhớ ngay nội dung?

### 4. Accuracy (Chính xác) - Weight: MEDIUM
- Tên nhóm mô tả chính xác nội dung?
- Số concepts match?
- Concept names chính xác?

---

## Strategy Options

```
[A] Tổng Quan → Content
    Tổng Quan có grouping logic TỐT HƠN
    → Reorganize content để match Tổng Quan

[B] Content → Tổng Quan
    Content có chi tiết CHÍNH XÁC HƠN
    → Update Tổng Quan listing để match actual

[C] Full Regroup
    CẢ HAI ĐỀU CÓ VẤN ĐỀ
    → Cần phân tích lại từ đầu với /regroup

[H] Hybrid Merge
    MỖI BÊN CÓ ĐIỂM MẠNH RIÊNG
    → Lấy groups tốt nhất từ cả hai
    → Chỉ định: "Group 1,3 from Tổng Quan + Group 2,4 from Content"

[S] Skip - Already Synced
    Hai bên ĐÃ ĐỒNG BỘ
    → Không cần thay đổi
```

---

## Decision Framework

**Priority order khi conflict:**

1. **Coherence > Balance**
   - Grouping logic quan trọng hơn size

2. **Natural Thinking > Accuracy**
   - User experience > technical correctness

3. **Khi tie → Consider Hybrid [H]**
   - Lấy best of both worlds

4. **Khi cả hai < 3 sao → Full Regroup [C]**
   - Cần làm lại từ đầu

---

## Workflow

### /reconcile [N]

```
Phase 1: LOCATE & READ
├─ Grep "## CHỨC NĂNG" → boundaries
└─ Read section content

Phase 2: PARSE BOTH
├─ A: Tổng Quan listing
└─ B: Content headers + concepts

Phase 3: ANALYZE
├─ Score each grouping on 4 criteria
├─ Compare winner per criterion
└─ Calculate overall score

Phase 4: RECOMMEND
├─ Reasoned recommendation [A/B/C/H]
├─ Explain trade-offs
└─ Ask for confirmation

Phase 5: EXECUTE
├─ Apply chosen strategy
├─ Validate changes
└─ Auto commit & push
```

### /regroup [N]

Full regroup workflow khi cần phân tích lại từ đầu.

---

## Scoring Output Format

```
╔═══════════════════════════════════════════════╗
║ ANALYSIS: CF[N] - [Function Name]             ║
╠═══════════════════════════════════════════════╣
║                                               ║
║ TỔNG QUAN: [M] groups                         ║
║ Coherence: ⭐⭐⭐⭐☆ | Balance: ⭐⭐⭐☆☆        ║
║ Natural: ⭐⭐⭐⭐⭐ | Accuracy: ⭐⭐⭐☆☆         ║
║                                               ║
║ CONTENT: [M] groups                           ║
║ Coherence: ⭐⭐⭐☆☆ | Balance: ⭐⭐⭐⭐☆        ║
║ Natural: ⭐⭐⭐☆☆ | Accuracy: ⭐⭐⭐⭐⭐         ║
║                                               ║
╠═══════════════════════════════════════════════╣
║ RECOMMENDATION: [A/B/C/H] - [Reasoning]       ║
╚═══════════════════════════════════════════════╝
```

---

## Critical Rules

### ✅ MUST
- Phân tích thực sự cả hai groupings
- Cho điểm có căn cứ
- Giải thích reasoning
- Preserve all content (only add, never subtract)

### ❌ NEVER
- Giả định B luôn đúng
- Skip analysis phase
- Delete concepts
- Modify concept content

---

## Commands

- `/reconcile [N]` - Intelligent reconcile single CHỨC NĂNG
- `/reconcile` - Auto-detect next pending
- `/regroup [N]` - Full regroup when reconcile isn't enough

---

## References

Load as needed:
- `references/grouping-principles.md` - Criteria details
- `references/naming-guidelines.md` - Naming standards
- `references/quality-checklist.md` - Validation checklist

---

**Version:** 5.0.0 | **Philosophy:** Analyze first, decide with reasoning
