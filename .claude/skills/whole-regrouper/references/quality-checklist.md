# Quality Checklist - Danh Sách Kiểm Tra Chất Lượng

## Pre-Edit Checklist - Trước Khi Chỉnh Sửa

Complete BEFORE making any edits to Whole.md:

### Analysis Completeness
- [ ] Read ALL concepts in the CHỨC NĂNG thoroughly
- [ ] Counted total number of concepts accurately
- [ ] Identified all current groups (if any)
- [ ] Located "### **Tổng Quan**" section
- [ ] Noted line numbers for precise reading

### Grouping Quality
- [ ] Proposed groups follow coherence principle (see: grouping-principles.md)
- [ ] Proposed groups follow natural thinking principle
- [ ] Group sizes balanced (3-8 concepts each, ideally 5-6)
- [ ] All group names are bilingual
- [ ] No concepts left ungrouped
- [ ] No concepts duplicated across groups

### Name Quality
- [ ] All group names follow format: `### **[số]. [English] - [Vietnamese]**`
- [ ] Groups numbered sequentially within CHỨC NĂNG (1, 2, 3...)
- [ ] Names are descriptive (not generic like "Other Concepts")
- [ ] Names are concise (3-6 words per language)
- [ ] Vietnamese translations are conceptually accurate
- [ ] Naming style consistent across all groups
- [ ] (Refer to: naming-guidelines.md for details)

---

## During-Edit Checklist - Trong Quá Trình Chỉnh Sửa

Check WHILE editing each section:

### Structural Preservation
- [ ] "### **Tổng Quan**" section placed first (after CHỨC NĂNG heading)
- [ ] "### **Tổng Quan**" content EXACTLY preserved (word-for-word)
- [ ] All concept headings start with `####` (4 hashes)
- [ ] All concept headings include `**bold**` formatting
- [ ] All concept headings are bilingual: `#### **[số]. [English] - [Vietnamese]**`

### Content Preservation
- [ ] Every concept from original is present in new structure
- [ ] NO concepts deleted or omitted
- [ ] NO bullet points removed or modified
- [ ] NO "→ **Liên kết:**" lines removed or modified
- [ ] ALL Vietnamese text preserved exactly
- [ ] ALL English text preserved exactly

### Numbering
- [ ] Concepts numbered continuously: 1, 2, 3, 4, 5... (no gaps)
- [ ] Numbering starts from 1 after "Tổng Quan"
- [ ] Numbering continues across all groups (not restarting at 1 for each group)
- [ ] Format: `#### **[number]. [Name]**`

### Group Structure
- [ ] New group headings use: `### **[số]. [Name]**`
- [ ] Groups numbered sequentially: 1, 2, 3... (within each CHỨC NĂNG)
- [ ] Group headings are bilingual (except "Tổng Quan")
- [ ] Groups in logical order (if applicable)
- [ ] No empty groups (every group has at least 3 concepts)

---

## Post-Edit Checklist - Sau Khi Chỉnh Sửa

Complete AFTER editing, BEFORE committing:

### Completeness Verification
- [ ] Count concepts in new structure = count in original (should match exactly)
- [ ] All original concepts accounted for (none missing)
- [ ] "Tổng Quan" section unchanged
- [ ] Final concept number matches total count

### Format Verification
- [ ] CHỨC NĂNG heading: `## CHỨC NĂNG [số]: [NAME] - [VIETNAMESE]`
- [ ] "Tổng Quan" heading: `### **Tổng Quan**` (exact format)
- [ ] Group headings: `### **[số]. [English] - [Vietnamese]**` (numbered)
- [ ] Concept headings: `#### **[số]. [English] - [Vietnamese]**`
- [ ] Group numbers continuous within CHỨC NĂNG (1, 2, 3...)
- [ ] No formatting errors (missing `**`, wrong `#` count, etc.)

### Content Integrity
- [ ] Spot-check 3-5 random concepts: content matches original exactly
- [ ] Check first concept: preserved
- [ ] Check last concept: preserved
- [ ] Check "Tổng Quan": preserved
- [ ] All "→ **Liên kết:**" lines preserved

### Quality Verification
- [ ] Group names are meaningful and descriptive
- [ ] Groups are balanced in size
- [ ] Concepts within each group are coherently related
- [ ] Numbering is continuous (no jumps or duplicates)
- [ ] Bilingual requirements met throughout

---

## Pre-Commit Checklist - Trước Khi Commit

Complete BEFORE running `git commit`:

### Git Status
- [ ] Only Whole.md modified (check: `git status`)
- [ ] No unintended files changed
- [ ] Whole.md is staged (check: `git add Whole.md`)

### Commit Message
- [ ] Message follows format: `Regroup [DOMAIN] CHỨC NĂNG [số]: [summary]`
- [ ] Includes concept count: `[N] concepts → [M] groups`
- [ ] Lists new group names (English only in commit msg)
- [ ] Notes preservation: "Preserved: Tổng Quan, all concept content"
- [ ] Notes renumbering: "Renumbered: 1-[N] continuous"

**Example:**
```bash
Regroup FOUNDATIONS CHỨC NĂNG 4: Eastern & Western Wisdom

- 20 concepts → 3 thematic groups
- Groups: Western Philosophical Foundations, Eastern Contemplative Traditions, Integrative Wisdom Practices
- Preserved: Tổng Quan, all concept content
- Renumbered: 1-20 continuous
```

### Branch
- [ ] Branch name starts with `claude/`
- [ ] Branch name ends with session ID
- [ ] Branch name matches current session

---

## Pre-Push Checklist - Trước Khi Push

Complete BEFORE running `git push`:

### Push Command
- [ ] Using `-u` flag for first push: `git push -u origin [branch]`
- [ ] Branch name correct in command
- [ ] Ready to retry up to 4x with exponential backoff if network fails

### Success Verification
- [ ] Push succeeded (no 403 or network errors)
- [ ] Commit visible on remote (if accessible)
- [ ] Ready to move to next CHỨC NĂNG (if applicable)

---

## Common Mistakes to Avoid - Lỗi Thường Gặp

### ❌ Mistake 1: Modifying "Tổng Quan" Content
**Wrong:**
```markdown
### **Tổng Quan**
[Rewording or "improving" the overview...]
```

**Right:**
```markdown
### **Tổng Quan**
[EXACT ORIGINAL TEXT - DO NOT CHANGE A SINGLE WORD]
```

### ❌ Mistake 2: Restarting Numbering Per Group
**Wrong:**
```markdown
### **Group 1**
#### **1. Concept A**
#### **2. Concept B**

### **Group 2**
#### **1. Concept C**   ← WRONG! Should be 3
#### **2. Concept D**   ← WRONG! Should be 4
```

**Right:**
```markdown
### **Group 1**
#### **1. Concept A**
#### **2. Concept B**

### **Group 2**
#### **3. Concept C**   ← Continuous!
#### **4. Concept D**   ← Continuous!
```

### ❌ Mistake 3: Non-Bilingual Group Names or Missing Numbers
**Wrong:**
```markdown
### **Western Philosophy**   (Missing Vietnamese & number)
### **Triết Học Phương Tây**  (Missing English & number)
### **Western Philosophy - Triết Học Phương Tây**  (Missing number)
```

**Right:**
```markdown
### **1. Western Philosophy - Triết Học Phương Tây**
### **2. Eastern Philosophy - Triết Học Phương Đông**
```

### ❌ Mistake 4: Deleting Concepts
**Wrong:**
```markdown
[Removing concepts that seem redundant or outdated]
```

**Right:**
```markdown
[Keep ALL concepts - regrouping only, never delete]
```

### ❌ Mistake 5: Modifying Concept Content
**Wrong:**
```markdown
#### **1. Stoicism - Chủ Nghĩa Khắc Kỷ**

Ancient Greek philosophy focused on virtue and resilience...   ← Rewritten!
```

**Right:**
```markdown
#### **1. Stoicism - Chủ Nghĩa Khắc Kỷ**

[EXACT ORIGINAL CONTENT - every word, every bullet point]
```

### ❌ Mistake 6: Wrong Heading Levels
**Wrong:**
```markdown
## **Tổng Quan**           (Should be ###)
#### **Group Name**        (Should be ###)
### **1. Concept**         (Should be ####)
```

**Right:**
```markdown
### **Tổng Quan**          (Correct: ###)
### **Group Name**         (Correct: ###)
#### **1. Concept**        (Correct: ####)
```

---

## Validation Commands - Lệnh Kiểm Tra

### Check Concept Count
```bash
# Count concepts in original section (before edit)
grep -c "^#### \*\*[0-9]" [section-before.md]

# Count concepts in new section (after edit)
grep -c "^#### \*\*[0-9]" [section-after.md]

# These should MATCH!
```

### Check Continuous Numbering
```bash
# Extract all concept numbers
grep "^#### \*\*[0-9]" Whole.md | sed 's/^#### \*\*\([0-9]*\)\..*/\1/'

# Verify: 1, 2, 3, 4... (no gaps, no duplicates)
```

### Check Bilingual Groups
```bash
# Find all group headings in the CHỨC NĂNG
grep "^### \*\*" Whole.md

# Verify each has "English - Vietnamese" format (except Tổng Quan)
```

### Check "Tổng Quan" Preservation
```bash
# Compare original vs new (should be identical)
diff <(grep -A 20 "^### \*\*Tổng Quan\*\*" original.md) \
     <(grep -A 20 "^### \*\*Tổng Quan\*\*" Whole.md)

# Should output: no differences
```

---

## Emergency Rollback - Khôi Phục Khẩn Cấp

If you discover errors AFTER committing but BEFORE pushing:

### Option 1: Amend Commit (if not pushed)
```bash
# Fix the errors in Whole.md
# Then:
git add Whole.md
git commit --amend --no-edit
```

### Option 2: Revert to Previous Commit
```bash
# Check commit history
git log --oneline -5

# Revert to previous commit
git reset --hard HEAD~1

# WARNING: This destroys uncommitted work!
```

### Option 3: Create Fix Commit (after pushed)
```bash
# Never force push to shared branches
# Instead: fix errors and create new commit
git commit -m "Fix regrouping errors in CHỨC NĂNG [số]

- [describe what was wrong]
- [describe fix]"
```

---

## Success Criteria - Tiêu Chí Thành Công

A successful regroup meets ALL of these:

### Content Integrity ✅
- ✅ Zero concepts deleted
- ✅ Zero content modifications (except group names & concept numbers)
- ✅ "Tổng Quan" preserved exactly
- ✅ All "→ **Liên kết:**" lines intact

### Structural Quality ✅
- ✅ Groups are thematically coherent
- ✅ Groups are balanced (3-8 concepts each)
- ✅ Group names are bilingual and descriptive
- ✅ Numbering is continuous (1, 2, 3...)

### Format Compliance ✅
- ✅ All headings use correct markdown level (##, ###, ####)
- ✅ All headings use correct bold formatting (**)
- ✅ Bilingual format consistent throughout
- ✅ No markdown syntax errors

### Git Quality ✅
- ✅ Commit message descriptive and follows format
- ✅ Pushed to correct branch (claude/[session-id])
- ✅ No merge conflicts
- ✅ Clean git status after push

---

**Load this reference when:** Validating work at any stage of the regrouping process
