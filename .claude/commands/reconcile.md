---
description: 🔄 Sync Tổng Quan ↔ Content for single CHỨC NĂNG
argument-hint: [function-number 1-50]
---

## Usage

```bash
/reconcile 6     # Reconcile CF6 (DYNAMICS - Emergence & Flow)
/reconcile 11    # Reconcile CF11 (OPERATIONS - Analytical Reasoning)
/reconcile       # Auto-detect next pending from progress
```

---

## Workflow

### 1. LOCATE target CHỨC NĂNG

```bash
# Grep for target function and next function boundary
Grep "## CHỨC NĂNG" Whole.md → get line numbers
```

### 2. READ the section

```bash
Read Whole.md offset=[start_line] limit=[section_length]
```

### 3. PARSE both representations

**From Tổng Quan (after "nhóm chủ đề:"):**
```
1. **English** (count): Vietnamese - concept1, concept2...
```

**From Actual Headers:**
```
### **1. English - Vietnamese**
#### **1. Concept1**
#### **2. Concept2**
...
```

### 4. COMPARE & OUTPUT

```
| # | Tổng Quan | Actual Header | Match |
|---|-----------|---------------|-------|
| 1 | Group A (8) | Group X (6) | ❌ |
| 2 | Group B (7) | Group B (7) | ✅ |
```

### 5. ASK STRATEGY

```
Choose:
[B] Content → Tổng Quan (RECOMMENDED)
[A] Tổng Quan → Content
[C] Full Regroup (/regroup instead)
[S] Skip - already synced
```

### 6. EXECUTE

**Option B (most common):**
- Read actual ### headers
- Count concepts under each
- Regenerate Tổng Quan listing
- Edit Whole.md

### 7. COMMIT & PUSH (Auto)

```bash
git add Whole.md
git commit -m "Reconcile [DOMAIN] CF[N]: [Function Name]

- Synced Tổng Quan with [M] actual group headers
- [total] concepts across [M] groups
- Strategy: B (Content → Tổng Quan)"
git push
```

### 8. CONFIRM

```
✅ RECONCILE COMPLETE: CF[N]
Groups: [M] synced | Concepts: [total]
Commit: [hash] | Pushed: OK
Next: CF[N+1]
```

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

## Notes

- Process ONE function at a time
- Typical time: 5-10 min per CF
- Most cases: Option B (Content → Tổng Quan)
- If both wrong: Use `/regroup` instead

---

**Version:** 1.2.0 | **Requires:** whole-regrouper v4.2.0+
