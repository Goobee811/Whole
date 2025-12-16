# Regroup Plan: CHËC NNG [s—]

**Status:** =· In Progress
**Started:** [timestamp]
**Completed:** -

---

## =Õ Context

**CHËC NNG:** [s—]
**Title:** [FUNCTION NAME - T N CHËC NNG]
**Domain:** [Domain name from Whole.md]
**Line Range:** [start]-[end]
**Total Concepts:** [s—]

---

## = Step 1: Grep & Locate

**Grep command:**
```bash
grep -n "^## CHËC NNG [s—]:" Whole.md
```

**Result:**
- Line: [s—]
- Next function at: [s—]
- Section length: ~[s—] lines

---

## =÷ Step 2: Read Content

**Read command:**
```bash
# Read from line [start] to [end]
```

**Content inventory:**
- [ ] "### **T’ng Quan**" - LOCATED 
- [ ] Current groups: [s—] groups
- [ ] Total concepts: [s—] concepts

**Current group structure:**
1. [TÍn nhÛm 1] - [s—] concepts
2. [TÍn nhÛm 2] - [s—] concepts
...

---

## >‡ Step 3: Analyze & Propose Grouping

### Current Issues
- [ ] Groups too generic?
- [ ] Imbalanced sizes?
- [ ] Missing thematic clarity?
- [ ] Other: [describe]

### Concept Analysis

**List all concepts with themes:**

| # | Concept Name | Core Theme | Proposed Group |
|---|-------------|------------|----------------|
| 1 | [name] | [theme] | [group] |
| 2 | [name] | [theme] | [group] |
| ... | ... | ... | ... |

### Proposed New Groups

#### Group 1: **[English Name] - [TÍn Tiøng Vi«t]**
**Theme:** [describe the unifying theme]
**Concepts:** [list concept numbers]
**Count:** [s—]

**Rationale:**
- [Why these concepts belong together]

---

#### Group 2: **[English Name] - [TÍn Tiøng Vi«t]**
**Theme:** [describe the unifying theme]
**Concepts:** [list concept numbers]
**Count:** [s—]

**Rationale:**
- [Why these concepts belong together]

---

#### Group 3: **[English Name] - [TÍn Tiøng Vi«t]**
*(Add more groups as needed)*

---

### Validation Against Principles

- [ ] **Coherence**: Each group has clear thematic unity 
- [ ] **Balance**: 3-8 concepts per group 
- [ ] **Bilingual**: All names have English + Vietnamese 
- [ ] **Natural Thinking**: Users would expect these groupings 
- [ ] **Preservation**: All concepts accounted for 

---

##  Step 4: Edit Implementation

**Edit strategy:**
- Use Edit tool with old_string í new_string
- Replace entire CHËC NNG section at once
- Preserve "T’ng Quan" exactly
- Renumber concepts 1, 2, 3...

**Pre-edit checklist:**
- [ ] Backup check: Git status clean
- [ ] "T’ng Quan" content copied exactly
- [ ] All concept content preserved
- [ ] New group names finalized
- [ ] Numbering sequence prepared

**Post-edit checklist:**
- [ ] Read back edited section to verify
- [ ] Check "T’ng Quan" unchanged
- [ ] Count concepts (should match original)
- [ ] Verify numbering (1, 2, 3... continuous)

---

##  Step 5: Validation & Commit

### Pre-commit Validation

**Run validation script:**
```bash
node .claude/skills/whole-regrouper/scripts/validate-regroup.js [s—]
```

**Validation results:**
- [ ] "T’ng Quan" preserved 
- [ ] Continuous numbering 
- [ ] Bilingual group names 
- [ ] No content deletion 

### Commit

**Message format:**
```
refactor: Regroup concepts in CF[s—] - [T N CHËC NNG]

- Reorganized [s—] concepts into [s—] thematic groups
- Preserved "T’ng Quan" section
- Updated group names for clarity: [list new groups]
```

**Git commands:**
```bash
git add Whole.md
git commit -m "[message above]"
git push -u origin claude/reorganize-function-concepts-[session-id]
```

---

## =  Progress Update

**Update `.whole-progress.json`:**
- [ ] Add [s—] to `completed[]`
- [ ] Set `nextSuggested` = [s—] + 1
- [ ] Update `lastUpdated` timestamp
- [ ] Update `lastCompletedFunction` details
- [ ] Recalculate `stats`

---

## =› Learnings & Notes

**What went well:**
- [note]

**Challenges:**
- [note]

**Improvements for next iteration:**
- [note]

---

## <Ø Success Criteria

- [x] All concepts preserved (no deletion)
- [x] "T’ng Quan" unchanged
- [x] New groups are thematic and balanced
- [x] Bilingual naming throughout
- [x] Validation passed
- [x] Successfully committed and pushed
- [x] Progress tracker updated

---

**Status:**  Completed
**Completed:** [timestamp]
**Duration:** [minutes]
