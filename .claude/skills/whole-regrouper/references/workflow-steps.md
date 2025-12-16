# Workflow Steps - Chi Tiết Quy Trình

## Complete 5-Step Process

---

## Step 1: 🔍 Grep - Find CHỨC NĂNG Location

### Purpose
Locate the exact line numbers for the target CHỨC NĂNG in Whole.md.

### Command
```bash
grep -n "^## CHỨC NĂNG [số]:" Whole.md
```

### Example
```bash
grep -n "^## CHỨC NĂNG 4:" Whole.md
# Output: 1234:## CHỨC NĂNG 4: EASTERN & WESTERN WISDOM - TRI TUỆ ĐÔNG PHƯƠNG & TÂY PHƯƠNG
```

### What to Record
- Starting line number (e.g., 1234)
- CHỨC NĂNG name for context
- Next CHỨC NĂNG line number (to know where to stop reading)

### Tips
- Use `grep -n` to get line numbers
- Note down BOTH current and next CHỨC NĂNG lines
- Verify the CHỨC NĂNG number matches your target

---

## Step 2: 📖 Read - Load All Content

### Purpose
Read all concepts in the target CHỨC NĂNG without loading entire Whole.md.

### Command Pattern
```bash
# Read from line X (CHỨC NĂNG start) to line Y (next CHỨC NĂNG - 1)
# Use Read tool with offset and limit parameters
```

### Example
```
If CHỨC NĂNG 4 starts at line 1234
And CHỨC NĂNG 5 starts at line 1450
Then: read from 1234, limit 216 lines (1450 - 1234)
```

### What to Extract
- Count total concepts (#### headings with numbers)
- Note "### **Tổng Quan**" content (must preserve exactly)
- List all concept names for analysis
- Identify current group structure (if any)

### Tips
- NEVER read entire Whole.md (>1MB file)
- Always use offset/limit parameters
- Count concepts carefully (you'll need this for analysis)

---

## Step 3: 🧠 Analyze - Propose New Groups

### Purpose
Analyze concept relationships and propose thematic groupings.

### Analysis Process

#### 3.1 Read All Concepts Thoroughly
- Understand what each concept is about
- Note relationships between concepts
- Identify natural themes/patterns

#### 3.2 Identify Themes
Look for:
- **Domain clusters**: Concepts from same field (e.g., all Eastern philosophy)
- **Functional clusters**: Concepts serving same purpose (e.g., all analytical methods)
- **Conceptual clusters**: Concepts sharing core ideas (e.g., all about unity/duality)

#### 3.3 Apply Grouping Principles
Refer to: `references/grouping-principles.md`
- Coherence: Do concepts naturally belong together?
- Natural Thinking: Would users expect these together?
- Balance: 3-8 concepts per group (ideal: 5-6)
- Bilingual: Can you name the group in both languages?

#### 3.4 Draft Group Structure

**Template:**
```markdown
📊 PHÂN TÍCH:
- Tổng số khái niệm: [N]
- Nhóm hiện tại: [M old groups]
- Đề xuất số nhóm mới: [P new groups]

📝 CẤU TRÚC MỚI:

1. ### **[Group 1 Name] - [Tên Nhóm 1]** ([X] khái niệm)
   **Rationale:** [Why these concepts belong together]
   - Concept A (current #1)
   - Concept B (current #5)
   - Concept C (current #9)
   ...

2. ### **[Group 2 Name] - [Tên Nhóm 2]** ([Y] khái niệm)
   **Rationale:** [Why these concepts belong together]
   - Concept D (current #2)
   - Concept E (current #3)
   ...

[Continue for all groups]
```

#### 3.5 Verify Completeness
- [ ] All N concepts accounted for
- [ ] No concepts deleted
- [ ] No concepts duplicated
- [ ] Group sizes balanced (3-8 each)
- [ ] All group names bilingual

### Example Output

```markdown
📊 PHÂN TÍCH CHỨC NĂNG 4: EASTERN & WESTERN WISDOM

Current state:
- 20 khái niệm tổng cộng
- 2 nhóm hiện tại: "Các Yếu Tố Nền Tảng" (13), "Các Yếu Tố Bổ Sung" (7)
- Problems: Generic names, imbalanced (13 vs 7)

Proposed structure:
- 3 nhóm mới (7, 7, 6 concepts)
- Thematic grouping based on philosophical traditions

📝 CẤU TRÚC MỚI:

1. ### **Western Philosophical Foundations - Nền Tảng Triết Học Phương Tây** (7 khái niệm)
   **Rationale:** All concepts rooted in Western philosophical tradition
   - Stoicism
   - Socratic Wisdom
   - Existentialism
   - Phenomenology
   - Pragmatism
   - Dialectical Thinking
   - I and Thou

2. ### **Eastern Contemplative Traditions - Truyền Thống Thiền Định Phương Đông** (7 khái niệm)
   **Rationale:** Concepts from Eastern meditation & spiritual practices
   - Taoism
   - Zen Buddhism
   - Mindfulness
   - Wu Wei
   - Beginner's Mind
   - Non-attachment
   - Middle Way

3. ### **Integrative Wisdom Practices - Thực Hành Tri Tuệ Tích Hợp** (6 khái niệm)
   **Rationale:** Modern synthesis of Eastern & Western wisdom
   - Integral Theory
   - Contemplative Science
   - Wisdom Traditions
   - Philosophy as Way of Life
   - Virtue Ethics
   - Eudaimonia
```

---

## Step 4: ✍️ Edit - Rewrite CHỨC NĂNG

### Purpose
Apply the new group structure while preserving all content.

### Critical Rules

#### ✅ MUST PRESERVE
1. **"### **Tổng Quan**" section**
   - Keep heading EXACTLY as is (including ### and **)
   - Keep content word-for-word
   - Position: Right after ## CHỨC NĂNG heading

2. **All concept content**
   - Every #### heading
   - Every bullet point (-, **)
   - Every → **Liên kết:** line
   - All Vietnamese and English text

3. **Structural format**
   - Markdown heading levels (##, ###, ####)
   - Bold formatting (**text**)
   - Bullet list style

#### ✅ MUST CHANGE
1. **Group headings (###)**
   - Replace old generic names with new thematic names
   - Ensure bilingual format: `### **[English] - [Vietnamese]**`

2. **Concept numbering (####)**
   - Renumber ALL concepts continuously: 1, 2, 3, 4...
   - Start from 1 after "Tổng Quan" group
   - Continue across all groups

### Edit Process

#### 4.1 Prepare Template
```markdown
## CHỨC NĂNG [số]: [NAME] - [TÊN TIẾNG VIỆT]

### **Tổng Quan**

[PASTE ORIGINAL CONTENT - DO NOT MODIFY]

### **[New Group 1 Name] - [Tên Nhóm 1]**

#### **1. [First Concept Name] - [Tên Khái Niệm]**

[PASTE CONCEPT CONTENT]

- **Point 1**: ...
- **Point 2**: ...
...

→ **Liên kết:** ...

#### **2. [Second Concept Name]**

[Continue...]

### **[New Group 2 Name] - [Tên Nhóm 2]**

#### **[X]. [Next Concept]**

[Continue with continuous numbering...]
```

#### 4.2 Copy-Paste Strategy
For each concept:
1. Find original concept in old structure
2. Copy ENTIRE content (heading + body + liên kết)
3. Paste into new group position
4. Update ONLY the concept number in heading
5. Verify content unchanged

#### 4.3 Quality Checks During Edit
- [ ] "Tổng Quan" is first group, unchanged
- [ ] All concepts present (count matches analysis)
- [ ] Numbering is continuous (no gaps: 1, 2, 3...)
- [ ] Group names are bilingual
- [ ] No content modifications (except group names & numbers)

### Example Before/After

**Before:**
```markdown
## CHỨC NĂNG 4: EASTERN & WESTERN WISDOM

### **Tổng Quan**
Tích hợp tri tuệ từ cả Đông phương và Tây phương...

### Các Yếu Tố Nền Tảng

#### **1. Stoicism - Chủ Nghĩa Khắc Kỷ**
Triết học Hy Lạp cổ đại...
- **Focus on Control**: ...
- **Virtue as Highest Good**: ...
→ **Liên kết:** Virtue Ethics, Resilience

#### **2. Taoism - Đạo Giáo**
Triết học Trung Hoa...
```

**After:**
```markdown
## CHỨC NĂNG 4: EASTERN & WESTERN WISDOM - TRI TUỆ ĐÔNG TÂY

### **Tổng Quan**
Tích hợp tri tuệ từ cả Đông phương và Tây phương...

### **Western Philosophical Foundations - Nền Tảng Triết Học Phương Tây**

#### **1. Stoicism - Chủ Nghĩa Khắc Kỷ**
Triết học Hy Lạp cổ đại...
- **Focus on Control**: ...
- **Virtue as Highest Good**: ...
→ **Liên kết:** Virtue Ethics, Resilience

[...continue with Western concepts 2-7...]

### **Eastern Contemplative Traditions - Truyền Thống Thiền Định Phương Đông**

#### **8. Taoism - Đạo Giáo**
Triết học Trung Hoa...
```

**Key changes:**
- ✅ "Tổng Quan" preserved
- ✅ Group "Các Yếu Tố Nền Tảng" → "Western Philosophical Foundations..."
- ✅ Concepts renumbered (Taoism: #2 → #8)
- ✅ Content unchanged

---

## Step 5: 🚀 Commit & Push

### Purpose
Save changes with descriptive commit message and push to remote.

### Commit Message Format

```bash
git commit -m "Regroup [DOMAIN] CHỨC NĂNG [số]: [brief summary]

- [N] concepts → [M] thematic groups
- Groups: [list new group names in English]
- Preserved: Tổng Quan, all concept content
- Renumbered: 1-[N] continuous"
```

### Example
```bash
git commit -m "Regroup FOUNDATIONS CHỨC NĂNG 4: Eastern & Western Wisdom

- 20 concepts → 3 thematic groups
- Groups: Western Philosophical Foundations, Eastern Contemplative Traditions, Integrative Wisdom Practices
- Preserved: Tổng Quan, all concept content
- Renumbered: 1-20 continuous"
```

### Push Command
```bash
git push -u origin claude/[session-id]
```

**Important:**
- Branch name MUST start with `claude/`
- Branch name MUST end with matching session ID
- Use `-u` flag for first push to set upstream

### Pre-Commit Checklist
- [ ] All changes staged (`git add Whole.md`)
- [ ] Commit message follows format
- [ ] Branch name is correct (starts with `claude/`, ends with session ID)
- [ ] Ready to push (no pending changes)

### Post-Push Actions
- [ ] Verify push succeeded (no 403 error)
- [ ] Note commit hash for reference
- [ ] Update progress tracker (if exists)

---

**Load this reference when:** Executing the regrouping workflow step-by-step
