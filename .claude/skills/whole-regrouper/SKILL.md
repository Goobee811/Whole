---
name: whole-regrouper
description: |
  Phân tích và gom nhóm lại các khái niệm trong từng CHỨC NĂNG của Whole.md.
  Một workflow hoàn chỉnh: Grep → Read → Analyze → Regroup → Edit → Commit & Push.
  Uses progressive disclosure: core workflow in this file, detailed references loaded as needed.
version: 3.2.0
license: MIT
allowed-tools:
  - Edit
  - Grep
  - Read
  - Bash
metadata:
  author: "Whole Project"
  category: "documentation"
  updated: "2025-12-17"
---

# Whole Concept Regrouper

Regroup concepts in Whole.md CHỨC NĂNGs using thematic analysis.

## Quick Start (5 Steps)

1. 🔍 **Grep** → Find CHỨC NĂNG line numbers
2. 📖 **Read** → Load concepts (use offset/limit)
3. 🧠 **Analyze** → Propose thematic groups (3-8 concepts each)
4. ✍️ **Edit** → Rewrite with new groups, preserve all content
5. 🚀 **Commit & Push** → Save with proper message format

**Detailed workflow:** `references/workflow-steps.md`

---

## Critical Rules

### 🚨 MANDATORY: Atomic Read-Edit Pattern
**ALWAYS Read file IMMEDIATELY before Edit - in the SAME turn, NO output in between.**

```
✅ ĐÚNG:  Read(Whole.md) → Edit(Whole.md)  [same turn]
❌ SAI:   Read(Whole.md) → [output dài] → Edit(Whole.md)  [có thể fail]
❌ SAI:   Read(Whole.md) → [session resume] → Edit(Whole.md)  [CHẮC CHẮN fail]
```

**If "File has not been read yet" error:**
1. Output: "Lỗi Edit - re-reading..."
2. Read file NGAY LẬP TỨC: `Read /home/user/Whole/Whole.md offset=X limit=Y`
3. Edit NGAY trong cùng turn (không output dài)
4. Output: "✓ Edit thành công"

**Detailed error handling:** `references/robust-operations.md`

### ✅ MUST PRESERVE
- "### **Tổng Quan**" section (exact content, exact format)
- All concept content (every word, every bullet point, every → **Liên kết:**)

### ✅ MUST CHANGE
- Group headings (new thematic names, bilingual format with numbering)
- Concept numbers (renumber continuously: 1, 2, 3...)
- Group numbers (number groups sequentially within each CHỨC NĂNG: 1, 2, 3...)

### ❌ NEVER
- Delete concepts
- Modify concept content
- Restart numbering per group
- Edit without Reading first

---

## Grouping Principles

Apply these when analyzing:

1. **Coherence** - Concepts naturally belong together
2. **Natural Thinking** - Users expect these together
3. **Balance** - 3-8 concepts per group (ideal: 5-6)
4. **Bilingual & Numbered** - All group names: `### **[số]. [English] - [Vietnamese]**`
   - Groups numbered sequentially within each CHỨC NĂNG (1, 2, 3...)
   - Example: `### **1. Foundational System Theories - Lý Thuyết Hệ Thống Nền Tảng**`

**Detailed principles:** `references/grouping-principles.md`

---

## Analysis Output Format

```markdown
📊 PHÂN TÍCH:
- Tổng: [N] concepts → [M] groups

📝 CẤU TRÚC MỚI:
### **1. [Group 1] - [Nhóm 1]** ([X] concepts)
   - Concept A, B, C...
### **2. [Group 2] - [Nhóm 2]** ([Y] concepts)
   - Concept D, E, F...
### **3. [Group 3] - [Nhóm 3]** ([Z] concepts)
   - Concept G, H, I...
```

**Note:** Group numbers (1, 2, 3...) are scoped to each CHỨC NĂNG for easy tracking.

---

## Commit Message Format

```bash
Regroup [DOMAIN] CHỨC NĂNG [số]: [summary]

- [N] concepts → [M] thematic groups
- Groups: [list English names]
- Preserved: Tổng Quan, all concept content
- Renumbered: 1-[N] continuous
```

---

## Progress Output (MANDATORY)

**LUÔN output status sau mỗi tool call để user biết tiến độ:**

```markdown
After Grep:  "✓ Grep: tìm thấy CF[N] tại line [X]"
After Read:  "✓ Read: [N] lines từ Whole.md (line [X]-[Y])"
After Edit:  "✓ Edit: đã sửa [description]"
After Bash:  "✓ Bash: [command] - [result]"

Before long operation: "Đang [action]..."
After long operation:  "✓ Hoàn thành [action]"
```

**KHÔNG để user phải hỏi "đang làm tới đâu?"** - luôn output proactively.

---

## Session Resume Handling

**Khi session resume (sau khi bị interrupt/compact):**

1. **Check TodoWrite** - tìm task đang in_progress
2. **Output status**: "Session resumed. Đang ở: [current task]"
3. **Re-read files** - previous reads đã INVALID
4. **Continue** từ current step

```markdown
⚠️ CRITICAL: Sau session resume, PHẢI Read lại Whole.md trước khi Edit!
Previous reads không còn valid trong context mới.
```

**Detailed recovery:** `references/robust-operations.md`

---

## References (Load as Needed)

**Error Handling & Recovery:**
- `references/robust-operations.md` - Atomic patterns, progress feedback, session resume

**Grouping & Analysis:**
- `references/grouping-principles.md` - Detailed criteria, decision framework, examples

**Naming Groups:**
- `references/naming-guidelines.md` - Format rules, strategies, good/bad examples

**Detailed Workflow:**
- `references/workflow-steps.md` - Step-by-step instructions, git commands, examples

**Quality Validation:**
- `references/quality-checklist.md` - Pre/during/post-edit checklists, common mistakes

---

## TodoWrite (MANDATORY)

**Use TodoWrite tool at each checkpoint** - don't just output emoji text!

```json
[
  {"content": "Read CF{N} content", "status": "in_progress", "activeForm": "Reading CF content"},
  {"content": "Analyze and create groups", "status": "pending", "activeForm": "Analyzing concepts"},
  {"content": "Edit Whole.md", "status": "pending", "activeForm": "Editing Whole.md"},
  {"content": "Validate changes", "status": "pending", "activeForm": "Validating"},
  {"content": "Commit and push", "status": "pending", "activeForm": "Committing"}
]
```

**Update `.whole-state.json` at each phase:**
```json
{
  "currentOperation": "regroup",
  "phase": "analyze",
  "pendingAction": "create_groups",
  "lastReadFile": "Whole.md",
  "lastReadLines": "20262-20638",
  "context": {"cf": 32, "concepts": 36}
}
```

---

## Integration

- **Command:** `/regroup [domain] [function-number]` - Auto-activates this skill
- **Hooks:** `session-init`, `regroup-validation` (if available)
- **Progress:** `.whole-progress.json` (if available)
- **State:** `.whole-state.json` (for resume capability)

---

**Version:** 3.2.0 (Robust operations, progress feedback, session resume handling)
