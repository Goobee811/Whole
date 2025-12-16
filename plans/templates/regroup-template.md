# CHỨC NĂNG {NUMBER} Regroup Plan

**Date:** {DATE}
**Domain:** {DOMAIN}
**Function Name:** {FUNCTION_NAME}
**Session:** {SESSION_ID}

---

## Context

- **Current status:** CHỨC NĂNG {NUMBER} needs regrouping
- **Progress:** {COMPLETED}/{TOTAL} functions completed ({PERCENT}%)
- **This is:** Function #{SEQUENCE} in the regrouping workflow
- **Current groups:** {CURRENT_GROUP_COUNT}
- **Current concepts:** {CURRENT_CONCEPT_COUNT}

---

## Analysis Phase

### Step 1: Read all concepts
- [ ] Grep CHỨC NĂNG location in Whole.md
- [ ] Read all concepts (line {START} to {END})
- [ ] Count total concepts: {CURRENT_CONCEPT_COUNT}
- [ ] Identify current group structure

### Step 2: Identify themes
**Themes discovered:**
1. {THEME_1_NAME}
   - Related concepts: {LIST}
2. {THEME_2_NAME}
   - Related concepts: {LIST}
3. {THEME_3_NAME}
   - Related concepts: {LIST}
...

### Step 3: Propose new groups
**Proposed structure:** {CURRENT_CONCEPT_COUNT} concepts → {PROPOSED_GROUP_COUNT} groups

#### Group 1: **{GROUP_1_ENGLISH} - {GROUP_1_VIETNAMESE}**
- **Concept count:** {COUNT}
- **Concepts:**
  1. {CONCEPT_NAME}
  2. {CONCEPT_NAME}
  ...
- **Rationale:** {WHY_THESE_BELONG_TOGETHER}

#### Group 2: **{GROUP_2_ENGLISH} - {GROUP_2_VIETNAMESE}**
- **Concept count:** {COUNT}
- **Concepts:**
  1. {CONCEPT_NAME}
  2. {CONCEPT_NAME}
  ...
- **Rationale:** {WHY_THESE_BELONG_TOGETHER}

...

### Grouping Quality Check
- [ ] All {CURRENT_CONCEPT_COUNT} concepts accounted for
- [ ] No concepts deleted
- [ ] Group sizes balanced (3-8 concepts each)
- [ ] All group names bilingual: `### **[English] - [Vietnamese]**`
- [ ] Coherence: Concepts naturally belong together
- [ ] Natural thinking: Users would expect these groupings

---

## Implementation Phase

### Pre-Implementation Checklist
- [ ] "### **Tổng Quan**" content identified (will preserve exactly)
- [ ] New group structure finalized
- [ ] Concept renumbering plan ready (1, 2, 3...)
- [ ] All group names follow bilingual format

### Implementation Steps
- [ ] Copy "### **Tổng Quan**" section (preserve exactly)
- [ ] Create new group 1 heading with bilingual name
- [ ] Copy concepts for group 1, renumber starting from 1
- [ ] Create new group 2 heading with bilingual name
- [ ] Copy concepts for group 2, renumber continuing from previous
- [ ] Repeat for all groups
- [ ] Verify continuous numbering (no gaps: 1, 2, 3...)

### Critical Preservation Rules
- [x] ✅ "### **Tổng Quan**" preserved exactly (heading + content)
- [x] ✅ All concept content preserved (every word, bullet, liên kết)
- [x] ✅ Only changed: group names, concept numbers
- [x] ✅ Continuous numbering: 1, 2, 3... across all groups
- [x] ✅ Bilingual format: All headings except numbers

---

## Validation Checklist

### Pre-Commit Validation
Run validation script:
```bash
node .claude/skills/whole-regrouper/scripts/validate-regroup.js {NUMBER}
```

**Expected results:**
- [ ] ✅ "Tổng Quan" section: PASS
- [ ] ✅ Concept numbering: PASS ({CURRENT_CONCEPT_COUNT} concepts, 1-{CURRENT_CONCEPT_COUNT})
- [ ] ✅ Bilingual groups: PASS ({PROPOSED_GROUP_COUNT} groups)
- [ ] ✅ Markdown format: PASS

### Manual Quality Check
- [ ] Spot-check 3 random concepts: content matches original
- [ ] Check first concept (#1): preserved
- [ ] Check last concept (#{CURRENT_CONCEPT_COUNT}): preserved
- [ ] Check "Tổng Quan": exact match with original
- [ ] All "→ **Liên kết:**" lines intact

### Content Integrity
- [ ] Concept count matches: {CURRENT_CONCEPT_COUNT} before = {CURRENT_CONCEPT_COUNT} after
- [ ] No concepts deleted or omitted
- [ ] No content modifications (only group names & numbers changed)
- [ ] Group names descriptive (not generic like "Other Concepts")

---

## Commit & Push

### Commit Message
```bash
Regroup {DOMAIN} CHỨC NĂNG {NUMBER}: {BRIEF_SUMMARY}

- {CURRENT_CONCEPT_COUNT} concepts → {PROPOSED_GROUP_COUNT} thematic groups
- Groups: {GROUP_1_ENGLISH}, {GROUP_2_ENGLISH}, {GROUP_3_ENGLISH}...
- Preserved: Tổng Quan, all concept content
- Renumbered: 1-{CURRENT_CONCEPT_COUNT} continuous
```

### Git Operations
```bash
# Stage changes
git add Whole.md

# Commit with template message
git commit -m "[MESSAGE_ABOVE]"

# Push to branch
git push -u origin claude/{SESSION_ID}
```

### Push Checklist
- [ ] Branch name starts with `claude/`
- [ ] Branch name ends with session ID: {SESSION_ID}
- [ ] Push succeeded (no 403 or network errors)
- [ ] Commit visible on remote

---

## Post-Completion

### Update Progress Tracker
Update `.whole-progress.json`:
```json
{
  "completed": [...previous, {NUMBER}],
  "nextSuggested": {NUMBER + 1},
  "lastUpdated": "{TIMESTAMP}",
  "lastCompletedFunction": {
    "domain": "{DOMAIN}",
    "functionNumber": {NUMBER},
    "functionName": "{FUNCTION_NAME}",
    "completedDate": "{TIMESTAMP}",
    "conceptCount": {CURRENT_CONCEPT_COUNT},
    "groupCount": {PROPOSED_GROUP_COUNT}
  },
  "stats": {
    "averageConceptsPerFunction": {AVG_CONCEPTS},
    "averageGroupsPerFunction": {AVG_GROUPS},
    "totalTimeMinutes": {TOTAL_TIME},
    "progressPercentage": {NEW_PERCENT}
  }
}
```

### Session Summary
- **Time taken:** {MINUTES} minutes
- **Concepts processed:** {CURRENT_CONCEPT_COUNT}
- **Groups created:** {PROPOSED_GROUP_COUNT}
- **Average concepts/group:** {AVG}
- **Quality:** All validation checks passed ✅

### Next Steps
- [ ] Verify commit pushed successfully
- [ ] Review output in Whole.md (spot-check quality)
- [ ] Ready for next CHỨC NĂNG: {NUMBER + 1}

---

## Notes & Learnings

**What went well:**
- {NOTE}

**Challenges encountered:**
- {NOTE}

**Improvements for next iteration:**
- {NOTE}

---

## Success Criteria

✅ **Content Integrity**
- Zero concepts deleted
- Zero content modifications (except group names & concept numbers)
- "Tổng Quan" preserved exactly
- All "→ **Liên kết:**" lines intact

✅ **Structural Quality**
- Groups are thematically coherent
- Groups are balanced (3-8 concepts each)
- Group names are bilingual and descriptive
- Numbering is continuous (1, 2, 3...)

✅ **Format Compliance**
- All headings use correct markdown level (##, ###, ####)
- All headings use correct bold formatting (**)
- Bilingual format consistent throughout
- No markdown syntax errors

✅ **Git Quality**
- Commit message descriptive and follows format
- Pushed to correct branch (claude/{SESSION_ID})
- No merge conflicts
- Clean git status after push

---

**Template Version:** 1.0.0
**Created for:** 50-function regrouping workflow
**Required Skills:** whole-regrouper v3.0.0+
**Required Tools:** validate-regroup.js script
