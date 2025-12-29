---
description: 🔄 Intelligent Analysis & Sync between Tổng Quan ↔ Content groupings
argument-hint: [function-number 1-50]
---

## Usage

```bash
/reconcile 6     # Reconcile CF6 (DYNAMICS - Emergence & Flow)
/reconcile 11    # Reconcile CF11 (OPERATIONS - Analytical Reasoning)
/reconcile       # Auto-detect next pending from progress
```

---

## Core Philosophy

**KHÔNG giả định grouping nào tốt hơn.** Phân tích thực sự cả hai và quyết định dựa trên:
1. **Coherence**: Các khái niệm trong nhóm có liên hệ logic chặt chẽ?
2. **Balance**: Số lượng concepts/group hợp lý (3-8, ideal 5-6)?
3. **Natural Thinking**: Phù hợp với mental model của người dùng?
4. **Accuracy**: Tên nhóm mô tả chính xác nội dung bên trong?

---

## Workflow

### Phase 1: LOCATE & READ

```bash
# Find target CHỨC NĂNG boundaries
Grep "## CHỨC NĂNG" Whole.md → get line numbers
Read Whole.md offset=[start] limit=[section_length]
```

### Phase 2: PARSE BOTH REPRESENTATIONS

**A. Parse Tổng Quan** (after "nhóm chủ đề:"):
```
1. **English** (count): Vietnamese - concept1, concept2...
```
→ Extract: group_name, concept_count, concept_list

**B. Parse Actual Headers**:
```
### **1. English - Vietnamese**
#### **1. Concept1**
#### **2. Concept2**
```
→ Extract: group_name, concepts_under_header

### Phase 3: ANALYZE BOTH GROUPINGS

**Output analysis table:**

```
╔══════════════════════════════════════════════════════════════════════╗
║ GROUPING ANALYSIS: CF[N] - [Function Name]                           ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║ [A] TỔNG QUAN GROUPING                                               ║
║ ────────────────────────────────────────────────────────────────     ║
║ Groups: [M] | Concepts: [total]                                      ║
║                                                                      ║
║ 1. [Group Name] (N concepts)                                         ║
║    Concepts: [list...]                                               ║
║    ├─ Coherence: [⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ | ...]                          ║
║    ├─ Balance: [OK ✅ | Too big ⚠️ | Too small ⚠️]                   ║
║    └─ Logic: [Giải thích ngắn]                                       ║
║                                                                      ║
║ [B] CONTENT GROUPING                                                 ║
║ ────────────────────────────────────────────────────────────────     ║
║ Groups: [M] | Concepts: [total]                                      ║
║                                                                      ║
║ 1. [Group Name] (N concepts)                                         ║
║    Concepts: [list...]                                               ║
║    ├─ Coherence: [⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ | ...]                          ║
║    ├─ Balance: [OK ✅ | Too big ⚠️ | Too small ⚠️]                   ║
║    └─ Logic: [Giải thích ngắn]                                       ║
║                                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║ COMPARISON SUMMARY                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║ Criteria        │ Tổng Quan │ Content  │ Winner                      ║
║ ────────────────┼───────────┼──────────┼─────────                    ║
║ Coherence       │ ⭐⭐⭐⭐☆   │ ⭐⭐⭐☆☆  │ Tổng Quan                   ║
║ Balance         │ ⭐⭐⭐☆☆   │ ⭐⭐⭐⭐☆  │ Content                     ║
║ Natural Thinking│ ⭐⭐⭐⭐⭐   │ ⭐⭐⭐☆☆  │ Tổng Quan                   ║
║ Accuracy        │ ⭐⭐⭐☆☆   │ ⭐⭐⭐⭐⭐  │ Content                     ║
║ ────────────────┼───────────┼──────────┼─────────                    ║
║ OVERALL         │ [score]   │ [score]  │ [RECOMMENDATION]            ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Phase 4: REASONED RECOMMENDATION

**Based on analysis, output:**

```
╔══════════════════════════════════════════════════════════════════════╗
║ 💡 RECOMMENDATION                                                    ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║ [A/B/C/H] - [Strategy Name]                                          ║
║                                                                      ║
║ REASONING:                                                           ║
║ • [Point 1: Why this grouping is better for criteria X]              ║
║ • [Point 2: Specific example of coherence/balance issue]             ║
║ • [Point 3: User mental model consideration]                         ║
║                                                                      ║
║ TRADE-OFFS:                                                          ║
║ • [What we lose by choosing this strategy]                           ║
║ • [What we gain]                                                     ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Phase 5: STRATEGY OPTIONS

```
[A] Tổng Quan → Content
    Tổng Quan có grouping logic tốt hơn
    → Reorganize content headers để match Tổng Quan

[B] Content → Tổng Quan
    Content có chi tiết chính xác hơn
    → Update Tổng Quan listing để match actual headers

[C] Full Regroup
    Cả hai đều có vấn đề, cần phân tích lại từ đầu
    → Use /regroup [N] workflow

[H] Hybrid Merge
    Mỗi bên có điểm mạnh riêng
    → Lấy groups tốt nhất từ cả hai
    → Cần chỉ định cụ thể: "Group 1,3 from Tổng Quan + Group 2,4 from Content"

[S] Skip - Already Synced
    Hai bên đã đồng bộ, không cần thay đổi
```

### Phase 6: EXECUTE

**Option A (Tổng Quan → Content):**
- Đọc và phân tích Tổng Quan grouping
- Reorganize các concepts trong Content theo groups mới
- Cập nhật ### headers để match Tổng Quan
- Di chuyển concepts giữa các groups nếu cần

**Option B (Content → Tổng Quan):**
- Đọc actual ### headers và concepts
- Regenerate Tổng Quan listing từ actual structure
- Giữ nguyên content, chỉ update Tổng Quan

**Option H (Hybrid):**
- Xác định groups nào từ mỗi bên
- Merge thành grouping mới
- Update CẢ Tổng Quan VÀ Content headers

### Phase 7: COMMIT & PUSH

```bash
git add Whole.md
git commit -m "$(cat <<'EOF'
Reconcile [DOMAIN] CF[N]: [Function Name]

Analysis:
- Tổng Quan: [M] groups, [score] overall
- Content: [M] groups, [score] overall

Decision: [A/B/C/H] - [Reasoning summary]

Changes:
- [Specific changes made]
- [Groups affected]
EOF
)"
git push
```

---

## Analysis Criteria Detail

### 1. Coherence (Mạch lạc) ⭐⭐⭐⭐⭐

**Questions to evaluate:**
- Các concepts trong nhóm có chung chủ đề/domain con không?
- Có thể giải thích "những concepts này đều về..." trong 1 câu không?
- Có concept nào "lạc lõng" trong nhóm không?

**Scoring:**
- ⭐⭐⭐⭐⭐: Perfect coherence, all concepts belong together
- ⭐⭐⭐⭐☆: Strong coherence, 1 concept slightly off
- ⭐⭐⭐☆☆: Moderate, 2-3 concepts don't fit well
- ⭐⭐☆☆☆: Weak, mixed concepts
- ⭐☆☆☆☆: No coherence, random grouping

### 2. Balance (Cân bằng) ⭐⭐⭐⭐⭐

**Ideal distribution:**
- Per group: 3-8 concepts (ideal: 5-6)
- Total groups: Based on total concepts ÷ 5

**Scoring:**
- ⭐⭐⭐⭐⭐: All groups in 4-6 range
- ⭐⭐⭐⭐☆: Most groups balanced, 1 slightly off
- ⭐⭐⭐☆☆: Some groups too big/small (2 or 9)
- ⭐⭐☆☆☆: Multiple imbalanced groups
- ⭐☆☆☆☆: Severe imbalance (1 or 10+)

### 3. Natural Thinking (Tự nhiên) ⭐⭐⭐⭐⭐

**Questions to evaluate:**
- Người dùng có mong đợi tìm những concepts này cùng nhau?
- Tên nhóm có gợi nhớ ngay nội dung bên trong?
- Grouping có phản ánh cách tư duy tự nhiên về topic?

**Scoring:**
- ⭐⭐⭐⭐⭐: Intuitive, matches mental model perfectly
- ⭐⭐⭐⭐☆: Mostly intuitive, minor surprises
- ⭐⭐⭐☆☆: Requires some explanation
- ⭐⭐☆☆☆: Counter-intuitive grouping
- ⭐☆☆☆☆: Confusing, no clear logic

### 4. Accuracy (Chính xác) ⭐⭐⭐⭐⭐

**Questions to evaluate:**
- Tên nhóm có mô tả chính xác nội dung?
- Số concepts trong listing có match actual?
- Concept names có được liệt kê chính xác?

**Scoring:**
- ⭐⭐⭐⭐⭐: Perfect match, all correct
- ⭐⭐⭐⭐☆: Minor discrepancies (1-2)
- ⭐⭐⭐☆☆: Some mismatches (3-5)
- ⭐⭐☆☆☆: Significant errors
- ⭐☆☆☆☆: Major inaccuracies

---

## Decision Framework

**Khi phân vân giữa các strategies:**

1. **Nếu Coherence winner khác Balance winner:**
   → Ưu tiên Coherence (grouping logic quan trọng hơn size)

2. **Nếu Natural Thinking winner khác Accuracy winner:**
   → Ưu tiên Natural Thinking (user experience > technical correctness)

3. **Nếu tie:**
   → Consider Hybrid [H] để lấy best of both

4. **Nếu cả hai đều dưới 3 sao:**
   → Full Regroup [C] là cần thiết

---

## Quick Reference: All 50 Functions

| CF | Domain | Function Name |
|----|--------|---------------|
| 1-5 | FOUNDATIONS | First Principles, Universal Laws, Core Values, Eastern/Western Wisdom, Natural Principles |
| 6-10 | DYNAMICS | Emergence & Flow, Transformation, System Evolution, Cognitive Flexibility, Emotional Intelligence |
| 11-15 | OPERATIONS | Analytical Reasoning, Problem-Solving, Systematic Execution, Learning & Memory, Decision Frameworks |
| 16-20 | CREATION | Lateral Thinking, Breakthrough Innovation, Creative Evolution, Pattern Breaking, Design Thinking |
| 21-25 | NAVIGATION | Strategic Wayfinding, Multi-dimensional Planning, Resource Management, Context Sensing, Temporal Rhythm |
| 26-30 | INTEGRATION | Knowledge Synthesis, System Coherence, Cross-paradigm Connection, Collaborative Intelligence, Communication |
| 31-35 | VALIDATION | Reality Testing, Error Detection, Feedback Processing, Experimental Protocols, Quality Assurance |
| 36-40 | AMPLIFICATION | Network Effects, Force Multiplication, Viral Mechanics, Exponential Growth, Platform Building |
| 41-45 | TRANSCENDENCE | Paradox Resolution, Paradigm Shifts, Unity Consciousness, System Metamorphosis, Wisdom Crystallization |
| 46-50 | META | Meta-Cognition, System Self-Observation, Pattern Recognition, Recursive Improvement, Framework Evolution |

---

## Output Format (Compact)

```
[RECONCILE] CF[N] | [DOMAIN] - [Function Name]
[READ] Lines [start]-[end] | [total] concepts

[ANALYSIS]
┌─ TỔNG QUAN: [M] groups
│  Coherence: ⭐⭐⭐⭐☆ | Balance: ⭐⭐⭐☆☆ | Natural: ⭐⭐⭐⭐⭐
│
└─ CONTENT: [M] groups
   Coherence: ⭐⭐⭐☆☆ | Balance: ⭐⭐⭐⭐☆ | Natural: ⭐⭐⭐☆☆

[DECISION] [A/B/C/H] - [Short reasoning]
[EXECUTE] [Changes made]
[COMMIT] [hash] | [message]
[DONE] CF[N] reconciled | Next: CF[N+1]
```

---

**Version:** 5.0.0 | **Philosophy:** Analyze first, decide with reasoning
