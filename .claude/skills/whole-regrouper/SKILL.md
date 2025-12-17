---
name: whole-regrouper
description: |
  Phân tích và gom nhóm lại các khái niệm trong từng CHỨC NĂNG của Whole.md.
  Một workflow hoàn chỉnh: Grep → Read → Analyze → Regroup → Edit → Commit & Push.
  Uses progressive disclosure: core workflow in this file, detailed references loaded as needed.
version: 3.0.0
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

## References (Load as Needed)

**Grouping & Analysis:**
- `references/grouping-principles.md` - Detailed criteria, decision framework, examples

**Naming Groups:**
- `references/naming-guidelines.md` - Format rules, strategies, good/bad examples

**Detailed Workflow:**
- `references/workflow-steps.md` - Step-by-step instructions, git commands, examples

**Quality Validation:**
- `references/quality-checklist.md` - Pre/during/post-edit checklists, common mistakes

---

## Integration

- **Command:** `/regroup [domain] [function-number]` - Auto-activates this skill
- **Hooks:** `session-init`, `regroup-validation` (if available)
- **Progress:** `.whole-progress.json` (if available)

---

**Version:** 3.0.0 (Progressive disclosure with references system)
